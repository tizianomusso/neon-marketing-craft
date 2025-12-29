import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const testimonials = [
  {
    id: 1,
    name: 'María García',
    role: 'CEO',
    company: 'TechStart',
    quote: 'Innova Solutions transformó completamente nuestra estrategia digital. En 3 meses triplicamos nuestro ROAS y redujimos el costo por adquisición a la mitad.',
    avatar: 'MG',
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    role: 'Director de Marketing',
    company: 'FashionHub',
    quote: 'El equipo entiende perfectamente las necesidades del e-commerce. Pasamos de $50K a $500K mensuales en ventas gracias a su gestión de campañas.',
    avatar: 'CR',
  },
  {
    id: 3,
    name: 'Ana López',
    role: 'Fundadora',
    company: 'HealthPlus',
    quote: 'Profesionales, creativos y orientados a resultados. Nuestra landing page convierte el doble que antes y el sistema web que nos desarrollaron es increíble.',
    avatar: 'AL',
  },
];

const Testimonials = () => {
  const isMobile = useIsMobile();
  
  // Mobile: instant fade, no hover
  const cardAnimation = (index: number) => isMobile
    ? {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true },
        transition: { duration: 0.15 },
      }
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.5, delay: index * 0.15 },
        whileHover: { y: -5 },
      };

  return (
    <section id="testimonios" className="py-24 md:py-32 relative overflow-hidden bg-card/30">
      {/* Background decoration - hidden on mobile for performance */}
      {!isMobile && (
        <>
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
        </>
      )}

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
            Lo que dicen nuestros clientes
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Resultados reales de{' '}
            <span className="gradient-text">negocios reales</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              {...cardAnimation(index)}
              className="relative p-6 md:p-8 rounded-2xl glass-card group"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-2 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                <Quote className="w-5 h-5 text-primary-foreground" />
              </div>

              {/* Quote */}
              <p className="text-muted-foreground leading-relaxed mb-6 mt-4">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="font-heading font-bold text-primary-foreground">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <div className="font-heading font-bold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
