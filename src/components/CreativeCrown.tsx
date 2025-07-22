import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Diamond, Sparkles, Star } from 'lucide-react';

interface CreativeCrownProps {
  onCardDraw?: (cardName: string) => void;
  className?: string;
}

export const CreativeCrown: React.FC<CreativeCrownProps> = ({ 
  onCardDraw, 
  className = '' 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    if (onCardDraw) {
      onCardDraw('Couronne Royale');
    }
    setTimeout(() => setIsClicked(false), 2000);
  };

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Constellation de fond */}
      <motion.div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-imperial-gold/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>

      {/* Orbes magiques en rotation */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-gradient-to-br from-imperial-gold/40 to-rose-champagne/40 rounded-full blur-sm"
            style={{
              transform: `rotate(${i * 90}deg) translateY(-100px)`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </motion.div>

      {/* Couronne personnalisée avec SVG */}
      <motion.div
        className="relative z-10 cursor-pointer"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={isClicked ? {
          scale: [1, 1.3, 1],
          rotate: [0, 360],
        } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Aura principale */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-imperial-gold/40 to-rose-champagne/40 rounded-full blur-xl"
          animate={{
            scale: isHovered ? [1, 1.4, 1] : [1, 1.2, 1],
            opacity: isHovered ? [0.4, 0.8, 0.4] : [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />

        {/* Couronne SVG personnalisée */}
        <svg 
          width="160" 
          height="160" 
          viewBox="0 0 120 120" 
          className="relative z-10 drop-shadow-2xl"
          fill="none"
        >
          {/* Base de la couronne */}
          <motion.path
            d="M20 80 L100 80 L95 90 L25 90 Z"
            fill="url(#crownGradient)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
          
          {/* Pointes de la couronne */}
          <motion.path
            d="M30 80 L35 50 L40 80"
            fill="url(#crownGradient)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.8 }}
          />
          
          <motion.path
            d="M50 80 L60 30 L70 80"
            fill="url(#crownGradient)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1 }}
          />
          
          <motion.path
            d="M80 80 L85 50 L90 80"
            fill="url(#crownGradient)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.2 }}
          />

          {/* Joyaux sur la couronne */}
          <motion.circle
            cx="60"
            cy="45"
            r="8"
            fill="url(#jewelGradient)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          />
          
          <motion.circle
            cx="40"
            cy="65"
            r="5"
            fill="url(#jewelGradient)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.7 }}
          />
          
          <motion.circle
            cx="80"
            cy="65"
            r="5"
            fill="url(#jewelGradient)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.9 }}
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="crownGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D6AE60" />
              <stop offset="50%" stopColor="#F4E4BC" />
              <stop offset="100%" stopColor="#C8A96B" />
            </linearGradient>
            
            <radialGradient id="jewelGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F4E4BC" />
              <stop offset="70%" stopColor="#D6AE60" />
              <stop offset="100%" stopColor="#C8A96B" />
            </radialGradient>
          </defs>
        </svg>

        {/* Particules scintillantes */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{ 
                    opacity: 0, 
                    scale: 0,
                    x: 0,
                    y: 0,
                  }}
                  animate={{ 
                    opacity: [0, 1, 0], 
                    scale: [0, 1.5, 0],
                    x: Math.cos(i * 30 * Math.PI / 180) * 100,
                    y: Math.sin(i * 30 * Math.PI / 180) * 100,
                    rotate: [0, 360],
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{
                    duration: 2,
                    delay: i * 0.05,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <Sparkles className="w-3 h-3 text-imperial-gold" fill="currentColor" />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Rayons lumineux */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={isClicked ? {
          background: [
            'conic-gradient(from 0deg, transparent, rgba(214,174,96,0.3), transparent)',
            'conic-gradient(from 180deg, transparent, rgba(214,174,96,0.3), transparent)',
            'conic-gradient(from 360deg, transparent, rgba(214,174,96,0.3), transparent)',
          ]
        } : {}}
        transition={{ duration: 2, repeat: isClicked ? 3 : 0 }}
      />

      {/* Diamants flottants */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              x: [
                0,
                Math.cos(i * 60 * Math.PI / 180) * 120,
                Math.cos((i * 60 + 180) * Math.PI / 180) * 120,
                0
              ],
              y: [
                0,
                Math.sin(i * 60 * Math.PI / 180) * 120,
                Math.sin((i * 60 + 180) * Math.PI / 180) * 120,
                0
              ],
              scale: [0, 1, 1, 0],
              opacity: [0, 0.6, 0.6, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          >
            <Diamond className="w-3 h-3 text-rose-champagne/70" fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Explosion d'étoiles au clic */}
      <AnimatePresence>
        {isClicked && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          >
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                initial={{ 
                  scale: 0,
                  x: 0,
                  y: 0,
                }}
                animate={{ 
                  scale: [0, 1, 0],
                  x: Math.cos(i * 22.5 * Math.PI / 180) * 200,
                  y: Math.sin(i * 22.5 * Math.PI / 180) * 200,
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.03,
                  ease: "easeOut",
                }}
              >
                <Star className="w-5 h-5 text-imperial-gold" fill="currentColor" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Texte d'instruction élégant */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <motion.p 
          className="font-cinzel text-imperial-gold/90 text-lg font-bold mb-2"
          animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
        >
          Touchez la Couronne Royale
        </motion.p>
        <motion.p 
          className="font-raleway text-rose-champagne/70 text-sm"
          animate={isHovered ? { opacity: 1 } : { opacity: 0.7 }}
        >
          ✨ Révélez votre archétype de pouvoir ✨
        </motion.p>
      </motion.div>
    </div>
  );
};