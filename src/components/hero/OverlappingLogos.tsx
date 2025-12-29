import { motion } from 'framer-motion';

// Tool logos with brand colors (using initials as fallback)
const logos = [
  { name: 'Meta', color: '#0668E1', textColor: 'white' },
  { name: 'Google', color: '#4285F4', textColor: 'white' },
  { name: 'TikTok', color: '#000000', textColor: 'white' },
  { name: 'Instagram', color: '#E4405F', textColor: 'white' },
  { name: 'Claude', color: '#D97757', textColor: 'white' },
  { name: 'OpenAI', color: '#10a37f', textColor: 'white' },
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
          className="relative bg-white border border-gray-100 shadow-2xl h-14 w-14 lg:h-20 lg:w-20 rounded-full p-3 lg:p-4 flex items-center justify-center cursor-pointer transition-transform"
          style={{ zIndex: logos.length - index }}
        >
          <div 
            className="w-full h-full rounded-full flex items-center justify-center text-xs lg:text-sm font-bold"
            style={{ backgroundColor: logo.color, color: logo.textColor }}
          >
            {logo.name.charAt(0)}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default OverlappingLogos;
