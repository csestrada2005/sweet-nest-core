import { memo, useMemo, useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

const priceFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 0,
});

const SWIPE_THRESHOLD = 40;

const ProductCard = memo(({ product }: ProductCardProps) => {
  const formattedPrice = useMemo(() => priceFormatter.format(product.price), [product.price]);
  const realImages = useMemo(
    () => product.images.filter((img) => img !== "/placeholder.svg"),
    [product.images],
  );
  const hasMultiple = realImages.length > 1;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const didSwipe = useRef(false);

  const goPrev = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setActiveIndex((i) => (i - 1 + realImages.length) % realImages.length);
    },
    [realImages.length],
  );

  const goNext = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setActiveIndex((i) => (i + 1) % realImages.length);
    },
    [realImages.length],
  );

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    pointerStart.current = { x: e.clientX, y: e.clientY };
    didSwipe.current = false;
  }, []);

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!pointerStart.current || !hasMultiple) return;
      const dx = e.clientX - pointerStart.current.x;
      const dy = e.clientY - pointerStart.current.y;
      if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
        didSwipe.current = true;
        if (dx < 0) setActiveIndex((i) => (i + 1) % realImages.length);
        else setActiveIndex((i) => (i - 1 + realImages.length) % realImages.length);
      }
      pointerStart.current = null;
    },
    [hasMultiple, realImages.length],
  );

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (didSwipe.current) {
      e.preventDefault();
      didSwipe.current = false;
    }
  }, []);

  const currentImage = hasMultiple ? realImages[activeIndex] : product.image;

  return (
    <Link
      to={`/producto/${product.slug}`}
      className="group block"
      onClick={handleClick}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => { setIsActive(false); }}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
    >
      {/* Image container */}
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-xl bg-papachoa-cream mb-3 border border-border/30 touch-pan-y"
        onPointerDown={hasMultiple ? onPointerDown : undefined}
        onPointerUp={hasMultiple ? onPointerUp : undefined}
      >
        <img
          src={currentImage}
          alt={product.name}
          className="w-full h-full object-cover transition-opacity duration-300"
          loading="lazy"
          decoding="async"
          width={300}
          height={375}
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />

        {/* Arrows — only when active & multiple images */}
        {hasMultiple && (
          <>
            <button
              onClick={goPrev}
              className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center
                bg-background/70 border border-border/40 shadow-sm backdrop-blur-sm
                transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40
                ${isActive ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              aria-label="Imagen anterior"
              tabIndex={isActive ? 0 : -1}
            >
              <ChevronLeft className="w-4 h-4 text-foreground/70" />
            </button>
            <button
              onClick={goNext}
              className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center
                bg-background/70 border border-border/40 shadow-sm backdrop-blur-sm
                transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40
                ${isActive ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              aria-label="Imagen siguiente"
              tabIndex={isActive ? 0 : -1}
            >
              <ChevronRight className="w-4 h-4 text-foreground/70" />
            </button>
          </>
        )}

        {/* Dots indicator */}
        {hasMultiple && isActive && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {realImages.map((_, idx) => (
              <span
                key={idx}
                className={`block rounded-full transition-all duration-200 ${
                  idx === activeIndex
                    ? "w-4 h-1.5 bg-foreground/50"
                    : "w-1.5 h-1.5 bg-foreground/20"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="px-0.5">
        <h3 className="font-display text-base md:text-lg text-foreground leading-tight mb-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="font-body text-sm text-muted-foreground">
          {formattedPrice}
        </p>
      </div>
    </Link>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;
