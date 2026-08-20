import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as gsapWithCSS, t as ScrollTrigger } from "../_libs/gsap.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Ukps6sbN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TopNav() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-white/5 text-sm font-mono tracking-widest text-muted-foreground uppercase",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-primary font-bold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-4 h-4 bg-primary rounded-sm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-white normal-case font-serif text-xl tracking-normal",
					children: "Tracewell"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden md:flex items-center gap-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:text-primary transition-colors",
						children: "Method"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:text-primary transition-colors",
						children: "Evidence"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:text-primary transition-colors",
						children: "Coverage"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:text-primary transition-colors",
						children: "Security"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "text-primary hover:text-primary/80 transition-colors",
				children: "Request Access"
			}) })
		]
	});
}
function ClosingSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "py-24 text-center border-t border-white/5 mt-32 text-muted-foreground text-sm font-mono relative z-10 bg-background",
		children: "Observation Terminated."
	});
}
function SceneLayer({ scene }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 w-full h-full bg-background overflow-hidden pointer-events-none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-black/60 z-10" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background/80 z-20" }),
			scene.video ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				src: scene.video,
				autoPlay: true,
				loop: true,
				muted: true,
				playsInline: true,
				className: "w-full h-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full h-full bg-cover bg-center opacity-40 scale-105",
				style: { backgroundImage: `url(${scene.poster})` }
			})
		]
	});
}
var investigationScenes = {
	welcome: {
		id: "welcome",
		label: "Welcome",
		poster: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop"
	},
	observe: {
		id: "observe",
		label: "Observe",
		poster: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop"
	},
	extract: {
		id: "extract",
		label: "Extract",
		poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop"
	},
	connect: {
		id: "connect",
		label: "Connect",
		poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop"
	}
};
var registered = false;
function useGsap() {
	if (typeof window !== "undefined" && !registered) {
		gsapWithCSS.registerPlugin(ScrollTrigger);
		registered = true;
	}
	return {
		gsap: gsapWithCSS,
		ScrollTrigger
	};
}
function HeroScene() {
	const root = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		useGsap();
		const ctx = gsapWithCSS.context((self) => {
			const media = self.selector?.(".hero-media");
			const copy = self.selector?.(".hero-copy");
			gsapWithCSS.to(media ?? [], {
				scale: 1.25,
				yPercent: 8,
				ease: "none",
				scrollTrigger: {
					trigger: root.current,
					start: "top top",
					end: "bottom top",
					scrub: true
				}
			});
			gsapWithCSS.to(copy ?? [], {
				yPercent: -35,
				opacity: 0,
				ease: "none",
				scrollTrigger: {
					trigger: root.current,
					start: "top top",
					end: "bottom top",
					scrub: true
				}
			});
			gsapWithCSS.from(self.selector?.(".hero-line") ?? [], {
				yPercent: 110,
				opacity: 0,
				duration: 1.4,
				stagger: .12,
				ease: "power3.out"
			});
		}, root);
		return () => ctx.revert();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref: root,
		className: "relative h-screen w-full overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hero-media absolute inset-0 will-change-transform",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneLayer, { scene: investigationScenes.welcome })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid-etch absolute inset-0 opacity-40" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hero-copy relative z-10 flex h-full flex-col items-center justify-center px-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "hero-line label-mono",
							children: "Digital investigation environment"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "hero-line font-mono text-xs tracking-[0.4em] text-primary uppercase",
							children: "Welcome to"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "hero-line display-xl mt-2",
							children: "Tracewell"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 max-w-xl overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "hero-line text-sm leading-relaxed text-muted-foreground sm:text-base",
							children: "We observe the open web the way an investigator observes a room — recording what a page claims, what the network returned, and every difference between them."
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "label-mono",
					children: "Scroll"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-3 h-14 w-px bg-gradient-to-b from-primary to-transparent" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute bottom-10 left-8 z-10 hidden lg:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "label-mono",
					children: "Case 0417 / open"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute bottom-10 right-8 z-10 hidden lg:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "label-mono",
					children: "Observation active"
				})
			})
		]
	});
}
var FIELDS = [
	{
		key: "title",
		label: "Title",
		value: "Luxury Apartment — Riverside"
	},
	{
		key: "price",
		label: "Price",
		value: "$950 / night"
	},
	{
		key: "image",
		label: "Image",
		value: "hero-01.jpg · 1280×960"
	},
	{
		key: "contact",
		label: "Contact",
		value: "+1 555 XXX XXXX"
	},
	{
		key: "availability",
		label: "Availability",
		value: "ONLY 2 LEFT"
	}
];
var STAGES = [
	"Observe",
	"Extract",
	"Connect"
];
function ScanScene() {
	const root = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		useGsap();
		const ctx = gsapWithCSS.context((self) => {
			const tl = gsapWithCSS.timeline({ scrollTrigger: {
				trigger: root.current,
				start: "top top",
				end: "bottom bottom",
				pin: ".scan-stage",
				pinSpacing: false,
				scrub: 1
			} });
			tl.fromTo(".scan-window", {
				scale: .86,
				opacity: .2,
				rotateX: 12
			}, {
				scale: 1,
				opacity: 1,
				rotateX: 0,
				duration: 1.2
			}).to(".scan-beam", {
				top: "100%",
				duration: 4,
				ease: "none"
			}, 1);
			FIELDS.forEach((f, i) => {
				tl.to(`.row-${f.key}`, {
					backgroundColor: "oklch(0.85 0.12 168 / 0.12)",
					duration: .2
				}, 1.35 + i * .72).fromTo(`.tag-${f.key}`, {
					opacity: 0,
					x: -14
				}, {
					opacity: 1,
					x: 0,
					duration: .3
				}, 1.45 + i * .72);
			});
			STAGES.forEach((_, i) => {
				tl.fromTo(`.stage-word-${i}`, {
					opacity: 0,
					yPercent: 60
				}, {
					opacity: 1,
					yPercent: 0,
					duration: .4
				}, 1 + i * 1.7);
				if (i < STAGES.length - 1) tl.to(`.stage-word-${i}`, {
					opacity: 0,
					yPercent: -60,
					duration: .4
				}, 2.3 + i * 1.7);
			});
		}, root);
		return () => ctx.revert();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		ref: root,
		className: "relative h-[380vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "scan-stage relative flex h-screen w-full items-center overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneLayer, {
				scene: investigationScenes.observe,
				overlay: "strong"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-6 pt-20 lg:grid-cols-[1fr_1.1fr] lg:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "label-mono",
						children: "Forensic scan · target page"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative mt-6 h-[clamp(3.5rem,6.5vw,6rem)]",
						children: STAGES.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: `stage-word-${i} display-lg absolute inset-0 leading-none ${i === 0 ? "" : "opacity-0"}`,
							children: s
						}, s))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-md text-sm leading-relaxed text-muted-foreground",
						children: "A page enters the environment. Tracewell passes over it, recording each field it can verify and the exact bytes that produced it."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 space-y-2",
						children: FIELDS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `tag-${f.key} flex items-center gap-3 opacity-0`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-primary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[11px] tracking-[0.2em] text-foreground uppercase",
									children: f.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[11px] text-primary",
									children: "✓ detected"
								})
							]
						}, f.key))
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "scan-window panel relative overflow-hidden rounded-md evidence-glow",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 border-b border-border px-4 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-muted-foreground/50" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-muted-foreground/30" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-muted-foreground/20" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-4 truncate font-mono text-[11px] text-muted-foreground",
								children: "https://listings.example.com/riverside-apartment-4471"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "scan-beam pointer-events-none absolute top-0 left-0 z-20 h-24 w-full bg-gradient-to-b from-transparent via-primary/25 to-transparent",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 h-px w-full bg-primary" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "divide-y divide-border",
							children: FIELDS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `row-${f.key} flex items-baseline justify-between gap-6 px-5 py-5`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "label-mono",
									children: f.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `text-right text-sm ${f.key === "availability" ? "font-mono text-alert" : "text-foreground"}`,
									children: f.value
								})]
							}, f.key))
						})]
					})]
				})]
			})]
		})
	});
}
var NODES = [
	{
		id: "target",
		label: "Target listing",
		x: 50,
		y: 18,
		meta: "listings.example.com/4471"
	},
	{
		id: "image",
		label: "Image",
		x: 18,
		y: 52,
		meta: "phash 3f2a…"
	},
	{
		id: "phone",
		label: "Phone",
		x: 50,
		y: 52,
		meta: "+1 555 XXX"
	},
	{
		id: "price",
		label: "Price",
		x: 82,
		y: 52,
		meta: "$950"
	},
	{
		id: "b",
		label: "Listing B",
		x: 26,
		y: 84,
		meta: "market-b.example"
	},
	{
		id: "c",
		label: "Listing C",
		x: 62,
		y: 84,
		meta: "market-c.example"
	}
];
var EDGES = [
	["target", "image"],
	["target", "phone"],
	["target", "price"],
	["image", "b"],
	["phone", "c"]
];
function CrossWebScene() {
	const root = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		useGsap();
		const ctx = gsapWithCSS.context(() => {
			const tl = gsapWithCSS.timeline({ scrollTrigger: {
				trigger: root.current,
				start: "top top",
				end: "bottom bottom",
				pin: ".web-stage",
				pinSpacing: false,
				scrub: 1
			} });
			tl.fromTo(".node-target", {
				opacity: 0,
				scale: .6
			}, {
				opacity: 1,
				scale: 1,
				duration: .6
			});
			EDGES.forEach(([a, b], i) => {
				tl.fromTo(`.edge-${a}-${b}`, { strokeDashoffset: 400 }, {
					strokeDashoffset: 0,
					duration: .7,
					ease: "power2.inOut"
				}, .8 + i * .6).fromTo(`.node-${b}`, {
					opacity: 0,
					y: 18,
					scale: .8
				}, {
					opacity: 1,
					y: 0,
					scale: 1,
					duration: .4
				}, 1.2 + i * .6);
			});
			tl.fromTo(".web-verdict", {
				opacity: 0,
				y: 24
			}, {
				opacity: 1,
				y: 0,
				duration: .6
			}, "+=0.3");
		}, root);
		return () => ctx.revert();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		ref: root,
		className: "relative h-[320vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "web-stage relative h-screen w-full overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneLayer, {
					scene: investigationScenes.connect,
					overlay: "strong"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid-etch absolute inset-0 opacity-30" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 mx-auto flex h-full max-w-7xl flex-col px-6 pt-24 pb-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-end justify-between gap-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "label-mono",
								children: "Cross-web investigation"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "display-lg mt-4",
								children: "Cross-web"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-sm text-sm leading-relaxed text-muted-foreground",
								children: "One target becomes a network. Shared images, numbers and prices surface relationships across unrelated domains — each relationship recorded as it forms."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mt-8 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								className: "absolute inset-0 h-full w-full",
								viewBox: "0 0 100 100",
								preserveAspectRatio: "none",
								children: EDGES.map(([a, b]) => {
									const na = NODES.find((n) => n.id === a);
									const nb = NODES.find((n) => n.id === b);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
										className: `edge-${a}-${b}`,
										x1: na.x,
										y1: na.y,
										x2: nb.x,
										y2: nb.y,
										stroke: "var(--evidence)",
										strokeWidth: "0.15",
										strokeDasharray: "400",
										strokeDashoffset: "400",
										opacity: "0.7",
										vectorEffect: "non-scaling-stroke"
									}, `${a}-${b}`);
								})
							}), NODES.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `node-${n.id} absolute -translate-x-1/2 -translate-y-1/2 ${n.id === "target" ? "" : "opacity-0"}`,
								style: {
									left: `${n.x}%`,
									top: `${n.y}%`
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `panel rounded-sm px-4 py-3 ${n.id === "target" ? "evidence-glow" : ""}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-mono text-[10px] tracking-[0.2em] text-primary uppercase",
										children: n.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 font-mono text-[11px] whitespace-nowrap text-muted-foreground",
										children: n.meta
									})]
								})
							}, n.id))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "web-verdict panel mt-6 flex flex-wrap items-center gap-4 rounded-sm px-5 py-4 opacity-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[11px] tracking-[0.2em] text-primary uppercase",
								children: "Relationship recorded"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted-foreground",
								children: "3 shared identifiers across 3 domains · confidence 0.91"
							})]
						})
					]
				})
			]
		})
	});
}
var evidence = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop";
function MatchScene() {
	const root = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		useGsap();
		const ctx = gsapWithCSS.context(() => {
			gsapWithCSS.timeline({ scrollTrigger: {
				trigger: root.current,
				start: "top top",
				end: "bottom bottom",
				pin: ".match-stage",
				pinSpacing: false,
				scrub: 1
			} }).fromTo(".plate-a", {
				xPercent: -55,
				opacity: 0,
				rotate: -4
			}, {
				xPercent: 0,
				opacity: 1,
				rotate: -1.5,
				duration: 1
			}).fromTo(".plate-b", {
				xPercent: 55,
				opacity: 0,
				rotate: 4
			}, {
				xPercent: 0,
				opacity: 1,
				rotate: 1.5,
				duration: 1
			}, 0).to(".plate-a", {
				xPercent: 14,
				duration: 1
			}, 1.2).to(".plate-b", {
				xPercent: -14,
				duration: 1
			}, 1.2).fromTo(".match-guide", { scaleX: 0 }, {
				scaleX: 1,
				duration: .6
			}, 1.6).fromTo(".match-verdict", {
				opacity: 0,
				scale: .94
			}, {
				opacity: 1,
				scale: 1,
				duration: .6
			}, 2.1).fromTo(".match-pct", {
				opacity: 0,
				y: 14
			}, {
				opacity: 1,
				y: 0,
				duration: .5
			}, 2.4);
		}, root);
		return () => ctx.revert();
	}, []);
	const plate = (side, source, ref, pos) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: `plate-${side} panel relative w-[42%] max-w-sm overflow-hidden rounded-sm`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
			className: "flex items-center justify-between border-b border-border px-4 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "label-mono",
				children: source
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-[10px] text-primary",
				children: ref
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-[3/2] overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: evidence,
					alt: "Evidence frame recovered from source page",
					loading: "lazy",
					width: 1280,
					height: 960,
					className: "h-full w-full object-cover",
					style: {
						objectPosition: pos,
						filter: "saturate(0.3) contrast(1.1) brightness(0.62)"
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 border border-primary/30" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-4 left-4 h-5 w-5 border-t border-l border-primary" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute right-4 bottom-4 h-5 w-5 border-r border-b border-primary" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "scanlines absolute inset-0" })
			]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		ref: root,
		className: "relative h-[300vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "match-stage relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-background py-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid-etch absolute inset-0 opacity-25" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute top-20 left-1/2 -translate-x-1/2 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "label-mono",
						children: "Image comparison · perceptual hash"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 flex w-full max-w-6xl items-center justify-center gap-6 px-6",
					children: [
						plate("a", "listings.example.com", "IMG-4471-01", "20% 50%"),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "match-guide h-px w-16 origin-center bg-primary" }),
						plate("b", "market-c.example", "IMG-9902-04", "80% 50%")
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 mt-10 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "match-verdict display-lg opacity-0",
						children: "Image match detected"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "match-pct mt-4 font-mono text-sm tracking-[0.3em] text-primary uppercase opacity-0",
						children: "97% similar · same source frame"
					})]
				})
			]
		})
	});
}
var REQUESTS = [
	{
		m: "GET",
		url: "/api/product/4471",
		s: "200 OK",
		t: "184ms"
	},
	{
		m: "GET",
		url: "/api/inventory?sku=4471",
		s: "200 OK",
		t: "96ms"
	},
	{
		m: "GET",
		url: "/api/availability",
		s: "200 OK",
		t: "142ms"
	},
	{
		m: "GET",
		url: "/cdn/img/hero-01.jpg",
		s: "200 OK",
		t: "311ms"
	},
	{
		m: "POST",
		url: "/api/track/view",
		s: "204",
		t: "58ms"
	}
];
function NetworkScene() {
	const root = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		useGsap();
		const ctx = gsapWithCSS.context(() => {
			const tl = gsapWithCSS.timeline({ scrollTrigger: {
				trigger: root.current,
				start: "top top",
				end: "bottom bottom",
				pin: ".net-stage",
				pinSpacing: false,
				scrub: 1
			} });
			tl.fromTo(".net-page", {
				opacity: 0,
				x: -40
			}, {
				opacity: 1,
				x: 0,
				duration: .8
			});
			REQUESTS.forEach((_, i) => {
				tl.fromTo(`.req-${i}`, {
					opacity: 0,
					x: 30
				}, {
					opacity: 1,
					x: 0,
					duration: .3
				}, .6 + i * .4);
			});
			tl.fromTo(".net-payload", {
				opacity: 0,
				y: 20
			}, {
				opacity: 1,
				y: 0,
				duration: .5
			}, 2.7).fromTo(".net-link", { scaleX: 0 }, {
				scaleX: 1,
				duration: .6
			}, 3.1);
		}, root);
		return () => ctx.revert();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		ref: root,
		className: "relative h-[300vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "net-stage relative flex h-screen w-full items-center overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneLayer, {
				scene: investigationScenes.extract,
				overlay: "strong"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 mx-auto w-full max-w-7xl px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-end justify-between gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "label-mono",
						children: "Network observation"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "display-lg mt-4",
						children: "Beneath the page"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-sm text-sm leading-relaxed text-muted-foreground",
						children: "We record the traffic the page depends on. Everything rendered has a source, and every source is retained with its response."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12 grid items-center gap-6 lg:grid-cols-[1fr_auto_1.2fr]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "net-page panel overflow-hidden rounded-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "border-b border-border px-4 py-2 font-mono text-[11px] text-muted-foreground",
								children: "rendered page"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4 px-5 py-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-2/3 rounded-sm bg-foreground/25" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-1/2 rounded-sm bg-foreground/15" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-6 font-mono text-lg text-alert",
										children: "ONLY 2 LEFT"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm text-muted-foreground",
										children: "Luxury Apartment — $950 / night"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-24 w-full rounded-sm bg-foreground/8" })
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "net-link mx-auto hidden h-px w-24 origin-left bg-primary lg:block" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "panel overflow-hidden rounded-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "border-b border-border px-4 py-2 font-mono text-[11px] text-muted-foreground",
									children: "network log"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "divide-y divide-border",
									children: REQUESTS.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `req-${i} flex items-center gap-4 px-4 py-3 font-mono text-[11px] opacity-0`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "w-10 text-primary",
												children: r.m
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "flex-1 truncate text-foreground/80",
												children: r.url
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: r.s
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "w-14 text-right text-muted-foreground/70",
												children: r.t
											})
										]
									}, r.url))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "net-payload border-t border-border bg-primary/8 px-4 py-4 font-mono text-[12px] opacity-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "response · /api/inventory → "
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-primary",
										children: `{ "stock": 47 }`
									})]
								})
							]
						})
					]
				})]
			})]
		})
	});
}
var DAYS = [
	{
		day: "Day 1",
		state: "ok",
		note: "stock 47 · price $950"
	},
	{
		day: "Day 2",
		state: "ok",
		note: "stock 47 · price $950"
	},
	{
		day: "Day 3",
		state: "fail",
		note: "capture failed · timeout at 12.4s"
	},
	{
		day: "Day 4",
		state: "ok",
		note: "stock 12 · price $1,180"
	},
	{
		day: "Day 5",
		state: "ok",
		note: "stock 12 · price $1,180"
	}
];
var STATUS = [
	"Failed",
	"Repair",
	"Unverified",
	"Confirmed"
];
function TimelineScene() {
	const root = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		useGsap();
		const ctx = gsapWithCSS.context(() => {
			const tl = gsapWithCSS.timeline({ scrollTrigger: {
				trigger: root.current,
				start: "top top",
				end: "bottom bottom",
				pin: ".time-stage",
				pinSpacing: false,
				scrub: 1
			} });
			tl.fromTo(".time-rail", { scaleY: 0 }, {
				scaleY: 1,
				duration: 1.6,
				ease: "none"
			}, 0);
			DAYS.forEach((_, i) => {
				tl.fromTo(`.day-${i}`, {
					opacity: 0,
					x: -20
				}, {
					opacity: 1,
					x: 0,
					duration: .4
				}, .2 + i * .34);
			});
			tl.to(".day-2 .dot", {
				scale: 1.35,
				duration: .3
			}, 1.3);
			STATUS.forEach((_, i) => {
				tl.fromTo(`.status-${i}`, {
					opacity: 0,
					y: 20
				}, {
					opacity: 1,
					y: 0,
					duration: .35
				}, 2.1 + i * .5);
			});
		}, root);
		return () => ctx.revert();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		ref: root,
		className: "relative h-[340vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "time-stage relative flex h-screen w-full items-center overflow-hidden bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid-etch absolute inset-0 opacity-25" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 mx-auto grid w-full max-w-6xl gap-14 px-6 pt-20 lg:grid-cols-2 lg:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "label-mono",
						children: "Temporal observation"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "display-lg mt-4",
						children: "A failure is evidence too"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-md text-sm leading-relaxed text-muted-foreground",
						children: "Tracewell never repairs history quietly. A failed observation stays in the record, marked, until a later capture confirms or contradicts it."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 flex flex-wrap gap-3",
						children: STATUS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `status-${i} panel rounded-sm px-4 py-2 font-mono text-[11px] tracking-[0.2em] uppercase opacity-0 ${i === 0 ? "text-alert" : i === 3 ? "text-primary" : "text-muted-foreground"}`,
							children: s
						}, s))
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative pl-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "time-rail absolute top-2 bottom-2 left-[3px] w-px origin-top bg-gradient-to-b from-primary/70 via-border to-transparent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-8",
						children: DAYS.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: `day-${i} relative opacity-0`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `dot absolute top-1.5 -left-8 h-2 w-2 -translate-x-[3px] rounded-full ${d.state === "fail" ? "bg-alert" : "bg-primary"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-baseline gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs tracking-[0.25em] text-foreground uppercase",
									children: d.day
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `font-mono text-[11px] ${d.state === "fail" ? "text-alert" : "text-muted-foreground"}`,
									children: [d.state === "fail" ? "× " : "● ", d.note]
								})]
							})]
						}, d.day))
					})]
				})]
			})]
		})
	});
}
function ContradictionScene() {
	const root = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		useGsap();
		const ctx = gsapWithCSS.context(() => {
			gsapWithCSS.timeline({ scrollTrigger: {
				trigger: root.current,
				start: "top top",
				end: "bottom bottom",
				pin: ".split-stage",
				pinSpacing: false,
				scrub: 1
			} }).fromTo(".split-word", {
				opacity: 0,
				scale: 1.2
			}, {
				opacity: 1,
				scale: 1,
				duration: .8
			}).to(".split-word", {
				opacity: 0,
				duration: .5
			}, 1.4).fromTo(".panel-left", {
				xPercent: 50,
				opacity: 0
			}, {
				xPercent: 0,
				opacity: 1,
				duration: 1.4,
				ease: "power3.inOut"
			}, 1.6).fromTo(".panel-right", {
				xPercent: -50,
				opacity: 0
			}, {
				xPercent: 0,
				opacity: 1,
				duration: 1.4,
				ease: "power3.inOut"
			}, 1.6).fromTo(".split-seam", { scaleY: 0 }, {
				scaleY: 1,
				duration: .8
			}, 2.6).fromTo(".claim-value", {
				opacity: 0,
				y: 18
			}, {
				opacity: 1,
				y: 0,
				duration: .6,
				stagger: .4
			}, 3.1).fromTo(".verdict", {
				opacity: 0,
				letterSpacing: "0.6em"
			}, {
				opacity: 1,
				letterSpacing: "0.24em",
				duration: 1.2
			}, 4.4).fromTo(".verdict-meta", { opacity: 0 }, {
				opacity: 1,
				duration: .8
			}, 5.2);
		}, root);
		return () => ctx.revert();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		ref: root,
		className: "relative h-[420vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "split-stage relative flex h-screen w-full items-center justify-center overflow-hidden bg-background",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid-etch absolute inset-0 opacity-20" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "split-word display-xl absolute z-20",
					children: "Website"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 grid h-full w-full grid-cols-1 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel-left flex flex-col justify-center gap-8 px-8 py-24 md:px-16",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "label-mono",
								children: "What the user sees"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "claim-value font-mono text-3xl text-alert opacity-0 sm:text-5xl",
								children: "ONLY 2 LEFT"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-xs text-sm leading-relaxed text-muted-foreground",
								children: "Rendered DOM · captured 14:02:11 UTC · listings.example.com/4471"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel-right flex flex-col justify-center gap-8 border-t border-border px-8 py-24 md:border-t-0 md:px-16",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "label-mono",
								children: "What the browser received"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "claim-value font-mono text-3xl text-primary opacity-0 sm:text-5xl",
								children: "stock: 47"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-xs text-sm leading-relaxed text-muted-foreground",
								children: "GET /api/inventory?sku=4471 · 200 OK · retained response body"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "split-seam absolute top-0 bottom-0 left-1/2 hidden w-px origin-center bg-border md:block" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute bottom-16 left-1/2 z-20 w-full -translate-x-1/2 px-6 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "verdict font-mono text-sm text-primary uppercase opacity-0 sm:text-base",
						children: "Observed contradiction"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "verdict-meta mt-4 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase opacity-0",
						children: "Recorded · reproducible · attributable"
					})]
				})
			]
		})
	});
}
function Index() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroScene, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanScene, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NetworkScene, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrossWebScene, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchScene, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineScene, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContradictionScene, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClosingSection, {})
		]
	});
}
//#endregion
export { Index as component };
