import { useState } from 'react';
import { motion } from 'framer-motion';
import BookingModal from './BookingModal';
import GradientWaveBackground from './hero/GradientWaveBackground';
import OverlappingLogos from './hero/OverlappingLogos';
import ToolsMarquee from './hero/ToolsMarquee';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useIsMobile();

  // Mobile: instant appearance, no delays
  const fadeIn = isMobile
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2 } }
    : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 } };

  const slideLeft = isMobile
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2 } }
    : { initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.2, duration: 0.6 } };

  const slideRight = isMobile
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2 } }
    : { initial: { opacity: 0, x: 30 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.3, duration: 0.6 } };

  const slideLeft2 = isMobile
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2 } }
    : { initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.5, duration: 0.6 } };

  const slideRight2 = isMobile
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2 } }
    : { initial: { opacity: 0, x: 30 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.4, duration: 0.6 } };

  const buttonAnim = isMobile
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2 } }
    : { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.6, duration: 0.4 } };

  return (
    <>
      <section className="relative min-h-screen overflow-hidden">
        {/* Animated gradient background */}
        <GradientWaveBackground />

        {/* Main content container */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Hero content */}
          <div className="flex-1 flex items-center justify-center px-4 md:px-6 pt-24 pb-12">
            <motion.div
              {...fadeIn}
              className="w-full max-w-7xl mx-auto border border-white/10 rounded-xl backdrop-blur-sm shadow-2xl p-8 lg:p-16"
            >
              {/* Row 1: Paid Media + Description */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-12 mb-8 lg:mb-12">
                <motion.h2
                  {...slideLeft}
                  className="text-4xl md:text-6xl lg:text-8xl font-medium text-white mix-blend-overlay"
                >
                  Paid Media
                </motion.h2>
                
                <motion.p
                  {...slideRight}
                  className="max-w-md text-sm text-white/70 text-center lg:text-right leading-relaxed"
                >
                  Integramos las mejores herramientas de marketing, automatización e inteligencia artificial para crear sistemas de crecimiento predecibles para tu negocio.
                </motion.p>
              </div>

              {/* Row 2: Logos + Automatización IA */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-12 mb-8 lg:mb-12">
                <OverlappingLogos />
                
                <motion.h2
                  {...slideRight2}
                  className="text-3xl md:text-6xl lg:text-8xl font-medium text-white mix-blend-overlay text-center lg:text-right whitespace-nowrap"
                >
                  Automatización IA
                </motion.h2>
              </div>

              {/* Row 3: Escalar & Crecer + CTA Button */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-12">
                <motion.h2
                  {...slideLeft2}
                  className="text-3xl md:text-6xl lg:text-8xl font-medium text-white mix-blend-overlay underline decoration-2 underline-offset-8 text-center w-full lg:w-auto lg:text-left whitespace-nowrap"
                >
                  Escalar & Crecer
                </motion.h2>
                
                <motion.button
                  {...buttonAnim}
                  whileHover={isMobile ? undefined : { scale: 1.05 }}
                  whileTap={isMobile ? undefined : { scale: 0.98 }}
                  onClick={() => setIsModalOpen(true)}
                  className="px-12 lg:px-20 h-14 lg:h-20 rounded-full bg-white/90 text-slate-900 font-medium text-lg hover:bg-white hover:shadow-xl transition-all duration-300 flex-shrink-0"
                >
                  Agendar Diagnóstico
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Tools Marquee */}
          <ToolsMarquee />
        </div>
      </section>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Hero;
