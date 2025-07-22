import { archetypes } from './archetypes';

export interface CardData {
  id: number;
  path: string;
  name: string;
  number: number;
  isSpecial: boolean;
}

// Générateur des données de cartes
export const generateCardData = (t: (key: string) => string): CardData[] => {
  const cards: CardData[] = [];
  
  // Images disponibles dans public/assets/cards/
  const availableCards = [
    '/assets/cards/Acar.png',      // As de carreau
    '/assets/cards/Acoeur.png',    // As de coeur
    '/assets/cards/Apique.png',    // As de pique
    '/assets/cards/Atref.png'      // As de trèfle
  ];
  
  for (let i = 1; i <= 54; i++) {
    let cardPath = `/assets/cards/placeholder.svg`;
    let cardName = archetypes[i - 1] || `${t('card.number')} ${i}`;
    let isSpecial = false;

    // Utiliser les vraies cartes pour les 4 premiers
    if (i >= 1 && i <= 4) {
      cardPath = availableCards[i - 1];
      isSpecial = true;
      
      // Noms spécifiques pour les As
      switch(i) {
        case 1:
          cardName = t('cards.aceOfDiamonds') || 'As de Carreau';
          break;
        case 2:
          cardName = t('cards.aceOfHearts') || 'As de Coeur';
          break;
        case 3:
          cardName = t('cards.aceOfSpades') || 'As de Pique';
          break;
        case 4:
          cardName = t('cards.aceOfClubs') || 'As de Trèfle';
          break;
      }
    }

    cards.push({
      id: i,
      path: cardPath,
      name: cardName,
      number: i,
      isSpecial
    });
  }
  return cards;
}; 