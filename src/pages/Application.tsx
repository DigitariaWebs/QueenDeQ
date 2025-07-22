import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Sparkles, Heart, Eye, Coffee, Moon, Gift, X } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';
import { ParticleCanvas } from '../components/ParticleCanvas';

// Une composante pour les ornements de coin
const CornerOrnament = ({ position }: { position: string }) => {
  const baseClasses = "absolute w-16 h-16 text-imperial-gold/30 pointer-events-none";
  let positionClasses = "";
  switch(position) {
    case 'top-left': positionClasses = 'top-4 left-4'; break;
    case 'top-right': positionClasses = 'top-4 right-4 transform rotate-90'; break;
    case 'bottom-left': positionClasses = 'bottom-4 left-4 transform -rotate-90'; break;
    case 'bottom-right': positionClasses = 'bottom-4 right-4 transform rotate-180'; break;
  }
  return (
    <svg className={`${baseClasses} ${positionClasses}`} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M 2 50 C 2 20, 20 2, 50 2" />
      <path d="M 50 2 C 80 2, 98 20, 98 50" />
    </svg>
  );
};

const RegistrationModal = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();

  // Helper pour interpréter le HTML dans les traductions
  const T_HTML = ({ tKey }: { tKey: any }) => (
    <p className="font-raleway" dangerouslySetInnerHTML={{ __html: t(tKey) }}></p>
  );

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-2xl bg-gradient-to-br from-royal-purple/50 via-ink-black to-ink-black border-2 border-imperial-gold/50 rounded-2xl shadow-2xl shadow-imperial-gold/20 p-8 text-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-imperial-gold/50 hover:text-imperial-gold transition-colors">
          <X className="w-6 h-6" />
        </button>
        
        <h3 className="font-cinzel text-4xl font-bold text-imperial-gold mb-2">{t('modal.title')}</h3>
        <p className="text-rose-champagne/80 italic mb-6 font-raleway">{t('modal.subtitle')}</p>

        <div className="flex justify-center items-center gap-6 mb-8 text-rose-champagne font-raleway">
          <div>
            <p className="font-bold text-lg text-imperial-gold font-cinzel">{t('modal.date')}</p>
            <p className="font-raleway">{t('modal.time')}</p>
          </div>
          <div className="h-10 w-px bg-imperial-gold/30"></div>
          <div>
            <p className="font-bold text-lg text-imperial-gold font-cinzel">{t('modal.location')}</p>
            <p className="font-raleway">{t('modal.location.desc')}</p>
          </div>
        </div>

        <div className="text-left mb-8 space-y-4">
          <h4 className="font-cinzel text-xl font-bold text-imperial-gold border-b border-imperial-gold/20 pb-2 mb-4">{t('modal.program.title')}</h4>
          <div className="flex items-start"><Heart className="w-4 h-4 inline mr-2 text-rose-champagne mt-1 flex-shrink-0"/> <T_HTML tKey="modal.program.item1"/></div>
          <div className="flex items-start"><Eye className="w-4 h-4 inline mr-2 text-rose-champagne mt-1 flex-shrink-0"/> <T_HTML tKey="modal.program.item2"/></div>
          <div className="flex items-start"><Coffee className="w-4 h-4 inline mr-2 text-rose-champagne mt-1 flex-shrink-0"/> <T_HTML tKey="modal.program.item3"/></div>
        </div>

        <div className="bg-imperial-gold/10 border border-imperial-gold/30 rounded-lg p-4 mb-8">
          <p className="font-bold text-imperial-gold text-lg font-cinzel"><Gift className="w-6 h-6 inline mr-2"/> {t('modal.offer.title')}</p>
          <p className="text-rose-champagne/90 font-raleway">{t('modal.offer.desc')}</p>
        </div>

        <p className="font-cinzel text-xl text-rose-champagne mb-4">{t('modal.final_question')}</p>
        
        <div className="max-w-md mx-auto">
          <div className="flex items-center bg-ink-black/50 border border-imperial-gold/30 rounded-lg p-2 backdrop-blur-sm">
            <input
              type="email"
              placeholder={t('modal.email_placeholder')}
              className="flex-grow bg-transparent text-rose-champagne placeholder-rose-champagne/50 px-4 py-2 focus:outline-none font-raleway"
            />
            <motion.button
              className="button-luxury text-royal-purple px-6 py-2 rounded-md font-bold text-lg transition-all duration-300 font-raleway"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('modal.submit_button')}
            </motion.button>
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
}

