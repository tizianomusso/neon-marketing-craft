import { motion } from 'framer-motion';
import metaLogo from '@/assets/logos/meta.svg';
import googleLogo from '@/assets/logos/google.png';
import tiktokLogo from '@/assets/logos/tiktok.svg';
import instagramLogo from '@/assets/logos/instagram.svg';
import n8nLogo from '@/assets/logos/n8n.svg';
import openaiLogo from '@/assets/logos/openai.svg';

const logos = [
  { name: 'Meta', logo: metaLogo, smallPadding: false },
  { name: 'Google', logo: googleLogo, smallPadding: true },
  { name: 'TikTok', logo: tiktokLogo, smallPadding: false },
  { name: 'Instagram', logo: instagramLogo, smallPadding: false },
  { name: 'n8n', logo: n8nLogo, smallPadding: false },
  { name: 'OpenAI', logo: openaiLogo, smallPadding: false },
];

const OverlappingLogos = () => {
  return (
    <div className="flex justify-center lg:justify-start -space-x-4 lg:-space-x-6">
      {logos.map((logo, index) => (
        <motion.div
          key={logo.name}
          initial={{ opacity: 0, scale: 0.8, x: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
          whileHover={{ scale: 1.1, zIndex: 10 }}
          className={`relative bg-white border border-gray-100 shadow-2xl h-14 w-14 lg:h-20 lg:w-20 rounded-full flex items-center justify-center cursor-pointer transition-transform ${logo.smallPadding ? 'p-2 lg:p-2.5' : 'p-3 lg:p-4'}`}
          style={{ zIndex: logos.length - index }}
        >
          <img 
            src={logo.logo} 
            alt={logo.name} 
            className="w-full h-full object-contain"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default OverlappingLogos;
