import { motion } from 'framer-motion';

interface FloatingBadgeProps {
  position: 'top-right' | 'bottom-left';
  value: string;
  label: string;
  delay?: number;
  showProgress?: boolean;
}

const FloatingBadge = ({
  position,
  value,
  label,
  delay = 0,
  showProgress = false,
}: FloatingBadgeProps) => {
  const positionClasses = {
    'top-right': 'absolute -top-4 -right-4 md:top-4 md:-right-8',
    'bottom-left': 'absolute -bottom-4 left-4 md:bottom-8 md:-left-8',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay,
        type: 'spring',
        stiffness: 200,
        damping: 15,
      }}
      whileHover={{ scale: 1.1 }}
      className={`${positionClasses[position]} z-20`}
    >
      <motion.div
        className="relative bg-background rounded-xl px-5 py-3 shadow-2xl cursor-pointer group"
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay * 2,
        }}
      >
        {/* Glow on hover */}
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)',
          }}
        />

        {/* Progress circle for 100% badge */}
        {showProgress && (
          <motion.svg
            className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)]"
            viewBox="0 0 100 100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.5 }}
          >
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(6, 182, 212, 0.2)"
              strokeWidth="2"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#06B6D4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="283"
              initial={{ strokeDashoffset: 283 }}
              whileInView={{ strokeDashoffset: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: delay + 0.8, ease: 'easeOut' }}
              style={{
                transformOrigin: 'center',
                transform: 'rotate(-90deg)',
              }}
            />
          </motion.svg>
        )}

        <div className="text-center relative z-10">
          <motion.span
            className="block font-heading text-3xl font-bold text-foreground"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: delay + 0.3,
              type: 'spring',
              stiffness: 300,
            }}
          >
            {value}
          </motion.span>
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>

        {/* Animated shadow */}
        <motion.div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 rounded-full blur-lg bg-foreground/20"
          animate={{
            scaleX: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: delay * 2,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default FloatingBadge;
