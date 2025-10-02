import React from 'react';
import { Card } from '../types';

interface DeckViewProps {
  deck: Card[];
  onRemove: (cardId: string) => void;
  onView: (card: Card) => void;
}

const rarityBorderStyles = {
  Common: 'border-gray-600',
  Rare: 'border-blue-500',
  Epic: 'border-purple-500',
};

export const DeckView: React.FC<DeckViewProps> = ({ deck, onRemove, onView }) => {
  return (
    <div className="w-full mt-16">
      <h2 className="text-4xl text-center font-bold tracking-wider mb-8">My Deck ({deck.length})</h2>
      {deck.length === 0 ? (
        <p className="text-center text-gray-500">Your deck is empty. Generate some cards to add them!</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {deck.map(card => (
            <div 
              key={card.id} 
              className="relative group cursor-pointer"
              onClick={() => onView(card)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onView(card)}
              aria-label={`View details for ${card.characterName}`}
            >
              <img 
                src={card.imageUrl} 
                alt={card.characterName} 
                className={`w-full h-auto object-cover aspect-[3/4] rounded-lg border-4 ${rarityBorderStyles[card.rarity]}`}
              />
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none group-hover:pointer-events-auto">
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card from opening when removing
                    onRemove(card.id);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  aria-label={`Remove ${card.characterName} from deck`}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};