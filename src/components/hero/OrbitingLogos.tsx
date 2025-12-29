import { motion } from 'framer-motion';

// Tool logos with their brand colors
const toolLogos = [
  { name: 'Meta', color: '#0668E1', icon: 'M' },
  { name: 'Google', color: '#4285F4', icon: 'G' },
  { name: 'TikTok', color: '#000000', icon: 'T', textColor: 'white' },
  { name: 'Instagram', color: '#E4405F', icon: 'I' },
  { name: 'WhatsApp', color: '#25D366', icon: 'W' },
  { name: 'Claude', color: '#D97757', icon: 'C' },
  { name: 'ChatGPT', color: '#10a37f', icon: 'AI' },
  { name: 'Zapier', color: '#FF4A00', icon: 'Z' },
  { name: 'n8n', color: '#EA4B71', icon: 'n8' },
  { name: 'Make', color: '#6D00CC', icon: 'M' },
  { name: 'Slack', color: '#4A154B', icon: 'S' },
  { name: 'HubSpot', color: '#FF7A59', icon: 'H' },
  { name: 'Stripe', color: '#635BFF', icon: 'S' },
  { name: 'Shopify', color: '#96bf48', icon: 'Sh' },
  { name: 'WordPress', color: '#21759b', icon: 'W' },
  { name: 'Analytics', color: '#F9AB00', icon: 'A' },
];

// Split logos into 3 layers
const backLayer = toolLogos.slice(0, 6);
const midLayer = toolLogos.slice(6, 11);
const frontLayer = toolLogos.slice(11, 16);

interface LogoItemProps {
  logo: typeof toolLogos[0];
  index: number;
  total: number;
  radius: number;
  size: string;
  opacity: string;
  blur?: boolean;
}

const LogoItem = ({ logo, index, total, radius, size, opacity, blur }: LogoItemProps) => {
  const angle = (index / total) * 360;
  
  return (
    <div
      className={`absolute ${size} rounded-2xl shadow-lg flex items-center justify-center font-bold text-white transition-transform duration-300 hover:scale-110 ${opacity} ${blur ? 'blur-[1px]' : ''}`}
      style={{
        backgroundColor: logo.color,
        transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)`,
        color: logo.textColor || 'white',
      }}
    >
      <span className="text-sm font-bold">{logo.icon}</span>
    </div>
  );
};

const OrbitingLogos = () => {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ perspective: '1200px' }}>
      {/* Gradient overlay */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 20%, rgba(9,9,11,0.7) 60%, #09090b 80%)',
        }}
      />
      
      {/* Back layer - slow clockwise */}
      <div 
        className="absolute inset-0 animate-[spin_60s_linear_infinite]"
        style={{ transform: 'rotateX(15deg)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {backLayer.map((logo, i) => (
            <LogoItem
              key={`back-${i}`}
              logo={logo}
              index={i}
              total={backLayer.length}
              radius={380}
              size="w-16 h-16 md:w-20 md:h-20"
              opacity="opacity-40"
              blur
            />
          ))}
        </div>
      </div>

      {/* Mid layer - counter-clockwise */}
      <div 
        className="absolute inset-0 animate-[spin_50s_linear_infinite_reverse]"
        style={{ transform: 'rotateX(15deg)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {midLayer.map((logo, i) => (
            <LogoItem
              key={`mid-${i}`}
              logo={logo}
              index={i}
              total={midLayer.length}
              radius={260}
              size="w-14 h-14 md:w-16 md:h-16"
              opacity="opacity-60"
            />
          ))}
        </div>
      </div>

      {/* Front layer - slower clockwise */}
      <div 
        className="absolute inset-0 animate-[spin_80s_linear_infinite]"
        style={{ transform: 'rotateX(15deg)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {frontLayer.map((logo, i) => (
            <LogoItem
              key={`front-${i}`}
              logo={logo}
              index={i}
              total={frontLayer.length}
              radius={150}
              size="w-12 h-12 md:w-14 md:h-14"
              opacity="opacity-80"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrbitingLogos;
