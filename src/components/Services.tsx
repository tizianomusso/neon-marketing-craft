import { motion } from 'framer-motion';
import { Target, Layout, Zap, BarChart3 } from 'lucide-react';
import ServiceCard from './ServiceCard';

const services = [
  {
    icon: Target,
    title: 'Sistema de Adquisición',
    description: 'Creamos máquinas de generación de leads y ventas que funcionan mientras dormís. Estrategia, ejecución y optimización constante en Meta Ads, Google Ads y TikTok Ads.',
  },
  {
    icon: Layout,
    title: 'Assets de Conversión',
    description: 'Landing pages, sitios web y embudos diseñados para convertir visitantes en clientes. No hacemos páginas bonitas, hacemos páginas que venden.',
  },
  {
    icon: Zap,
    title: 'Operaciones Inteligentes',
    description: 'Automatizamos tu seguimiento, nurturing y atención al cliente con IA. Escalá tu operación sin contratar más personal.',
  },
  {
    icon: BarChart3,
    title: 'Data & Analytics',
    description: 'Dashboards en tiempo real, tracking avanzado y reportes que te muestran exactamente qué está funcionando y dónde están las oportunidades.',
  },
];

const Services = () => {
  return (
    <section id="servicios" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient opacity-50" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4"
          >
            Nuestros Servicios
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            Cómo hacemos crecer{' '}
            <span className="gradient-text">tu negocio</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Un sistema completo de crecimiento, no servicios sueltos.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
