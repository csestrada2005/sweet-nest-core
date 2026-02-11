const StoriesThread = () => {
  const stories = [
    {
      title: "Recién nacido",
      description: "Cada hilo es un primer abrazo. Suavidad que envuelve desde el día uno.",
    },
    {
      title: "Familia",
      description: "Momentos que se tejen juntos. Pijamas que unen a quienes más amas.",
    },
    {
      title: "Descanso",
      description: "El ritual de cada noche merece textiles pensados con intención.",
    },
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, hsl(38 32% 94%) 0%, hsl(14 38% 90%) 50%, hsl(38 32% 94%) 100%)" }}>
      
      {/* Textile pattern overlay — very subtle */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            hsl(20 32% 20% / 0.15) 10px,
            hsl(20 32% 20% / 0.15) 11px
          )`
        }} />

      {/* Embroidered sun motif background */}
      <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03]" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="50" fill="none" stroke="hsl(38 60% 52%)" strokeWidth="0.8" strokeDasharray="3 5" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="hsl(14 52% 46%)" strokeWidth="0.6" strokeDasharray="4 6" />
        <circle cx="100" cy="100" r="90" fill="none" stroke="hsl(228 38% 28%)" strokeWidth="0.5" strokeDasharray="2 8" />
        {[...Array(16)].map((_, i) => {
          const angle = (i * 22.5 * Math.PI) / 180;
          const x1 = 100 + 52 * Math.cos(angle);
          const y1 = 100 + 52 * Math.sin(angle);
          const x2 = 100 + 68 * Math.cos(angle);
          const y2 = 100 + 68 * Math.sin(angle);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="hsl(38 60% 52%)" strokeWidth="0.6" strokeDasharray="2 3" />;
        })}
      </svg>
      
      <div className="container relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-5">
            Nuestra historia
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.05]">
            Historias en
            <br />
            <em className="text-primary">cada hilo</em>
          </h2>
        </div>

        <div className="embroidery-line max-w-lg mx-auto mb-16" />

        {/* Stories grid */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto">
          {stories.map((story, i) => (
            <div key={story.title} className="text-center md:text-left">
              {/* Story number */}
              <span className="font-display text-5xl md:text-6xl text-primary/15 block mb-3 leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-2xl text-foreground mb-3">
                {story.title}
              </h3>
              <p className="text-muted-foreground font-light leading-relaxed text-sm">
                {story.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoriesThread;
