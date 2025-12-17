import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const GoogleAdsMockup = () => {
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

  const [clicks, setClicks] = useState(2847);
  const [impressions, setImpressions] = useState(45230);
  const [cpc, setCpc] = useState(0.42);

  useEffect(() => {
    const interval = setInterval(() => {
      setClicks(prev => prev + Math.floor(Math.random() * 5));
      setImpressions(prev => prev + Math.floor(Math.random() * 50));
      setCpc(prev => Math.max(0.35, Math.min(0.55, prev + (Math.random() - 0.5) * 0.02)));
    }, 2000);

    return () => clearInterval(interval);
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
            ? "0 25px 80px rgba(66, 133, 244, 0.3)" 
            : "0 15px 40px rgba(0, 0, 0, 0.1)",
        }}
        animate={{ scale: isHovered ? 1.02 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex gap-0.5">
              <span className="text-[#4285F4] font-bold">G</span>
              <span className="text-[#EA4335] font-bold">o</span>
              <span className="text-[#FBBC05] font-bold">o</span>
              <span className="text-[#4285F4] font-bold">g</span>
              <span className="text-[#34A853] font-bold">l</span>
              <span className="text-[#EA4335] font-bold">e</span>
            </div>
            <span className="text-gray-600 font-medium text-sm">Ads</span>
          </div>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
        </div>

        {/* Metrics */}
        <div className="p-4 grid grid-cols-3 gap-3">
          <motion.div 
            className="bg-blue-50 rounded-xl p-3 border border-blue-100"
            whileHover={{ scale: 1.05, backgroundColor: "#DBEAFE" }}
          >
            <p className="text-gray-500 text-xs mb-1">Clicks</p>
            <motion.p 
              className="text-gray-800 text-2xl font-bold"
              key={clicks}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
            >
              {clicks.toLocaleString()}
            </motion.p>
            <span className="text-green-500 text-xs font-medium">↑ 15%</span>
          </motion.div>

          <motion.div 
            className="bg-green-50 rounded-xl p-3 border border-green-100"
            whileHover={{ scale: 1.05, backgroundColor: "#DCFCE7" }}
          >
            <p className="text-gray-500 text-xs mb-1">Impresiones</p>
            <motion.p 
              className="text-gray-800 text-xl font-bold"
              key={impressions}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
            >
              {(impressions / 1000).toFixed(1)}K
            </motion.p>
            <span className="text-green-500 text-xs font-medium">↑ 28%</span>
          </motion.div>

          <motion.div 
            className="bg-yellow-50 rounded-xl p-3 border border-yellow-100"
            whileHover={{ scale: 1.05, backgroundColor: "#FEF9C3" }}
          >
            <p className="text-gray-500 text-xs mb-1">CPC Prom.</p>
            <motion.p 
              className="text-gray-800 text-2xl font-bold"
              key={cpc}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
            >
              ${cpc.toFixed(2)}
            </motion.p>
            <span className="text-green-500 text-xs font-medium">↓ 8%</span>
          </motion.div>
        </div>

        {/* Chart */}
        <div className="px-4 pb-4">
          <div className="bg-gray-50 rounded-xl p-4 h-32 border border-gray-100">
            <svg viewBox="0 0 200 60" className="w-full h-full">
              {/* Background grid */}
              <line x1="0" y1="15" x2="200" y2="15" stroke="#E5E7EB" strokeWidth="1" />
              <line x1="0" y1="30" x2="200" y2="30" stroke="#E5E7EB" strokeWidth="1" />
              <line x1="0" y1="45" x2="200" y2="45" stroke="#E5E7EB" strokeWidth="1" />
              
              {/* Blue line - Clicks */}
              <motion.path
                d="M0,40 Q30,35 50,38 T100,25 T150,20 T200,10"
                fill="none"
                stroke="#4285F4"
                strokeWidth="2.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "loop", repeatDelay: 4 }}
              />
              
              {/* Green line - Conversions */}
              <motion.path
                d="M0,50 Q40,48 70,42 T130,35 T170,28 T200,22"
                fill="none"
                stroke="#34A853"
                strokeWidth="2.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.3, repeat: Infinity, repeatType: "loop", repeatDelay: 4 }}
              />
            </svg>
          </div>
        </div>

        {/* Keywords Table */}
        <div className="px-4">
          <p className="text-gray-600 text-xs font-medium mb-2">Keywords principales</p>
          <div className="space-y-2">
            {[
              { keyword: "marketing digital", quality: 9, cpc: "$0.38" },
              { keyword: "agencia publicidad", quality: 8, cpc: "$0.45" },
              { keyword: "campañas google", quality: 10, cpc: "$0.32" },
            ].map((item, i) => (
              <motion.div 
                key={item.keyword}
                className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 text-xs"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ backgroundColor: "#F3F4F6" }}
              >
                <span className="text-gray-700">{item.keyword}</span>
                <div className="flex items-center gap-3">
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded">QS: {item.quality}</span>
                  <span className="text-gray-500">{item.cpc}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Campaign Status */}
        <div className="absolute bottom-4 right-4">
          <motion.div
            className="flex items-center gap-2 bg-green-500 text-white text-xs px-3 py-2 rounded-full"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            Campaña activa
          </motion.div>
        </div>
      </motion.div>

      {/* Glow Effect */}
      <motion.div
        className="absolute -inset-4 rounded-3xl opacity-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(66, 133, 244, 0.2) 0%, transparent 70%)",
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      />
    </motion.div>
  );
};

export default GoogleAdsMockup;
