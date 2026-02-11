const BrandMarquee = () => {
  const items = [
    "Calma",
    "Apapacho",
    "Suavidad",
    "Familia",
    "Descanso",
    "Ternura",
    "Hogar",
  ];

  return (
    <section className="py-5 bg-papachoa-cream/80 overflow-hidden border-y border-border/40">
      <div className="animate-marquee whitespace-nowrap flex">
        {[...Array(3)].map((_, setIndex) => (
          <div key={setIndex} className="flex items-center">
            {items.map((item, index) => (
              <div key={`${setIndex}-${index}`} className="flex items-center">
                <span className="font-display text-2xl md:text-3xl text-foreground/60 italic px-6 md:px-10">
                  {item}
                </span>
                {/* Embroidered-style diamond separator */}
                <svg className="w-4 h-4 text-primary/30" viewBox="0 0 16 16">
                  <path d="M8 1L15 8L8 15L1 8Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
                </svg>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandMarquee;
