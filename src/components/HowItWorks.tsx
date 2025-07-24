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
      
      // Simple entrance animation
      gsap.fromTo(cards, 
        { 
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse"
          }
        }
      );
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
      {/* Background particles */}
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
        {/* Header */}
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

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="magic-step-card group h-80"
            >
              <div className="relative w-full h-full perspective-1000 group">
                {/* Card Front */}
                <div className="absolute inset-0 p-8 rounded-2xl bg-gradient-to-br from-black via-royal-purple/30 to-black border border-imperial-gold/30 shadow-lg backface-hidden transition-transform duration-700 ease-in-out group-hover:rotate-y-180">
                  <div className="text-center h-full flex flex-col justify-center items-center">
                    {/* Crown Icon */}
                    
                    <h3 className="text-2xl sm:text-3xl font-playlist font-bold text-imperial-gold group-hover:text-yellow-300 transition-colors">
                      {step.title}
                    </h3>
                    <div className="mt-4 w-16 h-1 bg-imperial-gold/30 rounded-full"></div>
                    <div className="mt-6 text-rose-champagne/80">
                      {t('howItWorks.hoverToReveal')}
                    </div>
                  </div>
                </div>

                {/* Card Back */}
                <div className="absolute inset-0 p-8 rounded-2xl bg-gradient-to-br from-royal-purple/40 via-black to-royal-purple/30 border border-imperial-gold/50 shadow-lg backface-hidden rotate-y-180 transition-transform duration-700 ease-in-out group-hover:rotate-y-0">
                  <div className="text-center h-full flex flex-col justify-center items-center p-2">
                    <p className="text-rose-champagne/90 leading-relaxed font-raleway mb-4">
                      {step.description}
                    </p>
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