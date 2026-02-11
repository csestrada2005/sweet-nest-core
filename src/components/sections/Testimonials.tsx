import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Fernanda C.",
    text: "La calidad es increíble. Mis hijos no quieren quitarse las pijamas y el cobijo es lo más suave que hemos tenido en casa.",
    rating: 5,
  },
  {
    name: "Ofe S.",
    text: "Compré para regalar y ahora toda la familia tiene Papachoa. Los pijamas familiares son un hit en Navidad.",
    rating: 5,
  },
  {
    name: "María Elena M.",
    text: "El saco de dormir fue lo mejor que compré para mi bebé. Duerme toda la noche y yo también.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 md:py-32 bg-papachoa-cream relative overflow-hidden texture-linen">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 -right-16 w-48 h-48 rounded-full opacity-8"
          style={{ background: "radial-gradient(circle, hsl(14 52% 46% / 0.12), transparent 70%)" }} />
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <p className="font-body text-xs tracking-[0.25em] uppercase text-primary mb-5">
            Lo que dicen las mamás
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Historias de <em>apapacho</em>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-lg font-light">
            Familias reales que ya viven la suavidad
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto items-stretch">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-card rounded-xl p-8 relative overflow-hidden border border-border/40 flex flex-col min-h-[280px] hover:shadow-md transition-shadow"
            >
              {/* Decorative quote mark */}
              <div className="absolute top-4 right-5 font-display text-6xl text-primary/10 leading-none select-none">&ldquo;</div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-papachoa-marigold text-papachoa-marigold"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground/80 font-light leading-relaxed mb-8 text-base flex-1 line-clamp-4 italic">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border/30">
                <div className="w-9 h-9 bg-papachoa-terracotta-light/30 rounded-full flex items-center justify-center font-display text-base text-primary">
                  {testimonial.name[0]}
                </div>
                <p className="font-display text-base text-foreground">
                  {testimonial.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
