import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

const projects = [
  {
    id: 1,
    name: 'TechStart',
    industry: 'SaaS',
    result: '+340% ROAS',
    description: 'Startup tecnológica que triplicó sus ventas en 3 meses',
    gradient: 'from-blue-500 to-purple-600',
  },
  {
    id: 2,
    name: 'FashionHub',
    industry: 'E-commerce',
    result: '+$500K ventas',
    description: 'Tienda de moda que escaló a 6 cifras mensuales',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    id: 3,
    name: 'FinanceApp',
    industry: 'Fintech',
    result: '15K leads',
    description: 'App financiera con campañas de generación de leads',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    id: 4,
    name: 'HealthPlus',
    industry: 'Salud',
    result: '+250% conversiones',
    description: 'Clínica que multiplicó sus citas agendadas',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    id: 5,
    name: 'EduLearn',
    industry: 'Educación',
    result: '10K estudiantes',
    description: 'Plataforma educativa con expansión internacional',
    gradient: 'from-amber-500 to-orange-600',
  },
];

const Portfolio = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="portfolio" className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4"
          >
            Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            Casos de{' '}
            <span className="gradient-text">éxito</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Resultados reales de clientes que confiaron en nosotros para escalar sus negocios.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer ${
                index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
              }`}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
              
              {/* Content */}
              <div className={`relative glass-card p-6 md:p-8 h-full ${index === 0 ? 'min-h-[400px]' : 'min-h-[200px]'} flex flex-col justify-end`}>
                {/* Industry Badge */}
                <span className="absolute top-6 left-6 px-3 py-1 rounded-full bg-foreground/10 text-xs font-medium text-foreground">
                  {project.industry}
                </span>

                {/* Result Badge */}
                <motion.div
                  initial={false}
                  animate={{
                    scale: hoveredId === project.id ? 1.05 : 1,
                  }}
                  className="absolute top-6 right-6 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary"
                >
                  <span className="text-sm font-bold text-primary-foreground">
                    {project.result}
                  </span>
                </motion.div>

                {/* Info */}
                <div className="mt-auto">
                  <h3 className="font-heading text-2xl font-bold mb-2 text-foreground">
                    {project.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {project.description}
                  </p>
                  
                  {/* CTA */}
                  <motion.div
                    initial={false}
                    animate={{
                      x: hoveredId === project.id ? 0 : -10,
                      opacity: hoveredId === project.id ? 1 : 0,
                    }}
                    className="flex items-center gap-2 text-primary font-medium"
                  >
                    <span>Ver caso completo</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
