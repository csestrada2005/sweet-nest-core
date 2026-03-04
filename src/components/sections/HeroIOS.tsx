import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-mama-hija.png";
import papachoaLogo from "@/assets/brand/papachoa-logo-nuevo.png";
import birdYellow from "@/assets/brand/pajaro-amarillo-sf.png";
import birdBlue from "@/assets/brand/pajaro-azul-claro-sf.png";
import birdOrange from "@/assets/brand/pajaro-naranja-sf.png";

/**
 * HeroIOS — iOS-specific hero component.
 *
 * Key differences from HeroPapacho (desktop):
 *  - Height: 100svh (single screen, no scroll-pinning extension)
 *  - Animation: pure CSS keyframes, zero JS scroll listeners, zero RAF loops
 *  - Image: fixed size from frame 0 to prevent layout-shift jump
 *  - No translateY(-100vh) overlap trick needed — normal document flow
 *  - No will-change or JS-driven per-frame transforms on the main thread
 */

const TEXT = "Pensado por mamás para mamás";
const LETTER_COLORS = ["#416ba9"];

// Pre-compute scatter values so we don't recalculate on render
const SCATTER_MAP: Record<number, { tx: number; ty: number; rot: number }> = {
    0:  { tx: 38,  ty: 54,  rot: 35  },
    1:  { tx: 18,  ty: 81,  rot: -25 },
    2:  { tx: 45,  ty: 36,  rot: 40  },
    3:  { tx: -45, ty: 63,  rot: -30 },
    4:  { tx: -32, ty: 90,  rot: 20  },
    5:  { tx: 27,  ty: 72,  rot: -35 },
    6:  { tx: -72, ty: 45,  rot: 30  },
    7:  { tx: 23,  ty: 99,  rot: -20 },
    8:  { tx: -63, ty: 63,  rot: 25  },
    9:  { tx: -54, ty: 81,  rot: -40 },
    10: { tx: 41,  ty: 45,  rot: 30  },
    11: { tx: -81, ty: 72,  rot: -35 },
    12: { tx: 14,  ty: 90,  rot: 25  },
    13: { tx: -59, ty: 54,  rot: -30 },
    14: { tx: 32,  ty: 99,  rot: 40  },
    15: { tx: -68, ty: 36,  rot: -25 },
    16: { tx: 0,   ty: 81,  rot: 35  },
    17: { tx: 50,  ty: 63,  rot: -30 },
    18: { tx: -41, ty: 90,  rot: 25  },
    19: { tx: 27,  ty: 45,  rot: -35 },
    20: { tx: -50, ty: 72,  rot: 40  },
    21: { tx: 36,  ty: 99,  rot: -20 },
    22: { tx: -63, ty: 54,  rot: 30  },
    23: { tx: 14,  ty: 81,  rot: -25 },
    24: { tx: -27, ty: 63,  rot: 35  },
    25: { tx: 54,  ty: 90,  rot: -40 },
    26: { tx: -36, ty: 45,  rot: 30  },
};

interface LetterData {
    char: string;
    tx: number;
    ty: number;
    rot: number;
    color: string;
    delay: number;
}

// Build letter array once (not inside render)
const buildLetters = (): LetterData[] => {
    const letters: LetterData[] = [];
    let globalIdx = 0;
    TEXT.split(" ").forEach((word) => {
          word.split("").forEach((char) => {
                  const i = globalIdx++;
                  const scatter = SCATTER_MAP[i] ?? { tx: 0, ty: 67, rot: 20 };
                  letters.push({
                            char,
                            tx: scatter.tx,
                            ty: scatter.ty,
                            rot: scatter.rot,
                            color: LETTER_COLORS[i % LETTER_COLORS.length],
                            // Stagger: each letter slightly after the previous, starting after 300ms
                            delay: 300 + i * 38,
                  });
          });
          globalIdx++; // account for the space character
    });
    return letters;
};

const ALL_LETTERS = buildLetters();

// Bird data — shown on all screen sizes on iOS (small, subtle)
const BIRDS = [
  { src: birdYellow, alt: "Pajarito amarillo", style: { top: "8%",    left: "4%",   width: 72  }, delay: 0    },
  { src: birdBlue,   alt: "Pajarito azul",     style: { top: "16%",   right: "4%",  width: 80  }, delay: 800  },
  { src: birdOrange, alt: "Pajarito naranja",  style: { bottom: "18%",left: "6%",   width: 64  }, delay: 1600 },
  ];

