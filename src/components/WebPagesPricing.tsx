import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

const features = [
  'Diseño 100% personalizado',
  'Optimizado para conversiones',
  'Mobile-first responsive',
  'SEO configurado',
  'Velocidad optimizada',
  'Capacitación incluida',
  'Hosting incluido',
  'Soporte post-lanzamiento',
];

const WebPagesPricing = () => {
  return (
    <section className="py-24 md:py-32 bg-foreground relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-background mb-6 leading-tight">
              Tu Página Web{' '}
              <span className="text-primary">Premium</span>
            </h2>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-heading text-6xl md:text-7xl font-bold text-background">
                $350
              </span>
              <span className="text-2xl text-background/60">USD</span>
            </div>

            {/* Description */}
            <p className="text-lg text-background/70 mb-8 max-w-lg">
              Página web profesional, completamente personalizada y optimizada para convertir. 
              Sin plantillas genéricas, sin limitaciones.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-background/80 text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.a
              href="#contacto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-background text-foreground rounded-xl font-semibold hover:bg-background/90 transition-colors group"
            >
              Crear mi Página
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>

          {/* Right Visual - Website Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Browser Window Mockup */}
            <div className="relative bg-background/10 backdrop-blur-sm rounded-2xl border border-background/20 overflow-hidden shadow-2xl">
              {/* Browser Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-background/5 border-b border-background/10">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-6 bg-background/10 rounded-md w-48" />
                </div>
              </div>

              {/* Website Content */}
              <div className="p-6 space-y-6">
                {/* Nav */}
                <div className="flex items-center justify-between">
                  <div className="h-6 w-20 bg-background/20 rounded" />
                  <div className="flex gap-4">
                    <div className="h-4 w-16 bg-background/10 rounded" />
                    <div className="h-4 w-16 bg-background/10 rounded" />
                    <div className="h-4 w-16 bg-background/10 rounded" />
                  </div>
                </div>

                {/* Hero Section */}
                <div className="py-8 space-y-4">
                  <div className="h-4 w-32 bg-primary/40 rounded" />
                  <div className="h-8 w-3/4 bg-background/20 rounded" />
                  <div className="h-4 w-1/2 bg-background/10 rounded" />
                  <div className="flex gap-3 pt-4">
                    <div className="h-10 w-28 bg-primary rounded-lg" />
                    <div className="h-10 w-28 bg-background/10 rounded-lg border border-background/20" />
                  </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-background/5 rounded-lg p-4 space-y-3 border border-background/10">
                      <div className="h-16 bg-background/10 rounded" />
                      <div className="h-3 w-3/4 bg-background/15 rounded" />
                      <div className="h-2 w-1/2 bg-background/10 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Badge - Delivery Time */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="absolute -top-4 -right-4 md:top-4 md:right-4 bg-background rounded-xl px-5 py-3 shadow-xl"
            >
              <div className="text-center">
                <span className="block font-heading text-3xl font-bold text-foreground">7</span>
                <span className="text-xs text-muted-foreground">días de entrega</span>
              </div>
            </motion.div>

            {/* Floating Badge - Customization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="absolute -bottom-4 left-4 md:bottom-8 md:left-0 bg-background rounded-xl px-5 py-3 shadow-xl"
            >
              <div className="text-center">
                <span className="block font-heading text-2xl font-bold text-foreground">100%</span>
                <span className="text-xs text-muted-foreground">personalizado</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WebPagesPricing;
