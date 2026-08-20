import { SceneMedia } from "@/lib/media";

export function SceneLayer({ scene }: { scene: SceneMedia }) {
  return (
    <div className="absolute inset-0 w-full h-full bg-background overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background/80 z-20" />
      {scene.video ? (
        <video src={scene.video} autoPlay loop muted playsInline className="w-full h-full object-cover" />
      ) : (
        <div 
          className="w-full h-full bg-cover bg-center opacity-40 scale-105"
          style={{ backgroundImage: `url(${scene.poster})` }}
        />
      )}
    </div>
  );
}
