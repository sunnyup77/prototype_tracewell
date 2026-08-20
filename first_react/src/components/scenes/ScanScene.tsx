import { useEffect, useRef, useState } from "react";
import { SceneLayer } from "@/components/SceneLayer";
import { investigationScenes } from "@/lib/media";
import { gsap, useGsap } from "@/lib/gsap";
import { subscribeToInvestigationEvents, getInvestigationTimeline, SSEEvent } from "@/services/api";

type FieldState = {
  claim_id: string;
  claim_type: string;
  claim_key: string;
  value: any;
  state: string;
  failure_reason: string | null;
};

export function ScanScene({ 
  investigationId,
  onComplete 
}: { 
  investigationId?: string | null;
  onComplete?: () => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [fields, setFields] = useState<FieldState[]>([]);
  const [events, setEvents] = useState<SSEEvent[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    useGsap();
    const ctx = gsap.context(() => {
      // Background entry animation when scrolled to
      gsap.fromTo(".scan-window", { scale: 0.86, opacity: 0.2, rotateX: 12 }, { scale: 1, opacity: 1, rotateX: 0, duration: 1.2, scrollTrigger: { trigger: root.current, start: "top center" }});
    }, root);
    return () => ctx.revert();
  }, []);

  // Continuous scan beam when active
  useEffect(() => {
    useGsap();
    const ctx = gsap.context(() => {
      if (isScanning) {
        gsap.fromTo(".scan-beam", 
          { top: "-10%", opacity: 1 }, 
          { top: "100%", duration: 3, ease: "none", repeat: -1 }
        );
      } else {
        gsap.to(".scan-beam", { opacity: 0, duration: 0.5 });
      }
    }, root);
    return () => ctx.revert();
  }, [isScanning]);

  useEffect(() => {
    if (!investigationId) return;

    setIsScanning(true);
    const fetchTimeline = async () => {
      const timeline = await getInvestigationTimeline(investigationId);
      if (!timeline) return;
      
      const claims = timeline.targets[0]?.claims || [];
      const newFields = claims.map((c: any) => {
        const latest = c.history[c.history.length - 1];
        return {
          claim_id: c.claim_id,
          claim_type: c.claim_type,
          claim_key: c.claim_key,
          value: latest?.value,
          state: latest?.observation_state,
          failure_reason: latest?.failure_reason
        };
      });
      setFields(newFields);
    };

    const unsubscribe = subscribeToInvestigationEvents(investigationId, (event) => {
      setEvents((prev) => [...prev, event]);
      
      if (event.event === "observation_state_changed" || event.event === "repair_step") {
        // Re-fetch timeline to get updated values
        fetchTimeline();
      }

      if (event.event === "investigation_terminal") {
        setIsScanning(false);
        if (onComplete) {
          // Add a tiny delay so the user sees the 'completed' state before scrolling starts
          setTimeout(onComplete, 1000); 
        }
      }
    });

    return () => unsubscribe();
  }, [investigationId]);

  return (
    <section id="scan-scene" ref={root} className="relative min-h-screen py-24">
      <div className="relative flex min-h-screen w-full items-center overflow-hidden">
        <SceneLayer scene={investigationScenes.observe} overlay="strong" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-8 px-6 lg:grid-cols-[1fr_1.3fr_0.8fr] lg:items-start">
          
          {/* Column 1: Context */}
          <div className="sticky top-32">
            <span className="label-mono">Forensic scan · target page</span>
            <div className="relative mt-6">
              <h2 className="display-lg leading-none">
                {isScanning ? "Extracting" : "Observed"}
              </h2>
            </div>

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A page enters the environment. Tracewell passes over it, recording each field it can
              verify and the exact bytes that produced it. FAILED states are preserved, never hidden.
            </p>
            
            {/* Live Event Feed (Terminal Style) */}
            <div className="mt-12 bg-black/80 border border-white/10 rounded-md p-4 max-h-[400px] overflow-y-auto font-mono text-xs">
              <div className="text-white/40 mb-3 border-b border-white/10 pb-2">LIVE ACTIVITY LOG</div>
              <div className="space-y-2 flex flex-col-reverse">
                {events.map((ev, idx) => (
                  <div key={idx} className="animate-in fade-in slide-in-from-left-2 duration-300">
                    <span className="text-primary/70">[{ev.id}]</span>{" "}
                    <span className="text-white/80">{ev.event}</span>
                    {ev.data?.state && <span className={`ml-2 px-1 rounded-sm ${ev.data.state === 'FAILED' ? 'bg-destructive text-destructive-foreground' : ev.data.state === 'CONFIRMED' ? 'bg-primary/20 text-primary' : 'bg-yellow-500/20 text-yellow-500'}`}>{ev.data.state}</span>}
                    {ev.data?.status === 'completed' && <span className="ml-2 text-green-400">COMPLETED</span>}
                  </div>
                ))}
                {!events.length && investigationId && <div className="text-white/30 animate-pulse">Waiting for events...</div>}
                {!investigationId && <div className="text-white/30">Awaiting target acquisition...</div>}
              </div>
            </div>
          </div>

          {/* Column 2: browser window under examination */}
          <div className="scan-window panel relative overflow-hidden rounded-md evidence-glow shadow-2xl bg-black/60 backdrop-blur-md border border-white/10">
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
              <span className="h-2 w-2 rounded-full bg-red-500/50" />
              <span className="h-2 w-2 rounded-full bg-yellow-500/50" />
              <span className="h-2 w-2 rounded-full bg-green-500/50" />
              <span className="ml-4 truncate font-mono text-[11px] text-muted-foreground">
                https://listings.example.com/riverside-apartment-4471
              </span>
            </div>
            
            <div className="relative min-h-[500px]">
              <div className="scan-beam pointer-events-none absolute top-0 left-0 z-20 h-24 w-full bg-gradient-to-b from-transparent via-primary/25 to-primary/80 opacity-0">
                <div className="absolute bottom-0 h-[2px] w-full bg-primary" />
              </div>
              
              <div className="divide-y divide-white/5">
                {!fields.length && investigationId && (
                  <div className="p-8 text-center text-white/30 font-mono text-sm animate-pulse">Initializing Extraction Engine...</div>
                )}
                
                {fields.map((f) => (
                  <div
                    key={f.claim_id}
                    className={`flex flex-col gap-2 px-5 py-5 transition-colors duration-500 ${f.state === 'CONFIRMED' ? 'bg-primary/5' : f.state === 'FAILED' ? 'bg-destructive/10' : 'bg-yellow-500/5'}`}
                  >
                    <div className="flex items-baseline justify-between gap-6">
                      <span className="label-mono text-white/60">{f.claim_key}</span>
                      
                      {f.state === "FAILED" ? (
                        <span className="font-mono text-destructive text-sm font-semibold tracking-wider">FAILED</span>
                      ) : (
                        <span className="text-right text-sm text-foreground break-words max-w-[60%]">
                          {f.value || <span className="text-white/20 italic">Empty</span>}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center mt-2 border-t border-white/5 pt-2">
                      <div className="flex items-center gap-2">
                        <span className={`h-1.5 w-1.5 rounded-full ${f.state === 'CONFIRMED' ? 'bg-primary' : f.state === 'FAILED' ? 'bg-destructive' : 'bg-yellow-500'}`} />
                        <span className={`font-mono text-[10px] uppercase tracking-wider ${f.state === 'CONFIRMED' ? 'text-primary' : f.state === 'FAILED' ? 'text-destructive' : 'text-yellow-500'}`}>
                          {f.state}
                        </span>
                      </div>
                      
                      {f.failure_reason && (
                        <span className="font-mono text-[10px] text-destructive/80 text-right max-w-[70%]">
                          {f.failure_reason}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Evidence Panel */}
          <div className="sticky top-32">
             <div className="panel p-5 bg-black/40 border border-white/10 rounded-md">
                <span className="label-mono block mb-4 border-b border-white/10 pb-2">Corroborating Evidence</span>
                
                <div className="space-y-4">
                  {events.filter(e => e.event === "evidence_created").length === 0 ? (
                    <p className="text-xs text-white/30 italic">No external evidence detected yet.</p>
                  ) : (
                    events.filter(e => e.event === "evidence_created").map((e, idx) => (
                      <div key={idx} className="bg-white/5 border border-white/10 p-3 rounded-sm animate-in fade-in zoom-in duration-500">
                        <div className="text-[10px] font-mono text-primary mb-1 uppercase tracking-wider">{e.data.evidence_type.replace('_', ' ')}</div>
                        <p className="text-xs text-white/80">Cross-reference match found. Evidence preserved.</p>
                        <div className="mt-2 text-[9px] text-white/40 font-mono break-all">{e.data.evidence_id}</div>
                      </div>
                    ))
                  )}
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
