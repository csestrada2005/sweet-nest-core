import lifestyleImage from "@/assets/lifestyle-1.png";

const Emotion = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden texture-linen">
      {/* Subtle organic shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-8"
          style={{ background: "radial-gradient(circle, hsl(38 60% 52% / 0.15), transparent 70%)" }} />
        <div className="absolute bottom-10 -left-10 w-48 h-48 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, hsl(162 22% 42% / 0.12), transparent 70%)" }} />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image with stitched frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative max-w-sm mx-auto lg:max-w-none">
              {/* Layered paper shadow effect */}
              <div className="absolute inset-0 bg-papachoa-terracotta-light/20 blob-shape-2 scale-105 -z-10 rotate-2" />
              <div className="blob-shape-2 overflow-hidden border-stitched">
                <img
                  src={lifestyleImage}
                  alt="Bebé descansando con cobijo Papachoa"
                  className="w-full aspect-[3/4] object-cover"
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={533}
                />
              </div>
            </div>
          </div>

          {/* Editorial text */}
          <div className="lg:col-span-7 lg:pl-8">
            <div className="max-w-xl">
              <p className="font-body text-xs tracking-[0.25em] uppercase text-primary mb-6">
                Nuestra filosofía
              </p>
              
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-8">
                Papachoa no vende pijamas.
                <br />
                <em className="text-primary">
                  Vende calma, descanso y hogar.
                </em>
              </h2>
              
              <p className="text-lg text-muted-foreground font-light leading-relaxed mb-10">
                Creemos que cada momento de descanso merece sentirse especial. 
                Por eso, cada prenda está pensada para hacer tu hogar más suave, 
                más cálido, más tuyo.
              </p>

              {/* Embroidered-style divider */}
              <div className="embroidery-line w-24 mb-8" />

              <div className="flex flex-wrap gap-3">
                {["Calma", "Ternura", "Apapacho"].map((tag) => (
                  <span 
                    key={tag}
                    className="border border-primary/30 text-foreground/80 px-5 py-2 rounded-lg text-sm font-medium tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Emotion;
