import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useTranslation } from '../context/TranslationContext';
import { generateCardData } from '../data/cards';
import { masculineArchetypes, type MasculineArchetype } from '../data/archetypes';

interface Card {
  id: number;
  path: string;
  name: string;
  number: number;
  isSpecial: boolean;
  archetype?: MasculineArchetype;
}

interface RoyalWheelProps {
  onCardDraw?: (cards: Card[]) => void;
  className?: string;
}

// Crown SVG Component
const CrownPointer: React.FC = () => (
  <motion.svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    className="text-imperial-gold"
    animate={{
      filter: [
        'drop-shadow(0 0 5px rgba(214, 174, 96, 0.5))',
        'drop-shadow(0 0 15px rgba(214, 174, 96, 0.8))',
        'drop-shadow(0 0 5px rgba(214, 174, 96, 0.5))'
      ]
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <path
      d="M16 2L18 8L24 6L20 12L28 14L22 18L26 24L16 20L6 24L10 18L4 14L12 12L8 6L14 8L16 2Z"
      fill="currentColor"
      stroke="rgba(214, 174, 96, 0.3)"
      strokeWidth="1"
    />
  </motion.svg>
);

export const RoyalWheel: React.FC<RoyalWheelProps> = ({ onCardDraw, className = "" }) => {
  const { t } = useTranslation();
  const [isSpinning, setIsSpinning] = useState(false);
  const [revealedCards, setRevealedCards] = useState<Card[]>([]);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [hasSpun, setHasSpun] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);
  
  // Generate cards with archetypes
  const cards = generateCardData((key: any) => t(key)).map(card => ({
    ...card,
    archetype: masculineArchetypes.find(arch => arch.name === card.name)
  }));
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const spin = async () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    
    if (prefersReducedMotion) {
      // For reduced motion, just pick 3 random cards
      const randomCards = [...cards].sort(() => Math.random() - 0.5).slice(0, 3);
      setRevealedCards(randomCards);
      setHasSpun(true);
      setIsSpinning(false);
      onCardDraw?.(randomCards);
      
      // Check for confetti (same suit)
      if (randomCards.every(card => card.archetype?.suit === randomCards[0].archetype?.suit)) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D6AE60', '#D4B5A5', '#FDF7F2']
        });
      }
      return;
    }

    // Reset previous cards
    if (hasSpun) {
      setRevealedCards([]);
    }

    // Random rotation between 2000-2600 degrees
    const randomRotation = 2000 + Math.random() * 600;
    const newRotation = wheelRotation + randomRotation;
    setWheelRotation(newRotation);

    // Wait for animation to complete
    setTimeout(() => {
      // Calculate which cards are at the top (12 o'clock position)
      const finalRotation = newRotation % 360;
      const cardAngle = 360 / 54; // Each card spans this many degrees
      const topPosition = (360 - finalRotation) % 360;
      
      // Find the 3 cards closest to 12 o'clock
      const selectedCards: Card[] = [];
      for (let i = 0; i < 3; i++) {
        const cardIndex = Math.floor((topPosition + (i * cardAngle)) / cardAngle) % 54;
        selectedCards.push(cards[cardIndex]);
      }
      
      setRevealedCards(selectedCards);
      setHasSpun(true);
      setIsSpinning(false);
      onCardDraw?.(selectedCards);
      
      // Check for confetti (same suit)
      if (selectedCards.every(card => card.archetype?.suit === selectedCards[0].archetype?.suit)) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D6AE60', '#D4B5A5', '#FDF7F2']
        });
      }
    }, 4000);
  };

  const reset = () => {
    setRevealedCards([]);
    setHasSpun(false);
  };

  // Announce results for screen readers
  useEffect(() => {
    if (revealedCards.length > 0) {
      const announcement = `Vous avez tiré ${revealedCards.map(card => card.name).join(', ')}`;
      const announcer = document.createElement('div');
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.className = 'sr-only';
      announcer.textContent = announcement;
      document.body.appendChild(announcer);
      setTimeout(() => document.body.removeChild(announcer), 1000);
    }
  }, [revealedCards]);

  // Get suit color for styling
  const getSuitColor = (suit?: string) => {
    switch (suit) {
      case 'hearts': return 'text-red-400';
      case 'diamonds': return 'text-blue-400';
      case 'clubs': return 'text-green-400';
      case 'spades': return 'text-purple-400';
      default: return 'text-imperial-gold';
    }
  };

  return (
    <section id="royal-wheel" className={`relative py-24 ${className}`}>
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-transparent bg-gradient-to-r from-imperial-gold via-rose-champagne to-imperial-gold bg-clip-text mb-4">
          La Roue Royale • Royal Wheel
        </h2>
      </div>

      {/* Wheel Container */}
      <div className="relative flex justify-center mb-12">
        {/* Velvet vignette background */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-royal-purple/10 to-royal-purple/30 rounded-full blur-3xl"></div>
        
        {/* Wheel Background with thick gold stroke and inner glow */}
        <div className="relative">
          <div 
            className="relative w-[260px] h-[260px] md:w-[420px] md:h-[420px] lg:w-[560px] lg:h-[560px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(19, 9, 38, 0.4) 0%, rgba(19, 9, 38, 0.8) 70%, rgba(19, 9, 38, 1) 100%)',
              border: '4px solid #D6AE60',
              boxShadow: `
                inset 0 0 30px rgba(214, 174, 96, 0.25),
                0 0 50px rgba(214, 174, 96, 0.15),
                0 0 100px rgba(214, 174, 96, 0.05)
              `
            }}
          >
            
            {/* Wheel with cards */}
            <motion.div
              ref={wheelRef}
              className="absolute inset-2 rounded-full"
              style={{
                willChange: 'transform',
                transform: 'translateZ(0)'
              }}
              animate={{
                rotate: wheelRotation
              }}
              transition={{
                duration: isSpinning ? 4 : 0,
                ease: [0.25, 0.46, 0.45, 0.94] // easeOutQuart
              }}
            >
              {/* Cards arranged in circle - edge-on when idle */}
              {cards.map((card, index) => {
                const angle = (index / 54) * 360;
                const radius = 'calc(50% - 25px)';
                
                return (
                  <motion.div
                    key={card.id}
                    className="absolute w-3 h-5 md:w-4 md:h-6 lg:w-5 lg:h-7"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius})`,
                      transformOrigin: 'center center'
                    }}
                    animate={{
                      rotateY: isSpinning ? [90, 0, 90] : 90
                    }}
                    transition={{
                      duration: isSpinning ? 4 : 0,
                      ease: "easeInOut"
                    }}
                  >
                    {/* Card back - shows gold trim when edge-on */}
                    <div 
                      className="w-full h-full rounded-sm shadow-lg"
                      style={{
                        background: 'linear-gradient(135deg, #D6AE60 0%, #B8956A 50%, #D6AE60 100%)',
                        border: '1px solid rgba(214, 174, 96, 0.8)',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                      }}
                    >
                      <div className="w-full h-full bg-gradient-to-br from-royal-purple/90 to-ink-black/90 rounded-sm flex items-center justify-center">
                        <div className="w-0.5 h-0.5 md:w-1 md:h-1 bg-imperial-gold/60 rounded-full"></div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Center area with radial gradient that intensifies during spin */}
            <motion.div
              className="absolute inset-8 rounded-full"
              animate={{
                background: isSpinning 
                  ? 'radial-gradient(circle, rgba(214, 174, 96, 0.2) 0%, rgba(214, 174, 96, 0.1) 40%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(214, 174, 96, 0.05) 0%, transparent 50%)'
              }}
              transition={{ duration: 0.5 }}
            />

            {/* Crown pointer at 12 o'clock */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10">
              <CrownPointer />
            </div>
          </div>
        </div>
      </div>

      {/* Spin Button */}
      <div className="flex justify-center mb-8">
        <motion.button
          onClick={hasSpun ? reset : spin}
          disabled={isSpinning}
          className="px-8 py-4 bg-royal-purple text-imperial-gold font-bold text-lg rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-imperial-gold/50 font-cinzel"
          style={{
            boxShadow: 'inset 0 2px 4px rgba(214, 174, 96, 0.3), 0 4px 8px rgba(0,0,0,0.3)'
          }}
          whileHover={{ 
            scale: 1.05,
            x: [-2, 2, -2, 0],
            transition: { x: { duration: 0.3 } }
          }}
          whileTap={{ scale: 0.95 }}
          aria-label={hasSpun ? "Recommencer le tirage" : "Tourner la roue"}
        >
          {isSpinning ? "Rotation..." : hasSpun ? "Tourner à nouveau" : "Tourner"}
        </motion.button>
      </div>

      {/* Description */}
      <div className="text-center mb-12">
        <p className="text-lg text-rose-champagne/80 max-w-2xl mx-auto font-raleway">
          Clique pour tourner et révéler trois archétypes…
        </p>
      </div>

      {/* Revealed Cards - slide inward from rim to center */}
      <AnimatePresence>
        {revealedCards.length > 0 && (
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center gap-8 max-w-4xl">
              {revealedCards.map((card, index) => (
                <motion.div
                  key={card.id}
                  className="bg-gradient-to-br from-royal-purple/90 to-ink-black/90 border-2 border-imperial-gold/50 rounded-xl p-6 text-center max-w-xs backdrop-blur-sm"
                  initial={{ 
                    scale: 0.3,
                    x: index === 0 ? -200 : index === 1 ? 0 : 200,
                    y: -100,
                    rotateY: 180,
                    opacity: 0
                  }}
                  animate={{ 
                    scale: 1,
                    x: 0,
                    y: 0,
                    rotateY: 0,
                    opacity: 1
                  }}
                  transition={{ 
                    duration: 0.8,
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  whileHover={{ scale: 1.05 }}
                  style={{
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 2px rgba(214, 174, 96, 0.2)'
                  }}
                >
                  {/* Card Face */}
                  <div className="w-20 h-28 mx-auto mb-4 bg-gradient-to-br from-warm-pearl to-rose-champagne rounded-lg border border-imperial-gold/30 flex items-center justify-center overflow-hidden shadow-lg">
                    {card.isSpecial && card.path !== '/assets/cards/placeholder.svg' ? (
                      <img 
                        src={card.path} 
                        alt={card.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-2xl font-bold text-royal-purple font-cinzel">
                        {card.number}
                      </div>
                    )}
                  </div>
                  
                  {/* Archetype Name */}
                  <h3 className="text-lg font-bold text-imperial-gold mb-2 font-cinzel">
                    {card.archetype?.shortName || card.name}
                  </h3>
                  
                  {/* Suit indicator */}
                  {card.archetype?.suit && (
                    <div className={`text-sm mb-2 ${getSuitColor(card.archetype.suit)}`}>
                      {card.archetype.suit === 'hearts' && '♥ Cœur'}
                      {card.archetype.suit === 'diamonds' && '♦ Carreau'}
                      {card.archetype.suit === 'clubs' && '♣ Trèfle'}
                      {card.archetype.suit === 'spades' && '♠ Pique'}
                    </div>
                  )}
                  
                  {/* Description */}
                  <p className="text-rose-champagne/80 text-sm font-raleway leading-relaxed">
                    {card.archetype?.attraction || card.archetype?.description || 'Archétype mystérieux'}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Screen reader only content */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {isSpinning && "La roue tourne..."}
      </div>

      <style>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </section>
  );
}; 