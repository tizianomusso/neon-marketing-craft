import { memo } from 'react';
import { motion } from 'framer-motion';

const GradientWaveBackground = memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden contain-strict">
      {/* Base dark color */}
      <div className="absolute inset-0 bg-[#09090b]" />
      
      {/* Animated gradient blobs with GPU acceleration */}
      <motion.div
        className="absolute inset-0 opacity-50 gpu-accelerated"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(56, 189, 248, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 30%, rgba(56, 189, 248, 0.4) 0%, transparent 50%), radial-gradient(circle at 60% 70%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 60% 60%, rgba(56, 189, 248, 0.4) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 40%, rgba(56, 189, 248, 0.4) 0%, transparent 50%), radial-gradient(circle at 20% 60%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(56, 189, 248, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
});

GradientWaveBackground.displayName = 'GradientWaveBackground';

export default GradientWaveBackground;
