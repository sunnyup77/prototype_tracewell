import { useEffect, useRef, useState } from "react";
import { SceneLayer } from "@/components/SceneLayer";
import { investigationScenes } from "@/lib/media";
import { gsap, useGsap } from "@/lib/gsap";
import { getEvidenceGraph } from "@/services/api";

type Node = { id: string; node_type: string; summary: any; x: number; y: number; label: string; meta: string };
type Edge = { id: string; a: string; b: string };

export function CrossWebScene({ investigationId }: { investigationId?: string | null }) {
  const root = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    if (!investigationId) return;

    getEvidenceGraph(investigationId).then((data) => {
      // Assign dynamic positions based on node type to simulate a structured tree
      const positionedNodes: Node[] = [];
      
      const rootNode = data.nodes.find(n => n.node_type === "target");
      if (rootNode) positionedNodes.push({ id: rootNode.id, node_type: rootNode.node_type, summary: rootNode.summary, x: 50, y: 18, label: "Target Listing", meta: rootNode.summary.canonical_url });

      const evidenceNodes = data.nodes.filter(n => n.node_type !== "target");
      evidenceNodes.forEach((n, i) => {
        const spacing = 100 / (evidenceNodes.length + 1);
        positionedNodes.push({ id: n.id, node_type: n.node_type, summary: n.summary, x: spacing * (i + 1), y: 52, label: n.node_type, meta: n.summary.fingerprint || n.summary.phone || n.summary.price || n.id });
      });

      const otherTargets = data.nodes.filter(n => n.node_type === "target" && n.id !== rootNode?.id);
      otherTargets.forEach((n, i) => {
        const spacing = 100 / (otherTargets.length + 1);
        positionedNodes.push({ id: n.id, node_type: n.node_type, summary: n.summary, x: spacing * (i + 1), y: 84, label: "Correlated Target", meta: n.summary.canonical_url });
      });

      const processedEdges = data.edges
        .filter(e => e.connected_node_ids.length === 2)
        .map(e => ({ id: e.evidence_id, a: e.connected_node_ids[0], b: e.connected_node_ids[1] }));

      setNodes(positionedNodes);
      setEdges(processedEdges);
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
          pin: ".web-stage",
          pinSpacing: false,
          scrub: 1,
        },
      });

      tl.fromTo(".node-target-1", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.6 });

      // Target dynamically rendered edges and nodes
      // We rely on the class names being generated correctly, and since they load asynchronously, 
      // the scroll-scrub timeline might need data before it can attach to DOM nodes properly.
      // We animate them generically or let CSS transitions handle the initial load if it happens late.
      tl.fromTo("line", 
          { strokeDashoffset: 400 }, 
          { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut", stagger: 0.2 }, 0.8
        )
        .fromTo("[class^='node-']:not(.node-target-1)", 
          { opacity: 0, y: 18, scale: 0.8 }, 
          { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.2 }, 1.2
        );

      tl.fromTo(".web-verdict", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6 }, "+=0.3");
    }, root);
    return () => ctx.revert();
  }, [hasData]);

  return (
    <section ref={root} className="relative h-[320vh]">
      <div className="web-stage relative h-screen w-full overflow-hidden">
        <SceneLayer scene={investigationScenes.connect} overlay="strong" />
        <div className="grid-etch absolute inset-0 opacity-30" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-6 pt-24 pb-16">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="label-mono">Cross-web investigation</span>
              <h2 className="display-lg mt-4">Cross-web</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              One target becomes a network. Shared images, numbers and prices surface relationships
              across unrelated domains — each relationship recorded as it forms.
            </p>
          </div>

          <div className="relative mt-8 flex-1">
            {!investigationId && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-white/20 animate-pulse">Awaiting investigation data...</span>
              </div>
            )}
            
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {hasData && edges.map((e) => {
                const na = nodes.find((n) => n.id === e.a);
                const nb = nodes.find((n) => n.id === e.b);
                if (!na || !nb) return null;
                return (
                  <line
                    key={e.id}
                    className={`edge-${e.id}`}
                    x1={na.x}
                    y1={na.y}
                    x2={nb.x}
                    y2={nb.y}
                    stroke="var(--evidence)"
                    strokeWidth="0.15"
                    strokeDasharray="400"
                    strokeDashoffset="400"
                    opacity="0.7"
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}
            </svg>

            {hasData && nodes.map((n) => (
              <div
                key={n.id}
                className={`node-${n.id} absolute -translate-x-1/2 -translate-y-1/2 opacity-0`}
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
              >
                <div
                  className={`panel rounded-sm px-4 py-3 bg-black/60 backdrop-blur-md border border-white/10 ${n.id === "target-1" ? "evidence-glow shadow-2xl border-primary/50" : ""}`}
                >
                  <div className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase">
                    {n.label}
                  </div>
                  <div className="mt-1 font-mono text-[11px] whitespace-nowrap text-muted-foreground max-w-[150px] truncate">
                    {n.meta}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="web-verdict panel mt-6 flex flex-wrap items-center gap-4 rounded-sm px-5 py-4 opacity-0 bg-black/60 backdrop-blur-md border border-white/10">
            <span className="font-mono text-[11px] tracking-[0.2em] text-primary uppercase">
              Relationship recorded
            </span>
            <span className="text-sm text-muted-foreground">
              {hasData ? `${nodes.length} shared identifiers across multiple domains · confidence 0.91` : "Analyzing identifiers..."}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
