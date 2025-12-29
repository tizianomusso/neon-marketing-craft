import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

const AnimatedCounter = ({ end, duration = 2, prefix = '', suffix = '', label }: AnimatedCounterProps) => {
  const isMobile = useIsMobile();
  const [count, setCount] = useState(isMobile ? end : 0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    // On mobile: show final number immediately, no animation
    if (isMobile) {
      setCount(end);
      return;
    }

    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration, isMobile]);

  // Mobile: instant fade, no transform
  const animationProps = isMobile
    ? {
        initial: { opacity: 0 },
        animate: isInView ? { opacity: 1 } : {},
        transition: { duration: 0.15 },
      }
    : {
        initial: { opacity: 0, y: 20 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.6 },
      };

  return (
    <motion.div
      ref={ref}
      {...animationProps}
      className="text-center"
    >
      <div className="text-4xl font-bold text-cyan-500 mb-2">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-slate-600 text-sm md:text-base">{label}</div>
    </motion.div>
  );
};

export default AnimatedCounter;
