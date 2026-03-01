import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import SectionReveal from "@/components/ui/SectionReveal";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";

const priceFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 0,
});

const ACCENT_COLORS = [
  "hsl(var(--papachoa-coral) / 0.08)",
  "hsl(var(--papachoa-magenta) / 0.07)",
  "hsl(var(--papachoa-yellow) / 0.08)",
  "hsl(var(--papachoa-blue) / 0.08)",
];
const ROTATIONS = ["-1.5deg", "0.8deg", "-0.6deg", "1deg"];

const CollectionCard = ({
  product,
  index,
}: {
  product: { slug: string; name: string; image: string; price: number; shortDescription: string };
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);
  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];
  const rotation = ROTATIONS[index % ROTATIONS.length];

  return (
    <div
      className="flex-shrink-0"
      style={{ width: "clamp(170px, 22vw, 280px)" }}
    >
      <Link
        to={`/producto/${product.slug}`}
        className="group block"
        aria-label={`Ver ${product.name}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          style={{
            background: accent,
            borderRadius: 0,
            padding: "clamp(8px, 1.3vw, 14px)",
            transform: hovered ? "rotate(0deg)" : `rotate(${rotation})`,
            transition: "transform 0.4s cubic-bezier(.22,1,.36,1), background 0.3s ease",
          }}
        >
          <div className="overflow-hidden" style={{ aspectRatio: "3/4" }}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              style={{
                transition: "transform 0.6s cubic-bezier(.22,1,.36,1)",
                transform: hovered ? "scale(1.04)" : "scale(1)",
              }}
              loading="lazy"
              decoding="async"
              width={280}
              height={373}
            />
          </div>
        </div>

        <div className="pt-4 space-y-1 px-1">
          <h3
            className="font-bold text-foreground tracking-wide"
            style={{
              fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
              letterSpacing: "0.06em",
              transition: "color 0.2s",
              color: hovered ? "hsl(var(--primary))" : "hsl(var(--foreground))",
            }}
          >
            {product.name}
          </h3>
          <p
            className="text-foreground/50 font-light"
            style={{ fontSize: "clamp(0.75rem, 0.9vw, 0.82rem)", letterSpacing: "0.04em" }}
          >
            {priceFormatter.format(product.price)}
          </p>
          <p
            className="inline-flex items-center gap-1.5 mt-1 font-body"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              color: "hsl(var(--foreground))",
              transition: "color 300ms ease-out",
              ...(hovered ? { color: "hsl(var(--primary))" } : {}),
            }}
          >
            Ver producto{" "}
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                transition: "transform 300ms ease-out",
                transform: hovered ? "translateX(4px)" : "translateX(0)",
              }}
            >
              →
            </span>
          </p>
        </div>
      </Link>
    </div>
  );
};

const ColeccionesEditorial = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftRef = useRef(0);
  const { data: shopifyProducts } = useShopifyProducts();

  const displayProducts = (shopifyProducts || []).filter(
    (p) => p.image && p.image !== "/placeholder.svg"
  );

  const onMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeftRef.current = trackRef.current.scrollLeft;
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
    const walk = (x - startX.current) * 1.2;
    trackRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  return (
    <section
      id="colecciones"
      className="overflow-hidden"
      style={{
        background: "#fff",
        paddingTop: "clamp(5rem, 10vw, 9rem)",
        paddingBottom: "clamp(5rem, 10vw, 9rem)",
      }}
    >
      <div className="container">
        <div className="flex items-end justify-between mb-14 gap-8">
          <div className="max-w-xl">
            <SectionReveal>
              <p
                className="font-display text-primary mb-3"
                style={{ fontSize: "clamp(1.05rem, 2vw, 1.3rem)" }}
              >
                Explora
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
                Catálogo
              </h2>
            </SectionReveal>
            <SectionReveal delay={100}>
              <p
                className="text-muted-foreground font-light mt-4"
                style={{ fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)" }}
              >
                Piezas únicas llenas de suavidad y apapachos para hacer match con tu familia
              </p>
            </SectionReveal>
          </div>
          <SectionReveal delay={160}>
            <p
              className="text-muted-foreground font-light hidden md:block text-right"
              style={{ fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", maxWidth: "160px" }}
            >
              ← Arrastra para ver más →
            </p>
          </SectionReveal>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-5 md:gap-6 overflow-x-auto pb-8 select-none"
        style={{
          scrollSnapType: "x mandatory",
          paddingLeft: "max(2rem, calc((100vw - 1280px) / 2 + 2rem))",
          paddingRight: "max(2rem, calc((100vw - 1280px) / 2 + 2rem))",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          cursor: "grab",
        }}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {displayProducts.map((product, i) => (
          <div key={product.id} style={{ scrollSnapAlign: "start" }}>
            <SectionReveal delay={i * 80} threshold={0.05}>
              <CollectionCard product={product} index={i} />
            </SectionReveal>
          </div>
        ))}

        <div className="flex-shrink-0 flex items-center" style={{ width: "clamp(120px, 16vw, 200px)" }}>
          <SectionReveal delay={260} threshold={0.05}>
            <Link to="/catalogo" className="group flex flex-col items-start gap-4">
              <span
                className="font-bold text-foreground/20 leading-none"
                style={{ fontSize: "clamp(3rem, 7vw, 6rem)", letterSpacing: "-0.04em" }}
                aria-hidden="true"
              >+</span>
              <p
                className="font-medium border-b-2 border-foreground/25 pb-1 transition-all duration-300 group-hover:border-foreground/70"
                style={{ fontSize: "0.8rem", letterSpacing: "0.13em", textTransform: "uppercase" }}
              >
                Ver todo el catálogo →
              </p>
            </Link>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
};

export default ColeccionesEditorial;
