import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { TrendingUp, Users, DollarSign, BarChart3 } from 'lucide-react';

const HeroMockup = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-300, 300], [10, -10]);
  const rotateY = useTransform(x, [-300, 300], [-10, 10]);

  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 20 });

  // Parallax layers
  const layer1X = useTransform(x, [-300, 300], [-8, 8]);
  const layer1Y = useTransform(y, [-300, 300], [-8, 8]);
  const layer2X = useTransform(x, [-300, 300], [-15, 15]);
  const layer2Y = useTransform(y, [-300, 300], [-15, 15]);
  const layer3X = useTransform(x, [-300, 300], [-25, 25]);
  const layer3Y = useTransform(y, [-300, 300], [-25, 25]);

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
  const [fakeCursorPos, setFakeCursorPos] = useState({ x: 30, y: 40 });
  const [fakeCursorClicking, setFakeCursorClicking] = useState(false);

  useEffect(() => {
    const positions = [
      { x: 25, y: 35 },
      { x: 65, y: 25 },
      { x: 45, y: 55 },
      { x: 75, y: 65 },
      { x: 35, y: 75 },
    ];
    let index = 0;

    const interval = setInterval(() => {
      setFakeCursorPos(positions[index]);
      setTimeout(() => {
        setFakeCursorClicking(true);
        setTimeout(() => setFakeCursorClicking(false), 150);
      }, 500);
      index = (index + 1) % positions.length;
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Animated counter values
  const [counterValues, setCounterValues] = useState([0, 0, 0]);

  useEffect(() => {
    const targetValues = [8547, 234, 12.4];
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      setCounterValues(targetValues.map(target => 
        Math.floor(target * Math.min(progress, 1))
      ));
      if (currentStep >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className="relative cursor-pointer w-full max-w-4xl mx-auto"
    >
      {/* Glow border effect */}
      <motion.div
        className="absolute -inset-2 rounded-3xl"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--primary)))',
          filter: 'blur(30px)',
        }}
        animate={{
          opacity: isHovered ? 0.5 : 0.25,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Browser Window Mockup */}
      <motion.div
        className="relative bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50 overflow-hidden"
        animate={{
          boxShadow: isHovered
            ? '0 50px 100px -20px hsl(var(--primary) / 0.3), 0 30px 60px -30px hsl(var(--primary) / 0.2)'
            : '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
        }}
      >
        {/* Screen glow pulse */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.08) 0%, transparent 70%)',
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
        <div className="flex items-center gap-2 px-4 py-3 bg-muted/30 border-b border-border/30">
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
              className="h-7 bg-muted/50 rounded-lg w-64 flex items-center px-3 gap-2"
              style={{ x: layer1X, y: layer1Y }}
            >
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-xs text-muted-foreground font-mono">tuempresa.com/dashboard</span>
            </motion.div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 space-y-5 relative min-h-[320px]">
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M5.65 3.15L20.85 10.65C21.66 11.04 21.66 12.21 20.85 12.6L14.55 15.45L11.7 21.75C11.31 22.56 10.14 22.56 9.75 21.75L2.25 6.55C1.86 5.74 2.84 4.76 3.65 5.15L5.65 3.15Z"
                fill="white"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
              />
            </svg>
            {fakeCursorClicking && (
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute top-0 left-0 w-5 h-5 rounded-full bg-primary"
              />
            )}
          </motion.div>

          {/* Header Row - Layer 1 */}
          <motion.div
            className="flex items-center justify-between"
            style={{ x: layer1X, y: layer1Y }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <BarChart3 className="w-4 h-4 text-primary" />
              </motion.div>
              <div>
                <div className="text-sm font-semibold text-foreground">Dashboard Analytics</div>
                <div className="text-xs text-muted-foreground">Última actualización: hace 2 min</div>
              </div>
            </div>
            <motion.div 
              className="px-3 py-1.5 bg-green-500/20 text-green-400 text-xs font-medium rounded-full"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ● En vivo
            </motion.div>
          </motion.div>

          {/* Stats Cards - Layer 2 */}
          <motion.div
            className="grid grid-cols-3 gap-4"
            style={{ x: layer2X, y: layer2Y }}
          >
            {[
              { icon: DollarSign, label: 'Ingresos', value: `$${counterValues[0].toLocaleString()}`, change: '+24%', color: 'text-green-400' },
              { icon: Users, label: 'Clientes', value: counterValues[1].toString(), change: '+12%', color: 'text-primary' },
              { icon: TrendingUp, label: 'ROAS', value: `${counterValues[2]}x`, change: '+18%', color: 'text-yellow-400' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="bg-muted/30 rounded-xl p-4 border border-border/30"
                whileHover={{
                  backgroundColor: 'hsl(var(--muted) / 0.5)',
                  borderColor: 'hsl(var(--primary) / 0.3)',
                  y: -3,
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  <span className="text-xs text-green-400">{stat.change}</span>
                </div>
                <div className="text-xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Chart Area - Layer 3 */}
          <motion.div
            className="bg-muted/20 rounded-xl p-4 border border-border/30"
            style={{ x: layer3X, y: layer3Y }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-foreground">Rendimiento Semanal</span>
              <div className="flex gap-2">
                <motion.div 
                  className="px-2 py-1 bg-primary/20 text-primary text-xs rounded"
                  whileHover={{ scale: 1.05 }}
                >
                  7D
                </motion.div>
                <div className="px-2 py-1 bg-muted/30 text-muted-foreground text-xs rounded">30D</div>
              </div>
            </div>
            {/* Animated Chart Bars */}
            <div className="flex items-end justify-between gap-2 h-24">
              {[65, 45, 80, 55, 90, 70, 95].map((height, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-primary/60 to-primary rounded-t-sm"
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.8, delay: 0.1 * i, ease: 'easeOut' }}
                  whileHover={{ 
                    backgroundColor: 'hsl(var(--primary))',
                    scale: 1.1,
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day, i) => (
                <span key={i}>{day}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Reflection shadow */}
      <motion.div
        className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-4/5 h-24 rounded-full blur-3xl"
        style={{
          background: 'linear-gradient(to right, hsl(var(--primary) / 0.15), hsl(var(--secondary) / 0.15))',
          x: layer1X,
        }}
        animate={{
          opacity: isHovered ? 0.7 : 0.3,
          scaleX: isHovered ? 1.1 : 1,
        }}
      />
    </motion.div>
  );
};

export default HeroMockup;
