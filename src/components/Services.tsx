import { motion } from 'framer-motion';
import { Megaphone, MonitorSmartphone, BrainCog } from 'lucide-react';
import ServiceCard from './ServiceCard';
import { useIsMobile } from '@/hooks/use-mobile';
const services = [
  {
    icon: Megaphone,
    title: 'Publicidad Digital',
    description: 'Creamos y gestionamos campañas en Meta Ads y Google Ads enfocadas en atraer clientes listos para comprar. Analizamos datos, optimizamos constantemente y escalamos lo que funciona, construyendo una estructura preparada para sostener y proyectar el crecimiento en el tiempo.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Creación y Optimización Web',
    description: 'Optimizamos páginas web ya existentes en menos de 72hs, mejorando su diseño, UX/UI y experiencia de compra para aumentar conversiones. También creamos sitios y landing pages desde cero, estratégicamente pensados para transformar el tráfico en ventas y crecimiento para tu negocio.',
  },
  {
    icon: BrainCog,
    title: 'Sistema de gestión interno con IA',
    description: 'Centralizamos la información clave de tu negocio en un CRM con IA que te permite visualizar gastos, resultados y rentabilidad en tiempo real. Detecta desvíos, genera alertas y te ayuda a tomar decisiones más rápidas y estratégicas.',
  },
];

const Services = () => {
  const isMobile = useIsMobile();

  const fadeIn = isMobile
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { duration: 0.2 }, viewport: { once: true } }
    : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

  const fadeInDelay = (delay: number) => isMobile
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { duration: 0.2 }, viewport: { once: true } }
    : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { delay }, viewport: { once: true } };

  return (
    <section id="servicios" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient opacity-50" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            {...fadeIn}
            className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4"
          >
            Nuestros Servicios
          </motion.span>
          <motion.h2
            {...fadeInDelay(0.1)}
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            Cómo hacemos crecer{' '}
            <span className="gradient-text">tu negocio</span>
          </motion.h2>
          <motion.p
            {...fadeInDelay(0.2)}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Un sistema completo de crecimiento, no servicios sueltos.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
