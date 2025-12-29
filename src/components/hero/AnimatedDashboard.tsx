import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const AnimatedDashboard = () => {
  const [metrics, setMetrics] = useState({
    revenue: 124847,
    roas: 8.4,
    leads: 847,
    conversion: 4.8,
  });

  const [progressWidth, setProgressWidth] = useState(65);

  // Animate metrics every 2-3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        revenue: prev.revenue + Math.floor(Math.random() * 500) + 100,
        roas: Math.min(prev.roas + (Math.random() * 0.2), 12),
        leads: prev.leads + Math.floor(Math.random() * 5) + 1,
        conversion: Math.min(prev.conversion + (Math.random() * 0.1), 8),
      }));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Animate progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgressWidth(prev => {
        if (prev >= 95) return 65;
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const metricCards = [
    { label: 'Revenue', value: `$${metrics.revenue.toLocaleString()}`, change: '+34%' },
    { label: 'ROAS', value: `${metrics.roas.toFixed(1)}x`, change: '+12%' },
    { label: 'Leads', value: metrics.leads.toString(), change: '+28%' },
    { label: 'Conversión', value: `${metrics.conversion.toFixed(1)}%`, change: '+8%' },
  ];

  return (
    <div className="relative">
      {/* Glow effect behind dashboard */}
      <div className="absolute -inset-8 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl rounded-full" />
      
      {/* Dashboard container */}
      <motion.div
        initial={{ opacity: 0, y: 20, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-slate-400 text-sm font-medium">Live Dashboard</span>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-green-400 text-xs font-medium">En vivo</span>
          </div>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 gap-3 p-4">
          {metricCards.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              className="bg-slate-800/50 rounded-xl p-4"
            >
              <p className="text-slate-400 text-xs mb-1">{metric.label}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-white text-xl font-bold">{metric.value}</span>
                <span className="text-green-400 text-xs font-medium bg-green-400/10 px-1.5 py-0.5 rounded">
                  {metric.change}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-xs">Meta mensual</span>
            <span className="text-cyan-400 text-xs font-semibold">{progressWidth}%</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full"
              style={{ width: `${progressWidth}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>

        {/* Mini chart */}
        <div className="px-4 pb-4">
          <div className="bg-slate-800/30 rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-xs">Crecimiento últimos 30 días</span>
              <TrendingUp className="w-4 h-4 text-cyan-400" />
            </div>
            <svg viewBox="0 0 200 60" className="w-full h-12">
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgb(6, 182, 212)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="rgb(6, 182, 212)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Area fill */}
              <path
                d="M0,50 Q20,45 40,40 T80,35 T120,25 T160,20 T200,10 L200,60 L0,60 Z"
                fill="url(#chartGradient)"
              />
              {/* Line */}
              <motion.path
                d="M0,50 Q20,45 40,40 T80,35 T120,25 T160,20 T200,10"
                fill="none"
                stroke="rgb(6, 182, 212)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.8 }}
              />
            </svg>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnimatedDashboard;
