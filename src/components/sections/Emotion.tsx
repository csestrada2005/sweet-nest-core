import lifestyleImage from "@/assets/lifestyle-1.png";

const Emotion = () => {
  return (
    <section className="py-20 md:py-28 bg-papachoa-cream">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Text */}
          <div className="text-center md:text-left order-2 md:order-1">
            <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground leading-relaxed">
              "Papachoa no vende pijamas.
              <br />
              <span className="text-papachoa-blush-dark italic">
                Vende calma, descanso y hogar."
              </span>
            </blockquote>
            <p className="mt-8 text-muted-foreground font-light max-w-md mx-auto md:mx-0">
              Creemos que cada momento de descanso merece sentirse especial. Por eso, 
              cada prenda está pensada para hacer tu hogar más suave.
            </p>
          </div>

          {/* Image */}
          <div className="order-1 md:order-2">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl">
              <img
                src={lifestyleImage}
                alt="Bebé descansando con cobijo Papachoa"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Emotion;
