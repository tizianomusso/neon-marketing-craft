import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useState, useRef } from 'react';
import { Megaphone, Code, Brain, BarChart3, Zap, Globe } from 'lucide-react';

interface Card3DProps {
  icon: React.ElementType;
  title: string;
  gradient: string;
  delay: number;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number };
}

const Card3D = ({ icon: Icon, title, gradient, delay, position, rotation }: Card3DProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });

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

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        y: 100,
        rotateX: rotation.x,
        rotateY: rotation.y,
      }}
      animate={{ 
        opacity: 1, 
        y: 0,
        x: position.x,
        z: position.z,
      }}
      transition={{ 
        duration: 1,
        delay: delay,
        type: 'spring',
        stiffness: 100,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: 'preserve-3d',
        transform: `translateY(${position.y}px)`,
      }}
      whileHover={{ 
        scale: 1.05,
        z: 50,
      }}
      className="relative cursor-pointer group"
    >
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-1 rounded-2xl blur-xl"
        style={{ background: gradient }}
        animate={{
          opacity: isHovered ? 0.6 : 0.2,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Card */}
      <motion.div
        className="relative bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50 p-6 overflow-hidden"
        animate={{
          boxShadow: isHovered
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px -10px rgba(6, 182, 212, 0.3)'
            : '0 10px 40px -15px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{ background: gradient }}
          animate={{
            opacity: isHovered ? 0.15 : 0.05,
          }}
        />
        
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)',
          }}
          animate={{
            x: isHovered ? ['-100%', '200%'] : '-100%',
          }}
          transition={{
            duration: 0.8,
            ease: 'easeInOut',
          }}
        />
        
        <div className="relative z-10 flex flex-col items-center text-center gap-3">
          <motion.div
            className="w-14 h-14 rounded-xl flex items-center justify-center"
            style={{ background: gradient }}
            animate={{
              rotate: isHovered ? [0, -5, 5, 0] : 0,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="w-7 h-7 text-white" />
          </motion.div>
          <span className="font-semibold text-foreground text-sm">{title}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Hero3DCards = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / 20);
    mouseY.set((e.clientY - centerY) / 20);
  };

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const cards: Card3DProps[] = [
    {
      icon: Megaphone,
      title: 'Meta Ads',
      gradient: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      delay: 0.2,
      position: { x: -180, y: -60, z: 20 },
      rotation: { x: 5, y: -10 },
    },
    {
      icon: BarChart3,
      title: 'Google Ads',
      gradient: 'linear-gradient(135deg, #22c55e, #06b6d4)',
      delay: 0.35,
      position: { x: 0, y: -100, z: 40 },
      rotation: { x: -5, y: 0 },
    },
    {
      icon: Globe,
      title: 'Desarrollo Web',
      gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
      delay: 0.5,
      position: { x: 180, y: -60, z: 20 },
      rotation: { x: 5, y: 10 },
    },
    {
      icon: Brain,
      title: 'IA & Automatización',
      gradient: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
      delay: 0.65,
      position: { x: -120, y: 60, z: 10 },
      rotation: { x: -5, y: -5 },
    },
    {
      icon: Code,
      title: 'Software a Medida',
      gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
      delay: 0.8,
      position: { x: 120, y: 60, z: 10 },
      rotation: { x: -5, y: 5 },
    },
    {
      icon: Zap,
      title: 'CRM',
      gradient: 'linear-gradient(135deg, #06b6d4, #22c55e)',
      delay: 0.95,
      position: { x: 0, y: 120, z: 0 },
      rotation: { x: -8, y: 0 },
    },
  ];

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[500px] flex items-center justify-center"
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Floating orbs */}
      <motion.div
        className="absolute w-32 h-32 bg-primary/20 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ x: springX, y: springY }}
      />
      <motion.div
        className="absolute w-40 h-40 bg-secondary/20 rounded-full blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ 
          x: useTransform(springX, v => -v * 1.5), 
          y: useTransform(springY, v => -v * 1.5) 
        }}
      />

      {/* Cards container */}
      <motion.div
        className="relative"
        style={{
          rotateX: useTransform(springY, v => v * -0.5),
          rotateY: useTransform(springX, v => v * 0.5),
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Central glow */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {cards.map((card, index) => (
          <Card3D key={index} {...card} />
        ))}
      </motion.div>

      {/* Connection lines (subtle) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <motion.line
          x1="50%" y1="30%" x2="30%" y2="40%"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1 }}
        />
        <motion.line
          x1="50%" y1="30%" x2="70%" y2="40%"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1.2 }}
        />
        <motion.line
          x1="30%" y1="40%" x2="40%" y2="60%"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1.4 }}
        />
        <motion.line
          x1="70%" y1="40%" x2="60%" y2="60%"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1.6 }}
        />
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

export default Hero3DCards;
