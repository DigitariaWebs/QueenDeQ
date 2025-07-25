import React, { useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import { useTranslation } from '../context/TranslationContext';

interface CardData {
  id: number;
  url: string;
  alt: string;
}

interface CardProps extends CardData {
  setCards: React.Dispatch<React.SetStateAction<CardData[]>>;
  cards: CardData[];
  onFirstInteraction: () => void;
}

// Analytics function
const trackAnalytics = (event: string) => {
  if (typeof window !== 'undefined' && 'plausible' in window) {
    (window as any).plausible(event);
  }
};

const SwipeCards = () => {
  const { t } = useTranslation();
  const [cards, setCards] = useState<CardData[]>(cardData);
  const [announcement, setAnnouncement] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleFirstInteraction = useCallback(() => {
    if (!hasInteracted) {
      setHasInteracted(true);
      trackAnalytics('cabinet_play');
    }
  }, [hasInteracted]);

  const handleCardRemove = useCallback((cardAlt: string) => {
    setAnnouncement(`${t('swipe.removed')}: ${cardAlt}`);
    // Clear announcement after screen reader reads it
    setTimeout(() => setAnnouncement(""), 1000);
  }, [t]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (cards.length === 0) return;
    
    const frontCard = cards[0]; // Première carte au lieu de la dernière
    
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      handleFirstInteraction();
      setCards((pv) => pv.filter((v) => v.id !== frontCard.id));
      handleCardRemove(frontCard.alt);
    }
  }, [cards, handleFirstInteraction, handleCardRemove]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="relative">
      {/* Explication du concept avant les cartes */}
      {/* {cards.length === cardData.length && (
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="bg-royal-purple/20 border border-imperial-gold/30 rounded-2xl p-8 backdrop-blur-sm">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-imperial-gold via-yellow-400 to-imperial-gold rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-royal-purple" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2A2,2 0 0,1 14,4V8A2,2 0 0,1 12,10A2,2 0 0,1 10,8V4A2,2 0 0,1 12,2M12,10C13.1,10 14,10.9 14,12V16C14,17.1 13.1,18 12,18C10.9,18 10,17.1 10,16V12C10,10.9 10.9,10 12,10M12,18C14.2,18 16,19.8 16,22H8C8,19.8 9.8,18 12,18Z" />
                </svg>
              </div>
              <h3 className="text-2xl font-cinzel font-bold text-imperial-gold" dangerouslySetInnerHTML={{ __html: t('swipe.howTitle') }} />
            </div>
            
            <p className="text-rose-champagne/90 font-raleway text-lg leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: t('swipe.howDesc') }} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-imperial-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-imperial-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 4h10m-10 0V6a1 1 0 011-1h8a1 1 0 011 1v2m-10 0l1 12a1 1 0 001 1h6a1 1 0 001-1l1-12" />
                  </svg>
                </div>
                <h4 className="font-cinzel font-bold text-imperial-gold mb-2">{t('swipe.slide')}</h4>
                <p className="text-rose-champagne/70 text-sm font-raleway">
                  {t('swipe.slideDesc')}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-imperial-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-imperial-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h4 className="font-cinzel font-bold text-imperial-gold mb-2">{t('swipe.observe')}</h4>
                <p className="text-rose-champagne/70 text-sm font-raleway">
                  {t('swipe.observeDesc')}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-imperial-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-imperial-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="font-cinzel font-bold text-imperial-gold mb-2">{t('swipe.understand')}</h4>
                <p className="text-rose-champagne/70 text-sm font-raleway">
                  {t('swipe.understandDesc')}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4 text-sm">
              <div className="flex items-center text-rose-champagne/60">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="font-raleway">{t('swipe.keyboard')}</span>
              </div>
              <div className="w-1 h-1 bg-imperial-gold/50 rounded-full"></div>
              <div className="flex items-center text-rose-champagne/60">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
                <span className="font-raleway">{t('swipe.touch')}</span>
              </div>
            </div>
          </div>
        </div>
      )} */}

      {/* Screen reader announcements */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      >
        {announcement}
      </div>
      
      {/* Instructions for keyboard users */}
      <div className="sr-only">
        {t('swipe.keyboardInstructions')}
      </div>
      
      <div
        className="w-full place-items-center bg-transparent focus-within:outline-2 focus-within:outline-[#D6AE60] focus-within:outline-offset-2 min-h-[500px] pb-24"
        role="application"
        aria-label="Cabinet de cartes interactif"
        tabIndex={0}
      >
        {/* Cards temporarily commented out
        {cards.length > 0 ? (
          cards.map((card) => (
            <Card 
              key={card.id} 
              cards={cards} 
              setCards={setCards} 
              onFirstInteraction={handleFirstInteraction}
              onCardRemove={handleCardRemove}
              shouldReduceMotion={shouldReduceMotion}
              {...card} 
            />
          ))
        ) : ( */}
          <div className="text-center max-w-2xl mx-auto relative px-4 pb-8">
            {/* Effet de particules dorées */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-4 left-8 w-2 h-2 bg-imperial-gold rounded-full animate-pulse opacity-60"></div>
              <div className="absolute top-12 right-12 w-1 h-1 bg-rose-champagne rounded-full animate-pulse opacity-80" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-8 left-16 w-1.5 h-1.5 bg-imperial-gold rounded-full animate-pulse opacity-70" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-16 right-8 w-1 h-1 bg-rose-champagne rounded-full animate-pulse opacity-60" style={{ animationDelay: '1.5s' }}></div>
            </div>

            {/* Icône mystique centrale */}
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-imperial-gold via-yellow-400 to-imperial-gold rounded-full animate-pulse"></div>
              <div className="absolute inset-2 bg-royal-purple rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-imperial-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,1L8,5H3L5,9L3,13H8L12,17L16,13H21L19,9L21,5H16L12,1M12,3.441L14.4,5.841H17.241L16.241,8.241L17.241,10.641H14.4L12,13.041L9.6,10.641H6.759L7.759,8.241L6.759,5.841H9.6L12,3.441Z" />
                </svg>
              </div>
            </div>

            <h3 className="text-3xl md:text-4xl font-cinzel font-bold text-imperial-gold mb-4" dangerouslySetInnerHTML={{ __html: t('swipe.moreCards') }} />
            
            <p className="text-xl text-rose-champagne/90 mb-6 font-raleway leading-relaxed" dangerouslySetInnerHTML={{ __html: t('swipe.cardsExplored') }} />

            {/* Comparaison aperçu vs complet */}
            <div className="bg-royal-purple/30 border border-imperial-gold/30 rounded-xl p-6 mb-8 backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Version aperçu */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-imperial-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-imperial-gold/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h4 className="font-cinzel font-bold text-rose-champagne/70 mb-2">{t('swipe.preview')}</h4>
                  <ul className="text-rose-champagne/60 text-sm font-raleway space-y-1">
                    <li>• {t('swipe.preview4')}</li>
                    <li>• {t('swipe.previewDesc')}</li>
                    <li>• {t('swipe.previewLimited')}</li>
                  </ul>
                </div>

                {/* Version complète */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-imperial-gold via-yellow-400 to-imperial-gold rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-royal-purple" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,1L8,5H3L5,9L3,13H8L12,17L16,13H21L19,9L21,5H16L12,1M12,3.441L14.4,5.841H17.241L16.241,8.241L17.241,10.641H14.4L12,13.041L9.6,10.641H6.759L7.759,8.241L6.759,5.841H9.6L12,3.441Z" />
                    </svg>
                  </div>
                  <h4 className="font-cinzel font-bold text-imperial-gold mb-2">{t('swipe.fullRealm')}</h4>
                  <ul className="text-imperial-gold/80 text-sm font-raleway space-y-1">
                    <li>• <strong>{t('swipe.full54')}</strong></li>
                    <li>• {t('swipe.fullPsych')}</li>
                    <li>• {t('swipe.fullGuidance')}</li>
                    <li>• {t('swipe.fullTransformation')}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-imperial-gold/10 to-rose-champagne/10 border border-imperial-gold/40 rounded-xl p-6 mb-8">
              <h4 className="font-cinzel font-bold text-imperial-gold text-lg mb-3" dangerouslySetInnerHTML={{ __html: '🔮 ' + t('swipe.whatToExpect') }} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-imperial-gold rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span className="text-rose-champagne/80 font-raleway" dangerouslySetInnerHTML={{ __html: t('swipe.discoverPatterns') }} />
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-imperial-gold rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span className="text-rose-champagne/80 font-raleway" dangerouslySetInnerHTML={{ __html: t('swipe.understandWhy') }} />
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-imperial-gold rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span className="text-rose-champagne/80 font-raleway" dangerouslySetInnerHTML={{ __html: t('swipe.learnRedFlags') }} />
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-imperial-gold rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span className="text-rose-champagne/80 font-raleway" dangerouslySetInnerHTML={{ __html: t('swipe.transformRelations') }} />
                </div>
              </div>
            </div>

            {/* <div className="space-y-4">
              <a 
                href="#signup" 
                className="block w-full px-8 py-5 bg-gradient-to-r from-imperial-gold via-yellow-500 to-imperial-gold text-royal-purple font-cinzel font-bold text-lg rounded-xl hover:from-yellow-500 hover:to-imperial-gold transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 border-2 border-imperial-gold/50 hover:border-imperial-gold"
              >
                <svg className="w-6 h-6 inline mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                {t('swipe.unlock54')}
              </a>

              <button 
                onClick={() => setCards(cardData)}
                className="w-full px-8 py-4 bg-gradient-to-r from-royal-purple/30 to-vintage-aubergine/30 border-2 border-imperial-gold/30 text-imperial-gold font-cinzel font-semibold rounded-xl hover:bg-gradient-to-r hover:from-royal-purple/40 hover:to-vintage-aubergine/40 hover:border-imperial-gold/50 transition-all duration-300 backdrop-blur-sm"
              >
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {t('swipe.restart4Cards')}
              </button>
            </div> */}

            {/* Citation inspirante */}
            <div className="mt-8 pt-6 border-t border-imperial-gold/20">
              <p className="text-rose-champagne/60 font-raleway text-sm italic" dangerouslySetInnerHTML={{ __html: '"' + t('swipe.quote4') + '"' }} />
              <p className="text-imperial-gold/70 font-cinzel text-xs mt-2" dangerouslySetInnerHTML={{ __html: '— ' + t('swipe.quoteQueen') }} />
            </div>
          </div>
        {/* )} */}
      </div>
    </div>
  );
};

const Card: React.FC<CardProps & { 
  onCardRemove: (alt: string) => void; 
  shouldReduceMotion: boolean | null;
}> = ({ id, url, alt, setCards, cards, onFirstInteraction, onCardRemove, shouldReduceMotion }) => {
  const x = useMotionValue(0);

  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);

  // La première carte du tableau (index 0) est celle qu'on peut glisser
  const cardIndex = cards.findIndex(card => card.id === id);
  const isFront = cardIndex === 0;

  const rotate = useTransform(() => {
    if (shouldReduceMotion) return 0;
    const offset = isFront ? 0 : cardIndex % 2 ? 6 : -6;
    return rotateRaw.get() + offset;
  });

  const handleDragStart = () => {
    onFirstInteraction();
  };

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 100) {
      setCards((pv) => pv.filter((v) => v.id !== id));
      onCardRemove(alt);
    }
  };

  return (
    <motion.img
      src={url}
      alt={alt}
      width={288}
      height={384}
      loading="lazy"
      className="h-96 w-72 origin-bottom rounded-lg bg-[#F9F5EF] object-cover hover:cursor-grab active:cursor-grabbing border-2 border-[#D6AE60]/20 hover:border-[#D6AE60] focus:outline-none focus:ring-2 focus:ring-[#D6AE60] focus:ring-offset-2"
      style={{
        gridRow: 1,
        gridColumn: 1,
        x: x,
        opacity: opacity,
        rotate: rotate,
        zIndex: isFront ? 10 : 10 - cardIndex,
        boxShadow: isFront
          ? "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)"
          : undefined,
      }}
      initial={false}
      animate={{
        scale: isFront ? 1 : 0.98 - (cardIndex * 0.01),
      }}
      drag={isFront ? "x" : false}
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      dragElastic={0.2}
      transition={{
        type: "spring",
        stiffness: shouldReduceMotion ? 0 : 300,
        damping: shouldReduceMotion ? 0 : 30,
        duration: shouldReduceMotion ? 0 : 0.125,
      }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      tabIndex={isFront ? 0 : -1}
      role="button"
      aria-describedby="card-instructions"
    />
  );
};

export default SwipeCards;

const cardData: CardData[] = [
  {
    id: 1,
    url: "/assets/cards/Acar.png",
    alt: "As de Carreau"
  },
  {
    id: 2,
    url: "/assets/cards/Acoeur.png", 
    alt: "As de Coeur"
  },
  {
    id: 3,
    url: "/assets/cards/Apique.png",
    alt: "As de Pique"
  },
  {
    id: 4,
    url: "/assets/cards/Atref.png",
    alt: "As de Trèfle"
  },
];