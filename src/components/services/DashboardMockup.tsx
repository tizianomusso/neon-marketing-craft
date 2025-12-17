import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { LayoutDashboard, Users, BarChart3, Settings } from "lucide-react";

const DashboardMockup = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeMetric, setActiveMetric] = useState(0);
  const [notifications, setNotifications] = useState<string[]>([]);
  
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

  const [metrics, setMetrics] = useState({
    users: 1234,
    revenue: 45678,
    orders: 892,
    conversion: 4.2,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        users: prev.users + Math.floor(Math.random() * 5),
        revenue: prev.revenue + Math.floor(Math.random() * 100),
        orders: prev.orders + Math.floor(Math.random() * 3),
        conversion: Math.min(6, Math.max(3, prev.conversion + (Math.random() - 0.5) * 0.1)),
      }));
      setActiveMetric(prev => (prev + 1) % 4);
    }, 2500);

    const notifInterval = setInterval(() => {
      const notifs = ["Nuevo usuario", "Venta realizada", "Reporte listo", "Meta alcanzada"];
      setNotifications(prev => [...prev.slice(-1), notifs[Math.floor(Math.random() * notifs.length)]]);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearInterval(notifInterval);
    };
  }, []);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: Users, label: "Usuarios", active: false },
    { icon: BarChart3, label: "Analytics", active: false },
    { icon: Settings, label: "Config", active: false },
  ];

  const tableData = [
    { id: "#001", status: "Completado", amount: "$234" },
    { id: "#002", status: "Pendiente", amount: "$567" },
    { id: "#003", status: "Completado", amount: "$123" },
  ];

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
        className="absolute inset-0 rounded-2xl overflow-hidden bg-slate-900 flex"
        style={{
          boxShadow: isHovered 
            ? "0 25px 80px rgba(139, 92, 246, 0.3)" 
            : "0 15px 40px rgba(0, 0, 0, 0.2)",
        }}
        animate={{ scale: isHovered ? 1.02 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Sidebar */}
        <div className="w-14 bg-slate-800 p-2 flex flex-col items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-2" />
          {menuItems.map((item, i) => (
            <motion.div
              key={item.label}
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                item.active ? "bg-purple-500/20 text-purple-400" : "text-slate-500"
              }`}
              whileHover={{ backgroundColor: "rgba(139, 92, 246, 0.2)", color: "#A78BFA" }}
            >
              <item.icon className="w-4 h-4" />
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-3 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-slate-400 text-[10px]">Bienvenido</p>
              <p className="text-white text-sm font-semibold">Dashboard</p>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                className="relative"
                animate={{ scale: notifications.length > 0 ? [1, 1.1, 1] : 1 }}
              >
                <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                  <span className="text-slate-400 text-xs">🔔</span>
                </div>
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                )}
              </motion.div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            {[
              { label: "Usuarios", value: metrics.users.toLocaleString(), color: "purple", icon: "👥" },
              { label: "Ingresos", value: `$${metrics.revenue.toLocaleString()}`, color: "green", icon: "💰" },
              { label: "Pedidos", value: metrics.orders.toLocaleString(), color: "blue", icon: "📦" },
              { label: "Conversión", value: `${metrics.conversion.toFixed(1)}%`, color: "orange", icon: "📈" },
            ].map((metric, i) => (
              <motion.div
                key={metric.label}
                className={`bg-slate-800 rounded-lg p-2 border ${
                  activeMetric === i ? "border-purple-500" : "border-slate-700"
                }`}
                animate={{
                  borderColor: activeMetric === i ? "#8B5CF6" : "#334155",
                }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-400 text-[10px]">{metric.label}</span>
                  <span>{metric.icon}</span>
                </div>
                <motion.p 
                  className="text-white text-sm font-bold"
                  key={metric.value}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                >
                  {metric.value}
                </motion.p>
              </motion.div>
            ))}
          </div>

          {/* Mini Chart */}
          <div className="bg-slate-800 rounded-lg p-2 mb-3">
            <p className="text-slate-400 text-[10px] mb-2">Rendimiento Semanal</p>
            <svg viewBox="0 0 200 40" className="w-full h-10">
              <motion.path
                d="M0,35 Q25,30 50,28 T100,20 T150,15 T200,8"
                fill="none"
                stroke="url(#purpleGradient)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "loop", repeatDelay: 3 }}
              />
              <defs>
                <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Mini Table */}
          <div className="bg-slate-800 rounded-lg p-2">
            <p className="text-slate-400 text-[10px] mb-2">Últimos Pedidos</p>
            <div className="space-y-1">
              {tableData.map((row, i) => (
                <motion.div
                  key={row.id}
                  className="flex items-center justify-between bg-slate-700/50 rounded px-2 py-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="text-white text-[10px]">{row.id}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    row.status === "Completado" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                  }`}>
                    {row.status}
                  </span>
                  <span className="text-slate-300 text-[10px]">{row.amount}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="absolute bottom-3 right-3 space-y-1">
          {notifications.map((notif, i) => (
            <motion.div
              key={`${notif}-${i}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-purple-500 text-white text-[10px] px-2 py-1 rounded shadow-lg"
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
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%)",
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      />
    </motion.div>
  );
};

export default DashboardMockup;
