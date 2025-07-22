import React from 'react';
import { motion } from 'framer-motion';
import { SmoothScroll } from '../components/SmoothScroll';
import { Mail } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';
import { ParticleCanvas } from '../components/ParticleCanvas';

const CreativeProfileImage = ({ suit, imageSrc, name }: { suit: 'hearts' | 'diamonds', imageSrc: string, name: string }) => {
    const iconPath = suit === 'hearts'
        ? "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" // Cœur
        : "M12 2L2 12l10 10 10-10L12 2z"; // Carreau

    const gradientId = `gradient-${suit}`;

    return (
        <motion.div 
            className="relative w-full max-w-[320px] mx-auto flex items-center justify-center group"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
        >
            {/* Aura dorée animée */}
            <div className="absolute inset-0 bg-imperial-gold/20 rounded-2xl blur-2xl animate-pulse-slow group-hover:bg-imperial-gold/30 transition-all duration-500"></div>
            
            {/* Cadre doré avec dorures */}
            <div className="relative w-full bg-gradient-to-br from-imperial-gold/30 via-transparent to-imperial-gold/30 p-4 rounded-2xl">
                {/* Ornements décoratifs */}
                <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-imperial-gold/60 rounded-tl-lg"></div>
                <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-imperial-gold/60 rounded-tr-lg"></div>
                <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-imperial-gold/60 rounded-bl-lg"></div>
                <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-imperial-gold/60 rounded-br-lg"></div>
                
                {/* Photo avec format vertical préservé */}
                <div className="relative rounded-xl overflow-hidden border-4 border-imperial-gold/50 group-hover:border-imperial-gold/80 transition-all duration-500 shadow-2xl shadow-imperial-gold/20">
                    <img 
                        src={imageSrc} 
                        alt={name}
                        className="w-full h-auto max-h-[400px] object-contain bg-gradient-to-b from-royal-purple/20 to-black/40 group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Overlay avec symbole de carte */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4">
                        <div className="flex justify-center">
                            <svg
                                viewBox="0 0 24 24"
                                className="w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ filter: `drop-shadow(0 0 8px rgba(214, 174, 96, 0.8))` }}
                            >
                                <defs>
                                    <radialGradient id={gradientId} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                                        <stop offset="0%" stopColor="#F4D03F" />
                                        <stop offset="100%" stopColor="#D4AC0D" />
                                    </radialGradient>
                                </defs>
                                <path d={iconPath} fill={`url(#${gradientId})`} />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Flourish = () => (
    <div className="text-center my-16 md:my-24">
        <svg width="150" height="20" viewBox="0 0 100 20" className="mx-auto text-imperial-gold/40">
            <path d="M0 10 C 20 20, 30 0, 50 10 S 70 0, 100 10" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    </div>
);

const Apropos: React.FC = () => {
    const { t } = useTranslation();
    return (
        <SmoothScroll>
            <div className="bg-inked-indigo text-rose-champagne font-raleway overflow-hidden relative">
                {/* Fond étoilé avec ParticleCanvas */}
                <ParticleCanvas className="fixed inset-0 z-0" />
                
                {/* Section d'introduction */}
                <section className="relative z-10 py-24 md:py-32 px-6 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="font-playlist text-6xl md:text-7xl font-bold text-imperial-gold mb-8">
                            {t('about.title')}
                        </h1>
                        <p className="text-2xl md:text-3xl font-cinzel italic text-rose-champagne/90 mb-12">
                            {t('about.intro.subtitle')}
                        </p>
                        <div className="text-lg md:text-xl text-left space-y-6 text-rose-champagne/80 leading-relaxed font-raleway">
                            <p>{t('about.intro.p1')}</p>
                            <p>{t('about.intro.p2')}</p>
                            <p>{t('about.intro.p3')}</p>
                            <p className="text-center pt-4 font-cinzel italic text-xl text-imperial-gold">{t('about.intro.p4')}</p>
                        </div>
                    </div>
                </section>

                <Flourish />

                {/* Section Reine Karine */}
                <section
                    className="py-20 md:py-24 px-6 relative"
                >
                    {/* Dorures d'arrière-plan */}
                    <div className="absolute top-10 left-10 w-16 h-16 border-l-2 border-t-2 border-imperial-gold/20 rounded-tl-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-16 h-16 border-r-2 border-b-2 border-imperial-gold/20 rounded-br-3xl"></div>
                    
                    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-16 items-center">
                        <motion.div 
                            className="md:col-span-1"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <CreativeProfileImage suit="hearts" imageSrc="/Queen-Karine.jpg" name="Karine" />
                        </motion.div>
                        <motion.div 
                            className="md:col-span-2"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            <div className="relative">
                                {/* Ornement de titre */}
                                <div className="absolute -top-6 -left-6 text-imperial-gold/30 text-4xl">♛</div>
                                <h2 className="font-playlist text-5xl font-bold text-transparent bg-gradient-to-r from-imperial-gold via-yellow-300 to-imperial-gold bg-clip-text mb-8 relative">
                                    {t('about.karine.title')}
                                    {/* Ligne décorative */}
                                    <div className="absolute -bottom-2 left-0 w-24 h-0.5 bg-gradient-to-r from-imperial-gold to-transparent"></div>
                                </h2>
                                <div className="space-y-6 text-lg text-rose-champagne/85 leading-relaxed font-raleway">
                                    <p className="relative pl-4 border-l-2 border-imperial-gold/30">{t('about.karine.p1')}</p>
                                    <p className="relative pl-4 border-l-2 border-imperial-gold/30">{t('about.karine.p2')}</p>
                                    <p className="relative pl-4 border-l-2 border-imperial-gold/30">{t('about.karine.p3')}</p>
                                    <p className="italic pt-4 text-imperial-gold/80 text-center font-cinzel text-xl">{t('about.karine.p4')}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <Flourish />

                {/* Section Reine Marie-Ève */}
                <section
                    className="py-20 md:py-24 px-6 relative"
                >
                    {/* Dorures d'arrière-plan */}
                    <div className="absolute top-10 right-10 w-16 h-16 border-r-2 border-t-2 border-imperial-gold/20 rounded-tr-3xl"></div>
                    <div className="absolute bottom-10 left-10 w-16 h-16 border-l-2 border-b-2 border-imperial-gold/20 rounded-bl-3xl"></div>
                    
                    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-16 items-center">
                        <motion.div 
                            className="md:col-span-2 md:order-2"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            <div className="relative">
                                {/* Ornement de titre */}
                                <div className="absolute -top-6 -right-6 text-imperial-gold/30 text-4xl">♛</div>
                                <h2 className="font-playlist text-5xl font-bold text-transparent bg-gradient-to-r from-imperial-gold via-yellow-300 to-imperial-gold bg-clip-text mb-8 relative text-right">
                                    {t('about.marie-eve.title')}
                                    {/* Ligne décorative */}
                                    <div className="absolute -bottom-2 right-0 w-24 h-0.5 bg-gradient-to-l from-imperial-gold to-transparent"></div>
                                </h2>
                                <div className="space-y-6 text-lg text-rose-champagne/85 leading-relaxed font-raleway">
                                    <p className="relative pr-4 border-r-2 border-imperial-gold/30 text-right">{t('about.marie-eve.p1')}</p>
                                    <p className="relative pr-4 border-r-2 border-imperial-gold/30 text-right">{t('about.marie-eve.p2')}</p>
                                    <p className="relative pr-4 border-r-2 border-imperial-gold/30 text-right">{t('about.marie-eve.p3')}</p>
                                    <p className="relative pr-4 border-r-2 border-imperial-gold/30 text-right">{t('about.marie-eve.p4')}</p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div 
                            className="md:col-span-1 md:order-1"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <CreativeProfileImage suit="diamonds" imageSrc="/Queen-Marie.jpg" name="Marie-Ève" />
                        </motion.div>
                    </div>
                </section>

                <Flourish />

                {/* Section Contact royale */}
                <section className="py-20 md:py-24 px-6 relative">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            {/* Ornements décoratifs */}
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-12 text-imperial-gold/40">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-px bg-imperial-gold/40"></div>
                                    <div className="text-2xl">♛</div>
                                    <div className="w-12 h-px bg-imperial-gold/40"></div>
                                </div>
                            </div>
                            
                            <h2 className="font-playlist text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-imperial-gold via-yellow-300 to-imperial-gold bg-clip-text mb-8">
                                {t('about.contact.title')}
                            </h2>
                            
                            <div className="inline-flex items-center gap-4 bg-gradient-to-r from-black/40 via-royal-purple/20 to-black/40 border border-imperial-gold/30 rounded-2xl px-8 py-6 backdrop-blur-sm hover:border-imperial-gold/60 transition-all duration-500 group">
                                <Mail className="w-6 h-6 text-imperial-gold group-hover:scale-110 transition-transform duration-300" />
                                <a href="mailto:gestionreines@gmail.com" className="text-rose-champagne font-raleway text-lg hover:text-imperial-gold transition-colors duration-300">
                                    {t('about.contact.email')}
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </section>

            </div>
        </SmoothScroll>
    );
};

export default Apropos; 