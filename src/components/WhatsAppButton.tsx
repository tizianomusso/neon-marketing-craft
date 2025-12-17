import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/5491130701907?text=Hola%20estuve%20navegando%20por%20su%20sitio%20web%20y%20quiero%20adquirir%20alguno%20de%20sus%20servicios."
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:bg-green-600 transition-colors"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" fill="white" />
      
      {/* Pulse animation */}
      <span className="absolute w-full h-full rounded-full bg-green-500 animate-ping opacity-30" />
    </motion.a>
  );
};

export default WhatsAppButton;
