import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const MetaAdsMockup = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
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

  // Animated metrics
  const [roas, setRoas] = useState(3.2);
  const [conversions, setConversions] = useState(142);
  const [ctr, setCtr] = useState(4.8);
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoas(prev => Math.min(prev + Math.random() * 0.1, 5.5));
      setConversions(prev => prev + Math.floor(Math.random() * 3));
      setCtr(prev => Math.min(prev + Math.random() * 0.05, 6.5));
    }, 2000);

    const notifInterval = setInterval(() => {
      const notifs = ["¡Nueva conversión!", "Lead generado", "+$45 venta", "Nuevo click"];
      setNotifications(prev => {
        const newNotif = notifs[Math.floor(Math.random() * notifs.length)];
        return [...prev.slice(-2), newNotif];
      });
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(notifInterval);
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full h-[400px] perspective-1000"
    >
      {/* Main Panel */}
      <motion.div
        className="absolute inset-0 rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1877F2 0%, #0D47A1 100%)",
          boxShadow: isHovered 
            ? "0 25px 80px rgba(24, 119, 242, 0.4)" 
            : "0 15px 40px rgba(24, 119, 242, 0.2)",
        }}
        animate={{ scale: isHovered ? 1.02 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
              <span className="text-[#1877F2] font-bold text-sm">f</span>
            </div>
            <span className="text-white font-semibold text-sm">Ads Manager</span>
          </div>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="p-4 grid grid-cols-3 gap-3">
          <motion.div 
            className="bg-white/10 backdrop-blur rounded-xl p-3"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
          >
            <p className="text-white/60 text-xs mb-1">ROAS</p>
            <motion.p 
              className="text-white text-2xl font-bold"
              key={roas}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
            >
              {roas.toFixed(1)}x
            </motion.p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-green-400 text-xs">↑ 23%</span>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white/10 backdrop-blur rounded-xl p-3"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
          >
            <p className="text-white/60 text-xs mb-1">Conversiones</p>
            <motion.p 
              className="text-white text-2xl font-bold"
              key={conversions}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
            >
              {conversions}
            </motion.p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-green-400 text-xs">↑ 18%</span>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white/10 backdrop-blur rounded-xl p-3"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
          >
            <p className="text-white/60 text-xs mb-1">CTR</p>
            <motion.p 
              className="text-white text-2xl font-bold"
              key={ctr}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
            >
              {ctr.toFixed(1)}%
            </motion.p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-green-400 text-xs">↑ 12%</span>
            </div>
          </motion.div>
        </div>

        {/* Chart */}
        <div className="px-4 pb-4">
          <div className="bg-white/5 rounded-xl p-4 h-32">
            <svg viewBox="0 0 200 60" className="w-full h-full">
              <motion.path
                d="M0,50 Q20,45 40,40 T80,30 T120,25 T160,15 T200,5"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "loop", repeatDelay: 3 }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="100%" stopColor="#34D399" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="px-4 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-white/60 text-xs w-16">Reach</span>
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-400 to-cyan-400"
                initial={{ width: "0%" }}
                animate={{ width: "78%" }}
                transition={{ duration: 1.5, delay: 0.2 }}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/60 text-xs w-16">Clicks</span>
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-purple-400 to-pink-400"
                initial={{ width: "0%" }}
                animate={{ width: "65%" }}
                transition={{ duration: 1.5, delay: 0.4 }}
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="absolute bottom-4 right-4 space-y-2">
          {notifications.map((notif, i) => (
            <motion.div
              key={`${notif}-${i}`}
              initial={{ opacity: 0, x: 50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50 }}
              className="bg-green-500 text-white text-xs px-3 py-2 rounded-lg shadow-lg"
            >
              ✓ {notif}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Glow Effect */}
      <motion.div
        className="absolute -inset-4 rounded-3xl opacity-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(24, 119, 242, 0.3) 0%, transparent 70%)",
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      />
    </motion.div>
  );
};

export default MetaAdsMockup;
