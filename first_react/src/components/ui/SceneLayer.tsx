import type { SceneMedia } from "@/lib/media";

/**
 * Full-viewport cinematic media layer. Renders looping video when configured,
 * otherwise the still plate with a slow drift so the frame is never static.
 */
export function SceneLayer({
  scene,
  className = "",
  drift = true,
  overlay = "strong",
}: {
  scene: SceneMedia;
  className?: string;
  drift?: boolean;
  overlay?: "strong" | "soft" | "none";
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {scene.video ? (
        <video
          className={`h-full w-full object-cover ${drift ? "scene-drift" : ""}`}
          src={scene.video}
          poster={scene.poster}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <img
          src={scene.poster}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1080}
          className={`h-full w-full object-cover ${drift ? "scene-drift" : ""}`}
        />
      )}
      {overlay !== "none" && (
        <div
          className={
            overlay === "strong"
              ? "absolute inset-0 bg-[var(--grade-strong)]"
              : "absolute inset-0 bg-[var(--grade-soft)]"
          }
        />
      )}
      <div className="scanlines absolute inset-0" />
    </div>
  );
}
