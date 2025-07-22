import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from '../context/TranslationContext';

gsap.registerPlugin(ScrollTrigger);

export const HowItWorks: React.FC = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const cards = gsap.utils.toArray('.magic-step-card') as HTMLElement[];
      
      // Animation d'entrée spectaculaire
      gsap.fromTo(cards, 
        { 
          y: 120, 
          opacity: 0,
          scale: 0.7,
          rotationY: -25
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1.4,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animation au hover pour chaque carte
      cards.forEach((card, index) => {
        const flipCard = card.querySelector('.flip-card-inner');
        
        card.addEventListener('mouseenter', () => {
          if (flipCard) {
            gsap.to(flipCard, { 
              rotationY: 180, 
              duration: 0.6, 
              ease: "power2.inOut" 
            });
          }
        });
        
        card.addEventListener('mouseleave', () => {
          if (flipCard) {
            gsap.to(flipCard, { 
              rotationY: 0, 
              duration: 0.6, 
              ease: "power2.inOut" 
            });
          }
        });
      });
    }
  }, []);

  const steps = [
    {
      title: t('howItWorks.step1.title'),
      description: t('howItWorks.step1.description'),
      backText: t('howItWorks.step1.backText')
    },
    {
      title: t('howItWorks.step2.title'), 
      description: t('howItWorks.step2.description'),
      backText: t('howItWorks.step2.backText')
    },
    {
      title: t('howItWorks.step3.title'),
      description: t('howItWorks.step3.description'),
      backText: t('howItWorks.step3.backText')
    }
  ];

  return (
    <section ref={containerRef} className="relative py-20 sm:py-32 bg-gradient-to-b from-black via-black/95 to-black overflow-hidden">
      {/* Particules flottantes en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-imperial-gold/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header mystique */}
                  <div className="text-center mb-20">
          <div className="inline-block relative">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-playlist font-bold text-transparent bg-gradient-to-br from-imperial-gold via-yellow-300 to-imperial-gold bg-clip-text mb-6">
              {t('howItWorks.title')}
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-imperial-gold to-transparent animate-pulse"></div>
          </div>
          <p className="text-lg text-rose-champagne/70 mt-8 max-w-2xl mx-auto font-cinzel">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        {/* Steps avec effet flip magique */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="magic-step-card group relative perspective-1000"
            >
              <div className="flip-card-inner relative w-full h-80 transition-transform duration-700 preserve-3d">
                {/* Face avant */}
                <div className="flip-card-front absolute inset-0 backface-hidden">
                  <div className="h-full p-8 rounded-2xl bg-gradient-to-br from-black via-royal-purple/30 to-black border border-imperial-gold/30 group-hover:border-imperial-gold/60 transition-all duration-500 backdrop-blur-sm relative overflow-hidden">
                    {/* Effet lumineux magique */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-imperial-gold/50 to-transparent group-hover:via-imperial-gold transition-all duration-500"></div>

                    <div className="text-center h-full flex flex-col justify-center">
                      {/* Title */}
                      <h3 className="text-2xl sm:text-3xl font-playlist font-bold text-imperial-gold mb-6 group-hover:text-yellow-300 transition-colors">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-rose-champagne/80 leading-relaxed text-base font-raleway">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Face arrière */}
                <div className="flip-card-back absolute inset-0 backface-hidden rotate-y-180">
                  <div className="h-full p-8 rounded-2xl bg-gradient-to-br from-royal-purple/40 via-black to-royal-purple/40 border border-imperial-gold/60 backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-imperial-gold/10 via-transparent to-imperial-gold/10"></div>
                    
                    <div className="text-center h-full flex flex-col justify-center relative z-10">
                      <p className="text-imperial-gold font-raleway text-lg leading-relaxed italic">
                        {step.backText}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 