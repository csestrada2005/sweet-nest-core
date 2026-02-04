import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter submission logic would go here
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="max-w-xl mx-auto text-center">
          <Mail className="h-8 w-8 mx-auto text-primary mb-6" />
          
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">
            Recibe noticias suaves
          </h2>
          <p className="text-muted-foreground mb-8">
            Como nuestros productos. Nuevos lanzamientos, colecciones especiales
            y consejos para el descanso familiar.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-card border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary"
              required
            />
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
            >
              Suscribirme
            </Button>
          </form>

          <p className="text-xs text-muted-foreground mt-4">
            Sin spam. Solo apapacho. Puedes darte de baja cuando quieras.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
