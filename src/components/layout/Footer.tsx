import { Instagram, Facebook } from "lucide-react";
import logo from "@/assets/logo-papachoa.webp";

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
    { label: "Política de privacidad", href: "/privacidad" },
  ],
};

const paymentMethods = ["Visa", "Mastercard", "AMEX", "OXXO", "SPEI"];

const Footer = () => {
  return (
    <footer className="bg-papachoa-cream border-t border-border/50">
      <div className="container py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Logo & Social */}
          <div className="col-span-2 md:col-span-1">
            <img
              src={logo}
              alt="Papachoa México"
              className="h-12 w-auto mb-6"
            />
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              Pijamas y cobijos ultra suaves pensados por mamás, para mamás.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/papachoamx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://facebook.com/papachoamx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
            </div>
          </div>

          {/* Tienda */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-4">Tienda</h4>
            <ul className="space-y-3">
              {footerLinks.tienda.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Papachoa México. Todos los derechos reservados.
          </p>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground mr-2">Métodos de pago:</span>
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="text-xs text-muted-foreground bg-card px-2 py-1 rounded"
              >
                {method}
              </span>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">MXN $</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
