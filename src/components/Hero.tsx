import { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, ChevronDown } from 'lucide-react';
import BookingModal from './BookingModal';
import OrbitingLogos from './hero/OrbitingLogos';

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
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: '#09090b' }}
      >
        {/* Orbiting logos background */}
        <OrbitingLogos />

        {/* Content */}
        <div className="relative z-20 container mx-auto px-4 md:px-6 text-center">
          {/* Logo/Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Rocket className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-6 max-w-4xl mx-auto"
          >
            Escalá tu negocio con el poder de la{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              IA
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg text-zinc-400 text-center max-w-xl mx-auto mb-10"
          >
            Integramos Meta, Google, ChatGPT y +15 herramientas para crear tu sistema de crecimiento automatizado.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-cyan-500 text-white font-semibold rounded-full hover:brightness-110 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
            >
              Agendar diagnóstico gratuito
            </motion.button>
            
            <button
              onClick={scrollToNext}
              className="px-8 py-4 border border-zinc-700 text-zinc-300 rounded-full hover:border-zinc-500 hover:text-white transition-all duration-300"
            >
              Ver cómo funciona
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={scrollToNext}
          >
            <ChevronDown className="w-6 h-6 text-zinc-500" />
          </motion.div>
        </motion.div>
      </section>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Hero;
