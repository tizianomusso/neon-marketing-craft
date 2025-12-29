import { useEffect } from 'react';

declare global {
  interface Window {
    Cal?: (action: string, options?: Record<string, unknown>) => void;
  }
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  useEffect(() => {
    if (isOpen && window.Cal) {
      window.Cal("openModal", {
        calLink: "tizi-musso-lvxqn1/diagnostico-gratuito",
        config: {
          layout: "month_view"
        }
      });
      
      // Close the React modal state since Cal.com handles its own modal
      onClose();
    }
  }, [isOpen, onClose]);

  // This component doesn't render anything - Cal.com handles the modal
  return null;
};

export default BookingModal;