// Composante pour une carte mystère avec effet de rotation
const MysteryCard = ({ icon, title, description, index }: { icon: JSX.Element, title: string, description: string, index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div 
      className="relative aspect-[3/5] w-72 cursor-pointer mystery-card-particles rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 50, rotateZ: (index - 1) * 5 }}
      whileInView={{ opacity: 1, y: 0, rotateZ: (index - 1) * 2 }}
      whileHover={{ 
        y: -10, 
        scale: 1.05, 
        rotateZ: (index - 1) * 2,
        boxShadow: "0 20px 40px rgba(214, 174, 96, 0.3)"
      }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Face avant - Titre et icône */}
        <div 
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-ink-black/80 via-royal-purple/60 to-ink-black/90 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-center items-center text-center gilded-finish backface-hidden border border-imperial-gold/30 shadow-2xl"
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)'
          }}
        >
          <div className="text-imperial-gold mb-4 transform transition-all duration-300 hover:scale-110 hover:text-rose-champagne">
            {icon}
          </div>
          <h4 className="font-playlist text-2xl font-bold text-imperial-gold mb-4 transition-colors duration-300">
            {title}
          </h4>
          <div className="text-rose-champagne/60 text-sm font-raleway italic">
            Survolez pour découvrir
          </div>
          
          {/* Effet de brillance */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-imperial-gold/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>

        {/* Face arrière - Description */}
        <div 
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-imperial-gold/90 via-rose-champagne/90 to-imperial-gold/90 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-center items-center text-center backface-hidden border border-imperial-gold/30 shadow-2xl"
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="text-royal-purple mb-4 transform scale-90 transition-transform duration-300">
            {icon}
          </div>
          <h4 className="font-playlist text-xl font-bold text-royal-purple mb-4">
            {title}
          </h4>
          <p className="text-royal-purple/90 text-sm leading-relaxed font-raleway">
            {description}
          </p>
          
          {/* Effet de brillance dorée */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-30 pointer-events-none" />
          
          {/* Bordure dorée animée */}
          <div className="absolute inset-0 rounded-2xl border-2 border-imperial-gold/70 animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
};

export const Application: React.FC = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const features = [
    {
      icon: <Heart className="w-10 h-10" />,
      title: t('app.feature1.title'),
      description: t('app.feature1.desc'),
    },
    {
      icon: <Eye className="w-10 h-10" />,
      title: t('app.feature2.title'),
      description: t('app.feature2.desc'),
    },
    {
      icon: <Coffee className="w-10 h-10" />,
      title: t('app.feature3.title'),
      description: t('app.feature3.desc'),
    }
  ];

  return (
    <div className="min-h-screen bg-ink-black text-rose-champagne overflow-hidden relative">
      {/* Fond étoilé avec ParticleCanvas */}
      <ParticleCanvas className="fixed inset-0 z-0" />
      
      {/* Modal d'inscription */}
      <AnimatePresence>
        {isModalOpen && <RegistrationModal onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
      
      {/* Hero Section - The Unveiling */}
      <section className="min-h-screen flex flex-col justify-center items-center relative text-center p-6">
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-ink-black via-royal-purple/50 to-ink-black opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />
        <div className="absolute inset-0 bg-[url('/assets/sprites/placeholder.png')] bg-repeat opacity-5"></div>
        
        <motion.div 
          className="relative z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        >
          <Crown className="w-20 h-20 text-imperial-gold mx-auto mb-4 opacity-80" />
          <h1 className="font-playlist text-6xl md:text-8xl font-bold bg-gradient-to-r from-imperial-gold via-rose-champagne to-imperial-gold bg-clip-text text-transparent mb-4">
            {t('app.title')}
          </h1>
          <motion.h2 
            className="text-4xl md:text-5xl font-cinzel font-bold text-imperial-gold/80"
            initial={{ letterSpacing: '0.5em', opacity: 0 }}
            animate={{ letterSpacing: '0.1em', opacity: 1 }}
            transition={{ duration: 2, delay: 1, ease: "easeOut" }}
          >
            {t('app.subtitle')}
          </motion.h2>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-10 text-imperial-gold/50 animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <p className="mb-2 font-raleway">{t('app.scroll')}</p>
          <Moon className="w-6 h-6 mx-auto" />
        </motion.div>
      </section>

      {/* Intro Text Section - The Whispers */}
      <section className="py-24 px-6 relative bg-gradient-to-b from-ink-black via-vintage-aubergine/20 to-ink-black">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
        >
          <h2 className="font-cinzel text-4xl font-bold text-imperial-gold mb-8">
            {t('app.intro.title')}
          </h2>
          <div className="space-y-6 text-lg md:text-xl leading-relaxed font-raleway text-rose-champagne/80">
            <p>{t('app.intro.p1')}</p>
            <p>{t('app.intro.p2')}</p>
            <p className="text-imperial-gold font-semibold">{t('app.intro.p3')}</p>
            <div className="mt-8">
              <h3 
                className="text-3xl text-imperial-gold font-bold" 
                style={{ 
                  fontFamily: 'Playlist, sans-serif',
                  letterSpacing: '0.05em',
                  textShadow: '0 0 10px rgba(214, 174, 96, 0.3)'
                }}
              >
                {t('app.intro.p4')}
              </h3>
            </div>
            <p>{t('app.intro.p5')}</p>
            <p className="text-2xl font-semibold text-rose-champagne">{t('app.intro.p6')}</p>
            <p className="text-xl font-bold text-imperial-gold mt-8">Télécharge l'application et couronne toi!</p>
          </div>
        </motion.div>
      </section>

      {/* Features Section - The Rituals */}
      <section className="py-24 px-6 relative bg-ink-black">
        <div className="absolute inset-0 bg-[url('/assets/sprites/placeholder.png')] bg-repeat opacity-[0.02]"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-imperial-gold/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-imperial-gold/30 to-transparent"></div>
        
        <motion.h3 
          className="text-center font-cinzel text-4xl font-bold text-imperial-gold mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
        >
          {t('app.features.title')}
        </motion.h3>

        <div className="flex flex-wrap justify-center items-start gap-16">
          {features.map((feature, index) => (
            <MysteryCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* CTA Section - The Invitation */}
      <section className="py-24 px-6 text-center relative bg-gradient-to-t from-ink-black via-royal-purple/20 to-ink-black">
        <CornerOrnament position="top-left" />
        <CornerOrnament position="top-right" />
        <CornerOrnament position="bottom-left" />
        <CornerOrnament position="bottom-right" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
        >
          <h2 className="font-playlist text-5xl font-bold text-imperial-gold mb-4">{t('app.cta.title')}</h2>
          <p className="text-xl text-rose-champagne/80 mb-8 max-w-2xl mx-auto font-raleway">{t('app.cta.subtitle')}</p>
          <motion.button 
            onClick={() => setIsModalOpen(true)}
            className="button-luxury golden-particles text-royal-purple px-10 py-4 rounded-lg font-bold text-xl transition-all duration-300 font-raleway gilded-finish"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-6 h-6 inline mr-2" />
            {t('app.cta.button')}
          </motion.button>
        </motion.div>
      </section>
      
      {/* Disclaimer Section - The Fine Print */}
      <footer className="py-16 px-6 text-center border-t border-imperial-gold/20">
        <p className="max-w-3xl mx-auto text-rose-champagne/50 text-xs italic leading-relaxed font-raleway">
          Dans tous les cas, sache que les interactions avec la Reine Mère, un robot conversationnel entièrement spécifiquement par Queen de Q, te sont offertes à des fins de divertissement et ne remplacent en aucun cas un suivi thérapeutique avec une professionnelle de la santé compétente. Si tu ressens de la détresse, nous t'invitons à demander de l'aide.
        </p>
      </footer>
    </div>
  );
}; 