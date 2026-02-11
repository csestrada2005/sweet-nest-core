import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-family.png";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";

const heroSlides = [
  { src: heroImage, alt: "Familia usando pijamas Papachoa", pos: "52% 60%" },
  { src: hero2, alt: "Pijamas Papachoa estilo 2", pos: "50% 35%" },
  { src: hero3, alt: "Pijamas Papachoa estilo 3", pos: "50% 30%" },
  { src: hero4, alt: "Pijamas Papachoa estilo 4", pos: "50% 40%" },
  { src: hero5, alt: "Pijamas Papachoa estilo 5", pos: "50% 55%" },
];

const Hero = () => {
  return (
    <section className="relative min-h-[100svh] bg-papachoa-cream pt-24 pb-12 overflow-hidden flex flex-col texture-linen">
      {/* Preload */}
      {heroSlides.map((slide, i) => (
        <link key={i} rel="preload" as="image" href={slide.src} />
      ))}

      {/* Background — Oaxacan sunset radial + organic textile shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Warm radial gradient */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 80% 70% at 50% 40%, hsl(14 38% 74% / 0.2), transparent 70%)"
        }} />
        {/* Organic textile shapes */}
        <div className="absolute -top-20 -right-32 w-80 h-80 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, hsl(38 60% 52% / 0.4), transparent 70%)" }} />
        <div className="absolute bottom-24 -left-20 w-64 h-64 rounded-full opacity-12"
          style={{ background: "radial-gradient(circle, hsl(228 38% 28% / 0.2), transparent 70%)" }} />
        <div className="absolute top-1/3 right-8 w-32 h-32 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, hsl(162 22% 42% / 0.3), transparent 70%)" }} />

        {/* Embroidery-inspired sun motif (very subtle) */}
        <svg className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] opacity-[0.04]" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="60" fill="none" stroke="hsl(38 60% 52%)" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="100" cy="100" r="80" fill="none" stroke="hsl(14 52% 46%)" strokeWidth="0.8" strokeDasharray="3 8" />
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = 100 + 62 * Math.cos(angle);
            const y1 = 100 + 62 * Math.sin(angle);
            const x2 = 100 + 78 * Math.cos(angle);
            const y2 = 100 + 78 * Math.sin(angle);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="hsl(38 60% 52%)" strokeWidth="1" strokeDasharray="2 3" />;
          })}
        </svg>
      </div>

      <div className="container flex-1 flex flex-col justify-center relative z-10">
        {/* Hero image with stitched organic frame */}
        <div className="relative mx-auto w-full max-w-[280px] md:max-w-[320px] mb-8">
          {/* Soft shadow behind blob */}
          <div className="absolute inset-0 blob-shape scale-[1.08] opacity-20 pointer-events-none"
            style={{ background: "hsl(14 38% 74%)", filter: "blur(20px)" }} />

          {/* Stitched border ring */}
          <div className="absolute inset-0 blob-shape scale-[1.06] pointer-events-none"
            style={{
              border: "2px dashed hsl(14 52% 46% / 0.25)",
              background: "transparent"
            }} />

          {/* Image container */}
          <div className="relative w-full"
            style={{ clipPath: "url(#hero-blob)", aspectRatio: "1 / 1", contain: "paint" }}>
            {heroSlides.map((slide, i) => (
              <img
                key={i}
                src={slide.src}
                alt={slide.alt}
                className={`absolute inset-0 w-full h-full object-cover hero-slide hero-slide-${i}`}
                style={{ objectPosition: slide.pos, willChange: "opacity" }}
                fetchPriority={i === 0 ? "high" : undefined}
                loading="eager"
                draggable={false}
              />
            ))}
          </div>

          <svg width="0" height="0" className="absolute">
            <defs>
              <clipPath id="hero-blob" clipPathUnits="objectBoundingBox">
                <path d="M0.5,0.02 C0.75,-0.02,0.97,0.15,0.98,0.4 C0.99,0.65,0.85,0.88,0.6,0.97 C0.35,1.06,0.1,0.9,0.03,0.65 C-0.04,0.4,0.25,0.06,0.5,0.02Z" />
              </clipPath>
            </defs>
          </svg>
        </div>

        {/* Text — editorial style */}
        <div className="text-center">
          <p className="font-body text-xs tracking-[0.25em] uppercase text-muted-foreground mb-4">
            Textiles artesanales para la familia
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.08] mb-5">
            Pensado por
            <br />
            <em className="text-primary">mamás,</em> para mamás
          </h1>
          
          <p className="text-base md:text-lg text-muted-foreground font-light mb-8 max-w-sm mx-auto leading-relaxed">
            Pijamas y cobijos ultra suaves que apapachan a toda la familia
          </p>

          <Link to="/catalogo" className="btn-artisan">
            Ver colección
            <span className="text-lg">&rarr;</span>
          </Link>
        </div>
      </div>

      {/* Organic curve divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path 
            d="M0 60L60 55C120 50 240 42 360 40C480 38 600 42 720 44C840 46 960 46 1080 44C1200 42 1320 38 1380 36L1440 34V60H0Z" 
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
