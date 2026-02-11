import lifestyleImage from "@/assets/lifestyle-2.png";

const qualities = [
  {
    title: "Ultra suave",
    description: "Telas seleccionadas que acarician la piel desde el primer contacto",
    accent: "border-l-papachoa-terracotta",
  },
  {
    title: "Se siente rico al instante",
    description: "Sin rigidez, sin espera. Suave desde que lo abres",
    accent: "border-l-papachoa-marigold",
  },
  {
    title: "Pensado para dormir mejor",
    description: "Diseños que abrazan sin apretar, para noches tranquilas",
    accent: "border-l-papachoa-jade",
  },
];

const Softness = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden texture-linen">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-32 -left-16 w-48 h-48 rounded-full opacity-8"
          style={{ background: "radial-gradient(circle, hsl(38 60% 52% / 0.15), transparent 70%)" }} />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <p className="font-body text-xs tracking-[0.25em] uppercase text-primary mb-6">
              La prueba de suavidad
            </p>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-4">
              Suavidad que
              <br />
              <em className="text-primary">se siente</em>
            </h2>

            <div className="embroidery-line w-20 mb-10" />

            <div className="space-y-5">
              {qualities.map((quality) => (
                <div
                  key={quality.title}
                  className={`p-5 bg-card rounded-lg border border-border/40 border-l-4 ${quality.accent} hover:shadow-md transition-shadow`}
                >
                  <h3 className="font-display text-xl text-foreground mb-1">
                    {quality.title}
                  </h3>
                  <p className="text-muted-foreground font-light text-sm leading-relaxed">
                    {quality.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative max-w-md mx-auto lg:max-w-none">
              {/* Paper shadow layers */}
              <div className="absolute inset-0 bg-papachoa-terracotta-light/15 blob-shape scale-110 -z-10" />
              
              <div className="blob-shape overflow-hidden border-stitched">
                <img
                  src={lifestyleImage}
                  alt="Textura suave de tela Papachoa"
                  className="w-full aspect-[4/5] object-cover"
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={500}
                />
              </div>

              {/* Floating editorial badge */}
              <div className="absolute -bottom-3 right-2 md:bottom-10 md:-right-4 bg-card rounded-lg shadow-lg p-4 border border-border/40">
                <p className="font-display text-lg text-foreground">
                  Tan suave como un <em className="text-primary">abrazo</em>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Softness;
