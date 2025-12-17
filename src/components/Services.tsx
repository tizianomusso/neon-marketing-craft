import { motion } from 'framer-motion';
import { Facebook, Search, Layout, ShoppingCart, Monitor, Code2 } from 'lucide-react';
import ServiceCard from './ServiceCard';

const services = [
  {
    icon: Facebook,
    title: 'Meta Ads',
    description: 'Campañas en Facebook e Instagram que convierten. Llegamos a tu audiencia ideal con creativos que generan resultados.',
  },
  {
    icon: Search,
    title: 'Google Ads',
    description: 'Aparece primero cuando tus clientes te buscan. Maximizamos tu ROI con campañas de búsqueda y display optimizadas.',
  },
  {
    icon: Layout,
    title: 'Landing Pages',
    description: 'Páginas diseñadas para convertir visitantes en clientes. Optimizadas para velocidad y conversión.',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce',
    description: 'Tiendas online optimizadas para vender 24/7. Integraciones de pago y logística sin complicaciones.',
  },
  {
    icon: Monitor,
    title: 'Sistemas Web',
    description: 'Dashboards y paneles admin a medida. Automatiza procesos y gestiona tu negocio de forma eficiente.',
  },
  {
    icon: Code2,
    title: 'Desarrollo de Software',
    description: 'Soluciones tecnológicas personalizadas. Desde APIs hasta aplicaciones complejas adaptadas a tu negocio.',
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
            Soluciones que impulsan{' '}
            <span className="gradient-text">tu crecimiento</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Combinamos creatividad, tecnología y datos para crear estrategias que realmente funcionan.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
