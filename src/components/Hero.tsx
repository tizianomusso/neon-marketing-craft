import { motion } from 'framer-motion';
import GradientWaveBackground from './hero/GradientWaveBackground';
import OverlappingLogos from './hero/OverlappingLogos';
import ToolsMarquee from './hero/ToolsMarquee';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const isMobile = useIsMobile();

  const fadeIn = isMobile
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2 } }
    : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 } };

  const slideUp = (delay: number) =>
    isMobile
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2 } }
      : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: 0.6 } };

  return (
    <section className="relative min-h-screen overflow-hidden">
      <GradientWaveBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center px-4 md:px-6 pt-28 pb-16">
          <motion.div
            {...fadeIn}
            className="w-full max-w-5xl mx-auto"
          >
            {/* Título principal */}
            <motion.h1
              {...slideUp(0.1)}
              className="text-center lg:text-left mb-6"
            >
              <span className="block text-3xl md:text-5xl lg:text-6xl font-medium text-white/90 leading-tight">
                Aceleramos el crecimiento
              </span>
              <span className="block text-3xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mt-1">
                de tu negocio, mejorando cada área.
              </span>
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
              {...slideUp(0.25)}
              className="max-w-2xl text-base md:text-lg text-white/60 leading-relaxed text-center lg:text-left mb-10"
            >
              Analizamos cómo funciona tu negocio hoy y mejoramos cada punto clave utilizando AI como herramienta para simplificar, ordenar y acelerar.
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...slideUp(0.4)}
              className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-14"
            >
              <a
                href="https://cal.com/tizi-musso-lvxqn1/diagnostico-gratuito"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-10 h-13 rounded-full bg-white text-slate-900 font-medium text-base hover:bg-white/90 hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center"
              >
                Empezar ahora
              </a>
              <a
                href="#servicios"
                className="w-full sm:w-auto px-10 h-13 rounded-full border border-white/20 text-white/80 font-medium text-base hover:border-white/40 hover:text-white transition-all duration-300 inline-flex items-center justify-center"
              >
                Ver servicios
              </a>
            </motion.div>

            {/* Logos */}
            <motion.div {...slideUp(0.55)}>
              <OverlappingLogos />
            </motion.div>
          </motion.div>
        </div>

        <ToolsMarquee />
      </div>
    </section>
  );
};

export default Hero;
