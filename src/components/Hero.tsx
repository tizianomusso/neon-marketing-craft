import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import BookingModal from './BookingModal';
import AnimatedDashboard from './hero/AnimatedDashboard';

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-50">
        {/* Background pattern - subtle dots */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #64748b 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        
        {/* Floating circles */}
        <div className="absolute top-20 left-[10%] w-32 h-32 bg-cyan-400/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-40 right-[15%] w-24 h-24 bg-cyan-400/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-32 left-[20%] w-20 h-20 bg-cyan-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 right-[25%] w-28 h-28 bg-cyan-400/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-[60%] left-[5%] w-16 h-16 bg-blue-400/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[30%] right-[5%] w-20 h-20 bg-blue-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.8s' }} />

        <div className="container mx-auto px-4 md:px-6 relative z-10 pt-28 pb-16">
          {/* Two column layout */}
          <div className="grid lg:grid-cols-[55%_45%] gap-12 lg:gap-8 items-center">
            {/* Left column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 mb-6">
                Construimos sistemas de{' '}
                <span className="bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">
                  crecimiento predecible
                </span>{' '}
                para negocios ambiciosos
              </h1>

              {/* Subtitle */}
              <p className="text-xl text-slate-600 leading-relaxed mb-8">
                Combinamos paid media, embudos de conversión y automatización con IA para que cada peso invertido se multiplique de forma consistente.{' '}
                <span className="font-medium text-slate-800">
                  Sin promesas vacías, solo datos y resultados.
                </span>
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <motion.button
                  onClick={() => setIsModalOpen(true)}
                  whileHover={{ y: -2 }}
                  className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-xl font-semibold text-white shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 flex items-center gap-2"
                >
                  Agendar diagnóstico gratuito
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                
                <a 
                  href="#proceso" 
                  className="group px-8 py-4 rounded-xl font-semibold text-slate-700 border-2 border-slate-300 hover:border-cyan-500 hover:text-cyan-600 transition-all duration-300 flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Ver cómo lo hacemos
                </a>
              </div>
            </motion.div>

            {/* Right column - Dashboard */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:pl-8"
            >
              <AnimatedDashboard />
            </motion.div>
          </div>

          {/* Metrics bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 pt-12 border-t border-slate-200"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <AnimatedCounter end={500} prefix="+$" suffix="K" label="Generados para clientes" />
              </div>
              <div className="text-center border-x-0 sm:border-x border-slate-200 px-8">
                <AnimatedCounter end={50} prefix="+" suffix="" label="Proyectos ejecutados" />
              </div>
              <div className="text-center">
                <AnimatedCounter end={10} suffix="x" label="ROAS promedio" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Hero;
