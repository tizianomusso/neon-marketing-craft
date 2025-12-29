import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const phrases = [
  'sistemas de crecimiento',
  'máquinas de ventas',
  'resultados predecibles',
];

const RotatingText = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
        >
          {phrases[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default RotatingText;
