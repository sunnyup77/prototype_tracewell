import { useEffect, useRef, useState } from "react";
import { gsap, useGsap } from "@/lib/gsap";
import { getEvidenceGraph } from "@/services/api";

export function ContradictionScene({ investigationId }: { investigationId?: string | null }) {
  const root = useRef<HTMLDivElement>(null);
  const [contradiction, setContradiction] = useState<{ dom: string; network: string } | null>(null);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    if (!investigationId) return;

    getEvidenceGraph(investigationId).then((data) => {
      const evidence = data.edges.find(e => e.evidence_type === "dom_network_contradiction");
      if (evidence && evidence.metrics) {
        setContradiction({
          dom: evidence.metrics.dom_value,
          network: evidence.metrics.network_value
        });
      }
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
          pin: ".split-stage",
          pinSpacing: false,
          scrub: 1,
        },
      });

      tl.fromTo(".split-word", { opacity: 0, scale: 1.2 }, { opacity: 1, scale: 1, duration: 0.8 })
        .to(".split-word", { opacity: 0, duration: 0.5 }, 1.4)
        .fromTo(".panel-left", { xPercent: 50, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 1.4, ease: "power3.inOut" }, 1.6)
        .fromTo(".panel-right", { xPercent: -50, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 1.4, ease: "power3.inOut" }, 1.6)
        .fromTo(".split-seam", { scaleY: 0 }, { scaleY: 1, duration: 0.8 }, 2.6)
        .fromTo(".claim-value", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.4 }, 3.1)
        .fromTo(".verdict", { opacity: 0, letterSpacing: "0.6em" }, { opacity: 1, letterSpacing: "0.24em", duration: 1.2 }, 4.4)
        .fromTo(".verdict-meta", { opacity: 0 }, { opacity: 1, duration: 0.8 }, 5.2);
    }, root);
    return () => ctx.revert();
  }, [hasData]);

  return (
    <section ref={root} className="relative h-[420vh]">
      <div className="split-stage relative flex h-screen w-full items-center justify-center overflow-hidden bg-background">
        <div className="grid-etch absolute inset-0 opacity-20" />

        <h2 className="split-word display-xl absolute z-20">Contradiction</h2>

        <div className="relative z-10 grid h-full w-full grid-cols-1 md:grid-cols-2">
          <div className="panel-left flex flex-col justify-center gap-8 px-8 py-24 md:px-16">
            <span className="label-mono">What the user sees</span>
            <div className="claim-value font-mono text-3xl text-destructive opacity-0 sm:text-5xl">
              {!investigationId && <span className="text-white/20 text-xl animate-pulse">Awaiting data...</span>}
              {hasData && (contradiction ? contradiction.dom : "NO CONTRADICTION")}
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Rendered DOM · captured 14:02:11 UTC · listings.example.com/4471
            </p>
          </div>

          <div className="panel-right flex flex-col justify-center gap-8 border-t border-white/10 px-8 py-24 md:border-t-0 md:px-16 bg-primary/5">
            <span className="label-mono">What the browser received</span>
            <div className="claim-value font-mono text-3xl text-primary opacity-0 sm:text-5xl">
              {!investigationId && <span className="text-white/20 text-xl animate-pulse">Awaiting data...</span>}
              {hasData && (contradiction ? contradiction.network : "NO CONTRADICTION")}
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              GET /api/inventory?sku=4471 · 200 OK · retained response body
            </p>
          </div>
        </div>

        <div className="split-seam absolute top-0 bottom-0 left-1/2 hidden w-px origin-center bg-white/20 md:block" />

        <div className="absolute bottom-16 left-1/2 z-20 w-full -translate-x-1/2 px-6 text-center">
          <p className="verdict font-mono text-sm text-primary uppercase opacity-0 sm:text-base">
            Observed contradiction
          </p>
          <p className="verdict-meta mt-4 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase opacity-0">
            Recorded · reproducible · attributable
          </p>
        </div>
      </div>
    </section>
  );
}
