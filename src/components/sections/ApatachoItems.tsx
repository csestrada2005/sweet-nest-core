import { useRef, useEffect, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import pajaroNaranja from "@/assets/brand/pajaro-naranja.png";
import SectionReveal from "@/components/ui/SectionReveal";

/* ─────────────────────────────────────────
   #apapacho — Carrusel horizontal infinito
   Cards de ancho FIJO (no reflow), auto-scroll suave,
   pausa al hover/touch y reanuda 2s después.
   ───────────────────────────────────────── */

const items = [
  {
    label: "Calma",
    description: "Para que tu bebé duerma tranquilo toda la noche. Telas que respiran y abrazan sin apretar.",
    href: "/catalogo?categoria=mama-bebe",
    icon: "🌙",
    num: "01",
    bg: "hsl(var(--papachoa-blue) / 0.06)",
    accent: "hsl(var(--papachoa-blue))",
  },
  {
    label: "Ternura",
    description: "El primer regalo que importa. Suavidad diseñada para piel recién nacida.",
    href: "/catalogo?categoria=mama-bebe",
    icon: "🤱",
    num: "02",
    bg: "hsl(var(--papachoa-coral) / 0.07)",
    accent: "hsl(var(--papachoa-coral))",
  },
  {
    label: "Conexión",
    description: "Vestirse iguales en familia. Esos momentos que el corazón archiva para siempre.",
    href: "/catalogo?categoria=mama-hija",
    icon: "👨‍👩‍👧",
    num: "03",
    bg: "hsl(var(--papachoa-magenta) / 0.07)",
    accent: "hsl(var(--papachoa-magenta))",
  },
  {
    label: "Regalar amor",
    description: "El regalo que emociona de verdad. Un Papachoa dice más que cualquier tarjeta.",
    href: "/catalogo",
    icon: "🎁",
    num: "04",
    bg: "hsl(var(--papachoa-yellow) / 0.12)",
    accent: "hsl(var(--papachoa-yellow))",
  },
];

// Triple para bucle infinito
const INFINITE_ITEMS = [...items, ...items, ...items];
const CARD_COUNT = items.length;
const CARD_W = 260; // ancho fijo en px — sin reflow
const CARD_GAP = 16;
const CARD_STRIDE = CARD_W + CARD_GAP;
const BLOCK_W = CARD_STRIDE * CARD_COUNT;
const SPEED = 45; // px/s

/* Card con ancho FIJO — el contenido se muestra/oculta sin cambiar el ancho */
const ApaCard = memo(({ item }: { item: typeof items[0] }) => (
  <Link
    to={item.href}
    className="group block flex-shrink-0"
    style={{ width: CARD_W }}
    aria-label={`Explorar: ${item.label}`}
  >
    <div
      className="relative overflow-hidden h-full"
      style={{
        background: item.bg,
        padding: "clamp(1.4rem, 3vw, 2.2rem)",
        minHeight: "clamp(240px, 36vw, 400px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Número decorativo */}
      <span
        className="block font-bold leading-none select-none transition-opacity duration-300 group-hover:opacity-30"
        style={{
          fontSize: "clamp(2.8rem, 5.5vw, 4.5rem)",
          color: item.accent,
          opacity: 0.12,
          letterSpacing: "-0.03em",
        }}
        aria-hidden="true"
      >
        {item.num}
      </span>

      {/* Icono */}
      <span
        className="block transition-transform duration-300 ease-out group-hover:scale-110"
        style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)" }}
        aria-hidden="true"
      >
        {item.icon}
      </span>

      {/* Texto — siempre visible, descripción aparece en hover */}
      <div>
        <h3
          className="font-bold text-foreground mb-0 group-hover:mb-2 transition-all duration-300"
          style={{
            fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
            letterSpacing: "0.04em",
          }}
        >
          {item.label}
        </h3>

        {/* Descripción: max-height + opacity, SIN cambiar ancho */}
        <div
          className="overflow-hidden transition-all duration-500 ease-out"
          style={{ maxHeight: 0, opacity: 0 }}
          // CSS group-hover no maneja max-height bien, usamos style inline vía CSS custom
        >
          <p
            className="text-muted-foreground font-light leading-relaxed pt-1"
            style={{ fontSize: "clamp(0.84rem, 1.2vw, 0.92rem)" }}
          >
            {item.description}
          </p>
          <p
            className="mt-3 inline-flex items-center gap-1 border-b border-foreground/30 pb-0.5"
            style={{ fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase" }}
          >
            Ver más →
          </p>
        </div>
      </div>
    </div>
  </Link>
));
ApaCard.displayName = "ApaCard";

/* Usamos CSS para el hover expand — sin JS, sin re-renders */
const cardHoverCSS = `
.apa-card-inner:hover .apa-desc {
  max-height: 140px !important;
  opacity: 1 !important;
}
.apa-card-inner:hover .apa-title {
  margin-bottom: 0.5rem !important;
}
.apa-card-inner:hover .apa-num {
  opacity: 0.28 !important;
}
`;

const ApatachoItems = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  // Estado de interacción — solo refs, cero re-renders del componente padre
  const isInteracting = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);
  const prevTsRef = useRef<number>(0);

  // Drag state
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  // Touch state
  const touchStartX = useRef(0);
  const touchScrollLeft = useRef(0);

  /* Inicializar en el bloque del medio para que el loop sea invisible */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollLeft = BLOCK_W; // start at middle block
  }, []);

  /* Loop: si scrollLeft sale del bloque medio, teletransportar */
  const loopScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    if (el.scrollLeft >= BLOCK_W * 2) el.scrollLeft -= BLOCK_W;
    else if (el.scrollLeft < BLOCK_W * 0.1) el.scrollLeft += BLOCK_W;
  }, []);

  /* Pausa el auto-scroll y reanuda 2s después */
  const pauseAuto = useCallback(() => {
    isInteracting.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      isInteracting.current = false;
    }, 2000);
  }, []);

  /* rAF — frame-rate independent, sin setState */
  const tick = useCallback((ts: number) => {
    const el = trackRef.current;
    if (el && !isInteracting.current) {
      const delta = prevTsRef.current ? Math.min(ts - prevTsRef.current, 50) : 16;
      el.scrollLeft += (SPEED * delta) / 1000;
      loopScroll();
    }
    prevTsRef.current = ts;
    rafRef.current = requestAnimationFrame(tick);
  }, [loopScroll]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [tick]);

  /* ── Mouse drag ── */
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const el = trackRef.current;
    if (!el) return;
    isDragging.current = true;
    dragStartX.current = e.pageX - el.offsetLeft;
    dragScrollLeft.current = el.scrollLeft;
    el.style.cursor = "grabbing";
    pauseAuto();
  }, [pauseAuto]);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - dragStartX.current) * 1.4;
    trackRef.current.scrollLeft = dragScrollLeft.current - walk;
    loopScroll();
  }, [loopScroll]);

  /* ── Touch drag ── */
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const el = trackRef.current;
    if (!el) return;
    touchStartX.current = e.touches[0].pageX;
    touchScrollLeft.current = el.scrollLeft;
    pauseAuto();
  }, [pauseAuto]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    const el = trackRef.current;
    if (!el) return;
    const dx = touchStartX.current - e.touches[0].pageX;
    el.scrollLeft = touchScrollLeft.current + dx;
    loopScroll();
  }, [loopScroll]);

  return (
    <section
      id="apapacho"
      className="overflow-hidden"
      style={{
        background: "#fff",
        paddingTop: "clamp(5rem, 10vw, 9rem)",
        paddingBottom: "clamp(5rem, 10vw, 9rem)",
      }}
    >
      {/* CSS para hover expand sin JS */}
      <style>{cardHoverCSS}</style>

      {/* Header */}
      <div className="container mb-12">
        <div className="flex items-end gap-6 flex-wrap">
          <div>
            <SectionReveal>
              <p
                className="font-display text-primary mb-3"
                style={{ fontSize: "clamp(1.05rem, 2vw, 1.3rem)" }}
              >
                Encuentra el tuyo
              </p>
            </SectionReveal>
            <SectionReveal delay={80}>
              <h2
                className="font-bold text-foreground leading-none"
                style={{
                  fontSize: "clamp(2.2rem, 6vw, 5rem)",
                  letterSpacing: "clamp(0.03em, 0.5vw, 0.08em)",
                }}
              >
                ¿Qué apapacho
                <br />
                necesitas?
              </h2>
            </SectionReveal>
          </div>
          <SectionReveal delay={120} className="self-end pb-1">
            <img
              src={pajaroNaranja}
              alt=""
              aria-hidden="true"
              style={{ width: "clamp(40px, 6vw, 72px)", height: "auto", opacity: 0.5 }}
              loading="lazy"
            />
          </SectionReveal>
        </div>
        <SectionReveal delay={160}>
          <p
            className="text-muted-foreground font-light mt-4 italic"
            style={{ fontSize: "clamp(0.83rem, 1.2vw, 0.96rem)", letterSpacing: "0.04em" }}
          >
            Pasa el cursor para descubrir · Arrastra para navegar
          </p>
        </SectionReveal>
      </div>

      {/* Carrusel — sin scroll-snap para auto-scroll suave */}
      <div
        ref={trackRef}
        className="overflow-x-auto select-none"
        style={{
          display: "flex",
          gap: CARD_GAP,
          paddingLeft: "max(2rem, calc((100vw - 1280px) / 2 + 2rem))",
          paddingRight: "max(2rem, calc((100vw - 1280px) / 2 + 2rem))",
          paddingBottom: "0.5rem",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          cursor: "grab",
          alignItems: "stretch",
        }}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={() => { /* resume handled by pauseAuto timer */ }}
        onScroll={loopScroll}
      >
        {INFINITE_ITEMS.map((item, idx) => (
          <div
            key={`${item.label}-${idx}`}
            className="apa-card-inner flex-shrink-0"
            style={{ width: CARD_W }}
          >
            {/* Número */}
            <div
              className="apa-num block font-bold leading-none select-none"
              style={{
                fontSize: "clamp(2.8rem, 5.5vw, 4.5rem)",
                color: item.accent,
                opacity: 0.12,
                letterSpacing: "-0.03em",
                transition: "opacity 0.3s ease",
              }}
              aria-hidden="true"
            >
              {item.num}
            </div>

            <Link
              to={item.href}
              className="block mt-2"
              style={{
                background: item.bg,
                padding: "clamp(1.2rem, 2.5vw, 2rem)",
                minHeight: "clamp(220px, 34vw, 380px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                textDecoration: "none",
              }}
              aria-label={`Explorar: ${item.label}`}
              draggable={false}
            >
              {/* Icono */}
              <span
                className="block"
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                  transition: "transform 0.3s ease",
                }}
                aria-hidden="true"
              >
                {item.icon}
              </span>

              {/* Título */}
              <div>
                <h3
                  className="apa-title font-bold text-foreground"
                  style={{
                    fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
                    letterSpacing: "0.04em",
                    marginBottom: 0,
                    transition: "margin 0.3s ease",
                  }}
                >
                  {item.label}
                </h3>

                {/* Descripción — expandible via CSS hover sin JS */}
                <div
                  className="apa-desc overflow-hidden"
                  style={{
                    maxHeight: 0,
                    opacity: 0,
                    transition: "max-height 0.4s cubic-bezier(.22,1,.36,1), opacity 0.3s ease",
                  }}
                >
                  <p
                    className="text-muted-foreground font-light leading-relaxed pt-1"
                    style={{ fontSize: "clamp(0.84rem, 1.2vw, 0.92rem)" }}
                  >
                    {item.description}
                  </p>
                  <p
                    className="mt-2 inline-flex items-center gap-1 border-b border-foreground/30 pb-0.5"
                    style={{
                      fontSize: "0.68rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "inherit",
                    }}
                  >
                    Ver más →
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ApatachoItems;
