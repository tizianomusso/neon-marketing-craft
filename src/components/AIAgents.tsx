import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, MessageSquare, Users, Headphones, BarChart3, Link2 } from 'lucide-react';
import BookingModal from './BookingModal';
import WorkflowAnimation from './ai-agents/WorkflowAnimation';
import { useIsMobile } from '@/hooks/use-mobile';

const benefits = [
  {
    icon: MessageSquare,
    text: 'Respuestas automáticas en WhatsApp e Instagram',
  },
  {
    icon: Users,
    text: 'Seguimiento y nurturing de leads sin intervención',
  },
  {
    icon: Headphones,
    text: 'Atención al cliente 24/7 con IA conversacional',
  },
  {
    icon: BarChart3,
    text: 'Reportes y alertas automáticas',
  },
  {
    icon: Link2,
    text: 'Integración con tu CRM, calendario y herramientas',
  },
];

const AIAgents = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useIsMobile();

  const slideLeft = isMobile
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { duration: 0.2 }, viewport: { once: true } }
    : { initial: { opacity: 0, x: -30 }, whileInView: { opacity: 1, x: 0 }, transition: { duration: 0.8 }, viewport: { once: true } };

  const slideRight = isMobile
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { duration: 0.2 }, viewport: { once: true } }
    : { initial: { opacity: 0, x: 30 }, whileInView: { opacity: 1, x: 0 }, transition: { duration: 0.8, delay: 0.2 }, viewport: { once: true } };

  return (
    <>
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        {/* Background decorations - static on mobile */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px]" />
        </div>

        <div className="container mx-auto px-6 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left column - Content */}
            <motion.div {...slideLeft} className="pl-2 md:pl-0">
              {/* Tagline */}
              <span className="text-cyan-400 text-sm font-semibold tracking-widest mb-4 block">
                AUTOMATIZACIÓN INTELIGENTE
              </span>

              {/* Headline */}
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                Agentes de IA que trabajan por vos 24/7
              </h2>

              {/* Subtitle */}
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                Dejá que la inteligencia artificial se encargue de las tareas repetitivas. 
                Respuestas automáticas, seguimiento de leads, atención al cliente, reportes y más. 
                Vos enfocate en lo que importa.
              </p>

              {/* Benefits list */}
              <ul className="space-y-4 mb-8">
                {benefits.map((benefit, index) => {
                  const itemAnimation = isMobile
                    ? {
                        initial: { opacity: 0 },
                        whileInView: { opacity: 1 },
                        viewport: { once: true },
                        transition: { duration: 0.2 },
                      }
                    : {
                        initial: { opacity: 0, x: -20 },
                        whileInView: { opacity: 1, x: 0 },
                        viewport: { once: true },
                        transition: { duration: 0.5, delay: index * 0.1 },
                      };

                  return (
                    <motion.li
                      key={index}
                      {...itemAnimation}
                      className="flex items-center gap-3"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-cyan-500/20 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-cyan-400" />
                      </div>
                      <span className="text-slate-300">{benefit.text}</span>
                    </motion.li>
                  );
                })}
              </ul>

              {/* CTA */}
              <motion.button
                onClick={() => setIsModalOpen(true)}
                whileHover={isMobile ? undefined : { y: -2 }}
                className="group px-8 py-4 bg-cyan-500 hover:bg-cyan-400 rounded-xl font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 flex items-center gap-2 mb-3"
              >
                Quiero automatizar mi negocio
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <p className="text-slate-400 text-sm">
                Implementación en menos de 2 semanas
              </p>
            </motion.div>

            {/* Right column - Workflow Animation */}
            <motion.div {...slideRight}>
              <WorkflowAnimation />
            </motion.div>
          </div>
        </div>
      </section>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default AIAgents;
