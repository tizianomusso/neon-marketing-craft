import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Target,
  BarChart3,
  Search,
  MousePointerClick,
  ShoppingCart,
  LineChart,
  Zap,
  FileText,
  Megaphone,
  Palette,
  DollarSign,
  SlidersHorizontal,
  CalendarCheck,
  CheckCircle2,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import instagramMockup from '@/assets/mockups/instagram-stories-mockup.png';
import googleSearchMockup from '@/assets/mockups/google-search-mockup.png';

const metaCards = [
  {
    icon: Megaphone,
    title: 'Armado de estrategia publicitaria',
    items: [
      'Definición de objetivos comerciales',
      'Planificación de audiencias',
      'Diseño de estructura de campañas',
      'Segmentación avanzada y remarketing',
    ],
  },
  {
    icon: Palette,
    title: 'Diseño y adaptación de creativos',
    items: [
      'Piezas para Feed',
      'Historias y Reels',
      'Carruseles',
      'Adaptación a distintos formatos',
      'Testing de variaciones creativas',
    ],
  },
  {
    icon: DollarSign,
    title: 'Plan de presupuesto',
    items: [
      'Distribución estratégica de inversión',
      'Escalado progresivo según rendimiento',
      'Redistribución inteligente del presupuesto',
    ],
  },
  {
    icon: SlidersHorizontal,
    title: 'Optimización continua',
    items: [
      'Ajustes diarios en función de métricas',
      'Testeo A/B',
      'Mejora de costos por resultado',
      'Optimización de embudos',
    ],
  },
  {
    icon: CalendarCheck,
    title: 'Plan mensual de objetivos',
    items: [
      'Definición de metas claras por período',
      'Análisis de rendimiento',
      'Ajustes estratégicos mes a mes',
      'Proyección de crecimiento',
    ],
  },
];

const googleCards = [
  {
    icon: Search,
    title: 'Armado de estrategia de búsqueda',
    items: [
      'Investigación avanzada de palabras clave',
      'Análisis de intención y volumen',
      'Definición de estructura de campañas',
      'Segmentación geográfica y por dispositivo',
    ],
  },
  {
    icon: FileText,
    title: 'Configuración y desarrollo de anuncios',
    items: [
      'Redacción estratégica orientada a conversión',
      'Implementación de extensiones',
      'Optimización de Quality Score',
      'Ajustes de relevancia y rendimiento',
    ],
  },
  {
    icon: DollarSign,
    title: 'Plan de presupuesto',
    items: [
      'Distribución estratégica según palabras clave',
      'Gestión de pujas',
      'Escalado progresivo según resultados',
    ],
  },
  {
    icon: SlidersHorizontal,
    title: 'Optimización continua',
    items: [
      'Análisis de términos de búsqueda reales',
      'Exclusión de tráfico no relevante',
      'Ajustes diarios en función de métricas',
      'Mejora constante de costos por conversión',
    ],
  },
  {
    icon: CalendarCheck,
    title: 'Plan mensual de objetivos',
    items: [
      'Definición de metas claras',
      'Seguimiento de rendimiento',
      'Ajustes estratégicos mes a mes',
      'Proyección de crecimiento',
    ],
  },
];

