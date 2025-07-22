import { useTranslation } from '../context/TranslationContext';

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-royal-navy text-white pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-cinzel text-imperial-gold text-center mb-8">
          {t('privacy.title')}
        </h1>
        <div className="text-sm text-imperial-gold mb-8 text-center">
          {t('privacy.version')}
        </div>
        
        <div className="space-y-8 text-gray-200">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-cinzel text-imperial-gold mb-4">1. {t('privacy.section1.title')}</h2>
            <p className="mb-4 whitespace-pre-wrap">{t('privacy.section1.content')}</p>
          </section>

          {/* What information we collect */}
          <section>
            <h2 className="text-2xl font-cinzel text-imperial-gold mb-4">2. {t('privacy.section2.title')}</h2>
            <p className="mb-4 whitespace-pre-wrap">{t('privacy.section2.content')}</p>
          </section>

          {/* How we use your information */}
          <section>
            <h2 className="text-2xl font-cinzel text-imperial-gold mb-4">3. {t('privacy.section3.title')}</h2>
            <ul className="list-disc pl-6 space-y-2">
              {t('privacy.section3.purposes').split('•').filter(Boolean).map((purpose, index) => (
                <li key={index}>{purpose.trim()}</li>
              ))}
            </ul>
            <p className="mt-4">{t('privacy.section3.additional')}</p>
          </section>

          {/* Information sharing */}
          <section>
            <h2 className="text-2xl font-cinzel text-imperial-gold mb-4">4. {t('privacy.section4.title')}</h2>
            <p className="mb-4">{t('privacy.section4.content')}</p>
          </section>

          {/* How we protect your information */}
          <section>
            <h2 className="text-2xl font-cinzel text-imperial-gold mb-4">5. {t('privacy.section5.title')}</h2>
            <p className="mb-4">{t('privacy.section5.content')}</p>
          </section>

          {/* Data retention */}
          <section>
            <h2 className="text-2xl font-cinzel text-imperial-gold mb-4">6. {t('privacy.section6.title')}</h2>
            <p className="mb-4">{t('privacy.section6.content')}</p>
          </section>

          {/* Your rights */}
          <section>
            <h2 className="text-2xl font-cinzel text-imperial-gold mb-4">7. {t('privacy.section7.title')}</h2>
            <ul className="list-disc pl-6 space-y-2">
              {t('privacy.section7.rights').split('•').filter(Boolean).map((right, index) => (
                <li key={index}>{right.trim()}</li>
              ))}
            </ul>
          </section>

          {/* Contact us */}
          <section>
            <h2 className="text-2xl font-cinzel text-imperial-gold mb-4">8. {t('privacy.section8.title')}</h2>
            <p className="mb-4">{t('privacy.section8.content')}</p>
            <div className="bg-royal-navy-light p-6 rounded-lg">
              <p className="font-bold mb-2">{t('privacy.section8.contact.email')}:</p>
              <p className="mb-4">gestionreines@gmail.com</p>
              <p className="font-bold mb-2">{t('privacy.section8.contact.mail')}:</p>
              <address className="not-italic">
                9540-9520 Québec Inc.<br />
                À l'attention de Marie-Ève Martel<br />
                Responsable de la protection des renseignements personnels<br />
                275, avenue de Dieppe<br />
                Saint-Hyacinthe (Québec) J2S 6Z7, Canada
              </address>
            </div>
          </section>

          {/* Updates */}
          <section>
            <h2 className="text-2xl font-cinzel text-imperial-gold mb-4">9. {t('privacy.section9.title')}</h2>
            <p className="mb-4">{t('privacy.section9.content')}</p>
          </section>

          {/* Interpretation */}
          <section>
            <h2 className="text-2xl font-cinzel text-imperial-gold mb-4">10. {t('privacy.section10.title')}</h2>
            <p className="mb-4">{t('privacy.section10.content')}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 