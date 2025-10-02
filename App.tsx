import React, { useState, useCallback } from 'react';
import { GeneratorControls } from './components/HeroInputForm';
import { HeroCard } from './components/HeroCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { generateCardDetails, generateCardImage } from './services/geminiService';
import { Card, Character, PowerLevel, Rarity } from './types';
import { DeckView } from './components/DeckView';
import { CardDetailModal } from './components/CardDetailModal';

// Helper function to determine rarity
const getRarity = (): Rarity => {
  const rand = Math.random();
  if (rand < 0.6) return 'Common'; // 60%
  if (rand < 0.9) return 'Rare';   // 30%
  return 'Epic';                   // 10%
};

const App: React.FC = () => {
  const [generatedCard, setGeneratedCard] = useState<Card | null>(null);
  const [deck, setDeck] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [viewingCard, setViewingCard] = useState<Card | null>(null);

  const handleGenerateCard = useCallback(async (character: Character, powerLevel: PowerLevel) => {
    setIsLoading(true);
    setError(null);
    setGeneratedCard(null);

    try {
      setLoadingMessage('Consulting the Multiverse...');
      const { stats, backstory } = await generateCardDetails(character, powerLevel);

      setLoadingMessage('Painting your card...');
      const imageGenPrompt = `Dynamic cinematic comic book art of ${character}, with a power level of ${powerLevel}. Background reflects their backstory: ${backstory}. Epic, detailed, vibrant action pose.`;
      const imageUrl = await generateCardImage(imageGenPrompt);

      const newCard: Card = {
        id: `${Date.now()}-${character}`,
        characterName: character,
        powerLevel,
        stats,
        backstory,
        imageUrl,
        rarity: getRarity(),
      };

      setGeneratedCard(newCard);

    // FIX: Explicitly type `err` as `any` to resolve "Cannot find name 'err'".
    } catch (err: any) {
      console.error(err);
      setError('Failed to generate card. The cosmic forces are not aligned. Please try again.');
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, []);

  const handleAddToDeck = () => {
    if (generatedCard) {
      setDeck(prevDeck => [generatedCard, ...prevDeck]);
      setGeneratedCard(null);
    }
  };

  const handleDiscard = () => {
    setGeneratedCard(null);
  };

  const handleRemoveFromDeck = (cardId: string) => {
    setDeck(prevDeck => prevDeck.filter(card => card.id !== cardId));
  };

  const handleViewCard = (card: Card) => {
    setViewingCard(card);
  };

  const handleCloseModal = () => {
    setViewingCard(null);
  };


  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 sm:p-8 selection:bg-cyan-500 selection:text-black">
      <header className="w-full max-w-4xl text-center mb-8">
        <h1 className="text-6xl sm:text-7xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-600">
          Spider-Verse Card Generator
        </h1>
        <p className="text-gray-400 mt-2 text-lg">
          Create and collect cards from across the Spider-Verse!
        </p>
      </header>

      <main className="w-full max-w-4xl flex flex-col items-center">
        <GeneratorControls onSubmit={handleGenerateCard} isLoading={isLoading} />

        {error && <div className="mt-8 text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</div>}

        <div className="mt-12 w-full flex justify-center">
          {isLoading ? (
            <div className="flex flex-col items-center text-center">
              <LoadingSpinner />
              <p className="mt-4 text-xl text-cyan-300 tracking-wider">{loadingMessage}</p>
            </div>
          ) : generatedCard ? (
            // FIX: Corrected typo `className.` to `className`. This syntax error likely caused the parser to fail, leading to many of the reported errors.
            <div className="flex flex-col items-center gap-4 w-full max-w-md">
                <HeroCard card={generatedCard} />
                <div className="flex gap-4 w-full">
                    <button onClick={handleDiscard} className="w-full font-bold py-3 px-4 rounded-lg bg-gray-600 hover:bg-gray-700 transition-colors">Discard</button>
                    <button onClick={handleAddToDeck} className="w-full font-bold py-3 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all">Add to Deck</button>
                </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <p className="text-2xl">Your generated card will appear here.</p>
              <p>Who will you summon from the Spider-Verse?</p>
            </div>
          )}
        </div>
        
        <DeckView deck={deck} onRemove={handleRemoveFromDeck} onView={handleViewCard} />

      </main>

      <footer className="w-full max-w-4xl text-center text-gray-600 mt-auto pt-8">
        <p>Powered by Gemini & Imagen. For every Spider-Fan out there.</p>
      </footer>

      {viewingCard && <CardDetailModal card={viewingCard} onClose={handleCloseModal} />}
    </div>
  );
};

export default App;
