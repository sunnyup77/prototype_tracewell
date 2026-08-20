import { useEffect, useRef, useState } from "react";
import { gsap, useGsap } from "@/lib/gsap";
import { getTargetObservationHistory } from "@/services/api";

const STATUS = ["Failed", "Repair", "Unverified", "Confirmed"];

type TimelineDay = { day: string; state: "ok" | "fail"; note: string };

export function TimelineScene({ investigationId }: { investigationId?: string | null }) {
  const root = useRef<HTMLDivElement>(null);
  const [days, setDays] = useState<TimelineDay[]>([]);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    if (!investigationId) return;

    // In a real app we'd resolve the primary targetId from the graph. Using mock for demo.
    getTargetObservationHistory("mock-target-id").then((res) => {
      const formattedDays = res.observations.map((obs: any, index: number) => {
        let note = "";
        if (obs.state === "FAILED") {
          note = `capture failed · ${obs.failure_reason}`;
        } else if (obs.value) {
          const vals = Object.entries(obs.value).map(([k, v]) => `${k} ${v}`);
          note = vals.join(" · ");
        }

        return {
          day: `Day ${index + 1}`,
          state: obs.state === "FAILED" ? "fail" : "ok",
          note
        } as TimelineDay;
      });

      setDays(formattedDays);
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
          pin: ".time-stage",
          pinSpacing: false,
          scrub: 1,
        },
      });

      tl.fromTo(".time-rail", { scaleY: 0 }, { scaleY: 1, duration: 1.6, ease: "none" }, 0);
      
      tl.fromTo("[class^='day-']", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.34 }, 0.2);
      tl.to(".fail-dot", { scale: 1.35, duration: 0.3 }, 1.3); // animate failure dots

      STATUS.forEach((_, i) => {
        tl.fromTo(`.status-${i}`, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35 }, 2.1 + i * 0.5);
      });
    }, root);
    return () => ctx.revert();
  }, [hasData]);

  return (
    <section ref={root} className="relative h-[340vh]">
      <div className="time-stage relative flex h-screen w-full items-center overflow-hidden bg-background">
        <div className="grid-etch absolute inset-0 opacity-25" />
        <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-14 px-6 pt-20 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="label-mono">Temporal observation</span>
            <h2 className="display-lg mt-4">A failure is evidence too</h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              Tracewell never repairs history quietly. A failed observation stays in the record,
              marked, until a later capture confirms or contradicts it.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {STATUS.map((s, i) => (
                <span
                  key={s}
                  className={`status-${i} panel rounded-sm px-4 py-2 font-mono text-[11px] tracking-[0.2em] uppercase opacity-0 ${
                    i === 0 ? "text-destructive" : i === 3 ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="relative pl-8">
            <div className="time-rail absolute top-2 bottom-2 left-[3px] w-px origin-top bg-gradient-to-b from-primary/70 via-border to-transparent" />
            <ul className="space-y-8">
              {!investigationId && (
                <li className="text-white/20 font-mono text-sm animate-pulse">Awaiting timeline...</li>
              )}
              {hasData && days.map((d, i) => (
                <li key={d.day} className={`day-${i} relative opacity-0`}>
                  <span
                    className={`dot ${d.state === "fail" ? "fail-dot" : ""} absolute top-1.5 -left-8 h-2 w-2 -translate-x-[3px] rounded-full ${
                      d.state === "fail" ? "bg-destructive" : "bg-primary"
                    }`}
                  />
                  <div className="flex flex-wrap items-baseline gap-4">
                    <span className="font-mono text-xs tracking-[0.25em] text-foreground uppercase">
                      {d.day}
                    </span>
                    <span
                      className={`font-mono text-[11px] ${d.state === "fail" ? "text-destructive" : "text-muted-foreground"}`}
                    >
                      {d.state === "fail" ? "× " : "● "}
                      {d.note}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
