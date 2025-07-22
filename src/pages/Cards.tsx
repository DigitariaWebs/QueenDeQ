import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RoyalWheel } from '../components/RoyalWheel';
import { SmoothScroll } from '../components/SmoothScroll';
import { Eye, Sparkles, Swords, Gem, Crown, Search, Users, Book } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';
import { ParticleCanvas } from '../components/ParticleCanvas';
import SwipeCards from '../components/SwipeCards';
import { RotatingCrown } from '../components/RotatingCrown';
// import DragCards from '../components/DragCards';

// Production toggle - set to false to use DragCards
const useDrag = false;

const CabinetIntro = () => {
    const { t } = useTranslation();
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0, filter: 'blur(5px)' },
        visible: {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
        },
    };
    
    const iconVariants = {
        hover: {
            scale: 1.2,
            rotate: [-5, 5, -5, 0],
            color: '#C8A96B', // smoky-gold from palette
            transition: { duration: 0.4, yoyo: Infinity }
        }
    }

    return (
        <section className="relative w-full bg-gradient-to-b from-inked-indigo via-royal-purple to-inked-indigo px-6 flex items-center justify-center overflow-hidden">
            {/* Background glowing shapes */}
            <div className="absolute inset-0 z-0 opacity-40">
                <motion.div 
                    className="absolute top-[10%] left-[15%] w-72 h-72 bg-imperial-gold/20 rounded-full filter blur-3xl"
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
                    transition={{ duration: 20, repeat: Infinity, repeatType: 'mirror' }}
                />
                <motion.div 
                    className="absolute bottom-[15%] right-[10%] w-96 h-96 bg-rose-champagne/10 rounded-full filter blur-3xl"
                    animate={{ scale: [1, 1.05, 1], x: [0, -20, 0] }}
                    transition={{ duration: 25, repeat: Infinity, repeatType: 'mirror', delay: 5 }}
                />
            </div>

            <motion.div
                className="relative z-10 max-w-4xl mx-auto text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants} className="mb-6 flex justify-center items-center">
                    <Gem className="w-12 h-12 text-imperial-gold" />
                </motion.div>
                
                <motion.h1
                    variants={itemVariants}
                    className="font-playlist text-6xl md:text-8xl font-bold bg-gradient-to-r from-imperial-gold via-rose-champagne to-smoky-gold bg-clip-text text-transparent mb-6"
                    style={{ textShadow: '0 4px 20px rgba(0,0,0,0.4)', paddingBottom: '0.2em' }}
                >
                    {t('cards.cabinet.title')}
                </motion.h1>
                
                <motion.p
                    variants={itemVariants}
                    className="font-cinzel text-xl md:text-2xl text-rose-champagne/80 max-w-3xl mx-auto mb-16"
                >
                    {t('cards.cabinet.subtitle')}
                </motion.p>
                
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-3 gap-12"
                    variants={containerVariants}
                >
                    {/* Instruction 1 */}
                    <motion.div variants={itemVariants} className="flex flex-col items-center p-6 bg-vintage-aubergine/10 backdrop-blur-sm rounded-2xl border border-patina-gold/20 shadow-lg">
                        <motion.div variants={iconVariants} whileHover="hover">
                            <Eye className="w-10 h-10 mb-4 text-imperial-gold/80" />
                        </motion.div>
                        <h3 className="font-cinzel text-2xl font-semibold text-rose-champagne mb-2">{t('cards.cabinet.item1.title')}</h3>
                        <p className="font-raleway text-rose-champagne/70 text-sm">{t('cards.cabinet.item1.desc')}</p>
                    </motion.div>
                    
                    {/* Instruction 2 */}
                    <motion.div variants={itemVariants} className="flex flex-col items-center p-6 bg-vintage-aubergine/10 backdrop-blur-sm rounded-2xl border border-patina-gold/20 shadow-lg">
                        <motion.div variants={iconVariants} whileHover="hover">
                            <Sparkles className="w-10 h-10 mb-4 text-imperial-gold/80" />
                        </motion.div>
                        <h3 className="font-cinzel text-2xl font-semibold text-rose-champagne mb-2">{t('cards.cabinet.item2.title')}</h3>
                        <p className="font-raleway text-rose-champagne/70 text-sm">{t('cards.cabinet.item2.desc')}</p>
                    </motion.div>

                    {/* Instruction 3 */}
                    <motion.div variants={itemVariants} className="flex flex-col items-center p-6 bg-vintage-aubergine/10 backdrop-blur-sm rounded-2xl border border-patina-gold/20 shadow-lg">
                        <motion.div variants={iconVariants} whileHover="hover">
                            <Swords className="w-10 h-10 mb-4 text-imperial-gold/80" />
                        </motion.div>
                        <h3 className="font-cinzel text-2xl font-semibold text-rose-champagne mb-2">{t('cards.cabinet.item3.title')}</h3>
                        <p className="font-raleway text-rose-champagne/70 text-sm">{t('cards.cabinet.item3.desc')}</p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export const Cards: React.FC = () => {
  const handleCardDraw = (cards: any[]) => {
    console.log('Cards drawn:', cards);
    // Handle the drawn cards here
  };

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-inked-indigo text-rose-champagne relative overflow-hidden">
        {/* Fond étoilé avec ParticleCanvas */}
        <ParticleCanvas className="fixed inset-0 z-0" />
        
        {/* Header Principal */}
        <motion.div 
          className="relative z-10 text-center py-16 md:py-24 px-6"
        >
          <CabinetIntro />
        </motion.div>
        
        <div className="relative z-10">
          <SwipeCards />
        </div>
       
      </div>
    </SmoothScroll>
  );
}; 
