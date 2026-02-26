import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, Pause, Play } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useIsMobile } from "@/hooks/use-mobile";
import MetaAdsMockup from "./services/MetaAdsMockup";
import GoogleAdsMockup from "./services/GoogleAdsMockup";
import LandingPageMockup from "./services/LandingPageMockup";
import EcommerceMockup from "./services/EcommerceMockup";
import DashboardMockup from "./services/DashboardMockup";
import SoftwareMockup from "./services/SoftwareMockup";

interface Service {
  id: number;
  title: string;
  subtitle: string;
  price: string;
  priceNote?: string;
  features: string[];
  mockup: React.ReactNode;
  bgAccent: string;
  popular?: boolean;
}

const services: Service[] = [
  {
    id: 1,
    title: "Meta Ads",
    subtitle: "Campañas en Facebook e Instagram que convierten visitantes en clientes",
    price: "$300 - $800",
    priceNote: "USD/mes",
    features: [
      "Estrategia de audiencias",
      "Creativos optimizados",
      "A/B Testing continuo",
      "Reportes semanales",
    ],
    mockup: <MetaAdsMockup />,
    bgAccent: "from-blue-500/10 to-blue-600/5",
  },
  {
    id: 2,
    title: "Google Ads",
    subtitle: "Aparece primero cuando tus clientes te buscan",
    price: "$350 - $900",
    priceNote: "USD/mes",
    features: [
      "Búsqueda y Display",
      "Keywords research",
      "Optimización de CPC",
      "Tracking de conversiones",
    ],
    mockup: <GoogleAdsMockup />,
    bgAccent: "from-red-500/10 via-yellow-500/5 to-green-500/10",
  },
  {
    id: 3,
    title: "Landing Page",
    subtitle: "Página optimizada para conversión con diseño impactante",
    price: "$350 - $650",
    priceNote: "USD",
    features: [
      "Diseño 100% personalizado",
      "Mobile-first responsive",
      "Velocidad optimizada",
      "SEO configurado",
    ],
    mockup: <LandingPageMockup />,
    bgAccent: "from-cyan-500/10 to-blue-500/5",
    popular: true,
  },
  {
    id: 4,
    title: "E-commerce",
    subtitle: "Tienda online profesional lista para vender 24/7",
    price: "$800 - $2,500",
    priceNote: "USD",
    features: [
      "Catálogo de productos",
      "Carrito y checkout",
      "Pasarelas de pago",
      "Panel de gestión",
    ],
    mockup: <EcommerceMockup />,
    bgAccent: "from-emerald-500/10 to-teal-500/5",
  },
  {
    id: 5,
    title: "Sistema Web",
    subtitle: "Panel administrativo a medida para gestionar tu negocio",
    price: "$1,200 - $3,000",
    priceNote: "USD",
    features: [
      "Dashboard personalizado",
      "Roles de usuario",
      "Reportes y analytics",
      "Integraciones",
    ],
    mockup: <DashboardMockup />,
    bgAccent: "from-purple-500/10 to-pink-500/5",
  },
  {
    id: 6,
    title: "Software Personalizado",
    subtitle: "Aplicación diseñada específicamente para tu negocio",
    price: "$2,000+",
    priceNote: "USD",
    features: [
      "Análisis de requerimientos",
      "Desarrollo a medida",
      "APIs e integraciones",
      "Soporte continuo",
    ],
    mockup: <SoftwareMockup />,
    bgAccent: "from-cyan-500/10 to-slate-500/5",
  },
];

