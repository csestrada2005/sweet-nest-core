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
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Lo que dicen las mamás
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Historias reales de familias que ya viven el apapacho
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-card rounded-2xl p-8 shadow-sm"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-primary text-primary"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground/90 font-light leading-relaxed mb-6">
                "{testimonial.text}"
              </blockquote>

              {/* Author */}
              <p className="font-display text-lg text-foreground">
                {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
