import { motion } from 'framer-motion';
import logoImage from '@/assets/logo.png';

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
    >
      <div className="relative flex flex-col items-center">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <motion.img
            src={logoImage}
            alt="Innova Solutions Logo"
            className="w-20 h-20 object-contain"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          />
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <span className="font-heading font-bold text-lg gradient-text">
            Innova Solutions
          </span>
        </motion.div>

        {/* Loading Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-4 w-48 h-1 bg-muted rounded-full overflow-hidden"
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-1/2 h-full bg-gradient-to-r from-primary to-secondary"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;