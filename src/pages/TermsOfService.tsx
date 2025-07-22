import { useTranslation } from '../context/TranslationContext';
import { useEffect } from 'react';

const TermsOfService = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, []);

  return (
    <div className="min-h-screen bg-royal-navy text-white pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-cinzel text-imperial-gold text-center mb-8">
          {t('terms.title')}
        </h1>
        <div className="text-sm text-imperial-gold mb-8 text-center">
          {t('terms.version')}
        </div>
        
        <div className="space-y-8 text-gray-200">
          {/* Sections 1-18 */}
          {Array.from({ length: 18 }, (_, i) => i + 1).map((section) => (
            <section key={section}>
              <h2 className="text-2xl font-cinzel text-imperial-gold mb-4">
                {section}. {t(`terms.section${section}.title`)}
              </h2>
              <div className="mb-4 whitespace-pre-wrap">
                {t(`terms.section${section}.content`)}
              </div>
              {/* Render subsections if they exist */}
              {t(`terms.section${section}.subsections`, { defaultValue: '' }).split('•').filter(Boolean).map((subsection, index) => (
                <div key={index} className="ml-6 mb-2">
                  • {subsection.trim()}
                </div>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermsOfService; 