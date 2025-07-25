import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../context/TranslationContext';
import { X, Crown, Star, Sparkles, CheckCircle, ExternalLink } from 'lucide-react';
import Lenis from 'lenis';

interface InscriptionFormProps {
  drawnCard: string;
  isVisible: boolean;
  onClose: () => void;
}

export const InscriptionForm: React.FC<InscriptionFormProps> = ({ 
  drawnCard, 
  isVisible, 
  onClose
}) => {
  const { t } = useTranslation();
  const [isAccepted, setIsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Pause/resume Lenis smooth scroll when modal is open/closed
  useEffect(() => {
    const lenis = (window as any).lenis as Lenis | undefined;
    if (isVisible) {
      document.body.style.overflow = 'hidden';
      if (lenis && typeof lenis.stop === 'function') lenis.stop();
      // Add Escape key listener
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        if (lenis && typeof lenis.start === 'function') lenis.start();
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
      if (lenis && typeof lenis.start === 'function') lenis.start();
    }
    return () => {
      document.body.style.overflow = 'unset';
      if (lenis && typeof lenis.start === 'function') lenis.start();
    };
  }, [isVisible, onClose]);

  // Prevent scroll events from propagating to the background
  const handleWheel = (e: React.WheelEvent) => {
    if (modalRef.current && e.target instanceof Node && modalRef.current.contains(e.target)) {
      // Allow scroll inside modal
      // But prevent scroll from bubbling to background
      const el = modalRef.current;
      const { scrollTop, scrollHeight, clientHeight } = el;
      const atTop = scrollTop === 0;
      const atBottom = scrollTop + clientHeight === scrollHeight;
      if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
        e.preventDefault();
      }
      e.stopPropagation();
    } else {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleAcceptanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAccepted(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAccepted) return;
    
    setIsLoading(true);

    try {
      // Simulate a brief loading time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to the external platform
      window.open('https://queen-de-q-platform-v2.vercel.app/', '_blank');
      
      // Close the form
      onClose();
    } catch (err) {
      console.error('Error redirecting:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2"
        onClick={onClose}
        onWheel={handleWheel}
      >
        <motion.div
          ref={modalRef}
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
        className="relative w-full max-w-2xl my-auto overflow-hidden rounded-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-royal-purple via-royal-purple/95 to-black">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(214,174,96,0.1),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(214,174,96,0.1),transparent_50%)]" />
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-imperial-gold/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

          {/* Close Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-2 right-2 z-50 w-8 h-8 flex items-center justify-center text-imperial-gold hover:text-yellow-300 transition-all duration-200 hover:rotate-90 bg-black/20 hover:bg-black/40 rounded-full border border-imperial-gold/30 hover:border-imperial-gold/60"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="relative z-10 p-8 flex flex-col items-center justify-center" style={{ minHeight: '600px' }}>
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                className="relative w-24 h-24 mx-auto mb-6"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-imperial-gold via-yellow-400 to-imperial-gold rounded-full animate-pulse" />
                <div className="absolute inset-3 bg-royal-purple rounded-full flex items-center justify-center">
                  <Crown className="w-12 h-12 text-imperial-gold" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="w-6 h-6 text-imperial-gold animate-spin" />
                </div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-cinzel font-bold text-imperial-gold mb-3"
              >
                Inscription Royale
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-rose-champagne/80 font-raleway text-lg"
              >
                Accédez au Royaume
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 p-6 bg-imperial-gold/10 border border-imperial-gold/30 rounded-xl"
              >
                <p className="text-rose-champagne/90 leading-relaxed font-raleway text-center text-base">
                  🌟 Votre destinée vous appelle ! Cette application exclusive vous donnera accès à des outils personnalisés pour développer votre potentiel, rejoindre une communauté de femmes inspirantes et transformer votre vie. Ne laissez pas passer cette opportunité unique de devenir la reine de votre propre royaume. <span className="text-imperial-gold font-semibold">Votre transformation commence maintenant !</span>
                </p>
              </motion.div>
            </div>

            {/* Acceptance Form */}
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
              {/* Terms Acceptance */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-black/20 border border-imperial-gold/30 rounded-xl p-3"
              >
                <div className="flex items-start space-x-2">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="acceptance"
                      checked={isAccepted}
                      onChange={handleAcceptanceChange}
                      className="sr-only"
                    />
                    <label
                      htmlFor="acceptance"
                      className="flex items-center justify-center w-5 h-5 bg-black/30 border-2 border-imperial-gold/50 rounded cursor-pointer transition-all duration-300 hover:border-imperial-gold"
                    >
                      {isAccepted && (
                        <CheckCircle className="w-4 h-4 text-imperial-gold" />
                      )}
                    </label>
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="acceptance"
                      className="text-rose-champagne font-raleway leading-relaxed cursor-pointer text-xs"
                    >
                      J'accepte de rejoindre la <span className="text-imperial-gold font-semibold">Queen Platform</span> pour accéder à cette expérience exclusive.
                    </label>
                  </div>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={!isAccepted || isLoading}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="w-full bg-gradient-to-r from-imperial-gold to-yellow-600 hover:from-yellow-600 hover:to-imperial-gold text-royal-purple font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-base"
                whileHover={{ scale: !isAccepted || isLoading ? 1 : 1.02 }}
                whileTap={{ scale: !isAccepted || isLoading ? 1 : 0.98 }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-royal-purple border-t-transparent rounded-full animate-spin mr-2"></div>
                    Redirection en cours...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Crown className="w-5 h-5 mr-2" />
                    Accédez au Royaume
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </div>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};