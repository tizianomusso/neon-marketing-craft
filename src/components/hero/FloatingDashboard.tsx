import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react';

const FloatingDashboard = () => {
  const [revenue, setRevenue] = useState(0);
  const [adSpend, setAdSpend] = useState(0);
  const [campaigns, setCampaigns] = useState(0);
  const [profit, setProfit] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    
    const targets = {
      revenue: 32485.27,
      adSpend: 8942.50,
      campaigns: 12,
      profit: 4280.00,
    };

    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setRevenue(targets.revenue * progress);
      setAdSpend(targets.adSpend * progress);
      setCampaigns(Math.floor(targets.campaigns * progress));
      setProfit(targets.profit * progress);

      if (step >= steps) {
        clearInterval(interval);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, []);

  const metrics = [
    { 
      icon: DollarSign, 
      value: `$${revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 
      label: 'Revenue',
      color: 'text-green-400'
    },
    { 
      icon: TrendingUp, 
      value: `$${adSpend.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 
      label: 'Ad Spend',
      color: 'text-purple-400'
    },
    { 
      icon: BarChart3, 
      value: campaigns.toString(), 
      label: 'Campañas',
      color: 'text-cyan-400'
    },
    { 
      icon: Users, 
      value: `$${profit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 
      label: 'Profit',
      color: 'text-emerald-400'
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="relative mx-auto max-w-4xl px-4"
      style={{
        perspective: '1000px',
      }}
    >
      <div
        className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-t-2xl shadow-2xl overflow-hidden"
        style={{
          transform: 'rotateX(8deg)',
          transformOrigin: 'bottom center',
        }}
      >
        {/* Shadow going up */}
        <div className="absolute -top-20 left-0 right-0 h-20 bg-gradient-to-t from-purple-500/10 to-transparent pointer-events-none" />
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-slate-700/50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-sm font-medium text-slate-400">InnovaSolutions Dashboard</span>
          <div className="flex gap-4 text-xs text-slate-500">
            <span className="hover:text-white cursor-pointer">Overview</span>
            <span className="hover:text-white cursor-pointer">Campaigns</span>
            <span className="hover:text-white cursor-pointer">Analytics</span>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-4 gap-4 p-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1 }}
              className="text-center"
            >
              <metric.icon className={`w-5 h-5 mx-auto mb-2 ${metric.color}`} />
              <div className="text-lg md:text-xl font-bold text-white">{metric.value}</div>
              <div className="text-xs text-slate-500">{metric.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Simple chart preview */}
        <div className="px-6 pb-6">
          <div className="flex items-end justify-between h-16 gap-1">
            {[40, 65, 45, 80, 55, 70, 85, 60, 75, 90, 70, 85].map((height, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: 1.5 + i * 0.05, duration: 0.5 }}
                className="flex-1 bg-gradient-to-t from-purple-500/50 to-cyan-500/50 rounded-t"
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Fade out at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none" />
    </motion.div>
  );
};

export default FloatingDashboard;
