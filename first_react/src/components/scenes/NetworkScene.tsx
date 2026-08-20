import { useEffect, useRef, useState } from "react";
import { SceneLayer } from "@/components/SceneLayer";
import { investigationScenes } from "@/lib/media";
import { gsap, useGsap } from "@/lib/gsap";
import { getObservation } from "@/services/api";

export function NetworkScene({ investigationId }: { investigationId?: string | null }) {
  const root = useRef<HTMLDivElement>(null);
  const [requests, setRequests] = useState<any[]>([]);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    if (!investigationId) return;

    // In a real app we'd get the specific observation_id from the graph or events.
    // Here we use a mock ID for the prototype.
    getObservation("mock-obs-id").then((res) => {
      setRequests(res.captures || []);
      setHasData(true);
    });
  }, [investigationId]);

  useEffect(() => {
    useGsap();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          pin: ".net-stage",
          pinSpacing: false,
          scrub: 1,
        },
      });

      tl.fromTo(".net-page", { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.8 });
      
      // We animate the classes based on the index. The DOM elements must be present.
      // Since data might load asynchronously, we just target all elements starting with .req-
      tl.fromTo("[class^='req-']", { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.3, stagger: 0.4 }, 0.6);
      
      tl.fromTo(".net-payload", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, 2.7)
        .fromTo(".net-link", { scaleX: 0 }, { scaleX: 1, duration: 0.6 }, 3.1);
    }, root);
    return () => ctx.revert();
  }, [hasData]); // Re-run GSAP setup when data loads

  return (
    <section ref={root} className="relative h-[300vh]">
      <div className="net-stage relative flex h-screen w-full items-center overflow-hidden">
        <SceneLayer scene={investigationScenes.extract} overlay="strong" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="label-mono">Network observation</span>
              <h2 className="display-lg mt-4">Beneath the page</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              We record the traffic the page depends on. Everything rendered has a source, and every
              source is retained with its response.
            </p>
          </div>

          <div className="mt-12 grid items-center gap-6 lg:grid-cols-[1fr_auto_1.2fr]">
            <div className="net-page panel overflow-hidden rounded-sm bg-black/60 backdrop-blur-md border border-white/10 shadow-2xl opacity-0">
              <div className="border-b border-white/10 px-4 py-2 font-mono text-[11px] text-muted-foreground bg-white/5">
                rendered page
              </div>
              <div className="space-y-4 px-5 py-6">
                <div className="h-2 w-2/3 rounded-sm bg-foreground/25" />
                <div className="h-2 w-1/2 rounded-sm bg-foreground/15" />
                <div className="mt-6 font-mono text-lg text-alert">
                  {!investigationId ? (
                    <span className="text-white/20 animate-pulse">Awaiting data...</span>
                  ) : (
                    "ONLY 2 LEFT"
                  )}
                </div>
                <div className="text-sm text-muted-foreground">Luxury Apartment — $950 / night</div>
                <div className="h-24 w-full rounded-sm bg-foreground/8" />
              </div>
            </div>

            <div className="net-link mx-auto hidden h-px w-24 origin-left bg-primary lg:block scale-x-0" />

            <div className="panel overflow-hidden rounded-sm bg-black/60 backdrop-blur-md border border-white/10 shadow-2xl">
              <div className="border-b border-white/10 px-4 py-2 font-mono text-[11px] text-muted-foreground bg-white/5">
                network log
              </div>
              <div className="divide-y divide-white/5 min-h-[240px]">
                {!investigationId && (
                  <div className="flex h-full items-center justify-center py-12">
                    <span className="font-mono text-xs text-white/20 animate-pulse">Waiting for investigation...</span>
                  </div>
                )}
                {investigationId && !hasData && (
                  <div className="flex h-full items-center justify-center py-12">
                    <span className="font-mono text-xs text-primary animate-pulse">Retrieving network captures...</span>
                  </div>
                )}
                {hasData && requests.map((r, i) => {
                  const method = r.request.split(" ")[0];
                  const url = r.request.split(" ")[1];
                  return (
                    <div
                      key={i}
                      className={`req-${i} flex items-center gap-4 px-4 py-3 font-mono text-[11px] opacity-0`}
                    >
                      <span className={`w-10 ${method === 'POST' ? 'text-yellow-500' : 'text-primary'}`}>{method}</span>
                      <span className="flex-1 truncate text-foreground/80">{url}</span>
                      <span className="text-muted-foreground">{r.status}</span>
                      <span className="w-14 text-right text-muted-foreground/70">{r.time}</span>
                    </div>
                  );
                })}
              </div>
              <div className="net-payload border-t border-white/10 bg-primary/10 px-4 py-4 font-mono text-[12px] opacity-0">
                <span className="text-muted-foreground">response · /api/inventory → </span>
                <span className="text-primary">{`{ "stock": 47 }`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
