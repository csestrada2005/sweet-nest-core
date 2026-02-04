import heroImage from "@/assets/hero-family.png";

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Familia usando pijamas Papachoa"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background/70" />
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-20 pb-32">
        <div className="max-w-xl mx-auto text-center md:text-left md:mx-0">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6 animate-fade-in">
            Pensado por mamás,
            <br />
            <span className="italic">para mamás</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 font-light mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Pijamas y cobijos ultra suaves que apapachan
          </p>
          <a
            href="/catalogo"
            className="inline-block text-sm font-body font-medium tracking-wider text-foreground border-b-2 border-primary pb-1 hover:border-foreground transition-colors animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            Descubrir colección
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
