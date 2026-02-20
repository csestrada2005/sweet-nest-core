import { useState, useCallback, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, X } from "lucide-react";
import { products } from "@/data/products";
import MiniCart from "@/components/MiniCart";
import { useCart } from "@/context/CartContext";
import logo from "@/assets/logo-papachoa.webp";

/* ─────────────────────────────────────────
   Papachoa Header — Japanese-minimal v6
   – transparent → white on scroll
   – inline search palette (no modal)
   – premium cart button with stamp badge
   ───────────────────────────────────────── */

const NAV_LINKS = [
  { label: "Filosofía",   href: "/#filosofia" },
  { label: "Colecciones", href: "/#colecciones" },
  { label: "Catálogo",    href: "/catalogo" },
  { label: "Contacto",    href: "/contacto" },
];

interface HeaderProps {
  transparent?: boolean;
}

/* ── Inline Search Palette ── */
const InlineSearch = ({ onClose }: { onClose: () => void }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = query.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.collection.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5)
    : [];

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleResult = (id: string) => {
    navigate(`/producto/${id}`);
    onClose();
  };

  const fmt = (price: number) =>
    new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 0 }).format(price);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Palette — drops from header */}
      <div
        className="absolute top-full left-0 right-0 z-50 mx-4 md:mx-auto md:left-1/2 md:-translate-x-1/2 md:w-[520px]"
        style={{ animation: "search-drop 0.22s cubic-bezier(0.22,1,0.36,1) forwards" }}
        role="dialog"
        aria-label="Buscador"
      >
        <div className="mt-2 rounded-2xl overflow-hidden shadow-[0_8px_40px_-8px_rgba(0,0,0,0.14)] border border-border/20 bg-card/95 backdrop-blur-xl">
          {/* Input row */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border/15">
            <Search className="h-4 w-4 text-muted-foreground/60 shrink-0" strokeWidth={1.5} />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar productos…"
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/40 outline-none text-sm tracking-wide"
              aria-label="Buscar productos"
            />
            <button
              onClick={onClose}
              className="p-1 text-muted-foreground/50 hover:text-foreground transition-colors rounded-full"
              aria-label="Cerrar buscador"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[56vh] overflow-y-auto">
            {!query.trim() && (
              <p className="px-5 py-5 text-xs text-muted-foreground/50 tracking-widest uppercase text-center">
                Escribe para buscar
              </p>
            )}
            {query.trim() && results.length === 0 && (
              <p className="px-5 py-5 text-sm text-muted-foreground text-center">
                Sin resultados para «{query}»
              </p>
            )}
            {results.length > 0 && (
              <div className="py-2">
                {results.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => handleResult(p.id)}
                    className="w-full flex items-center gap-3.5 px-4 py-2.5 hover:bg-muted/60 transition-colors text-left group"
                    style={{ animationDelay: `${i * 30}ms` }}
                  >
                    <div className="w-11 h-11 rounded-xl overflow-hidden bg-muted shrink-0">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground truncate">{p.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{fmt(p.price)}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

/* ── Cart Badge ── */
const CartBadge = ({ count }: { count: number }) => (
  <span
    key={count}
    className="absolute -top-1 -right-1.5 min-w-[16px] h-[16px] rounded-full flex items-center justify-center px-0.5 leading-none text-[9px] font-bold bg-primary text-primary-foreground"
    style={{ animation: "stamp-pop 0.28s cubic-bezier(0.34,1.56,0.64,1) forwards" }}
    aria-hidden="true"
  >
    {count > 9 ? "9+" : count}
  </span>
);

/* ── Main Header ── */
const Header = ({ transparent = false }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { itemCount } = useCart();
  const prevCount = useRef(itemCount);
  const [badgeKey, setBadgeKey] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  /* badge pop on new item */
  useEffect(() => {
    if (itemCount > prevCount.current) {
      setBadgeKey((k) => k + 1);
    }
    prevCount.current = itemCount;
  }, [itemCount]);

  /* scroll listener */
  useEffect(() => {
    const onScroll = () => {
      const threshold = transparent ? window.innerHeight * 4 : 48;
      setScrolled(window.scrollY > threshold);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparent]);

  const handleLogoClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
        requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
      }
    },
    [location.pathname, navigate]
  );

  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("/#")) return;
      e.preventDefault();
      const id = href.replace("/#", "");
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 350);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [location.pathname, navigate]
  );

  const isTransparent = transparent && !scrolled;

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: isTransparent ? "transparent" : "rgba(247,244,243,0.94)",
          backdropFilter: isTransparent ? "none" : "blur(16px)",
          borderBottom: isTransparent
            ? "1px solid transparent"
            : "1px solid hsl(var(--border) / 0.22)",
          animation: "header-fadein 0.22s ease-out forwards",
        }}
      >
        <div
          className="container flex items-center justify-between transition-all duration-300 relative"
          style={{ paddingTop: scrolled ? "12px" : "20px", paddingBottom: scrolled ? "12px" : "20px" }}
        >
          {/* ── Logo ── */}
          <Link
            to="/"
            onClick={handleLogoClick}
            className="flex-shrink-0 flex items-center"
            aria-label="Papachoa México — inicio"
          >
            <img
              src={logo}
              alt="Papachoa México"
              className="w-auto transition-all duration-300"
              style={{
                height: scrolled ? "28px" : "34px",
                filter: isTransparent ? "brightness(0)" : "none",
              }}
              loading="eager"
              fetchPriority="high"
            />
          </Link>

          {/* ── Nav (desktop) ── */}
          <nav className="hidden md:flex items-center" aria-label="Navegación principal">
            {NAV_LINKS.map((link, i) => (
              <span key={link.href} className="flex items-center">
                <Link
                  to={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="text-sm font-medium transition-all duration-200 relative group"
                  style={{ color: "hsl(var(--foreground))", letterSpacing: "0.03em", paddingBottom: "2px" }}
                >
                  <span className="relative">
                    {link.label}
                    <span
                      className="absolute bottom-0 left-0 w-full h-px bg-foreground origin-right"
                      style={{ transform: "scaleX(0)", transition: "transform 0.3s ease" }}
                    />
                  </span>
                </Link>
                {i < NAV_LINKS.length - 1 && (
                  <span className="mx-2.5 text-muted-foreground/40 text-sm select-none" aria-hidden="true">,</span>
                )}
              </span>
            ))}
          </nav>

          {/* ── Right: Search + Cart ── */}
          <div className="flex items-center gap-1">

            {/* Search button */}
            <button
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Buscar productos"
              aria-expanded={searchOpen}
              className="search-btn relative flex items-center justify-center w-9 h-9 rounded-full text-foreground/60 hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-1"
            >
              {searchOpen
                ? <X className="w-[16px] h-[16px]" strokeWidth={1.6} />
                : <Search className="w-[16px] h-[16px]" strokeWidth={1.6} />
              }
              {/* brush stroke underline on hover */}
              <span className="search-brush" aria-hidden="true" />
            </button>

            {/* Cart button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label={`Tu carrito${itemCount > 0 ? ` — ${itemCount} ${itemCount === 1 ? "producto" : "productos"}` : " (vacío)"}`}
              className="cart-btn relative flex items-center justify-center w-9 h-9 rounded-full text-foreground/60 hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-1"
            >
              <ShoppingBag className="w-[17px] h-[17px]" strokeWidth={1.6} />
              {itemCount > 0 && <CartBadge key={badgeKey} count={itemCount} />}
            </button>
          </div>

          {/* Search palette (drops below header) */}
          {searchOpen && (
            <InlineSearch onClose={() => setSearchOpen(false)} />
          )}
        </div>
      </header>

      {/* Spacer */}
      {!transparent && <div style={{ height: "74px" }} aria-hidden="true" />}

      <MiniCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <style>{`
        @keyframes header-fadein {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes search-drop {
          from { opacity: 0; transform: translateY(-6px) scaleY(0.96); }
          to   { opacity: 1; transform: translateY(0)   scaleY(1); }
        }
        @keyframes stamp-pop {
          0%   { transform: scale(0.4) rotate(-8deg); opacity: 0; }
          60%  { transform: scale(1.12) rotate(2deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes shimmer-pass {
          0%   { left: -60%; opacity: 0; }
          20%  { opacity: 0.7; }
          100% { left: 130%; opacity: 0; }
        }

        /* Nav underline sweep */
        header nav a:hover > span > span {
          transform: scaleX(1) !important;
          transform-origin: left !important;
        }

        /* Search button hover — brush stroke */
        .search-btn .search-brush {
          position: absolute;
          bottom: 3px;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 18px;
          height: 2px;
          border-radius: 2px;
          background: hsl(var(--primary) / 0.7);
          transform-origin: center;
          transition: transform 0.25s cubic-bezier(0.22,1,0.36,1), opacity 0.2s;
          opacity: 0;
        }
        .search-btn:hover .search-brush,
        .search-btn:focus-visible .search-brush {
          transform: translateX(-50%) scaleX(1);
          opacity: 1;
        }

        /* Search shimmer (one pass on hover, via animation) */
        .search-btn::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 30%;
          background: linear-gradient(90deg, transparent, hsl(var(--primary-foreground) / 0.18), transparent);
          pointer-events: none;
          opacity: 0;
          border-radius: 50%;
        }
        .search-btn:hover::after {
          animation: shimmer-pass 0.45s ease-out 0.05s 1 forwards;
        }

        /* Cart hover glow */
        .cart-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: hsl(var(--primary) / 0.06);
          transform: scale(0.7);
          opacity: 0;
          transition: transform 0.25s ease, opacity 0.25s ease;
          pointer-events: none;
        }
        .cart-btn:hover::before {
          transform: scale(1.1);
          opacity: 1;
        }
        .cart-btn svg {
          transition: transform 0.25s cubic-bezier(0.22,1,0.36,1);
        }
        .cart-btn:hover svg {
          transform: scale(1.07);
        }
      `}</style>
    </>
  );
};

export default Header;
