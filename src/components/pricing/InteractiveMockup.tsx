import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const InteractiveMockup = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-300, 300], [15, -15]);
  const rotateY = useTransform(x, [-300, 300], [-15, 15]);

  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 20 });

  // Parallax layers
  const layer1X = useTransform(x, [-300, 300], [-10, 10]);
  const layer1Y = useTransform(y, [-300, 300], [-10, 10]);
  const layer2X = useTransform(x, [-300, 300], [-20, 20]);
  const layer2Y = useTransform(y, [-300, 300], [-20, 20]);
  const layer3X = useTransform(x, [-300, 300], [-30, 30]);
  const layer3Y = useTransform(y, [-300, 300], [-30, 30]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  // Fake cursor animation
  const [fakeCursorPos, setFakeCursorPos] = useState({ x: 50, y: 50 });
  const [fakeCursorClicking, setFakeCursorClicking] = useState(false);

  useEffect(() => {
    const positions = [
      { x: 30, y: 40 },
      { x: 70, y: 30 },
      { x: 50, y: 60 },
      { x: 80, y: 70 },
      { x: 40, y: 80 },
    ];
    let index = 0;

    const interval = setInterval(() => {
      setFakeCursorPos(positions[index]);
      setTimeout(() => {
        setFakeCursorClicking(true);
        setTimeout(() => setFakeCursorClicking(false), 150);
      }, 400);
      index = (index + 1) % positions.length;
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className="relative cursor-pointer"
    >
      {/* Glow border effect */}
      <motion.div
        className="absolute -inset-1 rounded-2xl opacity-0"
        style={{
          background: 'linear-gradient(135deg, #06B6D4, #3B82F6, #06B6D4)',
          filter: 'blur(20px)',
        }}
        animate={{
          opacity: isHovered ? 0.6 : 0.3,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Browser Window Mockup */}
      <motion.div
        className="relative bg-background/10 backdrop-blur-xl rounded-2xl border border-background/20 overflow-hidden shadow-2xl"
        animate={{
          boxShadow: isHovered
            ? '0 50px 100px -20px rgba(6, 182, 212, 0.4), 0 30px 60px -30px rgba(6, 182, 212, 0.3)'
            : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Screen glow pulse */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Browser Header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-background/5 border-b border-background/10">
          <div className="flex gap-1.5">
            <motion.div
              className="w-3 h-3 rounded-full bg-red-400"
              whileHover={{ scale: 1.2 }}
            />
            <motion.div
              className="w-3 h-3 rounded-full bg-yellow-400"
              whileHover={{ scale: 1.2 }}
            />
            <motion.div
              className="w-3 h-3 rounded-full bg-green-400"
              whileHover={{ scale: 1.2 }}
            />
          </div>
          <div className="flex-1 mx-4">
            <motion.div
              className="h-6 bg-background/10 rounded-md w-48 overflow-hidden relative"
              style={{ x: layer1X, y: layer1Y }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-background/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
          </div>
        </div>

        {/* Website Content */}
        <div className="p-6 space-y-6 relative">
          {/* Fake cursor */}
          <motion.div
            className="absolute z-50 pointer-events-none"
            animate={{
              left: `${fakeCursorPos.x}%`,
              top: `${fakeCursorPos.y}%`,
              scale: fakeCursorClicking ? 0.8 : 1,
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M5.65 3.15L20.85 10.65C21.66 11.04 21.66 12.21 20.85 12.6L14.55 15.45L11.7 21.75C11.31 22.56 10.14 22.56 9.75 21.75L2.25 6.55C1.86 5.74 2.84 4.76 3.65 5.15L5.65 3.15Z"
                fill="white"
                stroke="#06B6D4"
                strokeWidth="2"
              />
            </svg>
            {fakeCursorClicking && (
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute top-0 left-0 w-4 h-4 rounded-full bg-primary"
              />
            )}
          </motion.div>

          {/* Nav - Layer 1 */}
          <motion.div
            className="flex items-center justify-between"
            style={{ x: layer1X, y: layer1Y }}
          >
            <motion.div
              className="h-6 w-20 bg-background/20 rounded"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="flex gap-4">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="h-4 w-16 bg-background/10 rounded"
                  whileHover={{ backgroundColor: 'rgba(6, 182, 212, 0.3)' }}
                />
              ))}
            </div>
          </motion.div>

          {/* Hero Section - Layer 2 */}
          <motion.div
            className="py-8 space-y-4"
            style={{ x: layer2X, y: layer2Y }}
          >
            <motion.div
              className="h-4 w-32 bg-primary/40 rounded"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            <motion.div
              className="h-8 w-3/4 bg-background/20 rounded overflow-hidden relative"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-background/30 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
              />
            </motion.div>
            <motion.div className="h-4 w-1/2 bg-background/10 rounded" />
            <div className="flex gap-3 pt-4">
              <motion.div
                className="h-10 w-28 bg-primary rounded-lg"
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(6, 182, 212, 0)',
                    '0 0 20px 5px rgba(6, 182, 212, 0.3)',
                    '0 0 0 0 rgba(6, 182, 212, 0)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="h-10 w-28 bg-background/10 rounded-lg border border-background/20"
                whileHover={{ borderColor: 'rgba(6, 182, 212, 0.5)' }}
              />
            </div>
          </motion.div>

          {/* Cards Grid - Layer 3 */}
          <motion.div
            className="grid grid-cols-3 gap-4"
            style={{ x: layer3X, y: layer3Y }}
          >
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="bg-background/5 rounded-lg p-4 space-y-3 border border-background/10"
                whileHover={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'rgba(6, 182, 212, 0.3)',
                  y: -5,
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <motion.div
                  className="h-16 bg-background/10 rounded overflow-hidden"
                >
                  {/* Animated progress bar */}
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary/30 to-primary/50"
                    initial={{ width: '0%' }}
                    whileInView={{ width: `${30 + i * 20}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                  />
                </motion.div>
                <motion.div
                  className="h-3 w-3/4 bg-background/15 rounded"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                />
                <div className="h-2 w-1/2 bg-background/10 rounded" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Reflection shadow */}
      <motion.div
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-20 rounded-full blur-2xl"
        style={{
          background: 'linear-gradient(to right, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2))',
          x: layer1X,
        }}
        animate={{
          opacity: isHovered ? 0.8 : 0.4,
          scaleX: isHovered ? 1.1 : 1,
        }}
      />
    </motion.div>
  );
};

export default InteractiveMockup;
