import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Deck3D } from '../components/Deck3D';
import { CreativeCrown } from '../components/CreativeCrown';
import { CouronneCosmique } from '../components/CouronneCosmique';
import { ParticleCanvas } from '../components/ParticleCanvas';
import { InscriptionForm } from '../components/InscriptionForm';
import { useSpotsLeft } from '../hooks/useSpotsLeft';
import { useTranslation } from '../context/TranslationContext';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export const Hero: React.FC = () => {
  const { t, language } = useTranslation();
  const [drawnCard, setDrawnCard] = useState<string>('');
  const [showInscriptionForm, setShowInscriptionForm] = useState(false);
  const { spotsLeft, isLoading } = useSpotsLeft();
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
  const textReveal: Variants = {
    hidden: { 
      opacity: 0,
      clipPath: "inset(0 100% 0 0)"
    },
    show: { 
      opacity: 1,
      clipPath: "inset(0 0% 0 0)",
      transition: {
        duration: 1.2,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  const glowEffect: Variants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      filter: "blur(10px)"
    },
    show: { 
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        delay: 0.5,
        ease: "easeOut"
      }
    }
  };

  const floatingParticles: Variants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    show: { 
      opacity: [0, 1, 1, 0],
      y: [-20, -40, -60, -80],
      transition: {
        duration: 3,
        delay: 1,
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
        <div className="relative bg-gradient-to-br from-royal-purple via-royal-purple/95 to-royal-purple/90 flex items-center justify-center p-4 sm:p-8 lg:p-16 pt-24 lg:pt-16">
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

              {/* Main Title - Simplified for font fix */}
              <div className="mb-8 sm:mb-12 relative overflow-visible" style={{ minHeight: '160px', paddingBottom: '1rem' }}>
                <h1 
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-transparent bg-gradient-to-br from-imperial-gold via-yellow-300 to-imperial-gold bg-clip-text font-playlist relative"
                  style={{ paddingBottom: '0.5em', lineHeight: '1.35', overflow: 'visible' }}
                >
                  {t('hero.title')}
                </h1>
                
                {/* Glow effect behind title */}
                <div
                  className="absolute inset-0 text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold text-imperial-gold/20 blur-lg -z-10 font-playlist"
                  style={{ paddingBottom: '0.5em', lineHeight: '1.35', overflow: 'visible' }}
                >
                  {t('hero.title')}
                </div>
              </div>

              {/* Subtitle with Handwriting Effect */}
              <div className="relative mb-6 sm:mb-8 overflow-hidden" style={{ paddingBottom: '1rem' }}>
                {/* Container for the handwriting effect */}
                <div className="relative z-10">
                  {/* Split text into characters for handwriting effect */}
                  {t('hero.subtitle').split('').map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 1.8 + (index * 0.03), // Stagger the animation for each character
                        duration: 0.3,
                        ease: "easeOut"
                      }}
                      className="inline-block text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-lovers text-imperial-gold"
                      style={{
                        textShadow: "0 0 10px rgba(214, 174, 96, 0.3)",
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </div>
                {/* Decorative underline */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 2.2 + (t('hero.subtitle').length * 0.03), duration: 0.6 }}
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
                    transition={{ duration: 0.4, ease: "easeInOut" }}
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

            {/* Glassmorphism Scarcity Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="bg-white/10 backdrop-blur-md ring-1 ring-white/15 rounded-full px-6 py-2 inline-flex items-center gap-2 text-rose-champagne mb-8 sm:mb-12"
            >
              <div className="w-2 h-2 bg-imperial-gold rounded-full animate-pulse"></div>
              <span className="font-raleway font-medium text-sm sm:text-base">
                {isLoading ? (
                  t('common.loading')
                ) : (
                  `${spotsLeft || 0} ${t('hero.spotsLeft')}`
                )}
              </span>
            </motion.div>

            {/* CTA instruction */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="font-raleway text-sm text-rose-champagne/70"
            >
              {t('hero.instruction')}
            </motion.p>
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
                onClick={() => handleCardDraw('Logo Royal')}
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
                Votre Royaume Vous Attend
              </h3>
              <p className="text-lg md:text-xl font-raleway text-rose-champagne/90 leading-relaxed max-w-sm">
                Découvrez votre véritable potentiel et rejoignez l'élite des femmes qui transforment leur destin.
              </p>
              <motion.button
                onClick={() => handleCardDraw('Destinée Royale')}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-imperial-gold to-yellow-600 hover:from-yellow-600 hover:to-imperial-gold text-royal-purple font-bold rounded-full transition-all duration-300 transform hover:scale-105 font-raleway"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Commencer Mon Voyage
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