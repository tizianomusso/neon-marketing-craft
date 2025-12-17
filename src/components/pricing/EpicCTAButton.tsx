import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState, useRef } from 'react';

const EpicCTAButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Create hover particles
    const newParticles = [...Array(6)].map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setParticles(newParticles);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Add ripple
    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1000);

    // Click animation
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
  };

  return (
    <motion.a
      ref={buttonRef}
      href="#contacto"
      className="relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold overflow-hidden group"
      style={{
        background: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 50%, #3B82F6 100%)',
        backgroundSize: '200% 200%',
      }}
      animate={{
        backgroundPosition: isHovered ? ['0% 0%', '100% 100%'] : '0% 0%',
        scale: isClicked ? 0.95 : isHovered ? 1.05 : 1,
      }}
      transition={{
        backgroundPosition: {
          duration: 1.5,
          repeat: isHovered ? Infinity : 0,
          repeatType: 'reverse',
        },
        scale: {
          type: 'spring',
          stiffness: 400,
          damping: 15,
        },
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => {
        setIsHovered(false);
        setParticles([]);
      }}
      onClick={handleClick}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={{
          boxShadow: isHovered
            ? [
                '0 0 20px rgba(6, 182, 212, 0.5), 0 0 40px rgba(6, 182, 212, 0.3)',
                '0 0 30px rgba(6, 182, 212, 0.7), 0 0 60px rgba(6, 182, 212, 0.4)',
                '0 0 20px rgba(6, 182, 212, 0.5), 0 0 40px rgba(6, 182, 212, 0.3)',
              ]
            : '0 0 0 rgba(6, 182, 212, 0)',
        }}
        transition={{
          duration: 1,
          repeat: isHovered ? Infinity : 0,
        }}
      />

      {/* Ripple effects */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute rounded-full bg-white/30 pointer-events-none"
            style={{
              width: 50,
              height: 50,
              left: ripple.x - 25,
              top: ripple.y - 25,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Hover particles */}
      <AnimatePresence>
        {isHovered &&
          particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -30],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: Math.random() * 0.5,
              }}
              className="absolute w-2 h-2 rounded-full bg-white/60 pointer-events-none"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
            />
          ))}
      </AnimatePresence>

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          transform: 'skewX(-20deg)',
        }}
        initial={{ x: '-100%' }}
        animate={isHovered ? { x: '200%' } : { x: '-100%' }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />

      <span className="relative z-10 text-white font-semibold">Crear mi Página</span>
      
      <motion.div
        className="relative z-10"
        animate={{
          x: isHovered ? 5 : 0,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      >
        <ArrowRight className="w-5 h-5 text-white" />
      </motion.div>

      {/* Click confetti */}
      <AnimatePresence>
        {isClicked && (
          <>
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  y: 0,
                }}
                animate={{
                  opacity: 0,
                  scale: 0,
                  x: (Math.random() - 0.5) * 150,
                  y: (Math.random() - 0.5) * 150,
                  rotate: Math.random() * 360,
                }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full pointer-events-none"
                style={{
                  background: i % 2 === 0 ? '#06B6D4' : '#ffffff',
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.a>
  );
};

export default EpicCTAButton;
