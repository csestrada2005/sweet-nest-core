import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import heroBird from "@/assets/hero-bird-editorial.png";

/* ─────────────────────────────────────────
   HeroPapacho — Elena Borisova clone
   ─ large spaced title, letter-by-letter stagger
   ─ bird illustration with delayed fade-in
   ─ dual CTA, scroll hint
   ───────────────────────────────────────── */

/** Split text into word groups keeping spaces as real entries */
function splitWords(text: string) {
  return text.split(" ").filter(Boolean);
}

const TITLE_WORDS = splitWords("APAPACHO PARA DORMIR");

/* Timings */
const BIRD_DELAY      = 80;   // ms — illustration appears early
const EYEBROW_DELAY   = 200;  // ms — small label
const WORD_BASE       = 340;  // ms — first word starts
const WORD_STAGGER    = 90;   // ms between words
const LAST_WORD_END   = WORD_BASE + TITLE_WORDS.length * WORD_STAGGER + 400;
const SUBTITLE_DELAY  = LAST_WORD_END;
const CTA_DELAY       = SUBTITLE_DELAY + 160;
const HINT_DELAY      = CTA_DELAY + 300;

/* ── Letter stagger within each word ── */
const LetterWord = ({
  word,
  wordDelay,
  ready,
}: {
  word: string;
  wordDelay: number;
  ready: boolean;
}) => (
  <span className="inline-flex" aria-hidden="true">
    {word.split("").map((char, ci) => {
      const delay = wordDelay + ci * 38;
      return (
        <span
          key={ci}
          style={{
            display: "inline-block",
            opacity: ready ? 1 : 0,
            transform: ready ? "translateY(0)" : "translateY(10px)",
            transition: ready
              ? `opacity 420ms cubic-bezier(.22,1,.36,1) ${delay}ms,
                 transform 420ms cubic-bezier(.22,1,.36,1) ${delay}ms`
              : "none",
          }}
        >
          {char}
        </span>
      );
    })}
  </span>
);

const HeroPapacho = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() =>
      setTimeout(() => setReady(true), 40)
    );
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#fff" }}
      aria-label="Hero Papachoa"
    >
      {/* ── Bird illustration ── */}
      <div
        className="pointer-events-none select-none"
        style={{
          opacity: ready ? 1 : 0,
          transform: ready ? "translateY(0) scale(1)" : "translateY(12px) scale(0.96)",
          transition: ready
            ? `opacity 1000ms cubic-bezier(.22,1,.36,1) ${BIRD_DELAY}ms,
               transform 1000ms cubic-bezier(.22,1,.36,1) ${BIRD_DELAY}ms`
            : "none",
          marginBottom: "clamp(0.5rem, 2vw, 1.5rem)",
        }}
      >
        <img
          src={heroBird}
          alt="Pájaro Papachoa en su nido"
          draggable={false}
          style={{
            width: "clamp(160px, 28vw, 380px)",
            height: "auto",
            display: "block",
          }}
          loading="eager"
          decoding="async"
        />
      </div>

      {/* ── Text block ── */}
      <div
        className="flex flex-col items-center text-center"
        style={{
          padding: "0 clamp(1.25rem, 5vw, 4rem)",
          maxWidth: "1100px",
          width: "100%",
        }}
      >
        {/* Eyebrow — small italic label */}
        <p
          className="font-display text-primary/80"
          style={{
            fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)",
            letterSpacing: "0.01em",
            marginBottom: "clamp(0.6rem, 1.5vw, 1rem)",
            opacity: ready ? 1 : 0,
            transform: ready ? "translateY(0)" : "translateY(8px)",
            transition: ready
              ? `opacity 600ms ease ${EYEBROW_DELAY}ms, transform 600ms ease ${EYEBROW_DELAY}ms`
              : "none",
          }}
        >
          Pijamas que abrazan
        </p>

        {/* Main title — APAPACHO PARA DORMIR — letter-by-letter */}
        <h1
          className="font-bold text-foreground leading-none"
          style={{
            fontSize: "clamp(2.6rem, 9.5vw, 9rem)",
            letterSpacing: "clamp(0.12em, 1.8vw, 0.28em)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0 clamp(0.25em, 2vw, 0.6em)",
            lineHeight: 1.05,
            marginBottom: "clamp(1.25rem, 3vw, 2.25rem)",
          }}
          aria-label="Apapacho para dormir"
        >
          {TITLE_WORDS.map((word, wi) => {
            const wordDelay = WORD_BASE + wi * WORD_STAGGER;
            return (
              <LetterWord
                key={wi}
                word={word}
                wordDelay={wordDelay}
                ready={ready}
              />
            );
          })}
        </h1>

        {/* Subtitle */}
        <p
          className="font-light text-muted-foreground leading-relaxed"
          style={{
            fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)",
            maxWidth: "480px",
            letterSpacing: "0.025em",
            marginBottom: "clamp(1.75rem, 4vw, 3rem)",
            opacity: ready ? 1 : 0,
            transform: ready ? "translateY(0)" : "translateY(10px)",
            transition: ready
              ? `opacity 700ms ease ${SUBTITLE_DELAY}ms, transform 700ms ease ${SUBTITLE_DELAY}ms`
              : "none",
          }}
        >
          Suaves, cálidos y con magia de hogar.
          <br />
          Hechos en México con amor.
        </p>

        {/* CTAs — minimal, Elena style */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
          style={{
            opacity: ready ? 1 : 0,
            transform: ready ? "translateY(0)" : "translateY(8px)",
            transition: ready
              ? `opacity 600ms ease ${CTA_DELAY}ms, transform 600ms ease ${CTA_DELAY}ms`
              : "none",
          }}
        >
          {/* Primary */}
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 font-medium transition-all duration-200 border-b-2 border-foreground pb-0.5 hover:gap-3"
            style={{
              fontSize: "clamp(0.85rem, 1.3vw, 1rem)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "hsl(var(--foreground))",
              borderColor: "hsl(var(--foreground))",
            }}
          >
            Ver catálogo
            <span aria-hidden="true" style={{ fontSize: "1.1em" }}>→</span>
          </Link>

          {/* Separator */}
          <span className="text-muted-foreground/30 hidden md:inline" aria-hidden="true">
            ·
          </span>

          {/* Secondary */}
          <Link
            to="/#filosofia"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("filosofia")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 font-light transition-all duration-200 text-muted-foreground hover:text-foreground"
            style={{
              fontSize: "clamp(0.85rem, 1.3vw, 1rem)",
              letterSpacing: "0.05em",
            }}
          >
            Conocer filosofía
          </Link>
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
        style={{
          opacity: ready ? 0.3 : 0,
          transition: ready ? `opacity 800ms ease ${HINT_DELAY}ms` : "none",
        }}
      >
        <span
          className="text-muted-foreground font-light"
          style={{ fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase" }}
        >
          scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "40px",
            background: "hsl(var(--muted-foreground))",
            animation: "scroll-hint-pulse 2.2s ease-in-out infinite",
            transformOrigin: "top",
          }}
        />
      </div>

      <style>{`
        @keyframes scroll-hint-pulse {
          0%, 100% { transform: scaleY(1);   opacity: 0.4; }
          55%       { transform: scaleY(0.3); opacity: 0.08; }
        }
      `}</style>
    </section>
  );
};

export default HeroPapacho;
