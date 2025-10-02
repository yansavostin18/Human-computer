export const CHARACTERS = ["Spider-Man", "Green Goblin", "Mary Jane", "Doctor Octopus", "Mysterio"] as const;
export const POWER_LEVELS = ["Low", "Medium", "Hard"] as const;
export const RARITIES = ["Common", "Rare", "Epic"] as const;

export type Character = typeof CHARACTERS[number];
export type PowerLevel = typeof POWER_LEVELS[number];
export type Rarity = typeof RARITIES[number];

export interface CardStats {
  intelligence: number;
  strength: number;
  speed: number;
  durability: number;
}

export interface Card {
  id: string;
  characterName: Character;
  powerLevel: PowerLevel;
  stats: CardStats;
  backstory: string;
  imageUrl: string;
  rarity: Rarity;
}
