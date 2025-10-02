import React from 'react';
import { Card } from '../types';
import { HeroCard } from './HeroCard';

interface CardDetailModalProps {
  card: Card;
  onClose: () => void;
}

export const CardDetailModal: React.FC<CardDetailModalProps> = ({ card, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4 animate-fade-in-fast"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="w-full max-w-md"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the card itself
      >
        <HeroCard card={card} />
      </div>
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 text-white text-5xl font-light hover:text-cyan-400 transition-colors leading-none"
        aria-label="Close card details"
      >
        &times;
      </button>
       <style>{`
        .animate-fade-in-fast {
            animation: fadeInFast 0.3s ease-in-out;
        }
        @keyframes fadeInFast {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};