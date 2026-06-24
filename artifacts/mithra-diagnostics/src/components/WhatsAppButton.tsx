import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const url = 'https://wa.me/918247557270?text=Hello%2C%20I%20would%20like%20to%20know%20about%20diagnostic%20tests%20and%20reports.';

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
      aria-label="Chat on WhatsApp"
      data-testid="btn-whatsapp-float"
    >
      <motion.div
        className="relative w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center shadow-2xl shadow-[#25D366]/50 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full bg-[#25D366]"
          animate={{ scale: [1, 1.4, 1.4], opacity: [0.5, 0, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.div
          className="absolute inset-0 rounded-full bg-[#25D366]"
          animate={{ scale: [1, 1.6, 1.6], opacity: [0.3, 0, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
        />
        <MessageCircle className="w-8 h-8 text-white fill-white" />
      </motion.div>
    </a>
  );
}
