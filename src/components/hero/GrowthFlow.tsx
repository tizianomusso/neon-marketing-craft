import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Target, DollarSign, TrendingUp } from 'lucide-react';

interface StationProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  glowColor: string;
  hoverDetails: string;
  delay: number;
}

const Station = ({ icon, label, value, color, glowColor, hoverDetails, delay }: StationProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [count, setCount] = useState(0);
  const targetValue = parseInt(value.replace(/[^0-9]/g, '')) || 10;
  const prefix = value.match(/^[^0-9]*/)?.[0] || '';
  const suffix = value.match(/[^0-9]*$/)?.[0] || '';

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = targetValue / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        setCount(targetValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [targetValue]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex flex-col items-center group cursor-pointer"
    >
      {/* Glow effect */}
      <div className={`absolute inset-0 ${glowColor} blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
      
      {/* Hexagon/Circle container */}
      <motion.div
        animate={{ 
          scale: isHovered ? 1.1 : 1,
          boxShadow: isHovered ? `0 0 40px ${color}40` : `0 0 20px ${color}20`
        }}
        className={`relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-slate-800/80 backdrop-blur border-2 ${
          isHovered ? 'border-opacity-100' : 'border-opacity-50'
        } flex items-center justify-center transition-all duration-300`}
        style={{ borderColor: color }}
      >
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{ borderColor: color }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: delay * 2 }}
        />
        
        <div style={{ color }}>{icon}</div>
      </motion.div>

      {/* Value */}
      <motion.div 
        className="mt-3 text-xl md:text-2xl font-bold text-white"
        animate={{ scale: isHovered ? 1.1 : 1 }}
      >
        {prefix}{count.toLocaleString()}{suffix}
      </motion.div>

      {/* Label */}
      <div className="text-sm text-slate-400 mt-1">{label}</div>

      {/* Hover details */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 10
        }}
        className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-800/90 backdrop-blur px-3 py-1.5 rounded-lg text-xs text-slate-300 border border-slate-700"
      >
        {hoverDetails}
      </motion.div>
    </motion.div>
  );
};

const GrowthFlow = () => {
  const stations = [
    {
      icon: <Users className="w-7 h-7" />,
      label: 'Tráfico',
      value: '+10K',
      color: '#06b6d4',
      glowColor: 'bg-cyan-500',
      hoverDetails: 'Meta Ads, Google Ads, TikTok',
    },
    {
      icon: <Target className="w-7 h-7" />,
      label: 'Leads',
      value: '847',
      color: '#3b82f6',
      glowColor: 'bg-blue-500',
      hoverDetails: 'Landing pages, Lead magnets',
    },
    {
      icon: <DollarSign className="w-7 h-7" />,
      label: 'Ventas',
      value: '$124K',
      color: '#22c55e',
      glowColor: 'bg-green-500',
      hoverDetails: 'Embudos, Email sequences',
    },
    {
      icon: <TrendingUp className="w-7 h-7" />,
      label: 'Escala',
      value: '10x',
      color: '#a855f7',
      glowColor: 'bg-purple-500',
      hoverDetails: 'Automatización, IA',
    },
  ];

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4">
      {/* Desktop: Horizontal layout */}
      <div className="hidden md:block">
        {/* SVG connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ top: '40px' }}>
          <defs>
            <linearGradient id="flow-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="flow-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
            <linearGradient id="flow-gradient-3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>

          {/* Connection lines */}
          {[1, 2, 3].map((i) => (
            <g key={i}>
              <line
                x1={`${12.5 + (i - 1) * 25}%`}
                y1="50%"
                x2={`${12.5 + i * 25}%`}
                y2="50%"
                stroke={`url(#flow-gradient-${i})`}
                strokeWidth="2"
                strokeDasharray="8 4"
                opacity="0.5"
              />
              {/* Animated dots */}
              <circle r="4" fill={i === 1 ? '#06b6d4' : i === 2 ? '#3b82f6' : '#22c55e'}>
                <animate
                  attributeName="cx"
                  values={`${12.5 + (i - 1) * 25}%;${12.5 + i * 25}%`}
                  dur="2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cy"
                  values="50%;50%"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="3" fill={i === 1 ? '#06b6d4' : i === 2 ? '#3b82f6' : '#22c55e'} opacity="0.5">
                <animate
                  attributeName="cx"
                  values={`${12.5 + (i - 1) * 25}%;${12.5 + i * 25}%`}
                  dur="2s"
                  begin="0.5s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cy"
                  values="50%;50%"
                  dur="2s"
                  begin="0.5s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          ))}
        </svg>

        {/* Stations grid */}
        <div className="relative grid grid-cols-4 gap-8 py-8">
          {stations.map((station, index) => (
            <Station
              key={station.label}
              {...station}
              delay={0.4 + index * 0.15}
            />
          ))}
        </div>
      </div>

      {/* Mobile: Vertical layout */}
      <div className="md:hidden">
        <div className="relative flex flex-col items-center gap-8">
          {/* Vertical connection line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 via-green-500 to-purple-500 opacity-30" />
          
          {stations.map((station, index) => (
            <div key={station.label} className="relative z-10">
              <Station
                {...station}
                delay={0.4 + index * 0.15}
              />
              {index < stations.length - 1 && (
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2"
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: station.color }} />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GrowthFlow;
