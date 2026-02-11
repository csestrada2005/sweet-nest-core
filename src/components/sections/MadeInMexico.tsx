const features = [
  { label: "Comercio justo", color: "bg-papachoa-terracotta-light/25" },
  { label: "Hecho a mano", color: "bg-papachoa-indigo-light/15" },
  { label: "100% Mexicano", color: "bg-papachoa-jade-light/25" },
];

const MadeInMexico = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden texture-linen">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-8"
          style={{ background: "radial-gradient(circle, hsl(162 22% 42% / 0.15), transparent 70%)" }} />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full opacity-8"
          style={{ background: "radial-gradient(circle, hsl(14 52% 46% / 0.1), transparent 70%)" }} />

        {/* Subtle map outline silhouette */}
        <svg className="absolute bottom-8 right-8 w-48 h-64 opacity-[0.03] hidden md:block" viewBox="0 0 100 140">
          <path d="M50 5 C65 8 78 15 82 30 C86 45 80 55 85 70 C90 85 75 95 70 105 C65 115 55 120 50 130 C45 120 35 115 30 105 C25 95 10 85 15 70 C20 55 14 45 18 30 C22 15 35 8 50 5Z" 
            fill="none" stroke="hsl(20 32% 20%)" strokeWidth="1.5" strokeDasharray="3 4" />
        </svg>
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-10">
            <div className="border border-primary/30 px-6 py-2.5 rounded-lg flex items-center gap-3">
              <span className="font-body text-xs tracking-[0.2em] uppercase text-primary font-medium">Hecho en México con amor</span>
            </div>
          </div>

          {/* Headline */}
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground text-center leading-tight mb-8">
            Cada prenda tiene
            <br />
            <em className="text-primary">nombre y apellido</em>
          </h2>

          <p className="text-center text-lg md:text-xl text-muted-foreground font-light max-w-xl mx-auto mb-6 leading-relaxed">
            Trabajamos con talleres locales bajo principios de comercio justo. 
            Cada pijama lleva el cuidado de artesanas que ponen el corazón en cada puntada.
          </p>

          <div className="embroidery-line w-20 mx-auto mb-14" />

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            {features.map((item) => (
              <div key={item.label} className="text-center">
                <div className={`${item.color} w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-border/30`}>
                  {/* Embroidery stitch icon */}
                  <svg className="w-7 h-7 md:w-8 md:h-8 text-foreground/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 3">
                    {item.label === "Comercio justo" && (
                      <path d="M12 21C12 21 4 15 4 9.5C4 7 6 4 8.5 4C10 4 11.5 5 12 6.5C12.5 5 14 4 15.5 4C18 4 20 7 20 9.5C20 15 12 21 12 21Z" />
                    )}
                    {item.label === "Hecho a mano" && (
                      <>
                        <path d="M12 2L12 22" />
                        <path d="M5 8L12 2L19 8" />
                        <path d="M5 16L12 22L19 16" />
                      </>
                    )}
                    {item.label === "100% Mexicano" && (
                      <>
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 3L12 21" />
                        <path d="M3 12L21 12" />
                      </>
                    )}
                  </svg>
                </div>
                <p className="text-sm md:text-base font-medium text-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Curved divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path 
            d="M0 60L48 55C96 50 192 40 288 38C384 36 480 40 576 43C672 46 768 48 864 46C960 44 1056 38 1152 36C1248 34 1344 36 1392 38L1440 40V60H0Z" 
            className="fill-papachoa-cream"
          />
        </svg>
      </div>
    </section>
  );
};

export default MadeInMexico;
