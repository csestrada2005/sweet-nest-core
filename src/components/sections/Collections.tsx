import { Baby, Heart, Users, Moon, Gift } from "lucide-react";

const collections = [
  {
    title: "Recién nacido",
    description: "Suavidad desde el primer día",
    icon: Baby,
    color: "bg-papachoa-blush/40",
  },
  {
    title: "Bebé & Cobijo",
    description: "Apapacho para los más pequeños",
    icon: Heart,
    color: "bg-papachoa-sky/50",
  },
  {
    title: "Pijamas Familiares",
    description: "Momentos juntos, vestidos igual",
    icon: Users,
    color: "bg-papachoa-sage/40",
  },
  {
    title: "Sacos & Nidos",
    description: "Sueños seguros y calientitos",
    icon: Moon,
    color: "bg-papachoa-blush/30",
  },
  {
    title: "Listo para Regalar",
    description: "El regalo perfecto para dar amor",
    icon: Gift,
    color: "bg-papachoa-sky/40",
  },
];

const Collections = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Nuestras Colecciones
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Encuentra el apapacho perfecto para cada etapa
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {collections.map((collection, index) => (
            <a
              key={collection.title}
              href="/catalogo"
              className="group block"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`${collection.color} rounded-2xl p-6 md:p-8 aspect-square flex flex-col items-center justify-center text-center transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-lg`}
              >
                <collection.icon className="h-8 w-8 md:h-10 md:w-10 text-foreground/70 mb-4" />
                <h3 className="font-display text-lg md:text-xl text-foreground mb-2">
                  {collection.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground font-light hidden md:block">
                  {collection.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
