import { Link } from "react-router-dom";
import type { Collection } from "@/data/products";

const collections: {
  title: string;
  description: string;
  bgColor: string;
  slug: Collection;
}[] = [
  {
    title: "Recién nacido",
    description: "Suavidad desde el primer día",
    bgColor: "bg-papachoa-terracotta-light/30",
    slug: "recien-nacido",
  },
  {
    title: "Bebé & Cobijo",
    description: "Apapacho para los más pequeños",
    bgColor: "bg-papachoa-indigo-light/15",
    slug: "bebe-cobijo",
  },
  {
    title: "Pijamas Familiares",
    description: "Momentos juntos, vestidos igual",
    bgColor: "bg-papachoa-jade-light/30",
    slug: "pijamas-familiares",
  },
  {
    title: "Sacos & Nidos",
    description: "Sueños seguros y calientitos",
    bgColor: "bg-papachoa-marigold-light/30",
    slug: "sacos-nidos",
  },
  {
    title: "Listo para Regalar",
    description: "El regalo perfecto para dar amor",
    bgColor: "bg-papachoa-rose-light/40",
    slug: "regalo",
  },
];

const Collections = () => {
  return (
    <section className="py-24 md:py-32 bg-papachoa-cream relative overflow-hidden texture-linen">
      {/* Background organic shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, hsl(14 52% 46% / 0.2), transparent 70%)" }} />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, hsl(162 22% 42% / 0.15), transparent 70%)" }} />
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <p className="font-body text-xs tracking-[0.25em] uppercase text-primary mb-5">
            Explora
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Nuestras <em>Colecciones</em>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-lg font-light">
            Encuentra el apapacho perfecto para cada etapa
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 max-w-4xl mx-auto">
          {collections.map((collection, index) => (
            <Link
              key={collection.title}
              to={`/catalogo?categoria=${collection.slug}`}
              aria-label={`Ver colección ${collection.title}`}
              className={`group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:translate-y-0 border border-border/40 ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <div className={`${collection.bgColor} h-full p-6 md:p-7 ${index === 0 ? "min-h-[170px] md:min-h-[280px]" : "min-h-[130px] md:min-h-[150px]"} flex flex-col justify-between`}>
                <div>
                  <h3 className={`font-display ${index === 0 ? "text-2xl md:text-3xl" : "text-lg md:text-xl"} text-foreground mb-1.5 leading-tight`}>
                    {collection.title}
                  </h3>
                  <p className={`text-foreground/60 font-light text-sm leading-snug ${index === 0 ? "" : "line-clamp-2"}`}>
                    {collection.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="mt-4 flex justify-end">
                  <div className="w-8 h-8 border border-foreground/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                    <span className="text-foreground/60 text-sm">&rarr;</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Curved divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path 
            d="M0 60L48 55C96 50 192 42 288 40C384 38 480 42 576 44C672 46 768 46 864 44C960 42 1056 38 1152 40C1248 42 1344 50 1392 55L1440 60V60H0Z" 
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
};

export default Collections;
