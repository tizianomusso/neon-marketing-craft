import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import ParticleBackground from './ParticleBackground';
import AnimatedCounter from './AnimatedCounter';
import BookingModal from './BookingModal';
import HeroMockup from './HeroMockup';

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 mesh-gradient" />
        <ParticleBackground />
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] animate-pulse" style={{
          animationDelay: '1s'
        }} />

        <div className="container mx-auto px-4 md:px-6 relative z-10 pt-20">
          <div className="max-w-6xl mx-auto">
            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Column - Text Content */}
              <div className="text-center lg:text-left">
                {/* Headline */}
                <motion.h1 initial={{
                  opacity: 0,
                  y: 30
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  duration: 0.8,
                  delay: 0.2
                }} className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Escalamos tu negocio con{' '}
                  <span className="gradient-text">estrategias digitales</span>{' '}
                  que generan resultados
                </motion.h1>

                {/* Subheadline */}
                <motion.p initial={{
                  opacity: 0,
                  y: 30
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  duration: 0.8,
                  delay: 0.4
                }} className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                  Somos expertos en publicidad digital, desarrollo web y automatizaciones con IA. 
                  Transformamos tu inversión en crecimiento medible.
                </motion.p>

                {/* CTAs */}
                <motion.div initial={{
                  opacity: 0,
                  y: 30
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  duration: 0.8,
                  delay: 0.6
                }} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="group px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-xl font-semibold text-primary-foreground hover:opacity-90 transition-all duration-300 glow-primary flex items-center gap-2"
                  >
                    Agenda una llamada
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <a href="#portfolio" className="group px-8 py-4 rounded-xl font-semibold text-foreground border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Ver casos de éxito
                  </a>
                </motion.div>

                {/* Stats */}
                <motion.div initial={{
                  opacity: 0,
                  y: 40
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  duration: 0.8,
                  delay: 0.8
                }} className="grid grid-cols-3 gap-4 md:gap-8 max-w-md mx-auto lg:mx-0">
                  <AnimatedCounter end={100} suffix="%" label="Transparencia" />
                  <AnimatedCounter end={20} suffix="" label="Clientes Activos" />
                  <AnimatedCounter end={10} suffix="x" label="ROAS Promedio" />
                </motion.div>
              </div>

              {/* Right Column - Interactive Mockup */}
              <div className="hidden lg:block">
                <HeroMockup />
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            duration: 1,
            delay: 1.2
          }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-muted-foreground">Scroll</span>
              <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
                <motion.div animate={{
                  y: [0, 12, 0]
                }} transition={{
                  duration: 1.5,
                  repeat: Infinity
                }} className="w-1.5 h-1.5 bg-primary rounded-full" />
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