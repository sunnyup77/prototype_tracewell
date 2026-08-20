/**
 * Media configuration layer.
 *
 * Every cinematic scene references its visual through this map so real footage
 * can be swapped in later without touching any component.
 *
 * To use real video: drop files in `public/media/` and set `video` below.
 * Components prefer `video` when present and fall back to `poster`.
 */
const sceneWelcome = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop";
const sceneObserve = "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop";
const sceneExtract = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop";
const sceneConnect = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop";

export type SceneMedia = {
  id: string;
  label: string;
  poster: string;
  video?: string;
};

export const investigationScenes = {
  welcome: {
    id: "welcome",
    label: "Welcome",
    poster: sceneWelcome,
    // video: "/media/welcome.mp4",
  },
  observe: {
    id: "observe",
    label: "Observe",
    poster: sceneObserve,
    // video: "/media/observe.mp4",
  },
  extract: {
    id: "extract",
    label: "Extract",
    poster: sceneExtract,
    // video: "/media/extract.mp4",
  },
  connect: {
    id: "connect",
    label: "Connect",
    poster: sceneConnect,
    // video: "/media/connect.mp4",
  },
} satisfies Record<string, SceneMedia>;
