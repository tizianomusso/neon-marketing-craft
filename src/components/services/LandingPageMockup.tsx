import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const LandingPageMockup = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 30 });
  const [isClicking, setIsClicking] = useState(false);
  
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

  // Simulated scroll animation
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      setScrollY(prev => {
        if (prev >= 100) return 0;
        return prev + 0.5;
      });
    }, 50);

    return () => clearInterval(scrollInterval);
  }, []);

  // Fake cursor movement
  useEffect(() => {
    const positions = [
      { x: 50, y: 30 },
      { x: 70, y: 45 },
      { x: 55, y: 60 },
      { x: 80, y: 75 },
      { x: 60, y: 50 },
    ];
    let index = 0;

    const cursorInterval = setInterval(() => {
      index = (index + 1) % positions.length;
      setCursorPos(positions[index]);
      
      if (index === 3) {
        setIsClicking(true);
        setTimeout(() => setIsClicking(false), 200);
      }
    }, 1500);

    return () => clearInterval(cursorInterval);
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
      <motion.div
        className="absolute inset-0 rounded-2xl overflow-hidden bg-white"
        style={{
          boxShadow: isHovered 
            ? "0 25px 80px rgba(6, 182, 212, 0.3)" 
            : "0 15px 40px rgba(0, 0, 0, 0.1)",
        }}
        animate={{ scale: isHovered ? 1.02 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Browser Header */}
        <div className="flex items-center justify-between p-3 bg-gray-100 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-white rounded-full px-4 py-1 text-xs text-gray-500 border border-gray-200">
              tunegocio.com
            </div>
          </div>
        </div>

        {/* Landing Page Content */}
        <div 
          className="relative overflow-hidden"
          style={{ height: "calc(100% - 44px)" }}
        >
          <motion.div
            className="absolute inset-x-0"
            style={{ top: -scrollY * 2 }}
          >
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-6 text-white relative overflow-hidden">
              <motion.div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
                animate={{ backgroundPosition: ["0px 0px", "20px 20px"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />
              <div className="relative z-10">
                <motion.div 
                  className="w-16 h-4 bg-white/30 rounded mb-2"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="w-32 h-3 bg-white/80 rounded mb-1" />
                <div className="w-24 h-3 bg-white/60 rounded mb-4" />
                <motion.div 
                  className="w-20 h-8 bg-white rounded-lg flex items-center justify-center"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-cyan-600 text-xs font-bold">CTA</span>
                </motion.div>
              </div>
            </div>

            {/* Features Section */}
            <div className="p-4 bg-white">
              <div className="w-20 h-2 bg-gray-300 rounded mx-auto mb-4" />
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map(i => (
                  <motion.div 
                    key={i}
                    className="bg-gray-50 rounded-lg p-3 border border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                  >
                    <div className={`w-8 h-8 rounded-lg mb-2 ${
                      i === 1 ? "bg-cyan-100" : i === 2 ? "bg-blue-100" : "bg-purple-100"
                    }`} />
                    <div className="w-full h-2 bg-gray-200 rounded mb-1" />
                    <div className="w-3/4 h-2 bg-gray-100 rounded" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="p-4 bg-gray-50">
              <div className="w-24 h-2 bg-gray-300 rounded mx-auto mb-4" />
              <div className="flex gap-3">
                {[1, 2].map(i => (
                  <motion.div 
                    key={i}
                    className="flex-1 bg-white rounded-lg p-3 border border-gray-100"
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500" />
                      <div className="w-12 h-2 bg-gray-200 rounded" />
                    </div>
                    <div className="space-y-1">
                      <div className="w-full h-1.5 bg-gray-100 rounded" />
                      <div className="w-5/6 h-1.5 bg-gray-100 rounded" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="p-6 bg-gradient-to-r from-cyan-500 to-blue-600">
              <div className="w-28 h-3 bg-white/80 rounded mx-auto mb-3" />
              <motion.div 
                className="w-24 h-8 bg-white rounded-lg mx-auto"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Fake Cursor */}
          <motion.div
            className="absolute z-50 pointer-events-none"
            animate={{
              left: `${cursorPos.x}%`,
              top: `${cursorPos.y}%`,
              scale: isClicking ? 0.8 : 1,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .72-.58.38-.92L6.38 2.79a.5.5 0 0 0-.88.42Z"
                fill="#000"
                stroke="#fff"
                strokeWidth="1.5"
              />
            </svg>
            {isClicking && (
              <motion.div
                className="absolute top-0 left-0 w-6 h-6 rounded-full bg-cyan-500/30"
                initial={{ scale: 0 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.div>
        </div>

        {/* Popular Badge */}
        <motion.div
          className="absolute top-12 -right-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-8 py-1 transform rotate-45"
          animate={{ opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          MÁS POPULAR
        </motion.div>
      </motion.div>

      {/* Glow Effect */}
      <motion.div
        className="absolute -inset-4 rounded-3xl opacity-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, transparent 70%)",
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      />
    </motion.div>
  );
};

export default LandingPageMockup;
