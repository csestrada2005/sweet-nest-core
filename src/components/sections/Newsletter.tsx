import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const EMAIL_RE = /^\S+@\S+\.\S+$/;
const STORAGE_KEY = "papachoa_newsletter_subscribers";

type Status = "idle" | "loading" | "success" | "error";

function getSubscribers(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = email.trim();

      if (!EMAIL_RE.test(trimmed)) {
        setStatus("error");
        setMessage("Por favor, escribe un correo válido.");
        return;
      }

      setStatus("loading");
      setMessage("");

      await new Promise((r) => setTimeout(r, 800));

      const subs = getSubscribers();
      if (subs.includes(trimmed)) {
        setStatus("success");
        setMessage("Ya estás en la lista.");
        setEmail("");
        toast({ title: "Ya estás suscrito/a", description: "Este correo ya está en nuestra lista." });
        return;
      }

      subs.push(trimmed);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(subs));

      setStatus("success");
      setMessage("Listo. Te avisaremos con novedades suaves.");
      setEmail("");
      toast({ title: "Suscripción exitosa", description: "Recibirás noticias en tu correo." });
    },
    [email],
  );

  const isLoading = status === "loading";

  return (
    <section className="py-24 md:py-32 bg-papachoa-cream relative overflow-hidden texture-linen">
      <div className="container relative z-10">
        <div className="max-w-xl mx-auto text-center">
          <p className="font-body text-xs tracking-[0.25em] uppercase text-primary mb-5">
            Newsletter
          </p>

          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Recibe noticias <em>suaves</em>
          </h2>
          <p className="text-muted-foreground mb-4 text-base font-light leading-relaxed">
            Nuevos lanzamientos, colecciones especiales
            y consejos para el descanso familiar.
          </p>

          <div className="embroidery-line w-16 mx-auto mb-8" />

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") {
                  setStatus("idle");
                  setMessage("");
                }
              }}
              disabled={isLoading}
              className="flex-1 bg-card border border-border rounded-lg px-5 py-5 text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/30 focus:border-primary/40 disabled:opacity-60"
              required
              aria-describedby="newsletter-msg"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="btn-artisan disabled:opacity-70 disabled:hover:translate-y-0 whitespace-nowrap"
            >
              {isLoading ? "Suscribiendo…" : "Suscribirme"}
            </button>
          </form>

          {/* Feedback */}
          <div id="newsletter-msg" className="h-6 mt-4" aria-live="polite">
            {message && (
              <p className={`text-sm font-medium animate-fade-in ${
                status === "error" ? "text-destructive" : "text-accent"
              }`}>
                {message}
              </p>
            )}
          </div>

          <p className="text-xs text-muted-foreground mt-2 tracking-wide">
            Sin spam. Solo apapacho.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
