import { motion } from 'framer-motion';
import { BarChart3, Users, Zap, Headphones } from 'lucide-react';

const features = [
  {
    icon: BarChart3,
    title: 'Resultados Medibles',
    description: 'Todo lo que hacemos está respaldado por datos. Reportes transparentes y métricas claras.',
  },
  {
    icon: Users,
    title: 'Equipo Especializado',
    description: 'Profesionales certificados en cada área. Expertos en Meta, Google y desarrollo web.',
  },
  {
    icon: Zap,
    title: 'Tecnología de Punta',
    description: 'Utilizamos las herramientas más avanzadas e IA para maximizar tu rendimiento.',
  },
  {
    icon: Headphones,
    title: 'Soporte Continuo',
    description: 'Comunicación constante y soporte dedicado. Siempre estamos ahí cuando nos necesitas.',
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
            Por qué elegirnos
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            La diferencia{' '}
            <span className="gradient-text">Innova</span>
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
