import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Target,
  BarChart3,
  Users,
  Eye,
  TrendingUp,
  Zap,
  Search,
  MousePointerClick,
  ShoppingCart,
  LineChart,
  SlidersHorizontal,
  FileText,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const metaAdsFeatures = [
  {
    icon: Users,
    title: 'Segmentación avanzada',
    description: 'Audiencias personalizadas, lookalikes y retargeting para llegar a quienes realmente importan.',
  },
  {
    icon: Eye,
    title: 'Creativos estratégicos',
    description: 'Diseño de piezas adaptadas a cada etapa del embudo: awareness, consideración y conversión.',
  },
  {
    icon: TrendingUp,
    title: 'Optimización continua',
    description: 'A/B testing, análisis de métricas y ajustes semanales para maximizar el ROAS.',
  },
  {
    icon: BarChart3,
    title: 'Reportes detallados',
    description: 'Dashboard con métricas clave: CPA, CPL, ROAS, frecuencia y resultados por campaña.',
  },
];

const googleAdsFeatures = [
  {
    icon: Search,
    title: 'Campañas de búsqueda',
    description: 'Aparecer primero cuando tus clientes buscan lo que ofrecés. Keywords de alta intención comercial.',
  },
  {
    icon: MousePointerClick,
    title: 'Display y remarketing',
    description: 'Banners en la red de Google para recuperar visitantes y generar reconocimiento de marca.',
  },
  {
    icon: ShoppingCart,
    title: 'Shopping y Performance Max',
    description: 'Campañas optimizadas para e-commerce con catálogo de productos y automatización de Google.',
  },
  {
    icon: LineChart,
    title: 'Tracking y conversiones',
    description: 'Implementación de Google Tag Manager, eventos de conversión y atribución precisa.',
  },
];

const metaAdsBenefits = [
  'Estructura de campañas profesional',
  'Testing de audiencias y creativos',
  'Pixel y API de conversiones configurados',
  'Escalado progresivo del presupuesto',
];

const googleAdsBenefits = [
  'Investigación de keywords exhaustiva',
  'Optimización de Quality Score',
  'Extensiones de anuncio configuradas',
  'Estrategias de puja automatizadas',
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground">Meta Ads</h3>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Campañas en Facebook e Instagram diseñadas para generar resultados medibles y escalables.
            </p>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid sm:grid-cols-2 gap-5 mb-12">
            {metaAdsFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group p-6 rounded-2xl border border-border bg-muted/30 hover:border-blue-500/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-5 h-5 text-blue-500" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* What's included */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 md:p-8 rounded-2xl border border-border bg-muted/20"
          >
            <div className="flex items-center gap-2 mb-5">
              <SlidersHorizontal className="w-5 h-5 text-primary" />
              <h4 className="text-lg font-semibold text-foreground">¿Qué incluye nuestro servicio de Meta Ads?</h4>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {metaAdsBenefits.map((b) => (
                <div key={b} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground/80 text-sm">{b}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="h-px bg-border" />
      </div>

      {/* Google Ads Section */}
      <section id="google-ads" className="py-20 md:py-28 scroll-mt-24">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                <Search className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground">Google Ads</h3>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Capturá la demanda existente y aparecé justo cuando tus clientes te están buscando.
            </p>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid sm:grid-cols-2 gap-5 mb-12">
            {googleAdsFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group p-6 rounded-2xl border border-border bg-muted/30 hover:border-red-500/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-5 h-5 text-red-500" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* What's included */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 md:p-8 rounded-2xl border border-border bg-muted/20"
          >
            <div className="flex items-center gap-2 mb-5">
              <FileText className="w-5 h-5 text-primary" />
              <h4 className="text-lg font-semibold text-foreground">¿Qué incluye nuestro servicio de Google Ads?</h4>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {googleAdsBenefits.map((b) => (
                <div key={b} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground/80 text-sm">{b}</span>
                </div>
              ))}
            </div>
          </motion.div>
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
