import React from 'react';
import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';

interface RotatingCrownProps {
  className?: string;
}

export const RotatingCrown: React.FC<RotatingCrownProps> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center min-h-[400px] ${className}`}>
      {/* Couronne centrale tournante */}
      <motion.div
        className="relative"
        animate={{ rotate: 360 }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <Crown 
          className="w-32 h-32 text-imperial-gold drop-shadow-lg" 
          strokeWidth={1.5}
        />
      </motion.div>

      {/* Particules autour de la couronne */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-imperial-gold/60 rounded-full"
          style={{
            left: '50%',
            top: '50%',
            transformOrigin: '0 0',
            transform: `translate(-50%, -50%) translateX(${80 + i * 10}px) translateY(0px)`
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            rotate: {
              duration: 6,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.2,
            },
            scale: {
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            },
            opacity: {
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            },
          }}
        />
      ))}

      {/* Cercle de lumière pulsante */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-imperial-gold/30"
        style={{
          width: '200px',
          height: '200px',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Texte décoratif */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <p className="font-cinzel text-imperial-gold/80 text-lg font-semibold">
          Couronne Royale
        </p>
      </motion.div>
    </div>
  );
};