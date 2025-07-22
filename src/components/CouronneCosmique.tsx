import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface CouronneCosmiqueProps {
  onCardDraw?: (cardName: string) => void;
  className?: string;
}

/**
 * 🌌 COMPOSANT COURONNE COSMIQUE TOURNANTE
 * 
 * Une section moderne avec une couronne dorée dans un univers cosmique
 * - Rotation fluide de 30 secondes
 * - Particules animées et scintillement
 * - Effet parallax au mouvement de la souris
 * - Design responsive et luxueux
 */
export const CouronneCosmique: React.FC<CouronneCosmiqueProps> = ({ 
  onCardDraw, 
  className = '' 
}) => {
  // 🎯 États et références pour les interactions
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 🌊 Système de parallax avec Framer Motion
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Transformation smooth des valeurs de parallax
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], ["2deg", "-2deg"]));
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], ["-2deg", "2deg"]));

  // 🎭 Gestion des interactions
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleClick = () => {
    setIsClicked(true);
    if (onCardDraw) {
      onCardDraw('Couronne Cosmique');
    }
    setTimeout(() => setIsClicked(false), 2000);
  };

  // 🎨 Générateur de particules avec positions aléatoires
  const generateParticles = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      size: Math.random() * 4 + 2,
    }));
  };

  const particles = generateParticles(25);
  const stars = generateParticles(15);

  return (
    <div className={`relative w-full h-full flex flex-col items-center justify-center ${className}`}>
      {/* 🌌 ARRIÈRE-PLAN COSMIQUE */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient cosmique de base */}
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/40 via-purple-950/60 to-black/90" />
        
        {/* Cercle central lumineux */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2"
          animate={{
            background: [
              'radial-gradient(circle, rgba(255,215,0,0.1) 0%, rgba(61,26,84,0.2) 40%, transparent 70%)',
              'radial-gradient(circle, rgba(255,215,0,0.2) 0%, rgba(61,26,84,0.1) 40%, transparent 70%)',
              'radial-gradient(circle, rgba(255,215,0,0.1) 0%, rgba(61,26,84,0.2) 40%, transparent 70%)',
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ✨ PARTICULES FLOTTANTES - Diamants */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(particle.id) * 20, 0],
              opacity: [0, 1, 0],
              rotate: [0, 360],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          >
            {/* Diamant SVG */}
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path
                d="M6 3h12l4 6-10 12L2 9l4-6z"
                fill="url(#diamondGradient)"
                className="drop-shadow-sm"
              />
              <defs>
                <linearGradient id="diamondGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#EDEDED" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#FFD700" stopOpacity="0.6" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        ))}
      </div>

      {/* ⭐ ÉTOILES SCINTILLANTES */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <motion.div
            key={`star-${star.id}`}
            className="absolute"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
          >
            <div className="w-2 h-2 bg-white rounded-full shadow-lg shadow-white/50" />
          </motion.div>
        ))}
      </div>

      {/* 👑 COURONNE PRINCIPALE AVEC PARALLAX */}
      <motion.div
        ref={containerRef}
        className="relative z-10 cursor-pointer"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          mouseX.set(0);
          mouseY.set(0);
        }}
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Aura de la couronne */}
        <motion.div
          className="absolute inset-0 rounded-full blur-2xl"
          animate={{
            background: isHovered 
              ? [
                  'radial-gradient(circle, rgba(255,215,0,0.3) 0%, rgba(237,237,237,0.2) 50%, transparent 80%)',
                  'radial-gradient(circle, rgba(255,215,0,0.5) 0%, rgba(237,237,237,0.3) 50%, transparent 80%)',
                  'radial-gradient(circle, rgba(255,215,0,0.3) 0%, rgba(237,237,237,0.2) 50%, transparent 80%)',
                ]
              : [
                  'radial-gradient(circle, rgba(255,215,0,0.2) 0%, rgba(237,237,237,0.1) 50%, transparent 80%)',
                  'radial-gradient(circle, rgba(255,215,0,0.3) 0%, rgba(237,237,237,0.2) 50%, transparent 80%)',
                  'radial-gradient(circle, rgba(255,215,0,0.2) 0%, rgba(237,237,237,0.1) 50%, transparent 80%)',
                ],
            scale: isHovered ? [1, 1.2, 1] : [1, 1.1, 1],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Couronne SVG avec rotation fluide */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg 
            width="200" 
            height="200" 
            viewBox="0 0 200 200" 
            className="drop-shadow-2xl"
            fill="none"
          >
            {/* Base ornée de la couronne */}
            <motion.path
              d="M30 140 L170 140 L165 160 L35 160 Z"
              fill="url(#crownBaseGradient)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
            />
            
            {/* Pointes décoratives */}
            <motion.path
              d="M50 140 L60 100 L70 140"
              fill="url(#crownGradient)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1 }}
            />
            
            {/* Pointe centrale majestueuse */}
            <motion.path
              d="M85 140 L100 60 L115 140"
              fill="url(#crownCenterGradient)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1.2 }}
            />
            
            <motion.path
              d="M130 140 L140 100 L150 140"
              fill="url(#crownGradient)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1.4 }}
            />

            {/* Joyaux précieux */}
            <motion.circle
              cx="100"
              cy="90"
              r="12"
              fill="url(#mainJewelGradient)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 2 }}
            />
            
            <motion.circle
              cx="70"
              cy="120"
              r="8"
              fill="url(#jewelGradient)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 2.2 }}
            />
            
            <motion.circle
              cx="130"
              cy="120"
              r="8"
              fill="url(#jewelGradient)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 2.4 }}
            />

            {/* Ornements décoratifs */}
            <motion.path
              d="M100 75 L105 85 L100 95 L95 85 Z"
              fill="url(#accentGradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.6 }}
            />

            {/* Gradients sophistiqués */}
            <defs>
              <linearGradient id="crownBaseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="30%" stopColor="#EDEDED" />
                <stop offset="70%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#B8860B" />
              </linearGradient>
              
              <linearGradient id="crownGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="50%" stopColor="#EDEDED" />
                <stop offset="100%" stopColor="#FFD700" />
              </linearGradient>
              
              <linearGradient id="crownCenterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="20%" stopColor="#EDEDED" />
                <stop offset="50%" stopColor="#FFD700" />
                <stop offset="80%" stopColor="#EDEDED" />
                <stop offset="100%" stopColor="#B8860B" />
              </linearGradient>
              
              <radialGradient id="mainJewelGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#EDEDED" />
                <stop offset="30%" stopColor="#FFD700" />
                <stop offset="70%" stopColor="#EDEDED" />
                <stop offset="100%" stopColor="#B8860B" />
              </radialGradient>
              
              <radialGradient id="jewelGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#EDEDED" />
                <stop offset="60%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#B8860B" />
              </radialGradient>
              
              <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EDEDED" />
                <stop offset="50%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#EDEDED" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Rayons lumineux au clic */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={isClicked ? {
            background: [
              'conic-gradient(from 0deg, transparent, rgba(255,215,0,0.4), transparent, rgba(237,237,237,0.3), transparent)',
              'conic-gradient(from 90deg, transparent, rgba(255,215,0,0.4), transparent, rgba(237,237,237,0.3), transparent)',
              'conic-gradient(from 180deg, transparent, rgba(255,215,0,0.4), transparent, rgba(237,237,237,0.3), transparent)',
              'conic-gradient(from 270deg, transparent, rgba(255,215,0,0.4), transparent, rgba(237,237,237,0.3), transparent)',
            ]
          } : {}}
          transition={{ duration: 2, repeat: isClicked ? 2 : 0 }}
        />
      </motion.div>

      {/* 💫 EXPLOSION DE PARTICULES AU CLIC */}
      {isClicked && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2"
              initial={{ 
                scale: 0,
                x: 0,
                y: 0,
                opacity: 1,
              }}
              animate={{ 
                scale: [0, 1, 0],
                x: Math.cos(i * 18 * Math.PI / 180) * 250,
                y: Math.sin(i * 18 * Math.PI / 180) * 250,
                opacity: [1, 0.8, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.05,
                ease: "easeOut",
              }}
            >
              <div className="w-3 h-3 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full shadow-lg" />
            </motion.div>
          ))}
        </div>
      )}

      {/* 📝 SLOGAN ÉLÉGANT */}
      <motion.div
        className="mt-12 text-center px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <motion.h2 
          className="text-2xl md:text-3xl font-light text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-600 mb-2"
          style={{ 
            fontFamily: 'serif',
            textShadow: '0 0 20px rgba(255,215,0,0.3)',
          }}
          animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          Chaque reine mérite son univers.
        </motion.h2>
        
        <motion.p 
          className="text-sm md:text-base text-gray-300/80 font-light"
          animate={isHovered ? { opacity: 1 } : { opacity: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          ✨ Touchez la couronne pour révéler votre destinée cosmique ✨
        </motion.p>
      </motion.div>
    </div>
  );
};