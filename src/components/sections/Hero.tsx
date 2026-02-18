import { Link } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import printPapachoa from "@/assets/brand/print-papachoa.png";

import letterP1 from "@/assets/letters/P1.png";
import letterA1 from "@/assets/letters/A1.png";
import letterP2 from "@/assets/letters/P2.png";
import letterA2 from "@/assets/letters/A2.png";
import letterC from "@/assets/letters/C.png";
import letterH from "@/assets/letters/H.png";
import letterO from "@/assets/letters/O.png";
import letterA3 from "@/assets/letters/A3.png";

const LETTERS = [
  { src: letterP1, alt: "Letra P", scatterX: -90, scatterY: -50, scatterRot: -14 },
  { src: letterA1, alt: "Letra A", scatterX: 60, scatterY: 40, scatterRot: 10 },
  { src: letterP2, alt: "Letra P", scatterX: -70, scatterY: 45, scatterRot: -8 },
  { src: letterA2, alt: "Letra A", scatterX: 80, scatterY: -55, scatterRot: 16 },
  { src: letterC, alt: "Letra C", scatterX: -55, scatterY: 55, scatterRot: -12 },
  { src: letterH, alt: "Letra H", scatterX: 65, scatterY: -40, scatterRot: 9 },
  { src: letterO, alt: "Letra O", scatterX: -60, scatterY: -45, scatterRot: -18 },
  { src: letterA3, alt: "Letra A", scatterX: 75, scatterY: 50, scatterRot: 13 },
];

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  const onScroll = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const scrollable = el.offsetHeight - window.innerHeight;
    if (scrollable <= 0) return;
    const raw = -rect.top / scrollable;
    setProgress(Math.max(0, Math.min(1, raw)));
    setVisible(rect.bottom > 0 && rect.top < window.innerHeight);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const ease = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const t = ease(Math.min(progress / 0.4, 1));
  const subP = Math.max(0, Math.min(1, (progress - 0.5) / 0.2));
  const ctaP = Math.max(0, Math.min(1, (progress - 0.6) / 0.15));

  return (
    <div ref={sectionRef} style={{ height: "240vh", position: "relative" }}>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "hsl(15 20% 96%)",
          pointerEvents: "none",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url(${printPapachoa})`,
            backgroundSize: "400px",
            backgroundRepeat: "repeat",
          }}
        />

        <div
          className="relative flex items-center justify-center"
          style={{
            width: "min(88vw, 900px)",
            height: "clamp(70px, 14vw, 160px)",
            padding: "0 6vw",
          }}
        >
          {LETTERS.map((letter, i) => {
            const offsetX = letter.scatterX * (1 - t);
            const offsetY = letter.scatterY * (1 - t);
            const rot = letter.scatterRot * (1 - t);
            return (
              <img
                key={i}
                src={letter.src}
                alt={letter.alt}
                draggable={false}
                className="select-none pointer-events-none"
                style={{
                  height: "100%",
                  width: "auto",
                  objectFit: "contain",
                  display: "block",
                  background: "transparent",
                  mixBlendMode: "multiply",
                  transform: `translate(${offsetX}px, ${offsetY}px) rotate(${rot}deg)`,
                  willChange: "transform",
                  marginLeft: i === 0 ? 0 : "clamp(-14px, -1.8vw, -6px)",
                }}
                loading="eager"
              />
            );
          })}
        </div>

        <p
          className="text-lg md:text-xl text-muted-foreground font-light mt-8 mb-10 max-w-md mx-auto text-center leading-relaxed"
          style={{
            opacity: subP,
            transform: `translateY(${(1 - subP) * 20}px)`,
          }}
        >
          Suaves, cálidos y con magia de hogar.
          <br />
          Hechos en México con amor.
        </p>

        <div
          style={{
            opacity: ctaP,
            transform: `translateY(${(1 - ctaP) * 20}px)`,
            pointerEvents: ctaP > 0.5 ? "auto" : "none",
          }}
        >
          <Link to="/catalogo" className="btn-artisan inline-flex text-base px-10 py-4">
            Ver colección
            <span className="text-xl">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
