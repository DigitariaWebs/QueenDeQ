import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Deck3D } from '../components/Deck3D';
// import { CreativeCrown } from '../components/CreativeCrown';
// import { CouronneCosmique } from '../components/CouronneCosmique';
import { ParticleCanvas } from '../components/ParticleCanvas';
import { InscriptionForm } from '../components/InscriptionForm';
import { useSpotsLeft } from '../hooks/useSpotsLeft';
import { useTranslation } from '../context/TranslationContext';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export const Hero: React.FC = () => {
  const { t, language } = useTranslation();
  const [drawnCard, setDrawnCard] = useState<string>('');
  const [showInscriptionForm, setShowInscriptionForm] = useState(false);
  // const { spotsLeft, isLoading } = useSpotsLeft();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const handleCardDraw = (cardName: string) => {
    setDrawnCard(cardName);
    setShowInscriptionForm(true);
  };

  const handleCloseForm = () => {
    setShowInscriptionForm(false);
  };

  
  const fullDescription = t('hero.description');
  const getPreviewText = (text: string) => {
    const firstSentenceEnd = text.indexOf('.');
    if (firstSentenceEnd === -1) return text;
    const secondSentenceEnd = text.indexOf('.', firstSentenceEnd + 1);
    if (secondSentenceEnd === -1) return text;
    return text.substring(0, secondSentenceEnd + 1);
  };
  const previewText = getPreviewText(fullDescription);

  // New creative typography animation variants
  // const textReveal: Variants = {
  //   hidden: { 
  //     opacity: 0,
  //     clipPath: "inset(0 100% 0 0)"
  //   },
  //   show: { 
  //     opacity: 1,
  //     clipPath: "inset(0 0% 0 0)",
  //     transition: {
  //       duration: 0.8,
  //       ease: [0.76, 0, 0.24, 1]
  //     }
  //   }
  // };

  // const glowEffect: Variants = {
  //   hidden: { 
  //     opacity: 0,
  //     scale: 0.8,
  //     filter: "blur(10px)"
  //   },
  //   show: { 
  //     opacity: 1,
  //     scale: 1,
  //     filter: "blur(0px)",
  //     transition: {
  //       duration: 0.5,
  //       delay: 0.2,
  //       ease: "easeOut"
  //     }
  //   }
  // };

  const floatingParticles: Variants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    show: { 
      opacity: [0, 1, 1, 0],
      y: [-20, -40, -60, -80],
      transition: {
        duration: 2,
        delay: 0.5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      <section id="hero" className="grid lg:grid-cols-[60%_40%] w-screen min-h-screen overflow-hidden">
        {/* LEFT column = headline, CTA, badge */}
        <div className="relative bg-gradient-to-br from-royal-purple via-royal-purple/95 to-royal-purple/90 flex items-center justify-center p-2 pb-0 sm:p-8 lg:p-16 pt-16 lg:pt-16">
          <div className="max-w-2xl w-full mx-auto">
            
            {/* Creative Animated Typography */}
            <div className="mb-8 sm:mb-12 relative">
              {/* Floating Particles */}
              <div className="absolute -top-4 -left-4 w-full h-full pointer-events-none overflow-hidden">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    variants={floatingParticles}
                    initial="hidden"
                    animate="show"
                    className="absolute w-1 h-1 bg-imperial-gold rounded-full"
                    style={{
                      left: `${20 + (i * 15)}%`,
                      top: `${10 + (i * 8)}%`,
                      animationDelay: `${i * 0.2}s`
                    }}
                  />
                ))}
              </div>

              {/* Main Title - Responsive Centering */}
              <div className="mb-2 sm:mb-8 relative overflow-visible text-center sm:text-left" style={{ minHeight: '100px', paddingBottom: '0.3rem' }}>
                <h1 
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-transparent bg-gradient-to-br from-imperial-gold via-yellow-300 to-imperial-gold bg-clip-text font-playlist relative text-center sm:text-left"
                  style={{ paddingBottom: '0.3em', lineHeight: '1.35', overflow: 'visible' }}
                >
                  {t('hero.title')}
                </h1>
                {/* Glow effect behind title */}
                <div
                  className="absolute inset-0 text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold text-imperial-gold/20 blur-lg -z-10 font-playlist text-center sm:text-left"
                  style={{ paddingBottom: '0.3em', lineHeight: '1.35', overflow: 'visible' }}
                >
                  {t('hero.title')}
                </div>
              </div>

              {/* Subtitle with Handwriting Effect */}
              <div className="relative mb-4 sm:mb-8 overflow-hidden" >
                {/* Container for the handwriting effect */}
                <div className="relative z-10 flex flex-wrap justify-center sm:justify-start text-center sm:text-left">
                  {t('hero.subtitle')
                    .split(' ')
                    .map((word, wordIdx) => (
                      <span
                        key={wordIdx}
                        className="inline-block whitespace-nowrap mr-3"
                      >
                        {word.split('').map((char, charIdx) => {
                          const globalIdx = t('hero.subtitle')
                            .split(' ')
                            .slice(0, wordIdx)
                            .join(' ').length + wordIdx + charIdx;
                          return (
                            <motion.span
                              key={charIdx}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                delay: 0.8 + (globalIdx * 0.02),
                                duration: 0.2,
                                ease: "easeOut"
                              }}
                              className="inline-block text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-lovers text-imperial-gold"
                              style={{
                                textShadow: "0 0 10px rgba(214, 174, 96, 0.3)",
                              }}
                            >
                              {char}
                            </motion.span>
                          );
                        })}
                      </span>
                    ))}
                </div>
                {/* Decorative underline */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.2, duration: 0.4 }}
                  className="absolute left-0 w-full h-0.5 bg-gradient-to-r from-imperial-gold/50 to-transparent transform origin-left"
                  style={{ bottom: '-0.5rem' }}
                />
              </div>

              {/* Description with "Read More" */}
              <div className="text-base sm:text-lg lg:text-xl text-rose-champagne/80 font-raleway max-w-xl leading-relaxed mb-8 sm:mb-12">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={isDescriptionExpanded ? "full" : "preview"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {isDescriptionExpanded ? fullDescription : previewText}
                  </motion.p>
                </AnimatePresence>

                {fullDescription.length > previewText.length && (
                  <motion.button
                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                    className="text-imperial-gold font-bold mt-4 flex items-center gap-2 hover:text-rose-champagne transition-colors duration-300 focus:outline-none"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-expanded={isDescriptionExpanded}
                  >
                    <span>{isDescriptionExpanded ? "Lire moins" : "Lire la suite"}</span>
                    {isDescriptionExpanded ? <FaChevronUp /> : <FaChevronDown />}
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* RIGHT column = visual stage */}
        <div className="relative overflow-hidden flex items-center justify-center">
          {/* soft radial spotlight */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(214,174,96,0.25),transparent_70%)]"></div>
          
          {/* velvet background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#2d133e] via-[#130926] to-black/95"></div>

          {/* particles */}
          <ParticleCanvas className="absolute inset-0 z-10" />

          {/* Logo and Text Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 1.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 flex flex-col items-center justify-center h-full max-w-md mx-auto"
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              className="mb-8"
            >
              <img 
                src="/logo-gold.png" 
                alt="Queen de Q Logo" 
                className="w-48 h-48 object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => window.location.href = '/application'}
              />
            </motion.div>
            
            {/* Elegant Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6, duration: 0.8 }}
              className="text-center space-y-4"
            >
              <h3 className="text-2xl md:text-3xl font-cinzel text-imperial-gold leading-relaxed">
                Ton Royaume t’atttend 
              </h3>
              <p className="text-lg md:text-xl font-raleway text-rose-champagne/90 leading-relaxed max-w-sm">
                Découvre ton véritable potentiel et rejoins une sororité de femmes avec qui grandir et partager
              </p>
              <motion.button
                onClick={() => handleCardDraw('Destinée Royale')}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-imperial-gold to-yellow-600 hover:from-yellow-600 hover:to-imperial-gold text-royal-purple font-bold rounded-full transition-all duration-300 transform hover:scale-105 font-raleway"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                J’entre au Royaume 
              </motion.button>
            </motion.div>
            
            {/* Scroll cue */}
            <div className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 z-20">
              <div className="opacity-60 hover:opacity-100 transition-opacity">
                <svg 
                  width="48" 
                  height="48" 
                  viewBox="0 0 48 48" 
                  fill="none" 
                  className="animate-bounce"
                >
                  <path 
                    d="M18 20l6 6 6-6" 
                    stroke="rgba(214, 174, 96, 0.8)" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Inscription Form Modal */}
      <AnimatePresence>
        {showInscriptionForm && (
          <InscriptionForm 
            drawnCard={drawnCard} 
            isVisible={true}
            onClose={handleCloseForm}
          />
        )}
      </AnimatePresence>
    </>
  );
};