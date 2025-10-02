import React from 'react';
import { Card } from '../types';

interface HeroCardProps {
  card: Card;
}

const rarityStyles = {
  Common: 'from-gray-500 to-gray-700 text-white',
  Rare: 'from-blue-500 to-blue-700 text-white',
  Epic: 'from-purple-500 to-purple-700 text-white',
};

const StatBar: React.FC<{ label: string; value: number }> = ({ label, value }) => (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">{label}</span>
        <span className="text-sm font-bold text-white">{value}</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div className="bg-cyan-500 h-2 rounded-full" style={{ width: `${value}%` }}></div>
      </div>
    </div>
);

export const HeroCard: React.FC<HeroCardProps> = ({ card }) => {
  return (
    <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-700 animate-fade-in group perspective-1000">
       {/* FIX: Replaced custom `transform-style-3d` class with Tailwind's `transform-preserve-3d` utility. */}
       <div className="transition-transform duration-500 transform-preserve-3d group-hover:rotate-y-3">
        <div className="relative">
          <img src={card.imageUrl} alt={`Portrait of ${card.characterName}`} className="w-full h-auto object-cover aspect-[3/4]" />
          <div className={`absolute top-4 right-4 px-3 py-1 text-sm font-bold uppercase tracking-wider rounded-md bg-gradient-to-br ${rarityStyles[card.rarity]}`}>
            {card.rarity}
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gray-800 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <h2 className="text-5xl text-white tracking-wider drop-shadow-lg">{card.characterName}</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
            <div>
                <h3 className="text-sm font-bold tracking-widest uppercase text-cyan-400 mb-2">Backstory</h3>
                <p className="text-gray-300 italic text-sm">{card.backstory}</p>
            </div>
            <div>
                <h3 className="text-sm font-bold tracking-widest uppercase text-cyan-400 mb-3">Stats</h3>
                <div className="space-y-3">
                    <StatBar label="Intelligence" value={card.stats.intelligence} />
                    <StatBar label="Strength" value={card.stats.strength} />
                    <StatBar label="Speed" value={card.stats.speed} />
                    <StatBar label="Durability" value={card.stats.durability} />
                </div>
            </div>
        </div>
       </div>
       {/* 
        FIX: Replaced non-standard `<style jsx>` with a standard `<style>` tag to resolve the TypeScript error on line 56.
        Also removed redundant and buggy CSS rules for classes that should be handled by Tailwind CSS.
       */}
       <style>{`
        .perspective-1000 {
            perspective: 1000px;
        }
        .animate-fade-in {
            animation: fadeIn 0.8s ease-in-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};
