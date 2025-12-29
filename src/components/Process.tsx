import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Search, Target, Rocket, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Diagnóstico',
    description: 'Analizamos tu negocio, competencia y oportunidades. Identificamos qué frena tu crecimiento y qué palancas podemos activar para acelerarlo.',
  },
  {
    icon: Target,
    number: '02',
    title: 'Estrategia',
    description: 'Diseñamos un plan de growth a medida con KPIs claros, canales prioritarios y un roadmap de 90 días. Nada de templates genéricos.',
  },
  {
    icon: Rocket,
    number: '03',
    title: 'Ejecución',
    description: 'Implementamos campañas, construimos assets y configuramos automatizaciones. Vos te enfocás en tu negocio, nosotros en hacerlo crecer.',
  },
  {
    icon: TrendingUp,
    number: '04',
    title: 'Optimización',
    description: 'Analizamos datos, iteramos rápido y escalamos lo que funciona. Reuniones semanales para que siempre sepas qué está pasando.',
  },
];

const Process = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);

  return (
    <section id="proceso" className="py-24 md:py-32 relative overflow-hidden bg-card/30">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4"
          >
            El Método Innova
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            Un proceso probado para llevar tu negocio{' '}
            <span className="gradient-text">donde querés que esté</span>
          </motion.h2>
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* Progress Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-primary to-secondary"
            />
          </div>

          {/* Steps */}
          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ml-20 md:ml-0 ${index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:pl-16'}`}>
                  <span className="text-5xl md:text-6xl font-heading font-bold text-border/50 mb-2 block">
                    {step.number}
                  </span>
                  <h3 className="font-heading text-2xl font-bold mb-3 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                {/* Icon Node */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
                  <step.icon className="w-7 h-7 text-primary-foreground" />
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
