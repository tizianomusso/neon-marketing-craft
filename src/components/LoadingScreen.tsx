import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
    >
      <div className="relative">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.rect
              width="40"
              height="40"
              rx="10"
              fill="url(#loadingGradient)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            />
            <motion.path
              d="M26 14C26 14 24.5 14 22 14C18 14 16 16 16 20C16 24 18 26 22 26C24.5 26 26 26 26 26"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            <motion.path
              d="M14 14C14 14 15.5 14 18 14C22 14 24 16 24 20C24 24 22 26 18 26C15.5 26 14 26 14 26"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            />
            <defs>
              <linearGradient id="loadingGradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="hsl(217 91% 60%)" />
                <stop offset="1" stopColor="hsl(189 94% 43%)" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
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
          transition={{ delay: 1 }}
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
