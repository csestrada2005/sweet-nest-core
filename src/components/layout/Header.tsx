import { useState } from "react";
import { Menu, Search, User, ShoppingBag, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import logo from "@/assets/logo-papachoa.webp";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full">
      {/* Banner superior */}
      <div className="bg-papachoa-blush/60 py-2 text-center">
        <p className="text-sm text-foreground/80 tracking-wide">
          ✨ Enviamos a toda la República ✨
        </p>
      </div>

      {/* Header principal */}
      <div className="bg-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="container flex items-center justify-between py-4">
          {/* Mobile menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="lg:hidden p-2 -ml-2">
              <Menu className="h-5 w-5 text-foreground" />
              <span className="sr-only">Menú</span>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] bg-background">
              <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
              <nav className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-lg font-display text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <a href="/" className="flex-1 lg:flex-none flex justify-center lg:justify-start">
            <img 
              src={logo} 
              alt="Papachoa México" 
              className="h-12 md:h-14 w-auto"
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-body font-medium text-foreground/80 hover:text-foreground transition-colors tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-1 md:gap-3">
            <button className="p-2 text-foreground/70 hover:text-foreground transition-colors">
              <Search className="h-5 w-5" />
              <span className="sr-only">Buscar</span>
            </button>
            <button className="p-2 text-foreground/70 hover:text-foreground transition-colors hidden md:block">
              <User className="h-5 w-5" />
              <span className="sr-only">Cuenta</span>
            </button>
            <button className="p-2 text-foreground/70 hover:text-foreground transition-colors relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Carrito</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
