import { useEffect, useRef } from "react";
import { SceneLayer } from "@/components/SceneLayer";
import { investigationScenes } from "@/lib/media";
import { gsap, useGsap } from "@/lib/gsap";

export function HeroScene() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    useGsap();
    const ctx = gsap.context((self) => {
      const media = self.selector?.(".hero-media");
      const copy = self.selector?.(".hero-copy");
      gsap.to(media ?? [], {
        scale: 1.25,
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(copy ?? [], {
        yPercent: -35,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.from(self.selector?.(".hero-line") ?? [], {
        yPercent: 110,
        opacity: 0,
        duration: 1.4,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-screen w-full overflow-hidden">
      <div className="hero-media absolute inset-0 will-change-transform">
        <SceneLayer scene={investigationScenes.welcome} />
      </div>
      <div className="grid-etch absolute inset-0 opacity-40" />

      <div className="hero-copy relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="overflow-hidden">
          <p className="hero-line label-mono">Digital investigation environment</p>
        </div>
        <div className="mt-10 overflow-hidden">
          <p className="hero-line font-mono text-xs tracking-[0.4em] text-primary uppercase">
            Welcome to
          </p>
        </div>
        <div className="overflow-hidden">
          <h1 className="hero-line display-xl mt-2">Tracewell</h1>
        </div>
        <div className="mt-8 max-w-xl overflow-hidden">
          <p className="hero-line text-sm leading-relaxed text-muted-foreground sm:text-base">
            We observe the open web the way an investigator observes a room — recording what a page
            claims, what the network returned, and every difference between them.
          </p>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-center">
        <span className="label-mono">Scroll</span>
        <div className="mx-auto mt-3 h-14 w-px bg-gradient-to-b from-primary to-transparent" />
      </div>

      <div className="absolute bottom-10 left-8 z-10 hidden lg:block">
        <span className="label-mono">Case 0417 / open</span>
      </div>
      <div className="absolute bottom-10 right-8 z-10 hidden lg:block">
        <span className="label-mono">Observation active</span>
      </div>
    </section>
  );
}
