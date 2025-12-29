import { useEffect, useCallback } from 'react';

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
  const openCalModal = useCallback(() => {
    if (window.Cal) {
      window.Cal("openModal", {
        calLink: "tizi-musso-lvxqn1/diagnostico-gratuito"
      });
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure Cal.com script is fully loaded
      const timer = setTimeout(() => {
        openCalModal();
        onClose();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, openCalModal, onClose]);

  // This component doesn't render anything - Cal.com handles the modal
  return null;
};

export default BookingModal;
