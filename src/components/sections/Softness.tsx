import lifestyleImage from "@/assets/lifestyle-2.png";

const qualities = [
  {
    title: "Ultra suave",
    description: "Telas seleccionadas que acarician la piel",
  },
  {
    title: "Se siente rico desde el primer minuto",
    description: "Sin rigidez, sin espera. Suave desde que lo abres",
  },
  {
    title: "Pensado para dormir mejor",
    description: "Diseños que abrazan sin apretar",
  },
];

const Softness = () => {
  return (
    <section className="py-20 md:py-28 bg-papachoa-cream">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[3/4] overflow-hidden rounded-2xl">
              <img
                src={lifestyleImage}
                alt="Textura suave de tela Papachoa"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 md:bottom-8 md:-right-8 bg-card rounded-xl shadow-lg p-4 md:p-6">
              <p className="font-display text-lg md:text-xl text-foreground italic">
                "La prueba
                <br />
                de suavidad"
              </p>
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-10">
              Suavidad que se siente
            </h2>

            <div className="space-y-8">
              {qualities.map((quality, index) => (
                <div
                  key={quality.title}
                  className="border-l-2 border-primary/50 pl-6"
                >
                  <h3 className="font-display text-xl text-foreground mb-2">
                    {quality.title}
                  </h3>
                  <p className="text-muted-foreground font-light">
                    {quality.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Softness;