const ServicesPricing = () => {
  const isMobile = useIsMobile();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentIndex, setCurrentIndex] = useState(0);
  // MOBILE: Disable autoplay completely
  const [isAutoplay, setIsAutoplay] = useState(!isMobile);
  const [progress, setProgress] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Update autoplay state when mobile detection changes
  useEffect(() => {
    if (isMobile) {
      setIsAutoplay(false);
    }
  }, [isMobile]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
    setProgress(0);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Intersection Observer for section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Autoplay logic - DISABLED on mobile
  useEffect(() => {
    // Never autoplay on mobile
    if (isMobile || !isAutoplay || !isInView) {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
      return;
    }

    progressRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0;
        return prev + 2;
      });
    }, 100);

    autoplayRef.current = setInterval(() => {
      scrollNext();
    }, 5000);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isAutoplay, isInView, scrollNext, isMobile]);

  // Keyboard navigation - only on desktop
  useEffect(() => {
    if (isMobile) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isInView) return;
      if (e.key === "ArrowLeft") scrollPrev();
      if (e.key === "ArrowRight") scrollNext();
      if (e.key >= "1" && e.key <= "6") scrollTo(parseInt(e.key) - 1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isInView, scrollPrev, scrollNext, scrollTo, isMobile]);

  const currentService = services[currentIndex];

  // Mobile animation props - instant fade only
  const fadeIn = isMobile
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { duration: 0.15 }, viewport: { once: true } }
    : { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

  return (
    <section 
      ref={sectionRef}
      id="precios" 
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Dynamic Background - static on mobile */}
      {isMobile ? (
        <div className={`absolute inset-0 bg-gradient-to-br ${currentService.bgAccent}`} />
      ) : (
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${currentService.bgAccent}`}
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#06B6D4 1px, transparent 1px), linear-gradient(90deg, #06B6D4 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          {...fadeIn}
          className="text-center mb-16"
        >
          <span className="inline-block text-cyan-500 text-sm font-semibold tracking-wider uppercase mb-4">
            NUESTROS SERVICIOS
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Soluciones{" "}
            <span className="text-cyan-500 font-black">a tu medida</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Soluciones digitales transparentes con precios claros. Sin sorpresas.
          </p>
        </motion.div>

        {/* Main Carousel Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
          {/* Left Side - Content */}
          <div className="order-2 lg:order-1">
            {/* Navigation & Progress */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={scrollPrev}
                  className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:border-cyan-500 hover:text-cyan-500 transition-colors shadow-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={scrollNext}
                  className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:border-cyan-500 hover:text-cyan-500 transition-colors shadow-sm"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-gray-500 text-sm font-medium">
                  {currentIndex + 1} de {services.length}
                </span>
                {/* Hide autoplay button on mobile since it's always off */}
                {!isMobile && (
                  <button
                    onClick={() => setIsAutoplay(!isAutoplay)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      isAutoplay 
                        ? "bg-cyan-500 text-white" 
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {isAutoplay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                )}
              </div>
            </div>

            {/* Progress Bar - only show on desktop when autoplay is active */}
            {!isMobile && (
              <div className="h-1 bg-gray-200 rounded-full mb-8 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            )}

            {/* Service Content - simplified animations on mobile */}
            <AnimatePresence mode="wait">
              {isMobile ? (
                // Mobile: Static content, no exit animations
                <div key={currentIndex}>
                  {currentService.popular && (
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4">
                      <span>⭐</span>
                      MÁS POPULAR
                    </div>
                  )}

                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                    {currentService.title}
                  </h3>

                  <p className="text-gray-600 text-lg mb-6">
                    {currentService.subtitle}
                  </p>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl md:text-5xl font-black text-gray-900">
                        {currentService.price}
                      </span>
                      {currentService.priceNote && (
                        <span className="text-gray-500 text-lg">
                          {currentService.priceNote}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    {currentService.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-cyan-600" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="https://wa.me/5491162000741"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                  >
                    Solicitar Cotización
                    <ChevronRight className="w-5 h-5" />
                  </a>
                </div>
              ) : (
                // Desktop: Full animations
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.4 }}
                >
                  {currentService.popular && (
                    <motion.div
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
                    >
                      <span className="animate-pulse">⭐</span>
                      MÁS POPULAR
                    </motion.div>
                  )}

                  <motion.h3
                    className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {currentService.title}
                  </motion.h3>

                  <motion.p
                    className="text-gray-600 text-lg mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    {currentService.subtitle}
                  </motion.p>

                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl md:text-5xl font-black text-gray-900">
                        {currentService.price}
                      </span>
                      {currentService.priceNote && (
                        <span className="text-gray-500 text-lg">
                          {currentService.priceNote}
                        </span>
                      )}
                    </div>
                  </motion.div>

                  <motion.div
                    className="space-y-3 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                  >
                    {currentService.features.map((feature, i) => (
                      <motion.div
                        key={feature}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                      >
                        <div className="w-6 h-6 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-cyan-600" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.a
                    href="https://wa.me/5491162000741"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Solicitar Cotización
                    <ChevronRight className="w-5 h-5" />
                  </motion.a>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dots Navigation */}
            <div className="flex items-center gap-2 mt-8">
              {services.map((service, i) => (
                <button
                  key={service.id}
                  onClick={() => scrollTo(i)}
                  className={`relative h-2 rounded-full transition-all ${
                    i === currentIndex 
                      ? "w-8 bg-cyan-500" 
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Side - Mockup Carousel */}
          <div className="order-1 lg:order-2">
            <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
              <div className="flex">
                {services.map((service, index) => (
                  <div 
                    key={service.id} 
                    className="flex-[0_0_100%] min-w-0 px-2"
                  >
                    {/* Only render current and adjacent slides for performance */}
                    {Math.abs(currentIndex - index) <= 1 || 
                     (currentIndex === 0 && index === services.length - 1) ||
                     (currentIndex === services.length - 1 && index === 0) ? (
                      <div>
                        {service.mockup}
                      </div>
                    ) : (
                      <div className="aspect-[4/3] bg-gray-100 rounded-xl" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPricing;
