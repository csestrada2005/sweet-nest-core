import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";
import logo from "@/assets/logo-papachoa.webp";
import { brand } from "@/data/brand";
import { openExternal } from "@/lib/openExternal";
import { prefetchRoute } from "@/hooks/usePrefetch";

const footerLinks = {
  tienda: [
    { label: "Catálogo", href: "/catalogo" },
    { label: "Colecciones", href: "/catalogo" },
    { label: "Novedades", href: "/catalogo" },
  ],
  empresa: [
    { label: "Nosotros", href: "/nosotros" },
    { label: "Contacto", href: "/contacto" },
  ],
  legal: [
    { label: "Términos y condiciones", href: "/terminos" },
    { label: "Política de devolución", href: "/devoluciones" },
    { label: "Privacidad", href: "/privacidad" },
    { label: "Preguntas frecuentes", href: "/faq" },
  ],
};

const paymentMethods = ["Visa", "Mastercard", "AMEX", "OXXO", "SPEI"];

const Footer = () => {
  return (
    <footer className="bg-papachoa-cream relative texture-linen overflow-hidden">
      {/* Curved top */}
      <div className="absolute top-0 left-0 right-0 -translate-y-full">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path 
            d="M0 60L60 55C120 50 240 40 360 38.3C480 37 600 43 720 46.7C840 50 960 50 1080 48.3C1200 47 1320 43 1380 41.7L1440 40V60H0Z" 
            className="fill-papachoa-cream"
          />
        </svg>
      </div>

      <div className="container py-16 md:py-20 relative z-10">
        {/* Embroidered divider at top */}
        <div className="embroidery-line mb-14" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Logo & Social */}
          <div className="col-span-2 md:col-span-1">
            <img
              src={logo}
              alt="Papachoa México"
              className="h-10 w-auto mb-6"
              loading="lazy"
              decoding="async"
              width={120}
              height={40}
            />
            <p className="text-sm text-muted-foreground mb-6 max-w-xs leading-relaxed">
              Pijamas y cobijos ultra suaves pensados por mamás, para mamás.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={(e) => openExternal(brand.socials.instagramUrl, e)}
                aria-label="Síguenos en Instagram"
                className="w-10 h-10 border border-border rounded-lg flex items-center justify-center text-foreground/50 hover:text-primary hover:border-primary/40 transition-all cursor-pointer"
              >
                <Instagram className="h-4.5 w-4.5" />
              </button>
              <button
                type="button"
                onClick={(e) => openExternal(brand.socials.facebookUrl, e)}
                aria-label="Síguenos en Facebook"
                className="w-10 h-10 border border-border rounded-lg flex items-center justify-center text-foreground/50 hover:text-primary hover:border-primary/40 transition-all cursor-pointer"
              >
                <Facebook className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>

          {/* Tienda */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-5">Tienda</h4>
            <ul className="space-y-3">
              {footerLinks.tienda.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    onMouseEnter={() => prefetchRoute(link.href)}
                    onTouchStart={() => prefetchRoute(link.href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-5">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    onMouseEnter={() => prefetchRoute(link.href)}
                    onTouchStart={() => prefetchRoute(link.href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-5">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    onMouseEnter={() => prefetchRoute(link.href)}
                    onTouchStart={() => prefetchRoute(link.href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="embroidery-line mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground order-2 md:order-1">
            &copy; {new Date().getFullYear()} Papachoa México
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-2 order-1 md:order-2">
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="text-xs text-muted-foreground bg-card px-3 py-1.5 rounded-md border border-border/50"
              >
                {method}
              </span>
            ))}
          </div>

          <p className="text-sm font-medium text-foreground order-3 tracking-wide">MXN $</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
