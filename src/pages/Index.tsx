import { useState, useEffect, lazy, Suspense, memo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CustomCursor from '@/components/CustomCursor';
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhatsAppButton from '@/components/WhatsAppButton';

// Lazy load sections below the fold
const Services = lazy(() => import('@/components/Services'));
const ServicesPricing = lazy(() => import('@/components/ServicesPricing'));
const AIAgents = lazy(() => import('@/components/AIAgents'));
const CRMShowcase = lazy(() => import('@/components/CRMShowcase'));
const Process = lazy(() => import('@/components/Process'));
const Portfolio = lazy(() => import('@/components/Portfolio'));
const WhyUs = lazy(() => import('@/components/WhyUs'));
const CTA = lazy(() => import('@/components/CTA'));
const Footer = lazy(() => import('@/components/Footer'));

// Loading placeholder for lazy sections
const SectionPlaceholder = memo(() => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
));

SectionPlaceholder.displayName = 'SectionPlaceholder';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Intersection observer to trigger lazy loading 200px before sections are visible
  const { ref: servicesRef, inView: servicesInView } = useInView({
    triggerOnce: true,
    rootMargin: '200px',
  });

  const { ref: midRef, inView: midInView } = useInView({
    triggerOnce: true,
    rootMargin: '200px',
  });

  const { ref: lowerRef, inView: lowerInView } = useInView({
    triggerOnce: true,
    rootMargin: '200px',
  });

  useEffect(() => {
    // Reduced loading time for better perceived performance
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      <CustomCursor />
      
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          
          {/* Services section - loads first after hero */}
          <div ref={servicesRef}>
            {servicesInView && (
              <Suspense fallback={<SectionPlaceholder />}>
                <Services />
                <ServicesPricing />
              </Suspense>
            )}
          </div>
          
          {/* Mid sections */}
          <div ref={midRef}>
            {midInView && (
              <Suspense fallback={<SectionPlaceholder />}>
                <AIAgents />
                <CRMShowcase />
                <Process />
              </Suspense>
            )}
          </div>
          
          {/* Lower sections */}
          <div ref={lowerRef}>
            {lowerInView && (
              <Suspense fallback={<SectionPlaceholder />}>
                <Portfolio />
                <WhyUs />
                <CTA />
              </Suspense>
            )}
          </div>
        </main>
        
        {/* Footer lazy loaded */}
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
        
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Index;
