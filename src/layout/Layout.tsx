import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { LiveTeaBanner } from '../components/LiveTeaBanner';
import { InscriptionForm } from '../components/InscriptionForm';
import { useTranslation } from '../context/TranslationContext';

export const Layout: React.FC = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showInscriptionForm, setShowInscriptionForm] = useState(false);
  const location = useLocation();

  // Détecter le scroll pour changer l'apparence du header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu mobile lors du changement de page
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Handle smooth scroll to royal wheel section
  const handleRoyalWheelClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/cards') {
      // If not on cards page, navigate there first
      window.location.href = '/cards#royal-wheel';
    } else {
      // If on cards page, scroll to section
      const element = document.getElementById('royal-wheel');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Handle inscription form
  const handleOpenInscriptionForm = () => {
    setShowInscriptionForm(true);
  };

  const handleCloseInscriptionForm = () => {
    setShowInscriptionForm(false);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-gradient-to-b from-black/40 via-royal-purple/30 to-transparent backdrop-blur-md py-2 shadow-lg shadow-black/10' 
            : 'bg-gradient-to-b from-black/20 via-royal-purple/10 to-transparent py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link 
              to="/" 
              className="group relative flex items-center"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-imperial-gold/20 via-imperial-gold/40 to-imperial-gold/20 rounded-lg blur-md opacity-70 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative flex items-center">
                <img src="/logo-gold.png" alt="Queen de Q Logo" className="h-10" />
              </div>
            </Link>

            {/* Navigation - Desktop */}
            <div className="hidden md:flex items-center space-x-6">
              <nav>
                <ul className="flex space-x-6">
                  <li>
                    <Link 
                      to="/" 
                      className={`relative px-2 py-1 font-medium font-raleway ${
                        location.pathname === '/' 
                          ? 'text-imperial-gold' 
                          : 'text-rose-champagne hover:text-imperial-gold'
                      } transition-colors`}
                    >
                      <span className="relative z-10 font-raleway">{t('nav.home')}</span>
                      {location.pathname === '/' && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-imperial-gold"></span>
                      )}
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/application" 
                      className={`relative px-2 py-1 font-medium font-raleway ${
                        location.pathname === '/application' 
                          ? 'text-imperial-gold' 
                          : 'text-rose-champagne hover:text-imperial-gold'
                      } transition-colors`}
                    >
                      <span className="relative z-10 font-raleway">{t('nav.application')}</span>
                      {location.pathname === '/application' && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-imperial-gold"></span>
                      )}
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/cabinet" 
                      className={`relative px-2 py-1 font-medium font-raleway ${
                        location.pathname === '/cards' 
                          ? 'text-imperial-gold' 
                          : 'text-rose-champagne hover:text-imperial-gold'
                      } transition-colors`}
                    >
                      <span className="relative z-10 font-raleway">{t('nav.cards')}</span>
                      {location.pathname === '/cards' && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-imperial-gold"></span>
                      )}
                    </Link>
                  </li>
                  
                  <li>
                    <Link 
                      to="/apropos" 
                      className={`relative px-2 py-1 font-medium font-raleway ${
                        location.pathname === '/apropos' 
                          ? 'text-imperial-gold' 
                          : 'text-rose-champagne hover:text-imperial-gold'
                      } transition-colors`}
                    >
                      <span className="relative z-10 font-raleway">{t('nav.apropos')}</span>
                      {location.pathname === '/apropos' && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-imperial-gold"></span>
                      )}
                    </Link>
                  </li>
                </ul>
              </nav>
              
              {/* Language Switcher */}
              <LanguageSwitcher />
            </div>

            {/* Menu hamburger - Mobile */}
            <div className="md:hidden flex items-center space-x-4">
              <LanguageSwitcher />
              
              <button 
                className="flex flex-col justify-center items-center w-10 h-10 rounded-full border border-imperial-gold/30 focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={t('accessibility.menu')}
              >
                <span className={`block w-5 h-0.5 bg-imperial-gold transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-imperial-gold mt-1 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-imperial-gold mt-1 transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
              </button>
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        <div 
          className={`md:hidden absolute top-full left-0 right-0 bg-black/60 backdrop-blur-md shadow-lg shadow-black/20 transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-80 py-4' : 'max-h-0'
          }`}
        >
          <nav className="max-w-7xl mx-auto px-4 sm:px-6">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link 
                  to="/" 
                  className={`block px-4 py-2 rounded-lg ${
                    location.pathname === '/' 
                      ? 'bg-imperial-gold/20 text-imperial-gold' 
                      : 'text-rose-champagne hover:bg-imperial-gold/10 hover:text-imperial-gold'
                  } transition-colors`}
                >
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/application" 
                  className={`block px-4 py-2 rounded-lg ${
                    location.pathname === '/application' 
                      ? 'bg-imperial-gold/20 text-imperial-gold' 
                      : 'text-rose-champagne hover:bg-imperial-gold/10 hover:text-imperial-gold'
                  } transition-colors`}
                >
                  {t('nav.application')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/cards" 
                  className={`block px-4 py-2 rounded-lg ${
                    location.pathname === '/cards' 
                      ? 'bg-imperial-gold/20 text-imperial-gold' 
                      : 'text-rose-champagne hover:bg-imperial-gold/10 hover:text-imperial-gold'
                  } transition-colors`}
                >
                  {t('nav.cards')}
                </Link>
              </li>
              
              <li>
                <Link 
                  to="/apropos" 
                  className={`block px-4 py-2 rounded-lg ${
                    location.pathname === '/apropos' 
                      ? 'bg-imperial-gold/20 text-imperial-gold' 
                      : 'text-rose-champagne hover:bg-imperial-gold/10 hover:text-imperial-gold'
                  } transition-colors`}
                >
                  {t('nav.apropos')}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <LiveTeaBanner onOpenInscriptionForm={handleOpenInscriptionForm} />

      <footer className="relative py-16 bg-gradient-to-b from-royal-purple to-black overflow-hidden">
        {/* Particules dorées décoratives */}
        <div className="absolute top-0 left-0 right-0 h-20 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-1 h-1 rounded-full bg-imperial-gold animate-pulse-slow"></div>
          <div className="absolute top-8 left-1/3 w-1.5 h-1.5 rounded-full bg-imperial-gold/70 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-12 left-2/3 w-1 h-1 rounded-full bg-imperial-gold/80 animate-pulse-slow" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-4 left-3/4 w-2 h-2 rounded-full bg-imperial-gold/60 animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-16 left-1/5 w-1 h-1 rounded-full bg-imperial-gold/70 animate-pulse-slow" style={{ animationDelay: '0.8s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Colonne 1 - Logo et description */}
            <div className="flex flex-col items-center md:items-start">
              <Link to="/" className="group relative inline-flex items-center mb-4">
                <div className="absolute -inset-2 bg-gradient-to-r from-imperial-gold/20 via-imperial-gold/40 to-imperial-gold/20 rounded-lg blur-md opacity-70 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative flex items-center">
                  <img src="/logo-gold.png" alt="Queen de Q Logo" className="h-12" />
                </div>
              </Link>
              <p className="text-rose-champagne/70 text-center md:text-left mt-4">
                {t('footer.description')}
              </p>
            </div>

            {/* Colonne 2 - Navigation */}
            <div>
              <h3 className="font-cinzel font-bold text-imperial-gold mb-4 text-center md:text-left">{t('footer.navigation')}</h3>
              <ul className="flex flex-col space-y-2">
                <li>
                  <Link to="/" className="text-rose-champagne hover:text-imperial-gold transition-colors flex items-center justify-center md:justify-start font-raleway">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                    </svg>
                    {t('nav.home')}
                  </Link>
                </li>
                <li>
                  <Link to="/application" className="text-rose-champagne hover:text-imperial-gold transition-colors flex items-center justify-center md:justify-start font-raleway">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm-1-9h2v2h-2zm0 3h2v4h-2z" />
                    </svg>
                    {t('nav.application')}
                  </Link>
                </li>
                <li>
                  <Link to="/cards" className="text-rose-champagne hover:text-imperial-gold transition-colors flex items-center justify-center md:justify-start font-raleway">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    {t('nav.cards')}
                  </Link>
                </li>
                <li>
                  <Link to="/apropos" className="text-rose-champagne hover:text-imperial-gold transition-colors flex items-center justify-center md:justify-start font-raleway">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                    </svg>
                    {t('nav.apropos')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Colonne 3 - Contact Form */}
            <div>
              <h3 className="font-cinzel font-bold text-imperial-gold mb-4 text-center md:text-left">{t('footer.contactForm.title')}</h3>
              <form className="flex flex-col space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder={t('footer.contactForm.email')}
                    className="w-full px-4 py-2 rounded-lg bg-black/30 border border-imperial-gold/30 text-rose-champagne placeholder-rose-champagne/50 focus:outline-none focus:border-imperial-gold transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    placeholder={t('footer.contactForm.message')}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg bg-black/30 border border-imperial-gold/30 text-rose-champagne placeholder-rose-champagne/50 focus:outline-none focus:border-imperial-gold transition-colors resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-2 bg-gradient-to-r from-imperial-gold via-rose-champagne to-imperial-gold rounded-lg text-black font-medium hover:opacity-90 transition-opacity"
                >
                  {t('footer.contactForm.send')}
                </button>
              </form>
            </div>
          </div>

          {/* Séparateur */}
          <div className="border-t border-imperial-gold/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-rose-champagne/60 text-sm">
                {t('footer.copyright')}
              </p>
              <div className="flex space-x-6">
                <Link 
                  to="/politique-confidentialite"
                  className="text-rose-champagne/60 hover:text-imperial-gold text-sm transition-colors font-raleway"
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                >
                  {t('footer.privacyComingSoon')}
                </Link>
                <button 
                  onClick={(e) => { e.preventDefault(); alert('Les conditions d\'utilisation seront disponibles prochainement.'); }}
                  className="text-rose-champagne/60 hover:text-imperial-gold text-sm transition-colors font-raleway cursor-pointer"
                >
                  {t('footer.termsComingSoon')}
                </button>
                <p className="text-rose-champagne/60 text-sm">
                  {t('footer.rights')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Inscription Form Modal */}
      <AnimatePresence>
        {showInscriptionForm && (
          <InscriptionForm 
            drawnCard="Live Tea Time"
            isVisible={true}
            onClose={handleCloseInscriptionForm}
          />
        )}
      </AnimatePresence>
    </>
  );
}; 