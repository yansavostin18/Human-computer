import React, { useState } from 'react';
import { CHARACTERS, POWER_LEVELS, Character, PowerLevel } from '../types';

interface GeneratorControlsProps {
  onSubmit: (character: Character, powerLevel: PowerLevel) => void;
  isLoading: boolean;
}

export const GeneratorControls: React.FC<GeneratorControlsProps> = ({ onSubmit, isLoading }) => {
  const [character, setCharacter] = useState<Character>(CHARACTERS[0]);
  const [powerLevel, setPowerLevel] = useState<PowerLevel>(POWER_LEVELS[1]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(character, powerLevel);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full p-4 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="character-select" className="block mb-2 text-lg font-medium text-gray-300">
            Choose Character
          </label>
          <select
            id="character-select"
            value={character}
            onChange={(e) => setCharacter(e.target.value as Character)}
            disabled={isLoading}
            className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300"
          >
            {CHARACTERS.map(char => <option key={char} value={char}>{char}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="power-level-select" className="block mb-2 text-lg font-medium text-gray-300">
            Select Power Level
          </label>
          <select
            id="power-level-select"
            value={powerLevel}
            onChange={(e) => setPowerLevel(e.target.value as PowerLevel)}
            disabled={isLoading}
            className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300"
          >
            {POWER_LEVELS.map(level => <option key={level} value={level}>{level}</option>)}
          </select>
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="mt-4 w-full text-xl font-bold py-3 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          'Generate Card'
        )}
      </button>
    </form>
  );
};
