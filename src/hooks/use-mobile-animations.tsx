import { useMemo } from 'react';
import { useIsMobile } from './use-mobile';

/**
 * Hook that provides mobile-optimized animation variants.
 * On mobile (<768px):
 * - Disables parallax and complex scroll animations
 * - Uses simple fade-in only (no delays between elements)
 * - Removes continuous/loop animations
 */
export function useMobileAnimations() {
  const isMobile = useIsMobile();

  const variants = useMemo(() => ({
    // Simple fade in - no delay, instant appearance
    fadeIn: isMobile
      ? {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          whileInView: { opacity: 1 },
          transition: { duration: 0.2 },
          viewport: { once: true },
        }
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.6 },
          viewport: { once: true },
        },

    // For staggered items - no delay on mobile
    fadeInStagger: (index: number) =>
      isMobile
        ? {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            whileInView: { opacity: 1 },
            transition: { duration: 0.2 },
            viewport: { once: true },
          }
        : {
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
            whileInView: { opacity: 1, y: 0 },
            transition: { duration: 0.5, delay: index * 0.1 },
            viewport: { once: true, margin: '-50px' },
          },

    // Slide animations - disabled on mobile
    slideFromLeft: isMobile
      ? {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          whileInView: { opacity: 1 },
          transition: { duration: 0.2 },
          viewport: { once: true },
        }
      : {
          initial: { opacity: 0, x: -30 },
          animate: { opacity: 1, x: 0 },
          whileInView: { opacity: 1, x: 0 },
          transition: { duration: 0.6 },
          viewport: { once: true },
        },

    slideFromRight: isMobile
      ? {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          whileInView: { opacity: 1 },
          transition: { duration: 0.2 },
          viewport: { once: true },
        }
      : {
          initial: { opacity: 0, x: 30 },
          animate: { opacity: 1, x: 0 },
          whileInView: { opacity: 1, x: 0 },
          transition: { duration: 0.6 },
          viewport: { once: true },
        },

    // Scale - disabled on mobile
    scaleIn: isMobile
      ? {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          whileInView: { opacity: 1 },
          transition: { duration: 0.2 },
          viewport: { once: true },
        }
      : {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          whileInView: { opacity: 1, scale: 1 },
          transition: { duration: 0.4 },
          viewport: { once: true },
        },

    // Hover effects - disabled on mobile
    hoverScale: isMobile ? {} : { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } },
    hoverLift: isMobile ? {} : { whileHover: { y: -8, scale: 1.02 } },
  }), [isMobile]);

  return {
    isMobile,
    variants,
    // Helper to conditionally apply animation props
    getAnimationProps: (variant: keyof typeof variants) => {
      const v = variants[variant];
      if (typeof v === 'function') return {};
      return v;
    },
  };
}
