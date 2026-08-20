import { useEffect, useRef } from "react";
import { gsap, useGsap } from "@/lib/gsap";
const evidence = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop";

export function MatchScene() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    useGsap();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          pin: ".match-stage",
          pinSpacing: false,
          scrub: 1,
        },
      });

      tl.fromTo(".plate-a", { xPercent: -55, opacity: 0, rotate: -4 }, { xPercent: 0, opacity: 1, rotate: -1.5, duration: 1 })
        .fromTo(".plate-b", { xPercent: 55, opacity: 0, rotate: 4 }, { xPercent: 0, opacity: 1, rotate: 1.5, duration: 1 }, 0)
        .to(".plate-a", { xPercent: 14, duration: 1 }, 1.2)
        .to(".plate-b", { xPercent: -14, duration: 1 }, 1.2)
        .fromTo(".match-guide", { scaleX: 0 }, { scaleX: 1, duration: 0.6 }, 1.6)
        .fromTo(".match-verdict", { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.6 }, 2.1)
        .fromTo(".match-pct", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5 }, 2.4);
    }, root);
    return () => ctx.revert();
  }, []);

  const plate = (side: "a" | "b", source: string, ref: string, pos: string) => (
    <figure className={`plate-${side} panel relative w-[42%] max-w-sm overflow-hidden rounded-sm`}>
      <figcaption className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="label-mono">{source}</span>
        <span className="font-mono text-[10px] text-primary">{ref}</span>
      </figcaption>
      <div className="relative aspect-[3/2] overflow-hidden">
        <img
          src={evidence}
          alt="Evidence frame recovered from source page"
          loading="lazy"
          width={1280}
          height={960}
          className="h-full w-full object-cover"
          style={{ objectPosition: pos, filter: "saturate(0.3) contrast(1.1) brightness(0.62)" }}
        />
        <div className="absolute inset-0 border border-primary/30" />
        <div className="absolute top-4 left-4 h-5 w-5 border-t border-l border-primary" />
        <div className="absolute right-4 bottom-4 h-5 w-5 border-r border-b border-primary" />
        <div className="scanlines absolute inset-0" />
      </div>
    </figure>
  );

  return (
    <section ref={root} className="relative h-[300vh]">
      <div className="match-stage relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-background py-24">
        <div className="grid-etch absolute inset-0 opacity-25" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center">
          <span className="label-mono">Image comparison · perceptual hash</span>
        </div>

        <div className="relative z-10 flex w-full max-w-6xl items-center justify-center gap-6 px-6">
          {plate("a", "listings.example.com", "IMG-4471-01", "20% 50%")}
          <div className="match-guide h-px w-16 origin-center bg-primary" />
          {plate("b", "market-c.example", "IMG-9902-04", "80% 50%")}
        </div>

        <div className="relative z-10 mt-10 text-center">
          <h2 className="match-verdict display-lg opacity-0">Image match detected</h2>
          <p className="match-pct mt-4 font-mono text-sm tracking-[0.3em] text-primary uppercase opacity-0">
            97% similar · same source frame
          </p>
        </div>
      </div>
    </section>
  );
}
