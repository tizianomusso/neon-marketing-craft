import { motion } from 'framer-motion';
import metaLogo from '@/assets/logos/meta.svg';
import googleLogo from '@/assets/logos/google.png';
import tiktokLogo from '@/assets/logos/tiktok.svg';
import claudeLogo from '@/assets/logos/claude.png';
import openaiLogo from '@/assets/logos/openai.svg';
import n8nLogo from '@/assets/logos/n8n.svg';
import zapierLogo from '@/assets/logos/zapier.svg';
import hubspotLogo from '@/assets/logos/hubspot.svg';

const tools = [
  { name: 'Meta Ads', category: 'Publicidad Digital', description: '+300% ROAS para e-commerce', logo: metaLogo, bgColor: '#ffffff' },
  { name: 'Google Ads', category: 'Search & Display', description: '-40% costo por lead', logo: googleLogo, bgColor: '#ffffff' },
  { name: 'TikTok Ads', category: 'Video Marketing', description: '+2M impresiones mensuales', logo: tiktokLogo, bgColor: '#ffffff' },
  { name: 'Claude AI', category: 'Inteligencia Artificial', description: '80% menos tiempo en análisis', logo: claudeLogo, bgColor: '#ffffff' },
  { name: 'ChatGPT', category: 'IA Generativa', description: '50+ contenidos por semana', logo: openaiLogo, bgColor: '#10a37f' },
  { name: 'n8n', category: 'Automatización', description: '+100 tareas automatizadas', logo: n8nLogo, bgColor: '#ffffff' },
  { name: 'Zapier', category: 'Integraciones', description: '20+ apps conectadas', logo: zapierLogo, bgColor: '#ffffff' },
  { name: 'HubSpot', category: 'CRM', description: '+500 leads gestionados', logo: hubspotLogo, bgColor: '#ffffff' },
];

// Duplicate for infinite scroll effect
const duplicatedTools = [...tools, ...tools, ...tools, ...tools];

const ToolsMarquee = () => {
  return (
    <div className="w-full overflow-hidden py-12">
      {/* Title */}
      <p className="text-center text-white/50 text-lg mb-10">
        Herramientas que potencian tu crecimiento
      </p>
      
      {/* Marquee container */}
      <div className="relative">
        {/* Gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#09090b] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#09090b] to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling content */}
        <motion.div
          className="flex gap-10"
          animate={{ x: [0, -2000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 40,
              ease: 'linear',
            },
          }}
        >
          {duplicatedTools.map((tool, index) => (
            <div
              key={`${tool.name}-${index}`}
              className="flex-shrink-0 flex items-center gap-4 border border-white/10 backdrop-blur-md rounded-xl px-6 py-4 min-w-[240px] hover:border-white/20 transition-colors cursor-pointer group"
            >
              {/* Icon */}
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 p-2"
                style={{ backgroundColor: tool.bgColor }}
              >
                <img src={tool.logo} alt={tool.name} className="w-full h-full object-contain" />
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white text-sm group-hover:text-cyan-400 transition-colors">
                  {tool.name}
                </p>
                <p className="text-xs text-white/50">{tool.category}</p>
                <p className="text-xs text-white/40 truncate">{tool.description}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ToolsMarquee;
