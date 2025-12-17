import { motion, useSpring, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

interface AnimatedPriceCounterProps {
  isInView: boolean;
}

const AnimatedPriceCounter = ({ isInView }: AnimatedPriceCounterProps) => {
  const [showSparkles, setShowSparkles] = useState(false);
  const springValue = useSpring(0, { stiffness: 50, damping: 20 });
  const displayValue = useTransform(springValue, (val) => Math.round(val));
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      springValue.set(350);
      
      // Show sparkles when animation completes
      const timeout = setTimeout(() => {
        setShowSparkles(true);
        setTimeout(() => setShowSparkles(false), 1500);
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [isInView, springValue]);

  useEffect(() => {
    const unsubscribe = displayValue.on('change', (val) => {
      setCurrentValue(val);
    });
    return unsubscribe;
  }, [displayValue]);

  return (
    <div className="relative">
      <motion.span
        className="font-heading text-6xl md:text-7xl font-bold text-background relative inline-block"
        animate={showSparkles ? {
          scale: [1, 1.05, 1],
        } : {}}
        transition={{ duration: 0.3 }}
      >
        ${currentValue}
        
        {/* Sparkles effect */}
        {showSparkles && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 1,
                  scale: 0,
                  x: 0,
                  y: 0,
                }}
                animate={{
                  opacity: [1, 0],
                  scale: [0, 1],
                  x: (Math.random() - 0.5) * 100,
                  y: (Math.random() - 0.5) * 100,
                }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.05,
                  ease: 'easeOut',
                }}
                className="absolute top-1/2 left-1/2 pointer-events-none"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="#06B6D4"
                  className="animate-spin"
                >
                  <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                </svg>
              </motion.div>
            ))}
          </>
        )}
      </motion.span>
      
      {/* Glow under price */}
      <motion.div
        className="absolute -bottom-2 left-0 right-0 h-8 blur-xl"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.3), transparent)',
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
    </div>
  );
};

export default AnimatedPriceCounter;
