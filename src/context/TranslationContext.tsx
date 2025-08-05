import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

// Define translation type
type TranslationKey = string;

interface Translations {
  [key: string]: string;
}

// Translations data
const translations: Translations = {
    // Navigation
    'nav.home': 'Accueil',
    'nav.cards': 'Le Cabinet des curiosités',
    'nav.apropos': 'À propos',
    'nav.application': "L'Application",
    'nav.quiz': 'Quiz',
    'nav.chat': 'Chat',
    'nav.journal': 'Journal',
    'nav.shop': 'Boutique',
    
    // Shop - Updated for new products
    'shop.title': 'Boutique Queen de Q',
    'shop.subtitle': 'Les produits qui vont réveiller ta Reine intérieure',
    'shop.search': 'Rechercher un produit...',
    'shop.categories.all': 'Tous',
    'shop.categories.cards': 'Cartes',
    'shop.categories.clothing': 'Vêtements',
    'shop.categories.protection': 'Protection',
    'shop.categories.accessories': 'Accessoires',
    'shop.priceRanges.all': 'Tous les prix',
    'shop.priceRanges.low': '0$ - 50$ CAD',
    'shop.priceRanges.medium': '50$ - 100$ CAD',
    'shop.priceRanges.high': '100$+ CAD',
    'shop.badges.bestseller': 'Best-seller',
    'shop.badges.limitedEdition': 'Édition Limitée',
    'shop.badges.essential': 'Essentiel',
    'shop.badges.handcrafted': 'Fait Main',
    // Shop products - Real products
    'shop.items.physicalCards.name': 'Jeu de Cartes Queen de Q • Édition Physique',
    'shop.items.physicalCards.description': 'Découvre les archétypes masculins avec ton jeu de cartes physique premium',
    'shop.items.queenShirt.name': 'T-Shirt "Je suis une Queen"',
    'shop.items.queenShirt.description': 'Porte ta couronne avec fierté dans ce t-shirt 100% coton bio',
    'shop.items.protectionKit.name': 'Kit de Protection Royale',
    'shop.items.protectionKit.description': 'Condoms premium et accessoires pour queens qui se respectent',
    'shop.items.charmBracelet.name': 'Bracelet Anti-2 de Pique',
    'shop.items.charmBracelet.description': 'Charme symbolique pour attirer les bonnes énergies masculines',
    'shop.addToCart': 'Ajouter au panier',
    'shop.comingSoon': 'Bientôt',
    'shop.awakeningTitle': 'La Boutique s\'Éveille',
    'shop.awakeningDesc': 'Notre collection exclusive arrive bientôt avec des produits authentiques Queen de Q. Restez connectées pour les premières révélations !',
    'shop.noProducts': 'Aucun produit trouvé',
    'shop.noProductsDesc': 'Essaie de modifier tes filtres pour découvrir plus de produits.',
    
    // Chat - Updated for grandmother persona
    'chat.title': 'Salon de Thé avec Reine-Mère',
    'chat.queenMother': 'Reine-Mère',
    'chat.reineMere': 'Reine-Mère',
    'chat.online': 'En ligne',
    'chat.greeting': 'Bonjour ma chérie... 👵🏻',
    'chat.welcome': 'Viens prendre le thé avec moi !',
    'chat.welcomeMessage': 'Bonjour ma belle ! Viens t\'asseoir, j\'ai préparé du thé et des petits gâteaux. Nous allons parler de ces archétypes masculins... 👵🏻☕',
    'chat.complicitMessage': 'Tu sais, j\'ai vu passer tellement d\'hommes dans ma vie ! Les manipulateurs, les protecteurs, les immatures... Je vais t\'aider à les reconnaître ma chérie.',
    'chat.teaTimeMessage': 'Bientôt, nous pourrons discuter en direct autour d\'un bon thé. En attendant, va explorer tes patterns dans ton journal ! 💕',
    'chat.comingSoon': 'Bientôt disponible...',
    'chat.teaTime': 'Le thé de l\'après-midi arrive bientôt...',
    'chat.teaTimeAvailable': 'Le thé sera bientôt prêt...',
    'chat.inputPlaceholder': 'Écrivez votre message... (bientôt disponible)',
    'chat.typing': 'Reine-Mère tape...',
    'chat.sendDisabled': 'Envoyer message (indisponible)',
    'chat.description': 'Fenêtre de chat avec la Reine-Mère, actuellement indisponible',
    'chat.timestamp1': '14:32',
    'chat.timestamp2': '14:33',
    'chat.timestamp3': '14:35',
    'chat.beta': 'VERSION BETA',
    'chat.awakeningTitle': 'Reine-Mère s\'éveille...',
    'chat.awakeningMessage': 'Elle apprend chaque jour à mieux te comprendre et t’accompagner dans tes réflexions sur les archétypes masculins.',
    'chat.patience': '☕ "Patience ma chérie, le thé de l\'après-midi sera bientôt prêt..."',
    'chat.exploreJournal': 'En attendant, explore tes patterns dans ton journal personnel ! 📝',
    'chat.evolving': '🌱 Reine-Mère est en pleine évolution !',
    'chat.placeholder': 'Tapez votre message...',
    'chat.betaNote': 'P.S. Je m\'améliore chaque jour pour mieux te comprendre... Cette version beta me permet d\'apprendre tes besoins ! Bientôt, nos conversations seront encore plus riches. 💫',
    
    // Journal - Updated for masculine archetypes focus
    'journal.title': 'Journal d\'Introspection',
    'journal.subtitle': 'Écrivez vos réflexions sur les archétypes masculins que vous attirez',
    'journal.newEntry': 'Écrire une nouvelle réflexion',
    'journal.entryTitle': 'Titre de votre réflexion',
    'journal.titlePlaceholder': 'Ex: Ma réflexion sur le Roi de Cœur...',
    'journal.archetype': 'Archétype découvert',
    'journal.optional': 'optionnel',
    'journal.archetypePlaceholder': 'Ex: Roi de Cœur - Le Protecteur',
    'journal.mood': 'Humeur du moment',
    'journal.moodPositive': 'Positive',
    'journal.moodNeutral': 'Neutre',
    'journal.moodReflective': 'Réflexive',
    'journal.moodMelancholic': 'Mélancolique',
    'journal.reflection': 'Votre réflexion',
    'journal.contentPlaceholder': 'Décrivez ce que cet archétype vous révèle sur vos patterns d\'attraction...',
    'journal.save': 'Sauvegarder',
    'journal.cancel': 'Annuler',
    'journal.delete': 'Supprimer',
    'journal.noEntries': 'Votre journal est vide',
    'journal.startWriting': 'Commencez à écrire vos premières réflexions sur les archétypes masculins',
    'journal.saved': 'Sauvegardé ✨',
    'journal.confirmDelete': 'Supprimer cette entrée ?',
    
    // Cards page
    'cards.title': 'Explorez les archétypes masculins',
    'cards.description': 'Découvrez les types d\'hommes que vous attirez dans vos relations',
    'cards.returnHome': 'Retour à l\'accueil',
    
    // Hero section
    'hero.title': 'Bienvenue dans ton royaume Queen!',
    'hero.subtitle': 'Si tu nous croises sur ton chemin, c\'est que tu as envie qu\'un grand changement s\'opère dans ta vie.',
    'hero.description': 'Tu es prête à t\'élever, tu es prête à briller. Tu es prête à te couronner. Queen de Q, c\'est plus qu\'une communauté, c\'est une sororité. C\'est un mouvement. Une conviction profonde que chaque femme est une Reine, une reine parfaite dans son imperfection et que seules ses blessures intérieures l\'empêchent de se couronner pour accéder à la plénitude. Rejoins le mouvement!',
    'hero.spotsLeft': 'places restantes',
    'hero.instruction': 'Pioche une carte pour découvrir un archétype masculin.',
    'hero.scrollText': 'Faites défiler pour explorer',
    'hero.cta': 'Découvrir mon pattern',
    
    // Signup form
    'signup.title': 'Rejoignez Queen de Q',
    'signup.subtitle': 'Découvrez vos patterns d\'attraction',
    'signup.description': 'Comprenez les types d\'hommes que vous attirez',
    'signup.name': 'Nom complet',
    'signup.email': 'Adresse email',
    'signup.emailPlaceholder': 'votre@email.com',
    'signup.submit': 'Je veux mon laisser passer Queen de Q',
    'signup.close': 'Fermer',
    'signup.loading': 'En cours...',
    'signup.form.email': 'Adresse email',
    'signup.form.submit': 'Je veux mon laisser passer Queen de Q',
    
    // FAQ
    'faq.title': 'Questions fréquentes',
    'faq.subtitle': 'Tout ce que tu dois savoir pour régner sur ton royaume.',
    'faq.question1': 'Qu\'est-ce que Queen de Q?',
    'faq.answer1': 'Queen de Q est une application de développement personnel ludique et puissante qui utilise des cartes inspirées du jeu classique, des archétypes féminins et masculins, et des outils de réflexion pour t\'aider à mieux comprendre tes relations, ton pouvoir intérieur, et ta trajectoire émotionnelle.',
    'faq.question2': 'Comment fonctionne l\'application?',
    'faq.answer2': 'L\'application est un robot conversationnel (La Reine Mère) entraîné en circuit fermé permettant de déterminer à quel archétype masculin tu as affaire (Ta Pioche), quelle est ta Reine intérieure (Miroir Miroir) et de t\'offrir des rituels personnalisés (Salon de thé). Rappelle-toi toutefois que l\'application existe à des fins de divertissement et ne se substitue en aucun cas à un suivi thérapeutique avec un.e professionnel.le de la santé certifié.e.',
    'faq.question3': 'Quels sont les archétypes de Queen de Q?',
    'faq.answer3': 'L\'application s\'articule autour de 4 grandes Reines : Carreau : la souveraine de l\'ancrage, de la structure et des limites saines. Trèfle : la créative, intellectuelle, maternelle et généreuse. Cœur : la romantique, intuitive, sensuelle et vulnérable. Pique : la rebelle, mystique, stratégique et lucide. Chaque reine a ses forces et ses blessures. Tu peux découvrir quelle est ta Reine dominante dans l\'onglet "Miroir Miroir".',
    'faq.question4': 'Puis-je essayer l\'app avant de m\'abonner?',
    'faq.answer4': 'Oui, tu as accès à une version gratuite avec un tirage quotidien, des affirmations et une initiation aux Reines. L\'univers est vaste, mais tu peux en explorer une belle part sans abonnement.',
    'faq.question6': 'Comment utiliser Queen de Q au quotidien?',
    'faq.answer6': 'Intègre l\'application dans ta routine comme un moment de connexion avec toi-même. Tire une carte quand tu rencontres quelqu\'un de nouveau, utilise le journal pour noter tes observations sur tes patterns, et consulte la Reine Mère quand tu as besoin de conseils ou de rituels de guérison. L\'application est conçue pour être à la fois ludique et profondément transformative.',
    
    // How it works
    'howItWorks.title': 'C\'est quoi, Queen de Q?',
    'howItWorks.subtitle': 'Ouvre les portes du royaume',
    'howItWorks.hoverToReveal': 'Survoler pour découvrir',
    'howItWorks.step1.title': 'Une application',
    'howItWorks.step1.description': 'Une application de développement personnel féministe avec humour et bienveillance.',
    'howItWorks.step1.backText': 'Une application de développement personnel féministe avec humour et bienveillance.',
    'howItWorks.step2.title': 'Une communauté',
    'howItWorks.step2.description': 'Découvre le Royaume de Queen de Q et rejoins une sororité où les Reines se soutiennent, s\'entraident, rient et se couronnent ensemble.',
    'howItWorks.step2.backText': 'Découvre le Royaume de Queen de Q et rejoins une sororité où les Reines se soutiennent, s\'entraident, rient et se couronnent ensemble.',
    'howItWorks.step3.title': 'Une transformation intérieure',
    'howItWorks.step3.description': 'Accède à des rituels, des réflexions et des méditations pour incarner ta Reine intérieure et te voir telle que tu es.',
    'howItWorks.step3.backText': 'Accède à des rituels, des réflexions et des méditations pour incarner ta Reine intérieure et te voir telle que tu es.',
    
    // Newsletter
    'newsletter.title': 'Rejoignez la Communauté',
    'newsletter.subtitle': 'Découvrez vos patterns d\'attraction masculine',
    'newsletter.description': 'Recevez des conseils exclusifs sur les relations et l\'analyse des archétypes masculins',
    'newsletter.placeholder': 'Votre adresse email',
    'newsletter.button': 'Je veux mon laisser passer Queen de Q',
    'newsletter.loading': 'Inscription en cours...',
    'newsletter.success.title': 'Bienvenue dans la Communauté !',
    'newsletter.success.subtitle': 'Vous allez recevoir des conseils exclusifs sur vos patterns d\'attraction.',
    'newsletter.stats.souls': 'Femmes Accompagnées',
    'newsletter.stats.archetypes': 'Archétypes Masculins',
    'newsletter.stats.transformations': 'Relations Transformées',
    
    // Testimonials
    'testimonials.title': 'Témoignages de Femmes',
    'testimonials.subtitle': 'Comment d\'autres femmes ont transformé leurs relations',
    'testimonials.archetype': 'Pattern découvert',
    'testimonials.marie.name': 'Marie L.',
    'testimonials.marie.archetype': 'Attirait des Manipulateurs',
    'testimonials.marie.text': 'Grâce à Queen de Q, j\'ai compris pourquoi j\'attirais toujours le même type d\'homme toxique. Maintenant je reconnais les red flags !',
    'testimonials.sophie.name': 'Sophie M.',
    'testimonials.sophie.archetype': 'Attirait des Immatures',
    'testimonials.sophie.text': 'J\'ai réalisé que j\'attirais des hommes émotionnellement indisponibles. Cette prise de conscience a tout changé dans mes relations.',
    'testimonials.clara.name': 'Clara D.',
    'testimonials.clara.archetype': 'Évitait les Protecteurs',
    'testimonials.clara.text': 'Je fuyais les hommes stables et aimants. Comprendre ce pattern m\'a aidée à accepter l\'amour sain.',
    'testimonials.julie.name': 'Julie R.',
    'testimonials.julie.archetype': 'Attirait des Narcissiques',
    'testimonials.julie.text': 'J\'étais toujours avec des hommes qui ne parlaient que d\'eux. Queen de Q m\'a ouvert les yeux sur ce pattern destructeur.',
    'testimonials.camille.name': 'Camille S.',
    'testimonials.camille.archetype': 'Évitait l\'Engagement',
    'testimonials.camille.text': 'Je sabotais toujours mes relations sérieuses. Comprendre mes peurs m\'a permis de construire une relation stable.',
    
    // Layout/Footer
    'footer.description': 'Un royaume pour les Reines, par des Reines.',
    'footer.navigation': 'Navigation',
    'footer.copyright': '© 2025 Queen de Q. Tous droits réservés.',
    'footer.contactForm.title': 'Contactez-nous',
    'footer.contactForm.email': 'Votre email',
    'footer.contactForm.message': 'Votre message',
    'footer.contactForm.send': 'Envoyer',
    'footer.contactForm.sending': 'Envoi en cours...',
    'footer.contactForm.success': 'Message envoyé avec succès !',
    'footer.contactForm.error': 'Échec de l\'envoi du message. Veuillez réessayer.',
    'footer.privacyComingSoon': 'Politique de confidentialité',
    'footer.termsComingSoon': 'Conditions d\'utilisation',
    
    // Card specific
    'card.deckLabel': 'Jeu de cartes – cliquez pour tirer',
    'card.archetype': 'Archétype',
    'card.number': 'Archétype n°',
    'card.aria': 'Carte {name}, numéro {number}. Cliquez pour révéler.',
    'card.drawnCard': 'Carte tirée',
    
    // Instructions
    'instructions.clickCards': 'Cliquez sur les cartes ou appuyez sur',
    'instructions.pressSpace': 'Appuyez sur',
    'instructions.spaceKey': 'ESPACE',
    'instructions.toDiscover': 'pour découvrir un archétype',
    'instructions.toReveal': 'pour révéler un archétype',
    
    // Links
    'links.privacy': 'Politique de confidentialité',
    'links.terms': 'Conditions d\'utilisation',
    'links.contact': 'Contact',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Une erreur est survenue',
    
    // Accessibility
    'accessibility.menu': 'Menu',
    'accessibility.clickToDraw': 'Cliquez pour tirer une carte',
    'accessibility.cardDrawn': 'Carte tirée',
    'accessibility.pressSpaceOrClick': 'Appuyez sur Espace ou cliquez pour tirer une carte',
    'accessibility.photoOf': 'Photo de',
    'accessibility.closeChat': 'Fermer le chat',
    'accessibility.messageInput': 'Zone de message indisponible',
    
    // Card names
    'cards.aceOfSpades': 'As de Pique',
    'cards.aceOfDiamonds': 'As de Carreau',
    
    // Card deck
    'cardDeck.dealCard': 'Tirez-moi une carte ↗',
    'cardDeck.yourArchetype': 'Votre Archétype',
    
    // Suits
    'suits.hearts': 'Cœur',
    'suits.spades': 'Pique', 
    'suits.diamonds': 'Carreau',
    'suits.clubs': 'Trèfle',
    'ranks.dame': 'Dame',
    'ranks.reine': 'Reine',
    'ranks.roi': 'Roi', 
    'ranks.cavalier': 'Cavalier',
    
    // Live Tea Time
    'liveTeaTime.title': 'Live Tea Time',
    'liveTeaTime.date': 'jeudi 24 juillet 19h00',
    'liveTeaTime.reminder': 'Me rappeler',
    'liveTeaTime.close': 'Fermer la bannière',
    
    // Contact
    'contact.email': 'gestionreines@gmail.com',
    
    // Currency
    'currency.cad': 'CAD',
    
    // Quiz
    'quiz.title': 'Découvrez Votre Queen Intérieure',
    'quiz.subtitle': 'Un voyage mystique à travers les archétypes féminins',
    'quiz.question': 'Question',
    'quiz.of': 'sur',
    'quiz.q1.text': 'Quelle est votre approche naturelle face à un défi ?',
    'quiz.q1.hearts': 'J\'écoute mon cœur et mes émotions',
    'quiz.q1.spades': 'J\'analyse stratégiquement la situation',
    'quiz.q1.diamonds': 'Je me concentre sur les opportunités pratiques',
    'quiz.q1.clubs': 'Je mobilise mon énergie créative',
    'quiz.q2.text': 'Comment exprimez-vous votre pouvoir personnel ?',
    'quiz.q2.hearts': 'Par la compassion et l\'empathie',
    'quiz.q2.spades': 'Par la sagesse et la détermination',
    'quiz.q2.diamonds': 'Par l\'ambition et la réussite',
    'quiz.q2.clubs': 'Par l\'innovation et l\'action',
    'quiz.q3.text': 'Quel environnement vous inspire le plus ?',
    'quiz.q3.hearts': 'Un foyer chaleureux entouré d\'amour',
    'quiz.q3.spades': 'Un espace de réflexion et de sagesse',
    'quiz.q3.diamonds': 'Un lieu de beauté et d\'élégance',
    'quiz.q3.clubs': 'Un atelier créatif plein d\'énergie',
    'quiz.q4.text': 'Comment gérez-vous les relations difficiles ?',
    'quiz.q4.hearts': 'Avec patience et compréhension',
    'quiz.q4.spades': 'Avec franchise et limites claires',
    'quiz.q4.diamonds': 'Avec diplomatie et intelligence',
    'quiz.q4.clubs': 'Avec passion et authenticité',
    'quiz.q5.text': 'Quelle est votre plus grande force ?',
    'quiz.q5.hearts': 'Ma capacité à aimer et nourrir',
    'quiz.q5.spades': 'Ma sagesse et mon discernement',
    'quiz.q5.diamonds': 'Mon élégance et ma grâce',
    'quiz.q5.clubs': 'Mon énergie et ma créativité',
    'quiz.q6.text': 'Comment prenez-vous des décisions importantes ?',
    'quiz.q6.hearts': 'En consultant mes sentiments profonds',
    'quiz.q6.spades': 'En pesant logiquement le pour et le contre',
    'quiz.q6.diamonds': 'En évaluant les bénéfices à long terme',
    'quiz.q6.clubs': 'En suivant mon instinct créatif',
    'quiz.q7.text': 'Quel rôle jouez-vous naturellement en groupe ?',
    'quiz.q7.hearts': 'La nourricière qui prend soin de tous',
    'quiz.q7.spades': 'La sage qui guide et conseille',
    'quiz.q7.diamonds': 'La leader qui inspire l\'excellence',
    'quiz.q7.clubs': 'L\'innovatrice qui apporte de nouvelles idées',
    'quiz.q8.text': 'Comment vous ressourcez-vous ?',
    'quiz.q8.hearts': 'En passant du temps avec mes proches',
    'quiz.q8.spades': 'En méditant et en me connectant à ma sagesse',
    'quiz.q8.diamonds': 'En m\'entourant de beauté et de luxe',
    'quiz.q8.clubs': 'En explorant de nouveaux projets créatifs',
    'quiz.results.hearts.title': 'Queen de Cœur - L\'Aimante',
    'quiz.results.hearts.subtitle': 'L\'Énergie de l\'Amour Inconditionnel',
    'quiz.results.hearts.description': 'Vous incarnez la force de l\'amour et de la compassion. Votre pouvoir réside dans votre capacité à nourrir et à guérir les autres.',
    'quiz.results.diamonds.title': 'Queen de Carreau - L\'Élégante',
    'quiz.results.diamonds.subtitle': 'L\'Énergie de la Grâce et de l\'Abondance',
    'quiz.results.diamonds.description': 'Vous rayonnez l\'élégance et la beauté. Votre pouvoir réside dans votre capacité à créer l\'harmonie et l\'abondance.',
    'quiz.results.spades.title': 'Queen de Pique - La Sage',
    'quiz.results.spades.subtitle': 'L\'Énergie de la Sagesse et de la Transformation',
    'quiz.results.spades.description': 'Vous incarnez la sagesse profonde et la transformation. Votre pouvoir réside dans votre capacité à voir au-delà des apparences.',
    'quiz.results.clubs.title': 'Queen de Trèfle - La Créatrice',
    'quiz.results.clubs.subtitle': 'L\'Énergie de la Créativité et de l\'Action',
    'quiz.results.clubs.description': 'Vous incarnez l\'énergie créatrice et l\'innovation. Votre pouvoir réside dans votre capacité à manifester vos visions.',
    'quiz.results.powerLabel': 'Votre Pouvoir',
    'quiz.results.shareTitle': 'Je suis une {title} !',
    'quiz.results.shareResult': 'Partager mon résultat',
    'quiz.results.joinKingdom': 'Rejoindre le Royaume',
    'quiz.retakeQuiz': 'Refaire le Quiz',

    // About Page
    'about.title': 'À propos',
    'about.intro.subtitle': 'Queen de Q, c\'est né d\'une amitié...',
    'about.intro.p1': 'Tout a commencé après quelques confidences échappées entre deux amies aux cœurs grands comme des royaumes. Karine, la Reine de Cœur, rayonne par son amour des autres, sa douceur désarmante et sa capacité à écouter sans juger. Marie-Ève, la Reine de Carreau, apporte sa fougue, son sens de l\'organisation… et son humour mordant qui décoiffe les idées reçues.',
    'about.intro.p2': 'Ce fut un coup de foudre d\'amitié. Une reconnaissance instinctive entre deux femmes aux parcours différents, mais animées par la même envie : créer du sens, du soutien, et de la magie dans la vie des autres femmes. Ensemble, elles ont rêvé d\'un royaume bien à elles — un espace sécurisant et drôle, sans courbettes ni comparaisons, où chaque femme pourrait se reconnecter à sa puissance, sa créativité, sa joie.',
    'about.intro.p3': 'De cette alliance est née Queen de Q, une application douce et impertinente, ludique et réfléchie, conçue pour aider les femmes à se « couronner » elles-mêmes. Grâce à des rituels quotidiens, des réflexions inspirantes, des cartes mystiques et des défis bienveillants, Queen de Q invite chacune à retrouver son trône — celui qui lui va, pas celui qu\'on lui a imposé.',
    'about.intro.p4': 'Parce qu\'on peut se reconstruire en riant. Parce qu\'on peut se choisir sans s\'excuser. Parce qu\'on est toutes Reines… à notre façon.',
    'about.karine.title': 'Reine de Coeur',
    'about.karine.p1': 'Pendant plus de vingt ans, Karine a tenu l\'espace sacré de la parentalité, accompagnant des familles dans les zones les plus vulnérables de leur humanité. Mais un jour, entre deux accompagnements, Karine a tourné le miroir. Vers elle.',
    'about.karine.p2': 'Ce qu\'elle a vu n\'était pas une mère, ni une guide, ni une coach. C\'était une Reine. Une reine fougueuse, lucide, blessée, qui portait en elle des archétypes, des patterns, des blessures générationnelles. Une femme qui s\'était trop souvent excusée d\'être forte, sensible, entière. Une femme qui voulait comprendre pourquoi elle attirait certains types d\'amants, pourquoi certaines histoires se répétaient, pourquoi le pouvoir féminin faisait si peur, même à elle-même.',
    'about.karine.p3': 'Aujourd\'hui, Karine est la présidente-directrice générale de Queen de Q. Mais pour les initiées, elle est beaucoup plus que ça : elle est la première Reine couronnée. Son rêve? Voir des milliers de femmes lever la tête, se choisir et se connaître. Parce qu\'une Reine, ça ne naît pas: ça se révèle.',
    'about.karine.p4': 'De cette plongée viscérale, est née une vision. Un outil. Un univers. Un empire doux, mais puissant : Queen de Q.',
    'about.marie-eve.title': 'Reine de Carreau',
    'about.marie-eve.p1': 'Il y a celles qui rêvent. Et il y a celles qui transforment le rêve en stratégie, le feu en structure, l\'intuition en empire. Marie-Ève est de celles-là. Communicatrice chevronnée, femme d\'idées et d\'impact, elle est une force pragmatique derrière Queen de Q.',
    'about.marie-eve.p2': 'Mais ce n\'est pas un diplôme ni une feuille de route qui l\'a menée ici. C\'est une quête personnelle. Une série de traversées intérieures. Des blessures anciennes. Des masques brisés. Des dates qui laissaient des traces, et des silences lourds de sens. Elle aussi, elle a dansé avec les illusions. Elle aussi, elle a dû se recouronner.',
    'about.marie-eve.p3': 'Marie-Ève n\'est pas arrivée chez Queen de Q par hasard. Elle y est venue par devoir. Celui de créer un espace où les femmes peuvent se découvrir, se choisir et grandir dans le plaisir. Pas dans la douleur. Pas dans la honte. Pas dans l\'auto-sacrifice. Dans la clarté. Dans l\'humour. Dans le réel. Et avec un soupçon d\'audace.',
    'about.marie-eve.p4': 'Marie-Ève dirige les opérations marketing de Queen de Q. Mais elle est bien plus qu\'une stratège. Elle veille à ce que chaque Queen reconnaisse sa valeur — même quand elle doute, même quand elle chute.',
    'about.contact.title': 'Contacte-nous',
    'about.contact.email': 'gestionreines@gmail.com',

    // Application Page
    'app.title': 'Queen de Q',
    'app.subtitle': 'L\'APPLICATION',
    'app.scroll': 'Révèle ta puissance intérieure',
    'app.intro.title': 'Tout de toi est complet',
    'app.intro.p1': 'T\'as déconstruit. Analysé. Trop.',
    'app.intro.p2': 'T\'as été douce, forte, conciliante, sexy, brillante... parfois tout en même temps.',
    'app.intro.p3': 'Et t\'as quand même mangé des deux de piques.',
    'app.intro.p4': 'Queen de Q, c\'est la fin du bluff.',
    'app.intro.p5': 'C\'est le début d\'un jeu où on choisit nos règles, nos cartes, notre vérité.',
    'app.intro.p6': 'Pas pour plaire. Pour se couronner.',
    'app.intro.p7': 'Télécharge l\'application et couronne toi!',
    'app.features.title': 'L\'application Queen de Q, c\'est...',
    'app.feature1.title': 'Ta Pioche',
    'app.feature1.desc': 'En répondant à quelques questions de la Reine Mère, découvre quel archétype masculin est ton ex, ton amoureux ou ton prospect. Plus la carte est forte, plus il est mature émotionnellement : pas pour rien qu\'on mérite un King!',
    'app.feature2.title': 'Miroir, Miroir',
    'app.feature2.desc': 'En répondant à quelques questions de la Reine Mère, découvre qui est ta reine intérieure (Cœur, Trèfle, Carreau, Pique). Tu pourras aussi apprendre quelles sont tes blessures émotionnelles, ton langage de l\'amour et tes forces dominantes.',
    'app.feature3.title': 'Salon de thé',
    'app.feature3.desc': 'Profite d\'un moment privilégié avec la Reine Mère. Échange avec elle pour savoir comment mettre un terme à une relation (Flush Royal) ou pour te désenvoûter du charme de ton Deux de Pique.',
    'app.cta.title': 'Reçois ton invitation au Royaume',
    'app.cta.subtitle': 'Rejoins-nous pour le lancement officiel et sois parmi les premières à te couronner.',
    'app.cta.button': 'Recevoir mon invitation',

    // Registration Modal
    'modal.title': 'Lancement Officiel de Queen de Q',
    'modal.subtitle': '"Le pont-levis descend. Les portes s\'ouvrent. Le royaume t\'attend."',
    'modal.date': '24 Juillet 2025',
    'modal.time': '19:00 - 20:00',
    'modal.location': 'En Ligne',
    'modal.location.desc': 'Le lien vous sera envoyé',
    'modal.program.title': 'Au Programme Dans l\'Appli :',
    'modal.program.item1': '<span class="font-bold">Ta pioche :</span> Tire le portrait du mec qui occupe ton esprit (ou ton lit).',
    'modal.program.item2': '<span class="font-bold">Miroir, miroir :</span> Un voyage introspectif guidé pour découvrir ta Queen Intérieure.',
    'modal.program.item3': '<span class="font-bold">Salon de thé :</span> Des rituels guidés pour te désenvoûter et entamer un réel processus de retour à toi.',
    'modal.offer.title': 'OFFRE EXCLUSIVE LORS DU LANCEMENT !',
    'modal.offer.desc': 'Sois présente pour la découvrir.',
    'modal.final_question': 'Est-ce que t\'es prête à changer les règles du jeu ?',
    'modal.email_placeholder': 'Entre ton courriel...',
    'modal.submit_button': 'Je veux mon laisser passer Queen de Q',
    
    // Cards page - Cabinet
    'cards.cabinet.title': 'Le Cabinet des Curiosités',
    'cards.cabinet.subtitle': 'Parce qu\'on aime te gâter, Queen.',
    'cards.cabinet.item1.title': 'Le jeu de cartes',
    'cards.cabinet.item1.desc': '54 cartes, 54 archétypes amoureux. À imprimer sur du carton ou à coller sur un jeu de cartes traditionnel.',
    'cards.cabinet.item1.button': 'Télécharger #',
    'cards.cabinet.item2.title': 'Queen de Q – Le livre',
    'cards.cabinet.item2.desc': 'Procure-toi la version numérique ou imprimée du livre Queen de Q, un outil pour aller plus loin dans l\'exploration des patterns amoureux.',
    'cards.cabinet.item2.button': 'Bientôt disponible',
    'cards.cabinet.item3.title': 'La Boutique',
    'cards.cabinet.item3.desc': 'Affiche ta Reine intérieure grâce à nos produits dérivés et surveille les drops de merch exclusive à venir!',
    'cards.cabinet.item3.button': 'Visiter la boutique',

    // Cards page - Creative additions
    'cards.portal.title': 'Le Portail des Archétypes',
    'cards.portal.subtitle': 'Osez voir qui vous attirez vraiment.',
    'cards.portal.instruction': 'Touchez le portail pour commencer',
    'cards.instructions.title': 'Les Rituels de la Queen',
    'cards.instructions.theme1.title': 'Le Mystère',
    'cards.instructions.theme1.desc': 'Chaque carte est un miroir, un archétype masculin. Votre tirage n\'est pas un hasard, il est une révélation de vos patterns amoureux actuels. Accueillez-le avec curiosité.',
    'cards.instructions.theme2.title': 'La Créativité',
    'cards.instructions.theme2.desc': 'Le but n\'est pas de juger la carte, mais de comprendre le message. Utilisez votre journal pour noter vos réflexions. Quelle part de vous attire cet homme ? Quelle blessure est touchée ?',
    'cards.instructions.theme3.title': 'Le Jeu',
    'cards.instructions.theme3.desc': 'Tirez une carte, identifiez l\'archétype, et demandez-vous : est-ce une progression ou une répétition ? Le but est de comprendre pour mieux jouer.',
    'cards.grid.title': 'Le Grand Théâtre des Hommes',
    'footer.brand.title': 'Queen de Q',
    'footer.brand.subtitle': 'Dévoilez le jeu des archétypes masculins.',
    'footer.links.title': 'Navigation',
    'footer.links.about': 'À Propos',
    'footer.links.faq': 'FAQ',
    'footer.links.contact': 'Contact',
    'footer.social.title': 'Restons Connectés',
    'footer.social.subtitle': 'Suivez-nous pour des mises à jour et des contenus exclusifs.',
    'footer.rights': 'Tous droits réservés.',
    // SwipeCards (Cabinet des Curiosités)
    'swipe.removed': 'Carte retirée',
    'swipe.howTitle': 'Comment fonctionne le tirage ?',
    'swipe.howDesc': 'Chaque carte révèle un <span class="text-imperial-gold font-semibold">archétype masculin</span> que tu peux attirer dans tes relations. Glisse les cartes vers la gauche ou la droite pour les explorer et découvrir tes patterns d\'attraction.',
    'swipe.slide': 'Glisse',
    'swipe.slideDesc': 'Fais glisser chaque carte pour révéler l\'archétype suivant',
    'swipe.observe': 'Observe',
    'swipe.observeDesc': 'Découvre les caractéristiques de chaque archétype masculin',
    'swipe.understand': 'Comprends',
    'swipe.understandDesc': 'Identifie tes patterns pour mieux choisir tes relations',
    'swipe.keyboard': 'Utilise les flèches du clavier',
    'swipe.touch': 'Glisse avec le doigt/souris',
    'swipe.keyboardInstructions': 'Utilisez les flèches gauche ou droite pour retirer les cartes. Glissez avec la souris ou le doigt pour la même action.',
    'swipe.moreCards': 'Tu veux en découvrir plus ?',
    'swipe.cardsExplored': 'Tu viens d\'explorer <span class="text-imperial-gold font-bold">4 archétypes</span> sur les <span class="text-imperial-gold font-bold">54 disponibles</span> !',
    'swipe.preview': 'Aperçu Gratuit',
    'swipe.preview4': '4 archétypes seulement',
    'swipe.previewDesc': 'Descriptions basiques',
    'swipe.previewLimited': 'Exploration limitée',
    'swipe.fullRealm': 'Royaume Complet',
    'swipe.full54': '54 archétypes détaillés',
    'swipe.fullPsych': 'Analyse psychologique approfondie',
    'swipe.fullGuidance': 'Guidance personnalisée',
    'swipe.fullTransformation': 'Transformation relationnelle',
    'swipe.whatToExpect': 'Ce qui t\'attend dans le Royaume :',
    'swipe.discoverPatterns': 'Découvre tes <strong>patterns d\'attraction</strong> cachés',
    'swipe.understandWhy': 'Comprends pourquoi tu attires certains types d\'hommes',
    'swipe.learnRedFlags': 'Apprends à <strong>reconnaître les red flags</strong>',
    'swipe.transformRelations': 'Transforme tes relations amoureuses',
    'swipe.unlock54': 'DÉVERROUILLER LES 54 ARCHÉTYPES',
    'swipe.restart4Cards': 'Recommencer avec ces 4 cartes',
    'swipe.quote4': '4 cartes, c\'est un début. 54 cartes, c\'est une révolution.',
    'swipe.quoteQueen': 'Queen de Q',
    
    // Privacy Policy
    'privacy.title': 'Politique de confidentialité de Queen de Q',
    'privacy.version': 'Version en vigueur à compter du 15 juillet 2025',
    'privacy.section1.title': 'Introduction',
    'privacy.section1.content': '9540-9520 Québec Inc. (« Gestion Reines Inc. », « nous », « notre » ou « Queen de Q ») accorde la plus grande importance à la protection de votre vie privée et à la confidentialité de vos renseignements personnels. La présente politique vise à expliquer comment nous recueillons, utilisons, conservons, partageons et protégeons vos renseignements personnels, c\'est-à-dire toute information permettant de vous identifier directement ou indirectement, lorsque vous utilisez l\'application et les services Queen de Q ou que vous visitez notre site web : www.queendeq.com.\n\nCette politique est conforme à la Loi sur la protection des renseignements personnels dans le secteur privé (Québec) et aux autres lois applicables.',
    'privacy.section2.title': 'Quels renseignements personnels collectons-nous?',
    'privacy.section2.content': 'Lorsque vous utilisez l\'application Queen de Q, ou que vous naviguez sur son site Internet, nous recueillons différents types de renseignements personnels, selon la façon dont vous interagissez avec nos services.\n\nNous collectons d\'abord des données d\'identification et de profil qui nous permettent de créer et gérer votre compte et d\'adapter les contenus à votre situation. Cela comprend votre prénom, nom, adresse courriel, pays ou province de résidence, ainsi que votre âge, pour confirmer votre admissibilité et répondre aux obligations légales applicables.\n\nNous recueillons aussi des données techniques générées automatiquement lors de votre navigation, telles que votre adresse IP, des informations sur votre appareil (type, système d\'exploitation, langue) et des données liées à vos interactions avec la plateforme (pages visitées, durée des sessions, préférences sauvegardées). Nous utilisons également des témoins de connexion (« cookies ») et des identifiants similaires pour améliorer votre expérience et effectuer certaines analyses, avec votre consentement lorsque requis.\n\nDe plus, dans le cadre des fonctionnalités introspectives de Queen de Q, nous enregistrons les données que vous saisissez ou générez vous-même, comme les résultats des tests interactifs (« Miroir Miroir », « Ta Pioche » et « Salon de thé »), vos réponses aux questionnaires, vos notes ou réflexions personnelles et vos statistiques de progression. Si vous choisissez de participer à notre communauté ou aux cercles sororaux numériques, vos contributions et interactions sont également collectées.\n\nEnfin, lorsque vous souscrivez à un abonnement (Freemium, Diadème ou Couronne), nous conservons l\'historique de vos souscriptions pour gérer vos accès. Le traitement des paiements est effectué directement par nos prestataires, tels que Stripe ou Square, et aucune donnée bancaire n\'est stockée chez Queen de Q.',
    'privacy.section3.title': 'À quelles fins utilisons-nous vos renseignements personnels?',
    'privacy.section3.purposes': '• vous permettre d\'accéder à votre compte et aux fonctionnalités de l\'application;\n• gérer vos préférences et personnaliser votre expérience selon les modules et archétypes choisis;\n• vous transmettre des communications liées à nos services, incluant des rappels, mises à jour et invitations;\n• vous proposer, avec votre consentement, des contenus promotionnels;\n• répondre à vos questions et demandes de soutien;\n• assurer la sécurité de la plateforme, prévenir les fraudes et gérer nos opérations internes;\n• effectuer des analyses statistiques pour améliorer nos services;\n• et respecter nos obligations légales et réglementaires.',
    'privacy.section3.additional': 'Nous n\'utiliserons jamais vos renseignements personnels à d\'autres fins que celles mentionnées dans la présente politique sans vous en informer au préalable ni, lorsque la loi l\'exige, obtenir votre consentement. Toutefois, il est possible que nous soyons amenés à utiliser vos renseignements pour d\'autres finalités qui ne sont pas expressément décrites ici, mais uniquement si la loi nous y autorise et si ces finalités demeurent compatibles avec les objectifs initiaux pour lesquels vos données ont été collectées. Si nous devions envisager une utilisation sensiblement différente ou non prévue, nous vous en aviserions et solliciterions votre consentement lorsque requis.',
    'privacy.section4.title': 'Partageons-nous vos renseignements personnels?',
    'privacy.section4.content': 'Vos renseignements personnels peuvent être communiqués à des tiers dans le cadre normal de nos activités, mais toujours de façon encadrée et dans le respect de leur confidentialité.\n\nAinsi, nous pouvons partager certaines données avec nos fournisseurs technologiques qui nous aident à exploiter, héberger et sécuriser notre plateforme, ou à analyser son utilisation afin de l\'optimiser. Ces prestataires, qu\'il s\'agisse de services d\'hébergement sécurisé, de solutions infonuagiques ou d\'outils d\'analytique, agissent conformément à des ententes contractuelles qui assurent un niveau de protection de vos renseignements équivalent à celui que nous appliquons nous-mêmes.\n\nLorsque vous effectuez un paiement pour un abonnement via Queen de Q, vos informations bancaires et de carte de crédit sont directement collectées et traitées par nos prestataires de paiement, tels que Stripe et Square. Ces fournisseurs sont seuls responsables du traitement sécurisé de vos transactions, conformément à leurs propres politiques de confidentialité, sur lesquelles nous n\'exerçons aucun contrôle. Nous n\'avons donc pas accès à vos données bancaires complètes et ne saurions être tenus responsables de la manière dont ces prestataires recueillent, utilisent ou divulguent vos renseignements. Nous vous invitons à consulter leurs politiques de confidentialité pour comprendre comment vos informations sont protégées pendant le processus de paiement.\n\nNous pouvons également être tenus de communiquer certains renseignements aux autorités compétentes si la loi l\'exige, notamment pour prévenir ou détecter des fraudes, répondre à une injonction ou respecter toute autre obligation légale applicable.\n\nIl est possible que vos données soient transférées à l\'extérieur du Québec, notamment lorsque nos fournisseurs ou leurs serveurs sont situés hors province. Dans ce cas, nous nous assurons que ces transferts respectent les exigences de la Loi sur la protection des renseignements personnels dans le secteur privé (Québec).\n\nEnfin, nous ne vendons jamais vos renseignements personnels à des tiers.',
    'privacy.section5.title': 'Comment protégeons-nous vos renseignements personnels?',
    'privacy.section5.content': 'La protection de vos données nous tient à cœur. Queen de Q s\'assure de protéger les renseignements personnels qui sont sous son contrôle, que ce soit lors de leur transmission qu\'une fois reçus. Elle maintient des mesures de sécurité matérielles, électroniques et organisationnelles appropriées pour protéger ces renseignements personnels contre une destruction accidentelle ou non conforme aux lois, une perte accidentelle, une modification, une divulgation ou un accès non autorisé, un mauvais usage ou toute autre forme illégale de traitement.\n\nQueen de Q a pris des mesures raisonnables pour garantir que seuls les membres du personnel soumis à un devoir de confidentialité et qui ont besoin de connaître vos renseignements personnels dans le cadre de leurs fonctions y auront accès.\n\nToutefois, Queen de Q ne peut garantir que de tels renseignements ne seront pas consultés, obtenus, divulgués, modifiés ou détruits par suite de la violation de ses mesures de sécurité matérielles, électroniques et organisationnelles. Si vous avez des raisons de croire que des renseignements personnels ont été compromis, veuillez communiquer avec Queen de Q aux coordonnées indiquées à la section « Nous contacter » de cette politique.',
    'privacy.section6.title': 'Combien de temps conservons-nous vos données?',
    'privacy.section6.content': 'Nous conservons vos renseignements personnels uniquement pour la durée nécessaire à la réalisation des fins pour lesquelles ils ont été recueillis, ou pour nous conformer à nos obligations légales. Par la suite, lorsqu\'aucun motif raisonnable ne justifie la conservation de vos renseignements personnels, vos données seront détruites ou anonymisées de manière sécuritaire.',
    'privacy.section7.title': 'Vos droits',
    'privacy.section7.rights': '• Le droit d\'accéder aux données que nous détenons sur vous;\n• Le droit de corriger tout renseignement inexact, incomplet ou équivoque;\n• Le droit de retirer votre consentement à l\'utilisation de vos données, sous réserve des obligations légales ou contractuelles;\n• Le droit de demander la portabilité de certaines de vos données dans un format technologique structuré.\n\nPour exercer l\'un de ces droits, il suffit de nous écrire (voir section « Nous contacter »). Nous pourrions vous demander de prouver votre identité pour protéger vos renseignements.',
    'privacy.section8.title': 'Nous contacter',
    'privacy.section8.content': 'Le responsable de la protection des renseignements personnels veille à assurer le respect et la mise en œuvre de la Loi sur la protection des renseignements personnels dans le secteur privé au sein de Queen de Q.\n\nPour toute question ou commentaire en lien avec la présente politique, pour rapporter un incident de confidentialité ayant été observé ou pour toute demande d\'information en lien avec vos renseignements personnels, incluant les demandes d\'accès, les demandes de rectification, nous vous invitons à communiquer avec notre Responsable de la protection des renseignements personnels :',
    'privacy.section8.contact.email': 'Par courriel',
    'privacy.section8.contact.mail': 'ou par courrier',
    'privacy.section9.title': 'Mise à jour',
    'privacy.section9.content': 'Nous nous réservons le droit de modifier le contenu de la présente politique afin de satisfaire aux exigences de droit applicables. Nous vous invitons à prendre connaissance de la présente politique fréquemment afin de demeurer informé de la façon dont nous traitons vos renseignements personnels.\n\nNous souhaitons demeurer transparents envers nos utilisateurs. En cas de modifications importantes de notre politique, un avis de mise à jour pourra vous être publié sur notre site web afin de vous informer de ces changements.',
    'privacy.section10.title': 'Règles d\'interprétation',
    'privacy.section10.content': 'Les exemples illustrant un fait donné ou une disposition particulière de la présente politique ne constituent pas une limite à la portée généralement accordée à l\'interprétation de la présente politique.\n\nL\'invalidité d\'une disposition de la présente politique n\'affecte aucunement la validité des autres dispositions. Le fait que nous n\'appliquons pas une disposition de la présente politique, en tout ou en partie, ne constitue pas une renonciation à notre droit de le faire ultérieurement. Notre approbation de votre inscription à notre site Internet ne doit pas être interprété comme la validation de la véracité ou de l\'exactitude des renseignements que vous nous fournissez.',
    
    // Terms of Service
    'terms.title': 'Conditions générales d\'utilisation de Queen de Q',
    'terms.version': 'Version en vigueur à compter du 15 juillet 2025',
    'terms.section1.title': 'Acceptation des conditions',
    'terms.section1.content': 'Bienvenue sur la plateforme Queen de Q accessible via notre site web et notre application mobile (la « Plateforme »), exploités par 9540-9520 Québec Inc. (Gestion Reines), ayant son siège social au 275 avenue de Dieppe, Saint-Hyacinthe (Québec) J2S 6Z7.\n\nEn visitant, naviguant ou utilisant la Plateforme ou en vous abonnant à nos services (les « Services »), vous acceptez d\'être lié par les présentes conditions générales d\'utilisation (les « CGU ») ainsi que par notre Politique de Confidentialité. Si vous n\'acceptez pas ces CGU, veuillez ne pas utiliser la Plateforme.\n\nNous nous réservons le droit de modifier ces CGU à tout moment, sans préavis. Toute modification sera affichée sur la Plateforme avec la date de la dernière mise à jour. Votre utilisation continue des Services constitue une acceptation des modifications.',
    'terms.section2.title': 'Utilisation et code de conduite',
    'terms.section2.content': '2.1. Obligations générales\n\nEn utilisant la Plateforme, vous vous engagez à :',
    'terms.section2.subsections': '• respecter toutes les lois locales, provinciales, nationales et internationales applicables • ne pas violer les droits de propriété intellectuelle de Queen de Q ou de tiers • ne pas utiliser la Plateforme pour propager du spam ou tout autre contenu non sollicité • ne pas introduire de virus, logiciels malveillants ou tout autre code nuisible • ne pas contourner les mesures techniques mises en place pour protéger la Plateforme • ne pas usurper l\'identité de toute personne, y compris nos employés ou représentants • ne pas harceler, menacer ou abuser d\'autres utilisateurs ou membres de la communauté • ne pas publier de contenu diffamatoire, obscène, menaçant ou portant atteinte à la vie privée ou aux droits d\'autrui',
    'terms.section3.title': 'Création et gestion de votre compte',
    'terms.section3.content': '3.1. Inscription\n\nPour accéder à certaines fonctionnalités, vous devez créer un compte en fournissant des informations exactes, complètes et à jour. Vous êtes responsable de l\'actualisation de ces informations.\n\n3.2. Sécurité\n\nVous êtes responsable de la confidentialité de votre mot de passe et de votre compte. Toute activité effectuée via votre compte est réputée être la vôtre. Si vous soupçonnez une utilisation non autorisée, veuillez nous contacter immédiatement à gestionreines@gmail.com.\n\n3.3. Âge minimum\n\nVous devez avoir au moins 18 ans ou l\'âge légal dans votre province/pays pour créer un compte.',
    'terms.section4.title': 'Règles de la communauté et du cercle sororal',
    'terms.section4.content': 'Certaines fonctionnalités des Services, notamment le cercle sororal, vous permettent d\'interagir et de partager du contenu avec d\'autres utilisatrices. En participant à ces espaces, vous vous engagez à :',
    'terms.section4.subsections': '• Respecter la confidentialité : Les échanges au sein de la communauté sont confidentiels. Il est interdit de partager les publications ou informations personnelles d\'autres membres en dehors de la Plateforme. • Ne pas donner de conseils professionnels : Vous vous engagez à ne pas offrir de conseils médicaux, psychologiques, juridiques ou financiers dans ces espaces. • Reconnaître que Queen de Q n\'est pas responsable : Queen de Q ne contrôle pas systématiquement le contenu publié par les utilisateurs et n\'endosse ni ne garantit les opinions, récits ou conseils partagés. Vos interactions avec les autres membres se font sous votre entière responsabilité. • Notre droit de modération : Nous nous réservons le droit, sans y être tenus, de surveiller, modérer ou supprimer tout contenu, et de suspendre ou bannir tout utilisateur qui ne respecterait pas l\'esprit de bienveillance et les règles de la communauté.',
    'terms.section5.title': 'Boutique et événements',
    'terms.section5.content': '5.1. Achats sur la boutique\n\nLa Plateforme peut vous permettre d\'accéder à des boutiques de produits dérivés, exploitées par des tiers (par exemple Redbubble). Lorsque vous effectuez un achat auprès de ces boutiques tierces, la transaction est exclusivement régie par les conditions générales et la politique de confidentialité du tiers concerné. Nous n\'intervenons pas dans la relation contractuelle et déclinons toute responsabilité quant à l\'exécution, la livraison ou la qualité des produits achetés auprès de ces partenaires externes.\n\nPour les produits ou services que vous achetez directement auprès de Queen de Q, les conditions applicables (notamment prix, taxes, délais de livraison et politique de retour) seront précisées au moment de la commande. En procédant à l\'achat, vous acceptez ces conditions spécifiques.',
    'terms.section5.subsections': '• 5.2. Inscription aux événements : Nous pouvons proposer des événements virtuels ou en présentiel, tels que des ateliers, cercles de parole, rencontres communautaires ou tournées. Chaque événement sera soumis à des conditions spécifiques qui vous seront communiquées lors de l\'inscription. Votre participation vaut acceptation de ces conditions ainsi que du code de conduite applicable. • Queen de Q se réserve le droit de modifier, reporter ou annuler un événement, sans préavis ni obligation de dédommagement, notamment pour des raisons organisationnelles, sanitaires ou de sécurité.',
    'terms.section6.title': 'Services, plans et frais',
    'terms.section6.content': '6.1. Abonnements\n\nQueen de Q propose des Services gratuits et des Services payants. Les abonnements payants donnent accès à des fonctionnalités premium, détaillées sur la Plateforme. Les Services et ces abonnements sont strictement réservés à un usage personnel et non commercial.\n\nEn souscrivant à un abonnement payant, vous acceptez de payer les frais applicables au début de chaque période d\'abonnement. Vous nous autorisez, ainsi que nos partenaires chargés du traitement de paiement (par exemple : Paypal, Stripe, Apple Pay, ou autres), à débiter périodiquement le moyen de paiement que vous avez enregistré pour tous les montants dus.',
    'terms.section6.subsections': '• 6.2. Renouvellement automatique : Pour votre commodité, et sauf annulation de votre part, tous les abonnements payants sont automatiquement renouvelés pour des périodes successives de même durée. Les frais de renouvellement seront facturés au tarif alors en vigueur. Vous pouvez désactiver le renouvellement automatique à tout moment depuis les paramètres de votre compte. Votre accès aux Services premium se poursuivra jusqu\'à la fin de la période déjà payée. • 6.3. Modification des tarifs : Queen de Q se réserve le droit de modifier ses prix, d\'introduire de nouveaux frais ou d\'ajuster les modalités de paiement, avec un préavis raisonnable de 45 jours. Ces changements prendront effet à la prochaine période de facturation. La poursuite de votre utilisation après l\'entrée en vigueur des nouveaux tarifs constituera votre acceptation de ceux-ci. • 6.4. Politique de remboursement : Sauf indication contraire sur la Plateforme ou obligation légale spécifique, tous les frais payés sont non remboursables. Toutefois, Queen de Q peut à sa discrétion examiner certaines demandes, notamment en cas de problèmes techniques majeurs ou d\'inaccessibilité prolongée des Services. Pour soumettre une requête, contactez-nous à gestionreines@gmail.com en détaillant la situation. • 6.5. Annulation : Vous pouvez annuler votre abonnement à tout moment depuis les paramètres de votre compte.',
    'terms.section7.title': 'Propriété intellectuelle',
    'terms.section7.content': '7.1. Droits de propriété\n\nTout le contenu des Services, ainsi que leur conception et organisation, incluant sans limitation les marques, identifiant graphique, logos, photographies, vidéos, éléments audio (exemple : la voix de la Reine-Mère), images, textes, prompt système, instructions système, code source, et le code informatique utilisé pour opérer et présenter les Services, sont la propriété exclusive de Queen de Q ou font l\'objet de licences accordées à Queen de Q.',
    'terms.section7.subsections': '• Sauf autorisation explicite de Queen de Q, ou sauf lorsque cela est explicitement permis par les fonctionnalités des Services ou par les présentes CGU, vous vous engagez à ne pas copier, reproduire, distribuer, transmettre, afficher, vendre, licencier, décompiler, modifier, créer des œuvres dérivées, ou exploiter de quelque manière que ce soit, en tout ou en partie, ces contenus ou toute mise en page des Services. • Toute utilisation non autorisée du contenu ou des éléments visuels et techniques des Services peut constituer une violation des lois applicables, notamment des lois sur la propriété intellectuelle et peut entraîner des poursuites civiles ou pénales. Queen de Q se réserve le droit d\'exercer tout recours approprié pour protéger ses droits. • 7.2. Contenu utilisateur : Vous conservez les droits sur le contenu que vous créez ou soumettez via la Plateforme (« Contenu Utilisateur »). Vous nous accordez cependant une licence mondiale, gratuite et non exclusive pour utiliser ce contenu uniquement afin d\'opérer, promouvoir et améliorer nos Services. • 7.3. Rétroaction et suggestions : Si vous nous soumettez des idées, commentaires ou suggestions pour améliorer nos Services (« Contributions »), vous acceptez que ces Contributions deviennent notre propriété exclusive. Queen de Q pourra utiliser, reproduire, adapter, modifier, publier ou exploiter librement ces Contributions, sans restriction et sans aucune obligation de vous verser une compensation ou de vous attribuer un crédit.',
    'terms.section8.title': 'Interruption et modifications des services',
    'terms.section8.content': 'Queen de Q se réserve le droit de modifier, suspendre ou interrompre tout ou partie des Services et de la Plateforme, à tout moment, sans préavis et sans engager sa responsabilité.\n\nNous mettrons tout en œuvre pour minimiser les interruptions, mais celles-ci peuvent survenir pour maintenance ou mise à jour.',
    'terms.section9.title': 'Liens vers des tiers, références et professionnels',
    'terms.section9.content': 'La Plateforme peut contenir des liens vers des sites ou services tiers. Queen de Q ne contrôle pas ces sites et décline toute responsabilité quant à leur contenu, sécurité ou pratiques. Votre accès à ces sites se fait à vos propres risques. Queen de Q ne fait aucune réclamation et ne donne aucune garantie quant au contenu des sites web ou des services auxquels elle fournit un lien, ou quant aux produits ou services disponibles sur ces sites web ou aux tiers qui exploitent ces sites web.',
    'terms.section10.title': 'Absence de garanties médicales et utilisation à vos risques',
    'terms.section10.content': '10.1. Pas de services médicaux\n\nVous reconnaissez et acceptez expressément que Queen de Q n\'est pas un prestataire de services de santé, ni un établissement médical ou psychothérapeutique. Queen de Q ne garantit en aucun cas que l\'utilisation des Services permettra de prévenir, diagnostiquer ou guérir quelque condition médicale ou psychologique que ce soit. Vous reconnaissez également que les dirigeants, employés et collaborateurs de Queen de Q ne sont pas des professionnels de la santé ni des psychothérapeutes agréés, et ne sont donc pas habilités à fournir un avis médical, un diagnostic ou un traitement professionnel. En conséquence, les informations mises à disposition ne sauraient en aucun cas se substituer à l\'avis, le diagnostic ou le traitement d\'un professionnel qualifié, tel qu\'un médecin, un psychiatre, un psychologue, un psychothérapeute ou tout autre spécialiste de la santé mentale ou physique.',
    'terms.section10.subsections': '• 10.2. Divertissement et exploration personnelle : Les contenus proposés dans l\'application Queen de Q, qu\'ils soient textuels, audio ou visuels, sont construits sur des archétypes et des métaphores. Ils visent à offrir une expérience d\'exploration introspective et créative. Les Services sont fournis uniquement à des fins de divertissement. Vous comprenez et acceptez que toute décision que vous prenez en vous basant sur des contenus ou fonctionnalités proposés par Queen de Q relève exclusivement de votre responsabilité. • 10.3. Avertissement en matière de santé mentale : Si vous ressentez une instabilité émotionnelle, des symptômes pouvant nécessiter une attention médicale, ou si vous avez le moindre doute concernant votre santé mentale, nous vous recommandons vivement de suspendre votre utilisation des Services et de consulter sans délai un professionnel de la santé qualifié. Queen de Q décline toute responsabilité quant à l\'usage des Services dans de telles situations et recommande expressément de consulter un médecin, un psychologue ou tout autre spécialiste qualifié. • 10.4. Interactions avec la Reine-Mère (robot conversationnel) : Vous reconnaissez que le personnage de la « Reine-Mère » est une fonctionnalité de divertissement animée par un outil conversationnel automatisé. Ses réponses sont générées par des algorithmes, sans aucune conscience ou connaissance de votre situation personnelle. En raison de cette nature automatisée, ses réponses peuvent être inexactes, incomplètes ou inappropriées.',
    'terms.section11.title': 'Absence de garanties générales',
    'terms.section11.content': 'Vous comprenez et acceptez que votre utilisation des Services se fait à vos propres risques. Les Services sont fournis « tels quels » et « selon leur disponibilité ». Par conséquent, Queen de Q renonce explicitement à toute forme de garantie, qu\'elle soit expresse ou implicite, y compris, mais sans s\'y limiter, les garanties implicites de qualité marchande. Nous ne faisons aucune déclaration ni ne garantissons que les Services fonctionnent de manière ininterrompue, sécurisée ou exempte d\'erreurs ou que les résultats obtenus par votre utilisation correspondront à vos objectifs ou attentes personnels.',
    'terms.section12.title': 'Limitation de responsabilité',
    'terms.section12.content': '12.1. Aucune responsabilité indirecte\n\nDans la mesure permise par la loi, Queen de Q, ainsi que ses dirigeants, actionnaires, employés, agents, partenaires et fournisseurs, ne pourront en aucun cas être tenus responsables de tout dommage indirect, accessoire, spécial, consécutif, exemplaire ou punitif (y compris perte de revenus, de données, d\'exploitation, ou tout autre préjudice financier ou moral) découlant de votre utilisation ou incapacité à utiliser les Services, même si Queen de Q a été informée de la possibilité de tels dommages.',
    'terms.section13.title': 'Indemnisation',
    'terms.section13.content': 'Vous acceptez de défendre, d\'indemniser et de dégager de toute responsabilité Queen de Q et ses représentants contre toute réclamation, perte, dépense, dommage ou responsabilité (y compris les honoraires d\'avocat raisonnables) découlant de ou lié à : (a) votre utilisation de la Plateforme ou des Services, (b) votre violation de l\'une de ces CGU, ou (c) votre violation des droits d\'un tiers, y compris les droits de propriété intellectuelle ou tout droit à la vie privée.',
    'terms.section14.title': 'Résiliation des CGU et fermeture du compte',
    'terms.section14.content': 'Vous pouvez cesser d\'utiliser nos Services et fermer votre compte à tout moment.',
    'terms.section14.subsections': '• Nous nous réservons le droit de suspendre ou de résilier votre accès aux Services, à notre seule discrétion et sans préavis, si nous estimons raisonnablement que vous avez enfreint ces CGU ou que votre conduite est préjudiciable à notre communauté ou à nos intérêts commerciaux. • La résiliation ou suppression de votre compte, volontaire ou par Queen de Q pour violation des présentes CGU, n\'ouvrira droit à aucun remboursement des montants déjà payés, sauf disposition contraire prévue par la loi. • Les dispositions qui, de par leur nature, doivent survivre à la résiliation ou suppression de votre compte, volontaire ou par Queen de Q, (telles que la propriété intellectuelle, les limitations de responsabilité et l\'indemnisation) resteront en vigueur.',
    'terms.section15.title': 'Modification des CGU',
    'terms.section15.content': 'Queen de Q peut être amenée à modifier les présentes CGU pour des raisons légales, réglementaires, techniques ou commerciales. Toute version mise à jour sera publiée sur la Plateforme avec indication de la date d\'entrée en vigueur.\n\nNous vous invitons à consulter régulièrement cette section pour rester informé des éventuelles évolutions. Votre utilisation continue des Services après l\'entrée en vigueur des nouvelles CGU vaudra acceptation de celles-ci.',
    'terms.section16.title': 'Lois applicables et juridiction compétente',
    'terms.section16.content': 'Les présentes CGU, ainsi que tout litige qui pourrait en découler, sont régis et interprétés conformément aux lois en vigueur dans la province de Québec et aux lois fédérales canadiennes qui s\'y appliquent.\n\nTout différend lié aux CGU ou à l\'utilisation de la Plateforme ou des Services sera soumis à la compétence exclusive des tribunaux situés dans le district judiciaire de Saint-Hyacinthe, Québec (Canada).',
    'terms.section17.title': 'Dispositions diverses',
    'terms.section17.content': '17.1. Intégralité de l\'entente\n\nCes CGU, accompagnées de notre Politique de Confidentialité, constituent l\'intégralité de l\'accord entre vous et Queen de Q concernant votre accès et votre utilisation des Services, et remplacent tout accord antérieur, écrit ou oral, sur le même objet.',
    'terms.section17.subsections': '• 17.2. Force majeure : Queen de Q ne pourra être tenue responsable d\'un manquement à ses obligations lorsque celui-ci résulte d\'un événement indépendant de sa volonté, tel qu\'un cas de force majeure, une catastrophe naturelle, une panne d\'infrastructure ou une interruption des réseaux de télécommunications. • 17.3. Divisibilité : Si l\'une quelconque des dispositions des présentes CGU devait être jugée invalide ou inapplicable par un tribunal compétent, les autres dispositions resteront pleinement en vigueur, et la disposition invalide sera réputée remplacée par une clause valide reflétant autant que possible l\'intention initiale. • 17.4. Titres : Les titres et sous-titres des articles sont insérés uniquement pour en faciliter la lecture et n\'ont pas de valeur contractuelle. • 17.5. Règles d\'interprétation : À titre informatif, le singulier comprend le pluriel et vice versa, le masculin comprend le féminin et vice versa, et tout terme désignant une personne comprend également, le cas échéant, une référence aux personnes morales.',
    'terms.section18.title': 'Contact',
    'terms.section18.content': 'Pour toute question, remarque ou réclamation concernant les Services ou les présentes CGU, vous pouvez nous contacter aux coordonnées suivantes :\n\ngestionreines@gmail.com\nou par courrier à :\n9540-9520 Québec Inc.\nÀ l\'attention du Responsable de la protection des renseignements personnels\n275, avenue de Dieppe\nSaint-Hyacinthe (Québec) J2S 6Z7, Canada',
  };

// Context
interface TranslationContextType {
  t: (key: TranslationKey, variables?: Record<string, any>) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Provider
interface TranslationProviderProps {
  children: ReactNode;
}

export function TranslationProvider({ children }: TranslationProviderProps) {
  // Translation function
  const t = (key: TranslationKey, variables?: Record<string, any>): string => {
    let translation = translations[key] || String(key);
    
    // Replace variables in translation
    if (variables) {
      Object.entries(variables).forEach(([variable, value]) => {
        translation = translation.replace(`{${variable}}`, String(value));
      });
    }
    
    return translation;
  };

  return (
    <TranslationContext.Provider value={{ t }}>
      {children}
    </TranslationContext.Provider>
  );
}

// Hook
export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
