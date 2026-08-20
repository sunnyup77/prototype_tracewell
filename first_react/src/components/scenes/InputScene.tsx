import { useState } from "react";
import { createInvestigation } from "@/services/api";

export function InputScene({ onStart }: { onStart?: (id: string) => void }) {
  const [url, setUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const marqueeItems = [
    "DOM STATE EXTRACTION",
    "NETWORK TRAFFIC ANALYSIS",
    "CROSS-WEB CORRELATION",
    "IMAGE MATCHING ALGORITHMS",
    "TEMPORAL OBSERVATION"
  ];

  // Duplicate for seamless infinite scroll
  const marqueeContent = [...marqueeItems, ...marqueeItems];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const result = await createInvestigation(url);
      if (onStart) {
        onStart(result.investigation_id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Background Video */}
      <video
        src="/BG_video.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Dimmed overlay for contrast */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Background Grid Lines (Matching Screenshot) */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-between px-[10%]">
        <div className="w-px h-full bg-white/10 relative">
          {/* Left marker */}
          <div className="absolute top-[20%] -left-[20px] flex items-center">
            <span className="text-white/40 text-[10px] font-mono mr-2">1</span>
            <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-primary border-b-[4px] border-b-transparent"></div>
          </div>
        </div>
        <div className="w-px h-full bg-white/10" />
      </div>
      <div className="absolute top-[25%] left-0 w-full h-px bg-white/10 pointer-events-none z-0" />
      <div className="absolute bottom-[20%] left-0 w-full h-px bg-white/10 pointer-events-none z-0" />

      <div className="z-10 text-center w-full max-w-4xl px-6 -mt-24">
        <p className="text-white/70 text-xs font-mono tracking-[0.2em] uppercase mb-8">
          DIGITAL INVESTIGATION ENVIRONMENT
        </p>

        <h2 className="text-6xl md:text-[5.5rem] font-serif text-white mb-16 tracking-tight leading-none">
          Target Acquisition
        </h2>

        <form
          className="flex flex-col sm:flex-row items-center gap-0 w-full max-w-2xl mx-auto p-1 border border-white/20 bg-black/60 backdrop-blur-md rounded-sm relative"
          onSubmit={handleSubmit}
        >
          {isSubmitting && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10 flex items-center justify-center">
              <span className="text-primary text-xs font-mono tracking-widest uppercase animate-pulse">
                Initializing...
              </span>
            </div>
          )}
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL to investigate (e.g., https://example.com/listing)"
            className="flex-1 w-full bg-transparent border-none outline-none text-white text-lg placeholder:text-muted-foreground px-6 py-4"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-white text-black font-medium text-lg px-8 py-4 rounded-sm hover:bg-white/90 transition-colors whitespace-nowrap disabled:opacity-50"
          >
            Investigate
          </button>
        </form>

        <p className="mt-4 text-white/50 text-xs font-mono tracking-wide">
          Observation requires a publicly accessible URL
        </p>

        <p className="mt-16 text-white/90 text-xl font-sans font-light max-w-2xl mx-auto">
          A forensic observation engine that records what a web page claims and what the network actually returned
        </p>
        <p className="mt-3 text-white/50 text-sm font-sans">
          Preserving every contradiction as reproducible evidence
        </p>
      </div>

      {/* Infinite Transparent Carousel */}
      <div className="absolute bottom-12 left-0 w-full h-16 border-t border-white/5 bg-gradient-to-t from-background to-transparent flex items-center overflow-hidden z-10 mask-image-fade">
        <div className="animate-marquee">
          {marqueeContent.map((item, i) => (
            <div key={i} className="flex items-center px-8">
              <span className="text-[10px] font-mono tracking-[0.2em] text-white/30 whitespace-nowrap uppercase">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
