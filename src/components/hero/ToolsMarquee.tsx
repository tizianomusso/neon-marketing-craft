import { memo, useMemo } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import metaLogo from '@/assets/logos/meta.svg';
import googleLogo from '@/assets/logos/google.png';
import tiktokLogo from '@/assets/logos/tiktok.svg';
import claudeLogo from '@/assets/logos/claude.png';
import openaiLogo from '@/assets/logos/openai.svg';
import n8nLogo from '@/assets/logos/n8n.svg';
import zapierLogo from '@/assets/logos/zapier.svg';
import hubspotLogo from '@/assets/logos/hubspot.svg';

const toolsData = [
  { name: 'Meta Ads', category: 'Publicidad Digital', description: 'Escalamos ventas mes a mes', logo: metaLogo, bgColor: '#ffffff' },
  { name: 'Google Ads', category: 'Search & Display', description: 'Captamos clientes buscando', logo: googleLogo, bgColor: '#ffffff' },
  { name: 'TikTok Ads', category: 'Video Marketing', description: 'Alcance a nuevas audiencias', logo: tiktokLogo, bgColor: '#ffffff' },
  { name: 'Claude AI', category: 'Inteligencia Artificial', description: 'Análisis de datos en minutos', logo: claudeLogo, bgColor: '#ffffff' },
  { name: 'ChatGPT', category: 'IA Generativa', description: 'Contenido optimizado 24/7', logo: openaiLogo, bgColor: '#10a37f' },
  { name: 'n8n', category: 'Automatización', description: 'Procesos sin intervención', logo: n8nLogo, bgColor: '#ffffff' },
  { name: 'Zapier', category: 'Integraciones', description: 'Todo conectado sin fricciones', logo: zapierLogo, bgColor: '#ffffff' },
  { name: 'HubSpot', category: 'CRM', description: 'Seguimiento de cada lead', logo: hubspotLogo, bgColor: '#ffffff' },
];

const ToolCard = memo(({ tool }: { tool: typeof toolsData[0] }) => (
  <div
    className="flex-shrink-0 flex items-center gap-4 border border-white/10 backdrop-blur-md rounded-xl px-6 py-4 min-w-[240px] hover:border-white/20 transition-colors cursor-pointer group"
  >
    <div 
      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 p-2"
      style={{ backgroundColor: tool.bgColor }}
    >
      <img src={tool.logo} alt={tool.name} className="w-full h-full object-contain" loading="lazy" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-semibold text-white text-sm group-hover:text-cyan-400 transition-colors">
        {tool.name}
      </p>
      <p className="text-xs text-white/50">{tool.category}</p>
      <p className="text-xs text-white/40 truncate">{tool.description}</p>
    </div>
  </div>
));

ToolCard.displayName = 'ToolCard';

const ToolsMarquee = () => {
  const isMobile = useIsMobile();
  
  const duplicatedTools = useMemo(() => {
    if (isMobile) {
      return [...toolsData, ...toolsData];
    }
    return [...toolsData, ...toolsData, ...toolsData, ...toolsData];
  }, [isMobile]);

  return (
    <div className="w-full overflow-hidden py-12">
      <p className="text-center text-white/50 text-lg mb-10">
        Herramientas que potencian tu crecimiento
      </p>
      
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#09090b] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#09090b] to-transparent z-10 pointer-events-none" />
        
        <div 
          className="flex gap-6 md:gap-10"
          style={{
            animation: isMobile ? 'none' : 'marquee 40s linear infinite',
            ...(isMobile && {
              overflowX: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            })
          }}
        >
          {duplicatedTools.map((tool, index) => (
            <ToolCard key={`${tool.name}-${index}`} tool={tool} />
          ))}
        </div>
        
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          
          @media (max-width: 767px) {
            .flex::-webkit-scrollbar {
              display: none;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default memo(ToolsMarquee);
