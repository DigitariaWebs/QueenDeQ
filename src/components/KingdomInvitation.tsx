import { useState, useEffect } from 'react';
import { useTranslation } from '../context/TranslationContext';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';

const KingdomInvitation = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Do not show after the event date
    const eventEnd = new Date('2025-07-31T20:00:00');
    if (new Date() > eventEnd) return;
    // Check if we've shown the popup in this session
    const hasShown = sessionStorage.getItem('kingdomInvitationShown');
    if (!hasShown) {
      // Wait a bit before showing the popup
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('kingdomInvitationShown', 'true');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100vw';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/invite', { email });
      // Optionally show a success message or close popup
      setIsOpen(false);
    } catch (err) {
      // Optionally show an error message
      setIsOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile version */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-2 bg-black/80 sm:hidden"
            style={{ paddingTop: 'env(safe-area-inset-top, 24px)', paddingBottom: 'env(safe-area-inset-bottom, 24px)' }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsOpen(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-gradient-to-b from-royal-purple to-black rounded-xl shadow-2xl overflow-hidden"
              style={{
                maxHeight: 'calc(100vh - 64px)',
                margin: '32px 0',
                overflowY: 'auto',
                boxSizing: 'border-box',
                width: '100%',
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 text-rose-champagne/60 hover:text-imperial-gold transition-colors rounded-full bg-black/40 p-3 focus:outline-none focus:ring-2 focus:ring-imperial-gold"
                aria-label="Fermer"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/* Content */}
              <div className="p-4">
                <h2 className="text-xl font-cinzel text-imperial-gold text-center mb-3 leading-tight">
                  Lancement Officiel de Queen de Q
                </h2>
                <p className="text-center text-rose-champagne italic mb-4 text-sm">
                  "Le pont-levis descend. Les portes s'ouvrent. Le royaume t'attend."
                </p>
                <div className="flex flex-col justify-center items-center gap-3 mb-4">
                  <div className="flex items-center gap-2 text-imperial-gold">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs">31 Juillet 2025 | 19:00 - 20:00</span>
                  </div>
                  <div className="flex items-center gap-2 text-imperial-gold">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 009 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs">En Ligne | Le lien de la rencontre te sera envoyé</span>
                  </div>
                </div>
                <div className="mb-4">
                  <h3 className="text-base font-cinzel text-imperial-gold mb-2">Au programme :</h3>
                  <p className="text-rose-champagne mb-2 text-xs">
                    Les Reines Karine et Marie-Ève dévoileront l'application Queen de Q, sa genèse, ses fonctionnalités, la communauté et leur vision d'une sororité solide et couronnée!
                  </p>
                  <div className="bg-imperial-gold/10 p-2 rounded-lg">
                    <p className="text-imperial-gold font-bold text-center text-xs">
                      OFFRE ROYALE POUR LES PREMIÈRES REINES À INTÉGRER LE ROYAUME
                    </p>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-2">
                  <p className="text-center text-rose-champagne mb-2 text-sm">
                    Est-ce que t'es prête à révéler ta puissance intérieure ?
                  </p>
                  <div className="flex flex-col gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Entre ton courriel..."
                      required
                      autoComplete="email"
                      inputMode="email"
                      className="flex-1 px-4 py-2 rounded-lg bg-black/30 border border-imperial-gold/30 text-rose-champagne placeholder-rose-champagne/50 focus:outline-none focus:border-imperial-gold transition-colors text-sm"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2 bg-gradient-to-r from-imperial-gold via-rose-champagne to-imperial-gold rounded-lg text-black font-semibold hover:opacity-90 transition-opacity whitespace-nowrap text-sm"
                    >
                      Je suis prête à me couronner
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-rose-champagne/20 text-imperial-gold font-medium text-sm focus:outline-none focus:ring-2 focus:ring-imperial-gold"
                    aria-label="Fermer le popup"
                  >
                    Fermer
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
          {/* Desktop/laptop version */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 hidden sm:flex items-center justify-center px-4 bg-black/80"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsOpen(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl bg-gradient-to-b from-royal-purple to-black rounded-lg shadow-2xl overflow-hidden"
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-rose-champagne/60 hover:text-imperial-gold transition-colors"
                aria-label="Fermer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/* Content */}
              <div className="p-8">
                <h2 className="text-3xl md:text-4xl font-cinzel text-imperial-gold text-center mb-4">
                  Lancement Officiel de Queen de Q
                </h2>
                <p className="text-center text-rose-champagne italic mb-8">
                  "Le pont-levis descend. Les portes s'ouvrent. Le royaume t'attend."
                </p>
                <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8">
                  <div className="flex items-center gap-2 text-imperial-gold">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span>31 Juillet 2025 | 19:00 - 20:00</span>
                  </div>
                  <div className="flex items-center gap-2 text-imperial-gold">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 009 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                    </svg>
                    <span>En Ligne | Le lien de la rencontre te sera envoyé</span>
                  </div>
                </div>
                <div className="mb-8">
                  <h3 className="text-xl font-cinzel text-imperial-gold mb-4">Au programme :</h3>
                  <p className="text-rose-champagne mb-4">
                    Les Reines Karine et Marie-Ève dévoileront l'application Queen de Q, sa genèse, ses fonctionnalités, la communauté et leur vision d'une sororité solide et couronnée!
                  </p>
                  <div className="bg-imperial-gold/10 p-4 rounded-lg">
                    <p className="text-imperial-gold font-bold text-center">
                      OFFRE ROYALE POUR LES PREMIÈRES REINES À INTÉGRER LE ROYAUME
                    </p>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-center text-rose-champagne mb-4">
                  Est-ce que t'es prête à révéler ta puissance intérieure ?
                </p>
                  <div className="flex flex-col md:flex-row gap-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    placeholder="Entre ton courriel..."
                      required
                      className="flex-1 px-4 py-2 rounded-lg bg-black/30 border border-imperial-gold/30 text-rose-champagne placeholder-rose-champagne/50 focus:outline-none focus:border-imperial-gold transition-colors"
                    />
                    <button
                      type="submit"
                      className="px-6 py-2 bg-gradient-to-r from-imperial-gold via-rose-champagne to-imperial-gold rounded-lg text-black font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
                    >
                    Je suis prête à me couronner
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default KingdomInvitation;