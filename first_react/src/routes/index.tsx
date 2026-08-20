import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { TopNav, ClosingSection } from "@/components/SiteChrome";
import { HeroScene } from "@/components/scenes/HeroScene";
import { InputScene } from "@/components/scenes/InputScene";
import { ScanScene } from "@/components/scenes/ScanScene";
import { CrossWebScene } from "@/components/scenes/CrossWebScene";
import { MatchScene } from "@/components/scenes/MatchScene";
import { NetworkScene } from "@/components/scenes/NetworkScene";
import { TimelineScene } from "@/components/scenes/TimelineScene";
import { ContradictionScene } from "@/components/scenes/ContradictionScene";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tracewell — Forensic Observation of the Open Web" },
    ],
  }),
  component: Index,
});

function Index() {
  const [activeInvestigationId, setActiveInvestigationId] = useState<string | null>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);

  useEffect(() => {
    let animationFrameId: number;

    const scrollLoop = () => {
      if (isAutoScrolling) {
        // Scroll down steadily by 6 pixels per frame (~360px per second)
        window.scrollBy(0, 6); 
        
        // Stop if we reach the bottom
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
          setIsAutoScrolling(false);
          return;
        }
        
        animationFrameId = requestAnimationFrame(scrollLoop);
      }
    };

    if (isAutoScrolling) {
      animationFrameId = requestAnimationFrame(scrollLoop);
    }

    // Stop auto-scrolling if the user manually interacts to regain control
    const stopScroll = () => setIsAutoScrolling(false);
    window.addEventListener("wheel", stopScroll, { passive: true });
    window.addEventListener("touchstart", stopScroll, { passive: true });
    window.addEventListener("mousedown", stopScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("wheel", stopScroll);
      window.removeEventListener("touchstart", stopScroll);
      window.removeEventListener("mousedown", stopScroll);
    };
  }, [isAutoScrolling]);

  const handleStartInvestigation = (id: string) => {
    setActiveInvestigationId(id);
    
    // Initial smooth scroll to the Scan Scene
    const target = document.getElementById("scan-scene");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScanComplete = () => {
    setIsAutoScrolling(true);
  };

  return (
    <main className="relative bg-background">
      <TopNav />
      <HeroScene />
      <InputScene onStart={handleStartInvestigation} />
      <ScanScene 
        investigationId={activeInvestigationId} 
        onComplete={handleScanComplete} 
      />
      <NetworkScene investigationId={activeInvestigationId} />
      <CrossWebScene investigationId={activeInvestigationId} />
      <MatchScene />
      <TimelineScene investigationId={activeInvestigationId} />
      <ContradictionScene investigationId={activeInvestigationId} />
      <ClosingSection />
    </main>
  );
}
