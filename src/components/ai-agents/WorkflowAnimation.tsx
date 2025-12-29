import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Brain, Mail, Calendar, Database } from 'lucide-react';

interface NodeProps {
  icon: React.ReactNode;
  label: string;
  color: string;
  size?: 'normal' | 'large';
  isActive?: boolean;
  delay?: number;
}

const WorkflowNode = ({ icon, label, color, size = 'normal', isActive = false, delay = 0 }: NodeProps) => {
  const sizeClasses = size === 'large' ? 'w-24 h-24' : 'w-20 h-20';
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, borderColor: 'rgb(6, 182, 212)' }}
      className={`${sizeClasses} relative bg-slate-800/80 backdrop-blur rounded-xl border border-slate-700 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 group`}
    >
      {/* Glow effect for active/large nodes */}
      {(isActive || size === 'large') && (
        <div className={`absolute inset-0 ${color} opacity-20 blur-xl rounded-xl`} />
      )}
      
      {/* Pulse ring for trigger node */}
      {isActive && (
        <motion.div
          className={`absolute inset-0 ${color} rounded-xl opacity-30`}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      
      <div className={`${color} p-2 rounded-lg`}>
        {icon}
      </div>
      <span className="text-xs text-slate-300 font-medium text-center px-1">{label}</span>
    </motion.div>
  );
};

const WorkflowAnimation = () => {
  const [activeOutput, setActiveOutput] = useState(0);
  const [taskCount, setTaskCount] = useState(847);

  // Cycle through output nodes
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveOutput((prev) => (prev + 1) % 3);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Increment task counter
  useEffect(() => {
    const interval = setInterval(() => {
      setTaskCount((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* Background container with grid pattern */}
      <div 
        className="relative bg-slate-800/50 rounded-2xl p-6 lg:p-8 border border-slate-700/50 overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(rgba(51, 65, 85, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(51, 65, 85, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      >
        {/* SVG for connection lines */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 400 300"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(6, 182, 212)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="rgb(34, 211, 238)" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          
          {/* Path from Trigger to AI Agent */}
          <path
            id="path1"
            d="M 80 150 Q 140 150 170 150"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
          />
          
          {/* Path from AI Agent to Email */}
          <path
            id="path2"
            d="M 230 150 Q 280 100 320 70"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
          />
          
          {/* Path from AI Agent to Calendar */}
          <path
            id="path3"
            d="M 230 150 Q 280 150 320 150"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
          />
          
          {/* Path from AI Agent to CRM */}
          <path
            id="path4"
            d="M 230 150 Q 280 200 320 230"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
          />
          
          {/* Animated dots on paths */}
          <circle r="4" fill="#06b6d4">
            <animateMotion dur="2s" repeatCount="indefinite">
              <mpath href="#path1" />
            </animateMotion>
          </circle>
          
          <circle r="4" fill="#06b6d4">
            <animateMotion dur="2s" repeatCount="indefinite" begin="0.5s">
              <mpath href="#path2" />
            </animateMotion>
          </circle>
          
          <circle r="4" fill="#06b6d4">
            <animateMotion dur="2s" repeatCount="indefinite" begin="1s">
              <mpath href="#path3" />
            </animateMotion>
          </circle>
          
          <circle r="4" fill="#06b6d4">
            <animateMotion dur="2s" repeatCount="indefinite" begin="1.5s">
              <mpath href="#path4" />
            </animateMotion>
          </circle>
        </svg>

        {/* Nodes container */}
        <div className="relative z-10 flex items-center justify-between min-h-[250px]">
          {/* Trigger Node */}
          <div className="flex-shrink-0">
            <WorkflowNode
              icon={<MessageCircle className="w-5 h-5 text-white" />}
              label="Nuevo mensaje"
              color="bg-green-500"
              isActive
              delay={0.2}
            />
          </div>

          {/* AI Agent Node - Center */}
          <div className="flex-shrink-0 mx-4 lg:mx-8">
            <motion.div
              animate={{ boxShadow: ['0 0 20px rgba(168, 85, 247, 0.3)', '0 0 40px rgba(168, 85, 247, 0.5)', '0 0 20px rgba(168, 85, 247, 0.3)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <WorkflowNode
                icon={<Brain className="w-6 h-6 text-white" />}
                label="Agente IA"
                color="bg-purple-500"
                size="large"
                delay={0.4}
              />
            </motion.div>
          </div>

          {/* Output Nodes */}
          <div className="flex flex-col gap-4 flex-shrink-0">
            <motion.div
              animate={{ 
                opacity: activeOutput === 0 ? 1 : 0.6,
                scale: activeOutput === 0 ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <WorkflowNode
                icon={<Mail className="w-5 h-5 text-white" />}
                label="Enviar email"
                color="bg-blue-500"
                delay={0.6}
              />
            </motion.div>
            
            <motion.div
              animate={{ 
                opacity: activeOutput === 1 ? 1 : 0.6,
                scale: activeOutput === 1 ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <WorkflowNode
                icon={<Calendar className="w-5 h-5 text-white" />}
                label="Agendar cita"
                color="bg-orange-500"
                delay={0.7}
              />
            </motion.div>
            
            <motion.div
              animate={{ 
                opacity: activeOutput === 2 ? 1 : 0.6,
                scale: activeOutput === 2 ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <WorkflowNode
                icon={<Database className="w-5 h-5 text-white" />}
                label="Guardar en CRM"
                color="bg-pink-500"
                delay={0.8}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Task counter */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-4 text-center"
      >
        <span className="text-slate-400 text-sm">
          <span className="text-cyan-400 font-bold text-lg">{taskCount.toLocaleString()}</span>
          {' '}tareas automatizadas hoy
        </span>
      </motion.div>
    </div>
  );
};

export default WorkflowAnimation;
