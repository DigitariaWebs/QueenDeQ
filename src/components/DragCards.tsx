import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import aceDiamonds from "../assets/Ace of Diamonds.jpeg";
import aceSpades from "../assets/Ace of Spades.jpeg";

interface CardProps {
  containerRef: React.RefObject<HTMLDivElement>;
  src: string;
  alt: string;
  top: string;
  left: string;
  rotate: string;
  className?: string;
  id: string;
  onFirstInteraction: () => void;
}

// Analytics function
const trackAnalytics = (event: string) => {
  if (typeof window !== 'undefined' && 'plausible' in window) {
    (window as any).plausible(event);
  }
};

const DragCards = () => {
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleFirstInteraction = useCallback(() => {
    if (!hasInteracted) {
      setHasInteracted(true);
      trackAnalytics('cabinet_play');
    }
  }, [hasInteracted]);

  return (
    <section className="relative grid min-h-screen w-full place-content-center overflow-hidden bg-[#3B1E50]">
      <h2 className="relative z-0 text-[20vw] font-black text-[#D6AE60]/20 md:text-[200px] font-playfair">
        CARDS<span className="text-[#D6AE60]">.</span>
      </h2>
      <Cards onFirstInteraction={handleFirstInteraction} />
    </section>
  );
};

const Cards: React.FC<{ onFirstInteraction: () => void }> = ({ onFirstInteraction }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      className="absolute inset-0 z-10" 
      ref={containerRef}
      role="application"
      aria-label="Cabinet de cartes interactif - glissez et déposez"
    >
      {/* Screen reader instructions */}
      <div className="sr-only">
        Utilise Espace ou Entrée pour sélectionner ta carte, les flèches pour la déplacer, et Échap pour annuler. Ou glisse directement avec la souris.
      </div>
      
      <Card
        containerRef={containerRef}
        src={aceDiamonds}
        alt="Ace of Diamonds"
        rotate="6deg"
        top="20%"
        left="25%"
        className="w-36 md:w-56"
        id="card-1"
        onFirstInteraction={onFirstInteraction}
      />
      <Card
        containerRef={containerRef}
        src={aceDiamonds}
        alt="Ace of Diamonds"
        rotate="12deg"
        top="45%"
        left="60%"
        className="w-24 md:w-48"
        id="card-2"
        onFirstInteraction={onFirstInteraction}
      />
      <Card
        containerRef={containerRef}
        src={aceSpades}
        alt="Ace of Spades"
        rotate="-6deg"
        top="20%"
        left="40%"
        className="w-52 md:w-80"
        id="card-3"
        onFirstInteraction={onFirstInteraction}
      />
      <Card
        containerRef={containerRef}
        src={aceSpades}
        alt="Ace of Spades"
        rotate="8deg"
        top="50%"
        left="40%"
        className="w-48 md:w-72"
        id="card-4"
        onFirstInteraction={onFirstInteraction}
      />
      <Card
        containerRef={containerRef}
        src={aceDiamonds}
        alt="Ace of Diamonds"
        rotate="18deg"
        top="20%"
        left="65%"
        className="w-40 md:w-64"
        id="card-5"
        onFirstInteraction={onFirstInteraction}
      />
      <Card
        containerRef={containerRef}
        src={aceSpades}
        alt="Ace of Spades"
        rotate="-3deg"
        top="35%"
        left="55%"
        className="w-24 md:w-48"
        id="card-6"
        onFirstInteraction={onFirstInteraction}
      />
    </div>
  );
};

const Card: React.FC<CardProps> = ({ 
  containerRef, 
  src, 
  alt, 
  top, 
  left, 
  rotate, 
  className, 
  id,
  onFirstInteraction 
}) => {
  const [zIndex, setZIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  const updateZIndex = () => {
    const els = document.querySelectorAll(".drag-elements");

    let maxZIndex = -Infinity;

    els.forEach((el) => {
      let zIndex = parseInt(
        window.getComputedStyle(el).getPropertyValue("z-index")
      );

      if (!isNaN(zIndex) && zIndex > maxZIndex) {
        maxZIndex = zIndex;
      }
    });

    setZIndex(maxZIndex + 1);
  };

  const handleMouseDown = () => {
    updateZIndex();
    onFirstInteraction();
  };

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (document.activeElement?.id !== id) return;
    
    switch (event.key) {
      case ' ':
      case 'Enter':
        event.preventDefault();
        setIsDragging(!isDragging);
        onFirstInteraction();
        break;
      case 'Escape':
        event.preventDefault();
        setIsDragging(false);
        break;
      case 'ArrowUp':
        if (isDragging) {
          event.preventDefault();
          setPosition(prev => ({ ...prev, y: prev.y - 10 }));
        }
        break;
      case 'ArrowDown':
        if (isDragging) {
          event.preventDefault();
          setPosition(prev => ({ ...prev, y: prev.y + 10 }));
        }
        break;
      case 'ArrowLeft':
        if (isDragging) {
          event.preventDefault();
          setPosition(prev => ({ ...prev, x: prev.x - 10 }));
        }
        break;
      case 'ArrowRight':
        if (isDragging) {
          event.preventDefault();
          setPosition(prev => ({ ...prev, x: prev.x + 10 }));
        }
        break;
    }
  }, [isDragging, id, onFirstInteraction]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const motionProps = shouldReduceMotion ? {
    style: {
      top,
      left,
      rotate: "0deg",
      zIndex,
      transform: `translate(${position.x}px, ${position.y}px)`,
    },
    transition: { duration: 0 }
  } : {
    style: {
      top,
      left,
      rotate,
      zIndex,
    },
    animate: {
      x: position.x,
      y: position.y,
    },
    dragElastic: 0.65
  };

  return (
    <motion.img
      id={id}
      onMouseDown={handleMouseDown}
      className={twMerge(
        "drag-elements absolute w-48 bg-[#F9F5EF] p-1 pb-4 rounded-lg border-2 border-[#D6AE60]/20 hover:border-[#D6AE60] shadow-lg focus:outline-none focus:ring-2 focus:ring-[#D6AE60] focus:ring-offset-2 focus:ring-offset-[#3B1E50]",
        isDragging && "ring-2 ring-[#D6AE60] ring-offset-2 ring-offset-[#3B1E50]",
        className
      )}
      src={src}
      alt={alt}
      width={192}
      height={256}
      loading="lazy"
      drag
      dragConstraints={containerRef}
      tabIndex={0}
      role="button"
      aria-describedby="drag-instructions"
      aria-pressed={isDragging}
      {...motionProps}
    />
  );
};

export default DragCards;