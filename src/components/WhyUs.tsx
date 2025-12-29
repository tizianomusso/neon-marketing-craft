import { motion } from 'framer-motion';
import { Users, BarChart3, Zap, MessageSquare } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Partners, no proveedores',
    description: 'Nos involucramos en tu negocio como si fuera nuestro. Tu crecimiento es nuestro crecimiento.',
  },
  {
    icon: BarChart3,
    title: 'Obsesionados con los datos',
    description: 'Cada decisión respaldada por métricas. Dashboard en tiempo real y total transparencia.',
  },
  {
    icon: Zap,
    title: 'Tecnología de punta',
    description: 'Usamos IA y automatización para hacer en horas lo que antes tomaba días.',
  },
  {
    icon: MessageSquare,
    title: 'Comunicación real',
    description: 'Respuesta en menos de 24hs, reuniones semanales y canal directo con tu equipo.',
  },
];

const WhyUs = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4"
          >
            Lo que nos hace diferentes
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            Por qué elegirnos como{' '}
            <span className="gradient-text">tu partner de growth</span>
          </motion.h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group text-center p-6 md:p-8 rounded-2xl glass-card hover:border-primary/30 transition-colors duration-300"
            >
              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>

              {/* Title */}
              <h3 className="font-heading text-xl font-bold mb-3 text-foreground">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
