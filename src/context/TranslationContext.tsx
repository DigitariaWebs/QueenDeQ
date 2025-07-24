import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Types
type Language = 'fr' | 'en';

// Translations data
const translations = {
  fr: {
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
    'shop.subtitle': 'Les produits qui vont réveiller votre Reine intérieure',
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
    'shop.items.physicalCards.description': 'Découvrez les archétypes masculins avec notre jeu de cartes physique premium',
    'shop.items.queenShirt.name': 'T-Shirt "Je suis une Queen"',
    'shop.items.queenShirt.description': 'Portez votre couronne avec fierté dans ce t-shirt 100% coton bio',
    'shop.items.protectionKit.name': 'Kit de Protection Royale',
    'shop.items.protectionKit.description': 'Condoms premium et accessoires pour queens qui se respectent',
    'shop.items.charmBracelet.name': 'Bracelet Anti-2 de Pique',
    'shop.items.charmBracelet.description': 'Charme symbolique pour attirer les bonnes énergies masculines',
    'shop.addToCart': 'Ajouter au panier',
    'shop.comingSoon': 'Bientôt',
    'shop.awakeningTitle': 'La Boutique s\'Éveille',
    'shop.awakeningDesc': 'Notre collection exclusive arrive bientôt avec des produits authentiques Queen de Q. Restez connectées pour les premières révélations !',
    'shop.noProducts': 'Aucun produit trouvé',
    'shop.noProductsDesc': 'Essayez de modifier vos filtres pour découvrir plus de produits.',
    
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
    'chat.awakeningMessage': 'Elle apprend chaque jour à mieux vous comprendre et vous accompagner dans vos réflexions sur les archétypes masculins.',
    'chat.patience': '☕ "Patience ma chérie, le thé de l\'après-midi sera bientôt prêt..."',
    'chat.exploreJournal': 'En attendant, explorez vos patterns dans votre journal personnel ! 📝',
    'chat.evolving': '🌱 Reine-Mère est en pleine évolution !',
    'chat.placeholder': 'Tapez votre message...',
    'chat.betaNote': 'P.S. Je m\'améliore chaque jour pour mieux vous comprendre... Cette version beta me permet d\'apprendre vos besoins ! Bientôt, nos conversations seront encore plus riches. 💫',
    
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
    'cards.cabinet.item2.title': 'Queen de Q – Le livre',
    'cards.cabinet.item2.desc': 'Procure-toi la version numérique ou imprimée du livre Queen de Q, un outil pour aller plus loin dans l\'exploration des patterns amoureux.',
    'cards.cabinet.item3.title': 'La Boutique',
    'cards.cabinet.item3.desc': 'Affiche ta Reine intérieure grâce à nos produits dérivés et surveille les drops de merch exclusive à venir!',

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
    'privacy.section1.content': '9540-9520 Québec Inc. ("Gestion Reines Inc.", "we", "our" or "Queen de Q") places the utmost importance on protecting your privacy and the confidentiality of your personal information. This policy aims to explain how we collect, use, store, share and protect your personal information, that is, any information that allows you to be identified directly or indirectly, when you use the Queen de Q application and services or visit our website: www.queendeq.com.\n\nThis policy complies with the Act respecting the protection of personal information in the private sector (Quebec) and other applicable laws.',
    'privacy.section2.title': 'What personal information do we collect?',
    'privacy.section2.content': 'When you use the Queen de Q application or browse its website, we collect different types of personal information, depending on how you interact with our services.\n\nWe first collect identification and profile data that allows us to create and manage your account and adapt content to your situation. This includes your first name, last name, email address, country or province of residence, as well as your age, to confirm your eligibility and meet applicable legal obligations.\n\nWe also collect technical data automatically generated during your navigation, such as your IP address, information about your device (type, operating system, language) and data related to your interactions with the platform (pages visited, session duration, saved preferences). We also use cookies and similar identifiers to improve your experience and perform certain analyses, with your consent when required.',
    'privacy.section3.title': 'For what purposes do we use your personal information?',
    'privacy.section3.purposes': '• to allow you to access your account and application features • to manage your preferences and personalize your experience according to chosen modules and archetypes • to send you communications related to our services, including reminders, updates and invitations • to offer you, with your consent, promotional content • to answer your questions and support requests • to ensure platform security, prevent fraud and manage our internal operations • to perform statistical analyses to improve our services • and to comply with our legal and regulatory obligations.',
    'privacy.section3.additional': 'We will never use your personal information for purposes other than those mentioned in this policy without informing you in advance and, when required by law, obtaining your consent.',
    'privacy.section4.title': 'Do we share your personal information?',
    'privacy.section4.content': 'Your personal information may be disclosed to third parties in the normal course of our activities, but always in a controlled manner and with respect for their confidentiality. We never sell your personal information to third parties.',
    'privacy.section5.title': 'How do we protect your personal information?',
    'privacy.section5.content': 'The protection of your data is important to us. Queen de Q ensures the protection of personal information under its control, both during transmission and once received. It maintains appropriate physical, electronic and organizational security measures to protect this personal information.',
    'privacy.section6.title': 'How long do we keep your data?',
    'privacy.section6.content': 'We retain your personal information only for the time necessary to achieve the purposes for which it was collected, or to comply with our legal obligations. Subsequently, when no reasonable grounds justify the retention of your personal information, your data will be securely destroyed or anonymized.',
    'privacy.section7.title': 'Your rights',
    'privacy.section7.rights': '• The right to access the data we hold about you • The right to correct any inaccurate, incomplete or ambiguous information • The right to withdraw your consent to the use of your data, subject to legal or contractual obligations • The right to request the portability of certain of your data in a structured technological format',
    'privacy.section8.title': 'Contact us',
    'privacy.section8.content': 'The personal information protection officer ensures compliance with and implementation of the Act respecting the protection of personal information in the private sector within Queen de Q.',
    'privacy.section8.contact.email': 'By email',
    'privacy.section8.contact.mail': 'By mail',
    'privacy.section9.title': 'Updates',
    'privacy.section9.content': 'We reserve the right to modify the content of this policy to meet applicable legal requirements. We invite you to review this policy frequently to stay informed about how we handle your personal information.',
    'privacy.section10.title': 'Rules of interpretation',
    'privacy.section10.content': 'For information purposes, the singular includes the plural and vice versa, the masculine includes the feminine and vice versa, and any term designating a person also includes, where applicable, a reference to legal persons.',
    
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
    // ... Add all other sections similarly ...
    'terms.section18.title': 'Contact',
    'terms.section18.content': 'Pour toute question, remarque ou réclamation concernant les Services ou les présentes CGU, vous pouvez nous contacter aux coordonnées suivantes :\n\ngestionreines@gmail.com\nou par courrier à :\n9540-9520 Québec Inc.\nÀ l\'attention du Responsable de la protection des renseignements personnels\n275, avenue de Dieppe\nSaint-Hyacinthe (Québec) J2S 6Z7, Canada',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.cards': 'The Cabinet of Curiosities',
    'nav.apropos': 'About',
    'nav.application': 'The Application',
    'nav.quiz': 'Your Inner Queen',
    'nav.chat': 'Tea Room',
    'nav.journal': 'Royal Journal',
    'nav.shop': 'Royal Boutique',
    
    // Shop - Updated for new products
    'shop.title': 'Queen de Q Boutique',
    'shop.subtitle': 'Products that will awaken your inner Queen',
    'shop.search': 'Search for a product...',
    'shop.categories.all': 'All',
    'shop.categories.cards': 'Cards',
    'shop.categories.clothing': 'Clothing',
    'shop.categories.protection': 'Protection',
    'shop.categories.accessories': 'Accessories',
    'shop.priceRanges.all': 'All Prices',
    'shop.priceRanges.low': '$0 - $50 CAD',
    'shop.priceRanges.medium': '$50 - $100 CAD',
    'shop.priceRanges.high': '$100+ CAD',
    'shop.badges.bestseller': 'Bestseller',
    'shop.badges.limitedEdition': 'Limited Edition',
    'shop.badges.essential': 'Essential',
    'shop.badges.handcrafted': 'Handcrafted',
    // Shop products - Real products
    'shop.items.physicalCards.name': 'Queen de Q Card Deck • Physical Edition',
    'shop.items.physicalCards.description': 'Discover masculine archetypes with our premium physical card deck',
    'shop.items.queenShirt.name': 'T-Shirt "I am a Queen"',
    'shop.items.queenShirt.description': 'Wear your crown with pride in this 100% organic cotton t-shirt',
    'shop.items.protectionKit.name': 'Royal Protection Kit',
    'shop.items.protectionKit.description': 'Premium condoms and accessories for queens who respect themselves',
    'shop.items.charmBracelet.name': 'Anti-2 of Spades Bracelet',
    'shop.items.charmBracelet.description': 'Symbolic charm to attract positive masculine energies',
    'shop.addToCart': 'Add to Cart',
    'shop.comingSoon': 'Coming Soon',
    'shop.awakeningTitle': 'The Shop Awakens',
    'shop.awakeningDesc': 'Our exclusive collection is coming soon with authentic Queen de Q products. Stay connected for the first revelations!',
    'shop.noProducts': 'No products found',
    'shop.noProductsDesc': 'Try modifying your filters to discover more products.',
    
    // Chat - Updated for grandmother persona
    'chat.title': 'Tea Salon with Queen Mother',
    'chat.queenMother': 'Queen Mother',
    'chat.reineMere': 'Queen Mother',
    'chat.online': 'Online',
    'chat.greeting': 'Hello my dear... 👵🏻',
    'chat.welcome': 'Come have tea with me!',
    'chat.welcomeMessage': 'Hello my dear! Come sit down, I\'ve prepared tea and small cakes. We\'ll talk about these masculine archetypes... 👵🏻☕',
    'chat.complicitMessage': 'You know, I\'ve seen so many men in my life! Manipulators, protectors, immature ones... I\'ll help you recognize them my dear.',
    'chat.teaTimeMessage': 'Soon, we\'ll be able to chat live over a good cup of tea. Meanwhile, go explore your patterns in your journal! 💕',
    'chat.comingSoon': 'Coming soon...',
    'chat.teaTime': 'Afternoon tea coming soon...',
    'chat.teaTimeAvailable': 'Tea will be ready soon...',
    'chat.inputPlaceholder': 'Write your message... (coming soon)',
    'chat.typing': 'Queen Mother typing...',
    'chat.sendDisabled': 'Send message (unavailable)',
    'chat.description': 'Chat window with Queen Mother, currently unavailable',
    'chat.timestamp1': '14:32',
    'chat.timestamp2': '14:33',
    'chat.timestamp3': '14:35',
    'chat.beta': 'BETA VERSION',
    'chat.awakeningTitle': 'Queen Mother awakens...',
    'chat.awakeningMessage': 'She learns every day to better understand and accompany you in your reflections on masculine archetypes.',
    'chat.patience': '☕ "Patience my dear, afternoon tea will be ready soon..."',
    'chat.exploreJournal': 'In the meantime, explore your patterns in your personal journal! 📝',
    'chat.evolving': '🌱 Queen Mother is evolving!',
    'chat.placeholder': 'Type your message...',
    'chat.betaNote': 'P.S. I improve every day to better understand you... This beta version allows me to learn your needs! Soon, our conversations will be even richer. 💫',
    
    // Journal - Updated for masculine archetypes focus
    'journal.title': 'Introspection Journal',
    'journal.subtitle': 'Write your reflections on the masculine archetypes you attract',
    'journal.newEntry': 'Write a new reflection',
    'journal.entryTitle': 'Title of your reflection',
    'journal.titlePlaceholder': 'Ex: My reflection on the King of Hearts...',
    'journal.archetype': 'Discovered archetype',
    'journal.optional': 'optional',
    'journal.archetypePlaceholder': 'Ex: King of Hearts - The Protector',
    'journal.mood': 'Current mood',
    'journal.moodPositive': 'Positive',
    'journal.moodNeutral': 'Neutral',
    'journal.moodReflective': 'Reflective',
    'journal.moodMelancholic': 'Melancholic',
    'journal.reflection': 'Your reflection',
    'journal.contentPlaceholder': 'Describe what this archetype reveals about your attraction patterns...',
    'journal.save': 'Save',
    'journal.cancel': 'Cancel',
    'journal.delete': 'Delete',
    'journal.noEntries': 'Your journal is empty',
    'journal.startWriting': 'Start writing your first reflections on masculine archetypes',
    'journal.saved': 'Saved ✨',
    'journal.confirmDelete': 'Delete this entry?',
    
    // Cards page
    'cards.title': 'Explore masculine archetypes',
    'cards.description': 'Discover the types of men you attract in your relationships',
    'cards.returnHome': 'Back to home',
    
    // Hero section
    'hero.title': 'Welcome to your kingdom, Queen!',
    'hero.subtitle': 'Understand your masculine attraction patterns',
    'hero.description': 'Discover the archetypes of men you attract and transform your romantic relationships.',
    'hero.spotsLeft': 'spots left',
    'hero.instruction': 'Click on the cards or press SPACE to discover an archetype',
    'hero.scrollText': 'Scroll to explore',
    'hero.cta': 'Discover my pattern',
    
    // Signup form
    'signup.title': 'Join Queen de Q',
    'signup.subtitle': 'Discover your attraction patterns',
    'signup.description': 'Understand the types of men you attract',
    'signup.name': 'Full name',
    'signup.email': 'Email address',
    'signup.emailPlaceholder': 'your@email.com',
    'signup.submit': 'I want my Queen de Q pass',
    'signup.close': 'Close',
    'signup.loading': 'Loading...',
    'signup.form.email': 'Email address',
    'signup.form.submit': 'I want my Queen de Q pass',
    
    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Everything you need to know to reign over your kingdom.',
    'faq.question1': 'How do masculine archetypes work?',
    'faq.answer1': 'Our system identifies patterns of men you usually attract in your relationships, based on traditional playing cards.',
    'faq.question2': 'How many archetypes are there?',
    'faq.answer2': 'There are 52 different masculine archetypes, each corresponding to a traditional card with its own characteristics.',
    'faq.question3': 'Can I attract different archetypes?',
    'faq.answer3': 'Yes, our patterns evolve over time. Understanding your current attractions helps you make more conscious choices.',
    'faq.question4': 'Is the 2 of Spades really problematic?',
    'faq.answer4': 'The 2 of Spades represents the solar manipulator. Understanding this pattern helps you identify and avoid it in your relationships.',
    'faq.question6': 'How to use Queen de Q daily?',
    'faq.answer6': 'Integrate the app into your routine as a moment of connection with yourself. Draw a card when you meet someone new, use the journal to note your observations about your patterns, and consult the Queen Mother when you need advice or healing rituals. The app is designed to be both playful and deeply transformative.',
    
    // How it works
    'howItWorks.title': 'How it works',
    'howItWorks.subtitle': 'Discover your patterns in three steps',
    'howItWorks.step1.title': 'Draw',
    'howItWorks.step1.description': 'Draw a card to discover a masculine archetype and its characteristics.',
    'howItWorks.step1.backText': 'Each card reveals a different type of man you might attract.',
    'howItWorks.step2.title': 'Reflect',
    'howItWorks.step2.description': 'Use your journal to reflect on your personal attraction patterns.',
    'howItWorks.step2.backText': 'Introspection is key to understanding your romantic choices.',
    'howItWorks.step3.title': 'Share',
    'howItWorks.step3.description': 'Discuss your discoveries with Queen Mother over a complicit tea.',
    'howItWorks.step3.backText': 'Share your reflections in a benevolent and judgment-free space.',
    
    // Newsletter
    'newsletter.title': 'Join the Community',
    'newsletter.subtitle': 'Discover your masculine attraction patterns',
    'newsletter.description': 'Receive exclusive advice on relationships and masculine archetype analysis',
    'newsletter.placeholder': 'Your email address',
    'newsletter.button': 'I want my Queen de Q pass',
    'newsletter.loading': 'Registration in progress...',
    'newsletter.success.title': 'Welcome to the Community!',
    'newsletter.success.subtitle': 'You will receive exclusive advice on your attraction patterns.',
    'newsletter.stats.souls': 'Women Supported',
    'newsletter.stats.archetypes': 'Masculine Archetypes',
    'newsletter.stats.transformations': 'Relationships Transformed',
    
    // Testimonials
    'testimonials.title': 'Women\'s Testimonials',
    'testimonials.subtitle': 'How other women have transformed their relationships',
    'testimonials.archetype': 'Pattern discovered',
    'testimonials.marie.name': 'Marie L.',
    'testimonials.marie.archetype': 'Attracted Manipulators',
    'testimonials.marie.text': 'Thanks to Queen de Q, I understood why I always attracted the same type of toxic man. Now I recognize red flags!',
    'testimonials.sophie.name': 'Sophie M.',
    'testimonials.sophie.archetype': 'Attracted Immature Men',
    'testimonials.sophie.text': 'I realized I attracted emotionally unavailable men. This awareness changed everything in my relationships.',
    'testimonials.clara.name': 'Clara D.',
    'testimonials.clara.archetype': 'Avoided Protectors',
    'testimonials.clara.text': 'I was running away from stable and loving men. Understanding this pattern helped me accept healthy love.',
    'testimonials.julie.name': 'Julie R.',
    'testimonials.julie.archetype': 'Attracted Narcissists',
    'testimonials.julie.text': 'I was always with men who only talked about themselves. Queen de Q opened my eyes to this destructive pattern.',
    'testimonials.camille.name': 'Camille S.',
    'testimonials.camille.archetype': 'Avoided Commitment',
    'testimonials.camille.text': 'I always sabotaged my serious relationships. Understanding my fears allowed me to build a stable relationship.',
    
    // Layout/Footer
    'footer.description': 'Understand your masculine attraction patterns and transform your romantic relationships.',
    'footer.navigation': 'Navigation',
    'footer.copyright': '© 2025 Queen de Q. All rights reserved.',
    'footer.contactForm.title': 'Contact us',
    'footer.contactForm.email': 'Your email',
    'footer.contactForm.message': 'Your message',
    'footer.contactForm.send': 'Send',
    'footer.privacyComingSoon': 'Privacy Policy',
    'footer.termsComingSoon': 'Terms of Service',
    
    // Card specific
    'card.deckLabel': 'Card deck – click to draw',
    'card.archetype': 'Archetype',
    'card.number': 'Archetype #',
    'card.aria': 'Card {name}, number {number}. Click to reveal.',
    'card.drawnCard': 'Drawn card',
    
    // Instructions
    'instructions.clickCards': 'Click on the cards or press',
    'instructions.pressSpace': 'Press',
    'instructions.spaceKey': 'SPACE',
    'instructions.toDiscover': 'to discover an archetype',
    'instructions.toReveal': 'to reveal an archetype',
    
    // Links
    'links.privacy': 'Privacy Policy',
    'links.terms': 'Terms of Service',
    'links.contact': 'Contact',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    
    // Accessibility
    'accessibility.menu': 'Menu',
    'accessibility.clickToDraw': 'Click to draw a card',
    'accessibility.cardDrawn': 'Card drawn',
    'accessibility.pressSpaceOrClick': 'Press Space or click to draw a card',
    'accessibility.photoOf': 'Photo of',
    'accessibility.closeChat': 'Close chat',
    'accessibility.messageInput': 'Message input unavailable',
    
    // Card names
    'cards.aceOfSpades': 'Ace of Spades',
    'cards.aceOfDiamonds': 'Ace of Diamonds',
    
    // Card deck
    'cardDeck.dealCard': 'Deal me a card ↗',
    'cardDeck.yourArchetype': 'Your Archetype',
    
    // Suits
    'suits.hearts': 'Hearts',
    'suits.spades': 'Spades',
    'suits.diamonds': 'Diamonds', 
    'suits.clubs': 'Clubs',
    'ranks.dame': 'Dame',
    'ranks.reine': 'Queen',
    'ranks.roi': 'King',
    'ranks.cavalier': 'Knight',
    
    // Live Tea Time
    'liveTeaTime.title': 'Live Tea Time',
    'liveTeaTime.date': 'Thursday July 24th at 7:00 PM',
    'liveTeaTime.reminder': 'Remind me',
    'liveTeaTime.close': 'Close banner',
    
    // Contact
    'contact.email': 'gestionreines@gmail.com',
    
    // Currency
    'currency.cad': 'CAD',
    
    // Quiz
    'quiz.title': 'Discover Your Inner Queen',
    'quiz.subtitle': 'A mystical journey through feminine archetypes',
    'quiz.question': 'Question',
    'quiz.of': 'of',
    'quiz.q1.text': 'What is your natural approach when facing a challenge?',
    'quiz.q1.hearts': 'I listen to my heart and emotions',
    'quiz.q1.spades': 'I strategically analyze the situation',
    'quiz.q1.diamonds': 'I focus on practical opportunities',
    'quiz.q1.clubs': 'I mobilize my creative energy',
    'quiz.q2.text': 'How do you express your personal power?',
    'quiz.q2.hearts': 'Through compassion and empathy',
    'quiz.q2.spades': 'Through wisdom and determination',
    'quiz.q2.diamonds': 'Through ambition and success',
    'quiz.q2.clubs': 'Through innovation and action',
    'quiz.q3.text': 'Which environment inspires you the most?',
    'quiz.q3.hearts': 'A warm home surrounded by love',
    'quiz.q3.spades': 'A space for reflection and wisdom',
    'quiz.q3.diamonds': 'A place of beauty and elegance',
    'quiz.q3.clubs': 'A creative workshop full of energy',
    'quiz.q4.text': 'How do you handle difficult relationships?',
    'quiz.q4.hearts': 'With patience and understanding',
    'quiz.q4.spades': 'With honesty and clear boundaries',
    'quiz.q4.diamonds': 'With diplomacy and intelligence',
    'quiz.q4.clubs': 'With passion and authenticity',
    'quiz.q5.text': 'What is your greatest strength?',
    'quiz.q5.hearts': 'My ability to love and nurture',
    'quiz.q5.spades': 'My wisdom and discernment',
    'quiz.q5.diamonds': 'My elegance and grace',
    'quiz.q5.clubs': 'My energy and creativity',
    'quiz.q6.text': 'How do you make important decisions?',
    'quiz.q6.hearts': 'By consulting my deep feelings',
    'quiz.q6.spades': 'By logically weighing pros and cons',
    'quiz.q6.diamonds': 'By evaluating long-term benefits',
    'quiz.q6.clubs': 'By following my creative instinct',
    'quiz.q7.text': 'What role do you naturally play in a group?',
    'quiz.q7.hearts': 'The nurturer who takes care of everyone',
    'quiz.q7.spades': 'The wise one who guides and advises',
    'quiz.q7.diamonds': 'The leader who inspires excellence',
    'quiz.q7.clubs': 'The innovator who brings new ideas',
    'quiz.q8.text': 'How do you recharge yourself?',
    'quiz.q8.hearts': 'By spending time with loved ones',
    'quiz.q8.spades': 'By meditating and connecting to my wisdom',
    'quiz.q8.diamonds': 'By surrounding myself with beauty and luxury',
    'quiz.q8.clubs': 'By exploring new creative projects',
    'quiz.results.hearts.title': 'Queen of Hearts - The Loving',
    'quiz.results.hearts.subtitle': 'The Energy of Unconditional Love',
    'quiz.results.hearts.description': 'You embody the power of love and compassion. Your strength lies in your ability to nurture and heal others.',
    'quiz.results.diamonds.title': 'Queen of Diamonds - The Elegant',
    'quiz.results.diamonds.subtitle': 'The Energy of Grace and Abundance',
    'quiz.results.diamonds.description': 'You radiate elegance and beauty. Your power lies in your ability to create harmony and abundance.',
    'quiz.results.spades.title': 'Queen of Spades - The Wise',
    'quiz.results.spades.subtitle': 'The Energy of Wisdom and Transformation',
    'quiz.results.spades.description': 'You embody deep wisdom and transformation. Your power lies in your ability to see beyond appearances.',
    'quiz.results.clubs.title': 'Queen of Clubs - The Creator',
    'quiz.results.clubs.subtitle': 'The Energy of Creativity and Action',
    'quiz.results.clubs.description': 'You embody creative energy and innovation. Your power lies in your ability to manifest your visions.',
    'quiz.results.powerLabel': 'Your Power',
    'quiz.results.shareTitle': 'I am a {title}!',
    'quiz.results.shareResult': 'Share my result',
    'quiz.results.joinKingdom': 'Join the Kingdom',
    'quiz.retakeQuiz': 'Retake Quiz',

    // About Page
    'about.title': 'About Us',
    'about.intro.subtitle': 'Queen de Q was born from a friendship...',
    'about.intro.p1': 'It all started after a few confidences were exchanged between two friends with hearts as vast as kingdoms. Karine, the Queen of Hearts, shines with her love for others, her disarming gentleness, and her ability to listen without judgment. Marie-Ève, the Queen of Diamonds, brings her passion, her organizational skills... and her biting humor that challenges conventional ideas.',
    'about.intro.p2': 'It was a friendship at first sight. An instinctive recognition between two women from different backgrounds, but driven by the same desire: to create meaning, support, and magic in the lives of other women. Together, they dreamed of a kingdom of their own—a safe and fun space, without curtsies or comparisons, where every woman could reconnect with her power, her creativity, her joy.',
    'about.intro.p3': 'From this alliance, Queen de Q was born, a gentle and impertinent, playful and thoughtful application, designed to help women "crown" themselves. Through daily rituals, inspiring reflections, mystical cards, and benevolent challenges, Queen de Q invites everyone to find their throne—the one that fits them, not the one that was imposed on them.',
    'about.intro.p4': 'Because we can rebuild ourselves while laughing. Because we can choose ourselves without apologizing. Because we are all Queens… in our own way.',
    'about.karine.title': 'Queen of Hearts',
    'about.karine.p1': 'For over twenty years, Karine held the sacred space of parenthood, accompanying families in the most vulnerable areas of their humanity. But one day, between two sessions, Karine turned the mirror. Towards herself.',
    'about.karine.p2': 'What she saw was not a mother, nor a guide, nor a coach. It was a Queen. A fiery, lucid, wounded queen, who carried within her archetypes, patterns, generational wounds. A woman who had too often apologized for being strong, sensitive, whole. A woman who wanted to understand why she attracted certain types of lovers, why certain stories repeated themselves, why feminine power was so frightening, even to herself.',
    'about.karine.p3': 'Today, Karine is the CEO of Queen de Q. But for the initiated, she is much more than that: she is the first crowned Queen. Her dream? To see thousands of women hold their heads high, choose themselves, and know themselves. Because a Queen is not born: she is revealed.',
    'about.karine.p4': 'From this visceral dive, a vision was born. A tool. A universe. A gentle but powerful empire: Queen de Q.',
    'about.marie-eve.title': 'Queen of Diamonds',
    'about.marie-eve.p1': 'There are those who dream. And there are those who transform the dream into strategy, fire into structure, intuition into an empire. Marie-Ève Martel is one of them. A seasoned communicator, a woman of ideas and impact, she is a pragmatic force behind Queen de Q.',
    'about.marie-eve.p2': 'But it wasn\'t a degree or a resume that brought her here. It was a personal quest. A series of inner journeys. Old wounds. Broken masks. Dates that left marks, and silences heavy with meaning. She, too, danced with illusions. She, too, had to re-crown herself.',
    'about.marie-eve.p3': 'Marie-Ève did not arrive at Queen de Q by chance. She came out of duty. The duty to create a space where women can discover themselves, choose themselves, and grow with pleasure. Not in pain. Not in shame. Not in self-sacrifice. In clarity. In humor. In reality. And with a hint of audacity.',
    'about.marie-eve.p4': 'Marie-Ève leads the marketing operations for Queen de Q. But she is much more than a strategist. She ensures that every Queen recognizes her value—even when she doubts, even when she stumbles.',
    'about.contact.title': 'Contact Us',
    'about.contact.email': 'gestionreines@gmail.com',

    // Application Page
    'app.title': 'Queen de Q',
    'app.subtitle': 'THE APPLICATION',
    'app.scroll': 'Discover the secrets',
    'app.intro.title': 'All of you is complete',
    'app.intro.p1': 'You\'ve been there - deconstructing. Analyzing. Maybe too much.',
    'app.intro.p2': 'Sweet, strong, flexible, sexy, brilliant... sometimes all at once, right?',
    'app.intro.p3': 'And still, those toxic relationships found their way in (you know, those twos of spades 😉).',
    'app.intro.p4': 'Here\'s the thing - Queen de Q is where the bluffing ends.',
    'app.intro.p5': 'Time to play by our rules, pick our cards, own our truth.',
    'app.intro.p6': 'Not to please anyone. To crown ourselves.',
    'app.intro.p7': 'Ready to claim your crown? Download now!',
    'app.features.title': 'The Queen de Q application is...',
    'app.feature1.title': 'Your Draw',
    'app.feature1.desc': 'By answering a few questions from the Queen Mother, discover which male archetype is your ex, your lover, or your prospect. The stronger the card, the more emotionally mature he is: it\'s not for nothing that we deserve a King!',
    'app.feature2.title': 'Mirror, Mirror',
    'app.feature2.desc': 'By answering a few questions from the Queen Mother, discover who your inner queen is (Hearts, Clubs, Diamonds, Spades). You will also be able to learn about your emotional wounds, your love language, and your dominant strengths.',
    'app.feature3.title': 'Tea Room',
    'app.feature3.desc': 'Enjoy a privileged moment with the Queen Mother. Chat with her to find out how to end a relationship (Royal Flush) or to break the spell of your Two of Spades.',
    'app.cta.title': 'Receive your invitation to the Kingdom',
    'app.cta.subtitle': 'Join us for the official launch and be among the first to crown yourself.',
    'app.cta.button': 'Receive my invitation',

    // Registration Modal
    'modal.title': 'Official Launch of Queen de Q',
    'modal.subtitle': '"The drawbridge is lowering. The gates are opening. The kingdom awaits you."',
    'modal.date': 'July 24, 2025',
    'modal.time': '7:00 PM - 8:00 PM',
    'modal.location': 'Online',
    'modal.location.desc': 'The link will be sent to you',
    'modal.program.title': 'On the Agenda in the App:',
    'modal.program.item1': '<span class="font-bold">Your Draw:</span> Draw the portrait of the guy who occupies your mind (or your bed).',
    'modal.program.item2': '<span class="font-bold">Mirror, Mirror:</span> A guided introspective journey to discover your inner Queen.',
    'modal.program.item3': '<span class="font-bold">Tea Room:</span> Guided rituals to un-spell yourself and begin a real process of returning to you.',
    'modal.offer.title': 'EXCLUSIVE LAUNCH OFFER!',
    'modal.offer.desc': 'Be there to discover it.',
    'modal.final_question': 'Are you ready to change the rules of the game?',
    'modal.email_placeholder': 'Enter your email...',
    'modal.submit_button': 'I want my Queen de Q pass',
    
    // Cards page - Cabinet
    'cards.cabinet.title': 'The Cabinet of Curiosities',
    'cards.cabinet.subtitle': 'Explore the archetypes, lift the veil on your dynamics, and understand the rules of the game to better reign.',
    'cards.cabinet.item1.title': 'The Veil of Mysteries',
    'cards.cabinet.item1.desc': 'Each card is a key to decipher the patterns that shape your encounters.',
    'cards.cabinet.item2.title': 'Your Creative Canvas',
    'cards.cabinet.item2.desc': 'Use these archetypes as a source of inspiration for your thoughts and stories.',
    'cards.cabinet.item3.title': 'The Rules of the Game',
    'cards.cabinet.item3.desc': 'Draw a card, identify the archetype, and ask yourself: progression or repetition?',

    // Cards page - Creative additions
    'cards.portal.title': 'The Archetype Portal',
    'cards.portal.subtitle': 'Dare to see who you truly attract.',
    'cards.portal.instruction': 'Touch the portal to begin',
    'cards.instructions.title': 'The Queen\'s Rituals',
    'cards.instructions.theme1.title': 'The Mystery',
    'cards.instructions.theme1.desc': 'Each card is a mirror, a male archetype. Your draw is not random; it is a revelation of your current love patterns. Welcome it with curiosity.',
    'cards.instructions.theme2.title': 'The Creativity',
    'cards.instructions.theme2.desc': 'The goal is not to judge the card, but to understand the message. Use your journal to write down your thoughts. What part of you attracts this man? What wound is touched?',
    'cards.instructions.theme3.title': 'The Game',
    'cards.instructions.theme3.desc': 'Draw a card, identify the archetype, and ask yourself: is this progress or a repetition? The goal is to understand to play better.',
    'cards.grid.title': 'The Great Theatre of Men',
    'footer.brand.title': 'Queen of Q',
    'footer.brand.subtitle': 'Unveil the game of masculine archetypes.',
    'footer.links.title': 'Navigation',
    'footer.links.about': 'About',
    'footer.links.faq': 'FAQ',
    'footer.links.contact': 'Contact',
    'footer.social.title': 'Stay Connected',
    'footer.social.subtitle': 'Follow us for updates and exclusive content.',
    'footer.rights': 'All rights reserved.',
    // SwipeCards (Cabinet des Curiosités)
    'swipe.removed': 'Card removed',
    'swipe.howTitle': 'How does the draw work?',
    'swipe.howDesc': 'Each card reveals a <span class="text-imperial-gold font-semibold">masculine archetype</span> that you can attract in your relationships. Swipe the cards left or right to explore and discover your attraction patterns.',
    'swipe.slide': 'Swipe',
    'swipe.slideDesc': 'Swipe each card to reveal the next archetype',
    'swipe.observe': 'Observe',
    'swipe.observeDesc': 'Discover the characteristics of each masculine archetype',
    'swipe.understand': 'Understand',
    'swipe.understandDesc': 'Identify your patterns to make better choices in your relationships',
    'swipe.keyboard': 'Use the arrow keys',
    'swipe.touch': 'Swipe with your finger/mouse',
    'swipe.keyboardInstructions': 'Use the left or right arrow keys to remove cards. Swipe with your mouse or finger for the same action.',
    'swipe.moreCards': 'Do you want to discover more?',
    'swipe.cardsExplored': 'You have just explored <span class="text-imperial-gold font-bold">4 archetypes</span> out of the <span class="text-imperial-gold font-bold">54 available</span>!',
    'swipe.preview': 'Free Preview',
    'swipe.preview4': 'Only 4 archetypes',
    'swipe.previewDesc': 'Basic descriptions',
    'swipe.previewLimited': 'Limited exploration',
    'swipe.fullRealm': 'Full Realm',
    'swipe.full54': '54 detailed archetypes',
    'swipe.fullPsych': 'In-depth psychological analysis',
    'swipe.fullGuidance': 'Personalized guidance',
    'swipe.fullTransformation': 'Relational transformation',
    'swipe.whatToExpect': 'What awaits you in the Realm:',
    'swipe.discoverPatterns': 'Discover your hidden <strong>attraction patterns</strong>',
    'swipe.understandWhy': 'Understand why you attract certain types of men',
    'swipe.learnRedFlags': 'Learn to <strong>recognize red flags</strong>',
    'swipe.transformRelations': 'Transform your romantic relationships',
    'swipe.unlock54': 'UNLOCK THE 54 ARCHETYPES',
    'swipe.restart4Cards': 'Restart with these 4 cards',
    'swipe.quote4': '4 cards is a beginning. 54 cards is a revolution.',
    'swipe.quoteQueen': 'Queen de Q',
    
    // Privacy Policy
    'privacy.title': 'Queen de Q Privacy Policy',
    'privacy.version': 'Version effective as of July 15, 2025',
    'privacy.section1.title': 'Introduction',
    'privacy.section1.content': '9540-9520 Québec Inc. ("Gestion Reines Inc.", "we", "our" or "Queen de Q") places the utmost importance on protecting your privacy and the confidentiality of your personal information. This policy aims to explain how we collect, use, store, share and protect your personal information, that is, any information that allows you to be identified directly or indirectly, when you use the Queen de Q application and services or visit our website: www.queendeq.com.\n\nThis policy complies with the Act respecting the protection of personal information in the private sector (Quebec) and other applicable laws.',
    'privacy.section2.title': 'What personal information do we collect?',
    'privacy.section2.content': 'When you use the Queen de Q application or browse its website, we collect different types of personal information, depending on how you interact with our services.\n\nWe first collect identification and profile data that allows us to create and manage your account and adapt content to your situation. This includes your first name, last name, email address, country or province of residence, as well as your age, to confirm your eligibility and meet applicable legal obligations.\n\nWe also collect technical data automatically generated during your navigation, such as your IP address, information about your device (type, operating system, language) and data related to your interactions with the platform (pages visited, session duration, saved preferences). We also use cookies and similar identifiers to improve your experience and perform certain analyses, with your consent when required.',
    'privacy.section3.title': 'For what purposes do we use your personal information?',
    'privacy.section3.purposes': '• to allow you to access your account and application features • to manage your preferences and personalize your experience according to chosen modules and archetypes • to send you communications related to our services, including reminders, updates and invitations • to offer you, with your consent, promotional content • to answer your questions and support requests • to ensure platform security, prevent fraud and manage our internal operations • to perform statistical analyses to improve our services • and to comply with our legal and regulatory obligations.',
    'privacy.section3.additional': 'We will never use your personal information for purposes other than those mentioned in this policy without informing you in advance and, when required by law, obtaining your consent.',
    'privacy.section4.title': 'Do we share your personal information?',
    'privacy.section4.content': 'Your personal information may be disclosed to third parties in the normal course of our activities, but always in a controlled manner and with respect for their confidentiality. We never sell your personal information to third parties.',
    'privacy.section5.title': 'How do we protect your personal information?',
    'privacy.section5.content': 'The protection of your data is important to us. Queen de Q ensures the protection of personal information under its control, both during transmission and once received. It maintains appropriate physical, electronic and organizational security measures to protect this personal information.',
    'privacy.section6.title': 'How long do we keep your data?',
    'privacy.section6.content': 'We retain your personal information only for the time necessary to achieve the purposes for which it was collected, or to comply with our legal obligations. Subsequently, when no reasonable grounds justify the retention of your personal information, your data will be securely destroyed or anonymized.',
    'privacy.section7.title': 'Your rights',
    'privacy.section7.rights': '• The right to access the data we hold about you • The right to correct any inaccurate, incomplete or ambiguous information • The right to withdraw your consent to the use of your data, subject to legal or contractual obligations • The right to request the portability of certain of your data in a structured technological format',
    'privacy.section8.title': 'Contact us',
    'privacy.section8.content': 'The personal information protection officer ensures compliance with and implementation of the Act respecting the protection of personal information in the private sector within Queen de Q.',
    'privacy.section8.contact.email': 'By email',
    'privacy.section8.contact.mail': 'By mail',
    'privacy.section9.title': 'Updates',
    'privacy.section9.content': 'We reserve the right to modify the content of this policy to meet applicable legal requirements. We invite you to review this policy frequently to stay informed about how we handle your personal information.',
    'privacy.section10.title': 'Rules of interpretation',
    'privacy.section10.content': 'For information purposes, the singular includes the plural and vice versa, the masculine includes the feminine and vice versa, and any term designating a person also includes, where applicable, a reference to legal persons.',
    
    // Terms of Service
    'terms.title': 'Queen de Q Terms of Service',
    'terms.version': 'Version effective as of July 15, 2025',
    // ... Add English translations for all sections ...
  }
};

// Define TranslationKey after translations object is complete
type TranslationKey = keyof typeof translations.fr;

// Context
interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey, variables?: Record<string, any>) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Provider
interface TranslationProviderProps {
  children: ReactNode;
}

export function TranslationProvider({ children }: TranslationProviderProps) {
  // Get initial language from localStorage or default to French
  const getInitialLanguage = (): Language => {
    try {
      const saved = localStorage.getItem('queen-q-language');
      return (saved as Language) || 'fr';
    } catch {
      return 'fr';
    }
  };

  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  // Set language and save to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('queen-q-language', lang);
    } catch (error) {
      console.warn('Could not save language to localStorage:', error);
    }
  };

  // Translation function
  const t = (key: TranslationKey, variables?: Record<string, any>): string => {
    let translation = (translations[language] as Record<TranslationKey, string>)[key] || translations.fr[key] || String(key);
    
    // Replace variables in translation
    if (variables) {
      Object.entries(variables).forEach(([variable, value]) => {
        translation = translation.replace(`{${variable}}`, String(value));
      });
    }
    
    return translation;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
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