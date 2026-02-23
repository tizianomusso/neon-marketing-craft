import { memo } from 'react';
import { motion } from 'framer-motion';
import metaLogo from '@/assets/logos/meta.svg';
import instagramLogo from '@/assets/logos/instagram.svg';
import googleLogo from '@/assets/logos/google.svg';
import openaiLogo from '@/assets/logos/openai.svg';

const logosData = [
  { name: 'Meta', logo: metaLogo },
  { name: 'Instagram', logo: instagramLogo },
  { name: 'Google', logo: googleLogo },
  { name: 'OpenAI', logo: openaiLogo },
];

const OverlappingLogos = () => (
  <div className="flex justify-center lg:justify-start gap-5 overflow-x-auto scrollbar-hide">
    {logosData.map((logo, index) => (
      <motion.div
        key={logo.name}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 + index * 0.08, duration: 0.35 }}
        className="flex-shrink-0 bg-white/5 border border-white/10 h-11 w-11 lg:h-14 lg:w-14 rounded-full flex items-center justify-center p-2.5 lg:p-3 opacity-75 hover:opacity-100 transition-opacity"
      >
        <img
          src={logo.logo}
          alt={logo.name}
          className="w-full h-full object-contain brightness-0 invert"
          loading="eager"
        />
      </motion.div>
    ))}
  </div>
);

export default memo(OverlappingLogos);
