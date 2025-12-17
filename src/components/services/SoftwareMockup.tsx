import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Layers, GitBranch, Database, Zap } from "lucide-react";

const SoftwareMockup = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeModule, setActiveModule] = useState(0);
  const [processingStep, setProcessingStep] = useState(0);
  
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

  const modules = [
    { icon: Layers, label: "Módulos", color: "cyan" },
    { icon: GitBranch, label: "Workflows", color: "purple" },
    { icon: Database, label: "Data", color: "green" },
    { icon: Zap, label: "APIs", color: "orange" },
  ];

  useEffect(() => {
    const moduleInterval = setInterval(() => {
      setActiveModule(prev => (prev + 1) % modules.length);
    }, 3000);

    const processInterval = setInterval(() => {
      setProcessingStep(prev => (prev + 1) % 5);
    }, 800);

    return () => {
      clearInterval(moduleInterval);
      clearInterval(processInterval);
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
      <motion.div
        className="absolute inset-0 rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
          boxShadow: isHovered 
            ? "0 25px 80px rgba(6, 182, 212, 0.3)" 
            : "0 15px 40px rgba(0, 0, 0, 0.3)",
        }}
        animate={{ scale: isHovered ? 1.02 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs">⚡</span>
            </div>
            <span className="text-white font-semibold text-sm">Custom App</span>
          </div>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
        </div>

        {/* Main Layout */}
        <div className="flex h-[calc(100%-48px)]">
          {/* Sidebar Modules */}
          <div className="w-16 bg-slate-800/50 p-2 space-y-2">
            {modules.map((module, i) => (
              <motion.div
                key={module.label}
                className={`w-full aspect-square rounded-lg flex flex-col items-center justify-center gap-1 ${
                  activeModule === i 
                    ? "bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/50" 
                    : "bg-slate-700/50"
                }`}
                animate={{
                  scale: activeModule === i ? 1.05 : 1,
                }}
                whileHover={{ scale: 1.1 }}
              >
                <module.icon className={`w-4 h-4 ${
                  activeModule === i ? "text-cyan-400" : "text-slate-400"
                }`} />
                <span className={`text-[8px] ${
                  activeModule === i ? "text-cyan-400" : "text-slate-500"
                }`}>
                  {module.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 p-3 space-y-3">
            {/* Flow Diagram */}
            <div className="bg-slate-800/50 rounded-lg p-3 h-24">
              <p className="text-slate-400 text-[10px] mb-2">Flujo de Trabajo</p>
              <div className="flex items-center justify-between">
                {["Input", "Process", "Validate", "Output"].map((step, i) => (
                  <div key={step} className="flex items-center">
                    <motion.div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        processingStep >= i 
                          ? "bg-gradient-to-br from-cyan-500 to-blue-500" 
                          : "bg-slate-700"
                      }`}
                      animate={{
                        scale: processingStep === i ? [1, 1.1, 1] : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-white text-[10px]">{i + 1}</span>
                    </motion.div>
                    {i < 3 && (
                      <motion.div
                        className="w-6 h-0.5 mx-1"
                        style={{
                          background: processingStep > i 
                            ? "linear-gradient(90deg, #06B6D4, #3B82F6)" 
                            : "#334155",
                        }}
                        animate={{ scaleX: processingStep > i ? 1 : 0.3 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Code Preview */}
            <div className="bg-slate-900 rounded-lg p-3 font-mono text-[10px]">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-slate-500">//</span>
                <span className="text-slate-400">api.handler.ts</span>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-1"
              >
                <p><span className="text-purple-400">export</span> <span className="text-cyan-400">async</span> <span className="text-yellow-400">function</span> <span className="text-green-400">handler</span><span className="text-white">(</span><span className="text-orange-400">req</span><span className="text-white">)</span> <span className="text-white">{"{"}</span></p>
                <p className="pl-3"><span className="text-purple-400">const</span> <span className="text-white">data</span> <span className="text-cyan-400">=</span> <span className="text-purple-400">await</span> <span className="text-green-400">process</span><span className="text-white">(req);</span></p>
                <p className="pl-3"><span className="text-purple-400">return</span> <span className="text-white">{"{"} success: </span><span className="text-orange-400">true</span><span className="text-white">, data {"}"};</span></p>
                <p><span className="text-white">{"}"}</span></p>
              </motion.div>
            </div>

            {/* Status Indicators */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "APIs", status: "12 activas", color: "green" },
                { label: "DB Queries", status: "45ms avg", color: "cyan" },
                { label: "Uptime", status: "99.9%", color: "purple" },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  className="bg-slate-800/50 rounded-lg p-2 text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="text-slate-400 text-[8px]">{item.label}</p>
                  <p className={`text-${item.color}-400 text-[10px] font-semibold`}>
                    {item.status}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Status */}
        <motion.div
          className="absolute bottom-3 right-3 flex items-center gap-2 bg-green-500/20 border border-green-500/50 text-green-400 text-[10px] px-3 py-1.5 rounded-full"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Sistema Operativo
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-20 right-4 w-20 h-20 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
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

export default SoftwareMockup;
