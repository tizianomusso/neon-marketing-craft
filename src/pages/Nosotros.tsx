import { motion } from 'framer-motion';
import { Rocket, Database, Smartphone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import WhatsAppButton from '@/components/WhatsAppButton';

const timelineItems = [
  {
    icon: Rocket,
    title: 'Cómo comenzamos',
    description:
      'Arrancamos como una agencia de marketing digital en Buenos Aires con un objetivo claro: ayudar a negocios a escalar usando estrategias de performance. Desde el día uno, nos enfocamos en resultados medibles, no en métricas de vanidad.',
    highlight: 'Más de 50 clientes escalados en el primer año',
  },
  {
    icon: Database,
    title: 'Nuestro CRM personalizado',
    description:
      'Cansados de usar herramientas genéricas que no se adaptaban a nuestras necesidades, decidimos construir nuestro propio CRM. Una plataforma diseñada específicamente para agencias de marketing que integra leads, campañas, seguimiento y reportes en un solo lugar.',
    highlight: 'Usado internamente para gestionar +200 campañas',
  },
  {
    icon: Smartphone,
    title: 'Próximamente: Nuestra app',
    description:
      'Estamos desarrollando una aplicación móvil que permitirá a nuestros clientes tener toda la información de sus campañas en la palma de su mano. Reportes en tiempo real, métricas clave y comunicación directa con el equipo.',
    highlight: 'Lanzamiento previsto para 2025',
    comingSoon: true,
  },
];

const Nosotros = () => {
  return (
    <>
      <CustomCursor />
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main>
          {/* Hero Section */}
          <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 md:px-6 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4"
                >
                  Nuestra historia
                </motion.span>
                
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                >
                  De agencia a{' '}
                  <span className="gradient-text">builders de software</span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
                >
                  No solo hacemos marketing. Construimos las herramientas que usamos para 
                  escalar negocios, y ahora las compartimos con vos.
                </motion.p>
              </div>
            </div>
          </section>

          {/* Timeline Section */}
          <section className="py-20 md:py-28">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-4xl mx-auto">
                {timelineItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className="relative pl-16 md:pl-24 pb-16 last:pb-0"
                  >
                    {/* Timeline line */}
                    {index !== timelineItems.length - 1 && (
                      <div className="absolute left-6 md:left-10 top-16 bottom-0 w-px bg-gradient-to-b from-primary/50 to-transparent" />
                    )}
                    
                    {/* Icon */}
                    <div className={`absolute left-0 md:left-4 top-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                      item.comingSoon 
                        ? 'bg-gradient-to-br from-muted to-muted/50 border border-border' 
                        : 'bg-gradient-to-br from-primary to-secondary'
                    }`}>
                      <item.icon className={`w-6 h-6 ${item.comingSoon ? 'text-muted-foreground' : 'text-primary-foreground'}`} />
                    </div>
                    
                    {/* Content */}
                    <div className="glass-card p-6 md:p-8 rounded-2xl">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground">
                          {item.title}
                        </h3>
                        {item.comingSoon && (
                          <span className="px-3 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full">
                            Próximamente
                          </span>
                        )}
                      </div>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {item.description}
                      </p>
                      
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-sm font-medium text-foreground">
                          {item.highlight}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 md:py-28 bg-card/30">
            <div className="container mx-auto px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto text-center"
              >
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                  ¿Querés que escalemos tu negocio{' '}
                  <span className="gradient-text">juntos?</span>
                </h2>
                
                <p className="text-muted-foreground text-lg mb-8">
                  Usamos las mismas herramientas y estrategias que nos permitieron crecer 
                  para ayudar a nuestros clientes a alcanzar sus objetivos.
                </p>
                
                <Link
                  to="/#contacto"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity group"
                >
                  Hablemos de tu proyecto
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Nosotros;
