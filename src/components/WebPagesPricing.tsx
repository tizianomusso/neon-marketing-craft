import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Sparkles, Copy } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import InteractiveMockup from './pricing/InteractiveMockup';
import AnimatedPriceCounter from './pricing/AnimatedPriceCounter';
import EpicCTAButton from './pricing/EpicCTAButton';
import FloatingBadge from './pricing/FloatingBadge';
import PricingBackground from './pricing/PricingBackground';

const features = [
  { text: 'Diseño 100% personalizado', tooltip: 'Cada pixel diseñado específicamente para tu marca' },
  { text: 'Optimizado para conversiones', tooltip: 'Estrategias UX probadas para maximizar ventas' },
  { text: 'Mobile-first responsive', tooltip: 'Perfecto en todos los dispositivos' },
  { text: 'SEO configurado', tooltip: 'Optimizado para aparecer en Google' },
  { text: 'Velocidad optimizada', tooltip: 'Carga en menos de 2 segundos' },
  { text: 'Capacitación incluida', tooltip: 'Te enseñamos a gestionar tu sitio' },
  { text: 'Hosting incluido', tooltip: '1 año de hosting premium gratis' },
  { text: 'Soporte post-lanzamiento', tooltip: '30 días de soporte técnico incluido' },
];

const WebPagesPricing = () => {
  const [isInView, setIsInView] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [premiumHoverTime, setPremiumHoverTime] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring for cursor light effect
  const springConfig = { damping: 25, stiffness: 150 };
  const cursorXSpring = useSpring(mouseX, springConfig);
  const cursorYSpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseX, mouseY]);

  // Easter egg: confetti after 3 seconds hover on Premium
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (premiumHoverTime > 0) {
      interval = setInterval(() => {
        setPremiumHoverTime((prev) => {
          if (prev >= 3) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 2000);
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [premiumHoverTime > 0]);

  const handleCopyPrice = () => {
    navigator.clipboard.writeText('$350 USD');
    toast.success('¡Precio copiado al clipboard!', {
      icon: <Copy className="w-4 h-4" />,
    });
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-foreground relative overflow-hidden selection:bg-primary selection:text-primary-foreground"
      style={{ minHeight: '100vh' }}
    >
      {/* Animated Background */}
      <PricingBackground cursorX={cursorXSpring} cursorY={cursorYSpring} />

      {/* Confetti Easter Egg */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50"
          >
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: '50%',
                  y: '40%',
                  scale: 0,
                }}
                animate={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  scale: [0, 1, 0],
                  rotate: Math.random() * 720,
                }}
                transition={{
                  duration: 2,
                  ease: 'easeOut',
                  delay: Math.random() * 0.3,
                }}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: i % 2 === 0 ? '#06B6D4' : '#3B82F6',
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            onViewportEnter={() => setIsInView(true)}
          >
            {/* Title with effects */}
            <div className="mb-6">
              <motion.h2
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-background leading-tight"
              >
                Tu Página Web
              </motion.h2>
              <motion.div
                className="relative inline-block"
                onMouseEnter={() => setPremiumHoverTime(0.1)}
                onMouseLeave={() => setPremiumHoverTime(0)}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text relative inline-block"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #06B6D4, #3B82F6, #06B6D4)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 3s linear infinite',
                  }}
                >
                  {'Premium'.split('').map((letter, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
                      className="inline-block"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.span>
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 blur-2xl opacity-50"
                  style={{
                    background: 'linear-gradient(90deg, #06B6D4, #3B82F6)',
                  }}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>
            </div>

            {/* Animated Price */}
            <motion.div
              className="flex items-baseline gap-2 mb-6 cursor-pointer group"
              onClick={handleCopyPrice}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <AnimatedPriceCounter isInView={isInView} />
              <span className="text-2xl text-background/60">USD</span>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="ml-2"
              >
                <Copy className="w-5 h-5 text-background/40 group-hover:text-primary transition-colors" />
              </motion.div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-background/70 mb-8 max-w-lg"
            >
              Página web profesional, completamente personalizada y optimizada para convertir.
              Sin plantillas genéricas, sin limitaciones.
            </motion.p>

            {/* Features Grid with stagger */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.08 }}
                  className="relative"
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <motion.div
                    className="flex items-center gap-3 cursor-pointer"
                    whileHover={{ x: 5, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <motion.div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 relative"
                      initial={{ backgroundColor: 'rgba(156, 163, 175, 0.2)' }}
                      whileInView={{ backgroundColor: 'rgba(6, 182, 212, 0.2)' }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + index * 0.08 }}
                    >
                      <motion.div
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.9 + index * 0.08 }}
                      >
                        <Check className="w-3 h-3 text-primary" />
                      </motion.div>
                      {hoveredFeature === index && (
                        <motion.div
                          layoutId="feature-glow"
                          className="absolute inset-0 rounded-full bg-primary/30 blur-md"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1.5 }}
                          exit={{ scale: 0 }}
                        />
                      )}
                    </motion.div>
                    <span className="text-background/80 text-sm hover:text-background transition-colors">
                      {feature.text}
                    </span>
                  </motion.div>

                  {/* Tooltip */}
                  <AnimatePresence>
                    {hoveredFeature === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 -bottom-12 z-20 px-3 py-2 bg-background text-foreground text-xs rounded-lg shadow-xl whitespace-nowrap"
                      >
                        {feature.tooltip}
                        <div className="absolute -top-1 left-4 w-2 h-2 bg-background rotate-45" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Epic CTA Button */}
            <EpicCTAButton />
          </motion.div>

          {/* Right Visual - Interactive 3D Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <InteractiveMockup />

            {/* Floating Badges */}
            <FloatingBadge
              position="top-right"
              value="7"
              label="días de entrega"
              delay={0.5}
            />
            <FloatingBadge
              position="bottom-left"
              value="100%"
              label="personalizado"
              delay={0.6}
              showProgress
            />
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
};

export default WebPagesPricing;
