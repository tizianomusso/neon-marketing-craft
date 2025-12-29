import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const CTA = () => {
  const isMobile = useIsMobile();

  const fadeIn = isMobile
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { duration: 0.2 }, viewport: { once: true } }
    : { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

  const fadeInDelay = (delay: number) => isMobile
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { duration: 0.2 }, viewport: { once: true } }
    : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { delay }, viewport: { once: true } };

  const scaleIn = isMobile
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { duration: 0.2 }, viewport: { once: true } }
    : { initial: { opacity: 0, scale: 0.9 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true } };

  return (
    <>
      <section id="contacto" className="py-24 md:py-32 relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
        
        {/* Animated Orbs - static on mobile */}
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-[100px] ${isMobile ? '' : 'animate-pulse'}`} />
        <div className={`absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/30 rounded-full blur-[100px] ${isMobile ? '' : 'animate-pulse'}`} style={isMobile ? {} : { animationDelay: '1s' }} />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            {...fadeIn}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Badge */}
            <motion.div
              {...scaleIn}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Consulta gratuita</span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              {...fadeInDelay(0.1)}
              className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              ¿Listo para{' '}
              <span className="gradient-text">escalar tu negocio</span>?
            </motion.h2>

            {/* Subtext */}
            <motion.p
              {...fadeInDelay(0.2)}
              className="text-muted-foreground text-lg md:text-xl mb-10 max-w-2xl mx-auto"
            >
              Agendá una llamada de diagnóstico gratuita. En 30 minutos te mostramos exactamente cómo podemos ayudarte a crecer.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              {...fadeInDelay(0.3)}
            >
              <a
                href="https://cal.com/tizi-musso-lvxqn1/diagnostico-gratuito"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-primary to-secondary rounded-2xl font-heading font-bold text-lg text-primary-foreground hover:opacity-90 transition-all duration-300 glow-primary"
              >
                Agendar diagnóstico gratuito
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            {/* Trust text */}
            <motion.p
              {...fadeInDelay(0.4)}
              className="mt-8 text-sm text-muted-foreground"
            >
              Sin compromiso. Sin pitch de venta agresivo. Solo estrategia.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default CTA;