const PaidMedia = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <WhatsAppButton />

      {/* Hero / Intro */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
              Paid Media
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Publicidad Digital
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
              Diseñamos estructuras publicitarias en Meta Ads y Google Ads alineadas directamente a tus objetivos comerciales. Cada campaña nace de una estrategia propuesta, se ejecuta con precisión y se optimiza en función de datos reales para escalar resultados de manera sostenible.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto mt-4">
              Trabajamos con segmentación avanzada, creativos adaptados a cada etapa del embudo y análisis continuo para mejorar rendimiento y rentabilidad.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Meta Ads Section */}
      <section id="meta-ads" className="py-20 md:py-28 scroll-mt-24">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          {/* 2-column intro: image + text */}
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center mb-16">
            {/* Image - mobile first */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 flex justify-center order-1 lg:order-2"
            >
              <img
                src={instagramMockup}
                alt="Instagram Ads mockup en smartphone"
                className="w-48 md:w-56 lg:w-full max-w-[280px] drop-shadow-xl"
                loading="lazy"
              />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-3 order-2 lg:order-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-foreground">Meta Ads</h3>
              </div>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4">
                Los anuncios se integran dentro de Facebook e Instagram en formatos como feed, historias, reels y carruseles, adaptándose al comportamiento natural de navegación del usuario.
              </p>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                Meta es uno de los canales digitales con mayor capacidad de segmentación y alcance, permitiendo impactar audiencias específicas en el momento adecuado, según su interés y comportamiento.
              </p>
            </motion.div>
          </div>

          {/* Cards Grid - ¿Qué incluye? */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <h4 className="text-xl md:text-2xl font-bold text-foreground mb-8">
              ¿Qué incluye nuestro servicio en Meta?
            </h4>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {metaCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group p-5 md:p-6 rounded-2xl border border-border bg-muted/30 hover:border-primary/30 transition-colors flex flex-col"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <card.icon className="w-5 h-5 text-primary" />
                </div>
                <h5 className="text-sm md:text-base font-semibold text-foreground mb-3">{card.title}</h5>
                <ul className="space-y-2 flex-1">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-muted-foreground text-xs md:text-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="h-px bg-border" />
      </div>

      {/* Google Ads Section */}
      <section id="google-ads" className="py-20 md:py-28 scroll-mt-24">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          {/* 2-column intro: text + image */}
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center mb-16">
            {/* Image - mobile first */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 flex justify-center order-1 lg:order-2"
            >
              <img
                src={googleSearchMockup}
                alt="Google Ads búsqueda patrocinada mockup"
                className="w-56 md:w-64 lg:w-full max-w-[300px] drop-shadow-xl"
                loading="lazy"
              />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-3 order-2 lg:order-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-foreground">Google Ads</h3>
              </div>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4">
                Google Ads es el principal canal de búsqueda a nivel mundial y uno de los medios más efectivos para captar usuarios con intención activa. A través de este canal, las marcas pueden posicionarse frente a personas que ya están buscando un producto o servicio específico, trabajando sobre búsquedas reales y momentos concretos de decisión.
              </p>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4">
                Nuestro equipo cuenta con experiencia directa trabajando en Google España dentro del área de publicidad digital, participando en la gestión y optimización de campañas desde la propia plataforma.
              </p>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                Esa formación interna nos permite trasladar a nuestros clientes metodologías de trabajo, criterios de análisis y procesos de optimización alineados a los estándares utilizados por Google.
              </p>
            </motion.div>
          </div>

          {/* Cards Grid - ¿Qué incluye? */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <h4 className="text-xl md:text-2xl font-bold text-foreground mb-8">
              ¿Qué incluye nuestro servicio en Google Ads?
            </h4>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {googleCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group p-5 md:p-6 rounded-2xl border border-border bg-muted/30 hover:border-primary/30 transition-colors flex flex-col"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <card.icon className="w-5 h-5 text-primary" />
                </div>
                <h5 className="text-sm md:text-base font-semibold text-foreground mb-3">{card.title}</h5>
                <ul className="space-y-2 flex-1">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-muted-foreground text-xs md:text-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              ¿Listo para escalar tus resultados?
            </h3>
            <p className="text-muted-foreground mb-8">
              Agendá un diagnóstico gratuito y te mostramos cómo podemos mejorar tu publicidad digital.
            </p>
            <a
              href="https://cal.com/tizi-musso-lvxqn1/diagnostico-gratuito"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 h-13 rounded-full bg-primary text-primary-foreground font-medium text-base hover:bg-primary/90 hover:shadow-xl transition-all duration-300"
            >
              Agendar diagnóstico
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PaidMedia;