const HeroIOS = () => {
    const navigate = useNavigate();
    const [imageLoaded, setImageLoaded] = useState(false);
    const animationStarted = useRef(false);

    // Kick off CSS animation class after image loads (or after 800ms fallback)
    useEffect(() => {
          if (animationStarted.current) return;
          const start = () => {
                  if (animationStarted.current) return;
                  animationStarted.current = true;
          };
          if (imageLoaded) {
                  start();
          } else {
                  const fallback = setTimeout(start, 800);
                  return () => clearTimeout(fallback);
          }
    }, [imageLoaded]);

    return (
          <section
                  style={{
                            // 100svh respects the iOS browser chrome (address bar) correctly.
                            // Falls back to 100vh for older iOS.
                            height: "100svh",
                            minHeight: "100svh",
                            position: "relative",
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "hsl(15 20% 96%)",
                            // Prevent iOS rubber-band bounce from showing background behind section
                            overscrollBehavior: "none",
                  }}
                >
            {/* Subtle noise texture — same as desktop */}
                <div
                          className="absolute inset-0 pointer-events-none opacity-[0.025]"
                          style={{
                                      backgroundImage:
                                                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                                      backgroundSize: "150px",
                                      zIndex: 0,
                          }}
                          aria-hidden="true"
                        />
          
            {/* Hero image — fixed size to prevent layout-shift on load */}
                <div
                          className="absolute z-10"
                          style={{
                                      bottom: 0,
                                      left: "50%",
                                      transform: "translateX(-50%)",
                          }}
                        >
                        <img
                                    id="hero-main-image"
                                    src={heroImage}
                                    alt="Familia feliz con pijamas Papachoa hechos en México"
                                    loading="eager"
                                    // @ts-expect-error fetchpriority is valid HTML but not yet in React types
                                    fetchpriority="high"
                                    draggable={false}
                                    onLoad={() => setImageLoaded(true)}
                                    onError={() => setImageLoaded(true)}
                                    width={420}
                                    height={473}
                                    style={{
                                                  // Fixed intrinsic size prevents the "small + right" jump on iOS.
                                                  // Uses min() so it adapts to narrow phones without overflow.
                                                  width: "min(72vw, 380px)",
                                                  height: "auto",
                                                  display: "block",
                                                  objectFit: "contain",
                                                  objectPosition: "bottom center",
                                                  filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.12))",
                                                  userSelect: "none",
                                                  // Fade-in when loaded — pure CSS, no JS
                                                  opacity: imageLoaded ? 1 : 0,
                                                  transition: "opacity 0.4s ease-out",
                                    }}
                                  />
                </div>div>
          
            {/* Scattered → assembled text — CSS @keyframes, no JS on scroll */}
                <div
                          className="absolute z-20 inset-0 flex flex-col items-center"
                          style={{ paddingTop: "clamp(72px, 18vw, 110px)" }}
                          aria-hidden="false"
                        >
                        <h1
                                    className="relative font-bold tracking-tight leading-none select-none text-center px-4"
                                    style={{
                                                  fontSize: "clamp(1.85rem, 8.5vw, 3.2rem)",
                                                  minHeight: "1em",
                                    }}
                                    aria-label={TEXT}
                                  >
                          {/* Render letter by letter with CSS animation */}
                          {TEXT.split(" ").map((word, wi) => {
                                                // Calculate global letter index up to this word
                                                let globalStart = 0;
                                                for (let w = 0; w < wi; w++) {
                                                                globalStart += TEXT.split(" ")[w].length + 1;
                                                }
                                                return (
                                                                <span key={wi} className="inline-block">
                                                                                <span className="inline-block whitespace-nowrap">
                                                                                  {word.split("").map((char, li) => {
                                                                                      const globalIdx = globalStart + li;
                                                                                      const l = ALL_LETTERS[globalIdx];
                                                                                      if (!l) return null;
                                                                                      return (
                                                                                                              <span
                                                                                                                                        key={li}
                                                                                                                                        aria-hidden="true"
                                                                                                                                        style={{
                                                                                                                                                                    display: "inline-block",
                                                                                                                                                                    color: l.color,
                                                                                                                                                                    // CSS custom properties drive the keyframe start position.
                                                                                                                                                                    // The animation itself is pure CSS — zero JS per frame.
                                                                                                                                                                    "--ios-lx": `${l.tx}px`,
                                                                                                                                                                    "--ios-ly": `${l.ty}px`,
                                                                                                                                                                    "--ios-lr": `${l.rot}deg`,
                                                                                                                                                                    animation: imageLoaded
                                                                                                                                                                                                  ? `ios-letter-assemble 1.1s cubic-bezier(0.22, 1, 0.36, 1) ${l.delay}ms both`
                                                                                                                                                                                                  : "none",
                                                                                                                                                                    // Before animation fires, keep letter at scatter position
                                                                                                                                                                    // so there's no flash of assembled text
                                                                                                                                                                    opacity: imageLoaded ? undefined : 0,
                                                                                                                                          } as React.CSSProperties}
                                                                                                                                      >
                                                                                                                {char}
                                                                                                                </span>span>
                                                                                                            );
                                                                })}
                                                                                </span>span>
                                                                  {wi < TEXT.split(" ").length - 1 && (
                                                                                    <span className="inline-block w-[0.25em]">&nbsp;</span>span>
                                                                                )}
                                                                </span>span>
                                                              );
                                  })}
                        </h1>h1>
                
                  {/* Logo — fades in after text assembles */}
                        <div
                                    style={{
                                                  marginTop: "clamp(1rem, 4vw, 1.8rem)",
                                                  animation: imageLoaded
                                                                  ? "ios-fade-up 0.7s ease-out 1400ms both"
                                                                  : "none",
                                                  opacity: imageLoaded ? undefined : 0,
                                    }}
                                  >
                                  <img
                                                src={papachoaLogo}
                                                alt="Papachoa"
                                                className="select-none"
                                                draggable={false}
                                                style={{ width: "clamp(140px, 38vw, 200px)" }}
                                              />
                        </div>div>
                
                  {/* Tagline */}
                        <p
                                    className="font-display font-bold text-center select-none"
                                    style={{
                                                  color: "#000000",
                                                  fontSize: "clamp(1rem, 4.5vw, 1.4rem)",
                                                  marginTop: "clamp(0.5rem, 2vw, 0.8rem)",
                                                  animation: imageLoaded
                                                                  ? "ios-fade-up 0.7s ease-out 1700ms both"
                                                                  : "none",
                                                  opacity: imageLoaded ? undefined : 0,
                                    }}
                                  >
                                  pijamas que abrazan
                        </p>p>
                
                  {/* CTA button */}
                        <button
                                    onClick={() => navigate("/catalogo")}
                                    className="rounded-full font-semibold tracking-wide shadow-lg"
                                    style={{
                                                  marginTop: "clamp(1rem, 3.5vw, 1.5rem)",
                                                  padding: "clamp(0.75rem, 2.5vw, 1rem) clamp(1.5rem, 6vw, 2.5rem)",
                                                  fontSize: "clamp(0.9rem, 3.5vw, 1rem)",
                                                  backgroundColor: "#ac3c72",
                                                  color: "#ffffff",
                                                  animation: imageLoaded
                                                                  ? "ios-fade-up 0.7s ease-out 1950ms both"
                                                                  : "none",
                                                  opacity: imageLoaded ? undefined : 0,
                                                  // iOS tap highlight
                                                  WebkitTapHighlightColor: "transparent",
                                    }}
                                  >
                                  Ver catálogo
                        </button>button>
                </div>div>
          
            {/* Floating birds — visible on iOS too, small and subtle */}
            {BIRDS.map((bird, i) => (
                          <img
                                      key={i}
                                      src={bird.src}
                                      alt={bird.alt}
                                      aria-hidden="true"
                                      draggable={false}
                                      className="absolute pointer-events-none select-none z-30"
                                      style={{
                                                    ...bird.style,
                                                    // Only animate birds after image loads to avoid compositor pressure at startup
                                                    animation: imageLoaded
                                                                    ? `floatBird 3.5s ease-in-out infinite ${bird.delay}ms`
                                                                    : "none",
                                                    opacity: imageLoaded ? 1 : 0,
                                                    transition: "opacity 0.4s ease-out",
                                                    mixBlendMode: "multiply",
                                                    background: "transparent",
                                      }}
                                    />
                        ))}
          
            {/* Inline keyframes — scoped to this component, no global pollution */}
                <style>{`
                        @keyframes ios-letter-assemble {
                                  from {
                                              opacity: 0;
                                                          transform: translate(var(--ios-lx), var(--ios-ly)) rotate(var(--ios-lr));
                                                                    }
                                                                              40% {
                                                                                          opacity: 1;
                                                                                                    }
                                                                                                              to {
                                                                                                                          opacity: 1;
                                                                                                                                      transform: translate(0px, 0px) rotate(0deg);
                                                                                                                                                }
                                                                                                                                                        }
                                                                                                                                                        
                                                                                                                                                                @keyframes ios-fade-up {
                                                                                                                                                                          from {
                                                                                                                                                                                      opacity: 0;
                                                                                                                                                                                                  transform: translateY(14px);
                                                                                                                                                                                                            }
                                                                                                                                                                                                                      to {
                                                                                                                                                                                                                                  opacity: 1;
                                                                                                                                                                                                                                              transform: translateY(0px);
                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                      `}</style>style>
          </section>section>
        );
};

export default HeroIOS;</section>
