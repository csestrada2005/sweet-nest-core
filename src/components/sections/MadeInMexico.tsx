import { Heart, MapPin, Sparkles } from "lucide-react";

const MadeInMexico = () => {
  return (
    <section className="py-20 md:py-28 bg-papachoa-sage/30">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-foreground/70 mb-6">
            <MapPin className="h-5 w-5" />
            <span className="text-sm tracking-wider uppercase">Hecho en México</span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-8 leading-relaxed">
            Cada prenda tiene nombre y apellido.
            <br />
            <span className="italic text-papachoa-blush-dark">
              Porque detrás hay manos mexicanas
            </span>
          </h2>

          <p className="text-muted-foreground font-light max-w-xl mx-auto mb-12 leading-relaxed">
            Trabajamos con talleres locales bajo principios de comercio justo. 
            Cada pijama, cada cobijo, lleva el cuidado de artesanas que 
            ponen el corazón en cada puntada.
          </p>

          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            <div className="text-center">
              <Heart className="h-6 w-6 mx-auto text-primary mb-3" />
              <p className="text-sm text-muted-foreground">Comercio justo</p>
            </div>
            <div className="text-center">
              <Sparkles className="h-6 w-6 mx-auto text-primary mb-3" />
              <p className="text-sm text-muted-foreground">Hecho a mano</p>
            </div>
            <div className="text-center">
              <MapPin className="h-6 w-6 mx-auto text-primary mb-3" />
              <p className="text-sm text-muted-foreground">100% Mexicano</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MadeInMexico;
