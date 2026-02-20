import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import pajaroNaranja from "@/assets/brand/pajaro-naranja.png";
import SectionReveal from "@/components/ui/SectionReveal";

/* ─────────────────────────────────────────
   #apapacho — Carrusel horizontal con expand al hover
   Cada card muestra solo icono + título, se abre al hover
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

const ApaCard = ({ item }: { item: typeof items[0] }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={item.href}
      className="block flex-shrink-0"
      style={{
        width: hovered ? "clamp(240px, 32vw, 380px)" : "clamp(140px, 18vw, 200px)",
        transition: "width 0.5s cubic-bezier(.22,1,.36,1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`Explorar: ${item.label}`}
    >
      <div
        className="relative overflow-hidden h-full"
        style={{
          background: item.bg,
          padding: "clamp(1.5rem, 3vw, 2.5rem)",
          minHeight: "clamp(260px, 38vw, 440px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition: "background 0.4s ease",
        }}
      >
        {/* Número decorativo */}
        <span
          className="block font-bold leading-none select-none"
          style={{
            fontSize: "clamp(3rem, 6vw, 5rem)",
            color: item.accent,
            opacity: hovered ? 0.35 : 0.12,
            letterSpacing: "-0.03em",
            transition: "opacity 0.4s ease",
          }}
          aria-hidden="true"
        >
          {item.num}
        </span>

        {/* Icono */}
        <span
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            display: "block",
            transition: "transform 0.4s cubic-bezier(.22,1,.36,1)",
            transform: hovered ? "scale(1.15)" : "scale(1)",
          }}
          aria-hidden="true"
        >
          {item.icon}
        </span>

        {/* Título siempre visible */}
        <div>
          <h3
            className="font-bold text-foreground"
            style={{
              fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
              letterSpacing: "0.04em",
              marginBottom: hovered ? "0.75rem" : "0",
              transition: "margin 0.4s ease",
            }}
          >
            {item.label}
          </h3>

          {/* Descripción — se revela al hover */}
          <div
            style={{
              maxHeight: hovered ? "120px" : "0px",
              overflow: "hidden",
              opacity: hovered ? 1 : 0,
              transition: "max-height 0.5s cubic-bezier(.22,1,.36,1), opacity 0.4s ease",
            }}
          >
            <p
              className="text-muted-foreground font-light leading-relaxed"
              style={{ fontSize: "clamp(0.87rem, 1.3vw, 0.97rem)", paddingTop: "0.25rem" }}
            >
              {item.description}
            </p>
            <p
              className="mt-3 inline-flex items-center gap-1 border-b border-foreground/30 pb-0.5"
              style={{ fontSize: "0.7rem", letterSpacing: "0.13em", textTransform: "uppercase" }}
            >
              Ver más →
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

const ApatachoItems = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = "grabbing";
  };
  const onMouseUp = () => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.2;
  };

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
                ¿Qué apapacho<br />necesitas?
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
            Pasa el cursor para descubrir
          </p>
        </SectionReveal>
      </div>

      {/* Carrusel de cards expandibles */}
      <div
        ref={trackRef}
        className="flex gap-3 md:gap-4 overflow-x-auto pb-2 select-none"
        style={{
          scrollSnapType: "x mandatory",
          paddingLeft: "max(2rem, calc((100vw - 1280px) / 2 + 2rem))",
          paddingRight: "max(2rem, calc((100vw - 1280px) / 2 + 2rem))",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          cursor: "grab",
          alignItems: "stretch",
        }}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {items.map((item) => (
          <div key={item.label} style={{ scrollSnapAlign: "start", display: "flex" }}>
            <ApaCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ApatachoItems;
