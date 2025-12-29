import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import BookingModal from './BookingModal';
import FloatingParticles from './hero/FloatingParticles';
import RotatingText from './hero/RotatingText';
import GrowthFlow from './hero/GrowthFlow';

const clientLogos = [
  { name: 'Cliente 1', placeholder: true },
  { name: 'Cliente 2', placeholder: true },
  { name: 'Cliente 3', placeholder: true },
  { name: 'Cliente 4', placeholder: true },
  { name: 'Cliente 5', placeholder: true },
];

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToNext = () => {
    const nextSection = document.getElementById('servicios');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900">
        {/* Floating particles */}
        <FloatingParticles />
        
        {/* Aurora orb effect */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-[128px] animate-pulse" />
        </div>
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-cyan-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 pt-28 pb-20">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-400" />
            <span className="text-cyan-400 text-sm font-medium tracking-[0.3em]">
              GROWTH MARKETING AGENCY
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-400" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 max-w-5xl mx-auto"
          >
            Transformamos clics en{' '}
            <br className="hidden sm:block" />
            <RotatingText />
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-lg md:text-xl text-slate-400 mb-16"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Paid media
            </motion.span>
            <span className="text-slate-600">·</span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Embudos
            </motion.span>
            <span className="text-slate-600">·</span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              Automatización con IA
            </motion.span>
          </motion.div>

          {/* Growth Flow Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-16"
          >
            <GrowthFlow />
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col items-center gap-4 mb-16"
          >
            <motion.button
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white text-slate-900 font-semibold rounded-full hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-300"
            >
              Activar mi sistema de crecimiento
            </motion.button>
            
            <button
              onClick={scrollToNext}
              className="text-slate-400 hover:text-white transition-colors underline underline-offset-4"
            >
              Ver cómo funciona ↓
            </button>
          </motion.div>

          {/* Client logos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="hidden md:block"
          >
            <p className="text-center text-sm text-slate-500 mb-6">
              Empresas que ya escalaron con nosotros
            </p>
            <div className="flex items-center justify-center gap-8 md:gap-12">
              {clientLogos.map((logo, index) => (
                <motion.div
                  key={index}
                  whileHover={{ filter: 'grayscale(0)', opacity: 1 }}
                  className="w-24 h-8 bg-slate-700/50 rounded flex items-center justify-center filter grayscale opacity-50 transition-all duration-300 cursor-pointer"
                >
                  <span className="text-xs text-slate-400">Logo {index + 1}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={scrollToNext}
          >
            <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center pt-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Hero;
