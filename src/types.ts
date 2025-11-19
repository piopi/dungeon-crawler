// Character Classes
export type CharacterClass = 'swordsman' | 'mage' | 'rogue';

// Stats
export interface Stats {
  strength: number;
  magic: number;
  defense: number;
  evasion: number;
  criticalRate: number;
  criticalDamage: number;
}

export type StatType = keyof Stats;

// Mood levels
export type Mood = 'Awful' | 'Bad' | 'Neutral' | 'Good' | 'Great';

export const MOOD_MODIFIERS: Record<Mood, number> = {
  'Awful': -0.05,
  'Bad': -0.025,
  'Neutral': 0,
  'Good': 0.025,
  'Great': 0.05,
};

export const MOOD_LEVELS: Mood[] = ['Awful', 'Bad', 'Neutral', 'Good', 'Great'];

// Conditions
export type Condition = 'Injured' | 'Hexed' | 'Unmotivated' | null;

// Training levels for each stat
export interface TrainingLevels {
  strength: number;
  magic: number;
  defense: number;
  evasion: number;
  criticalRate: number;
  criticalDamage: number;
}

// Training experience for each stat
export interface TrainingExp {
  strength: number;
  magic: number;
  defense: number;
  evasion: number;
  criticalRate: number;
  criticalDamage: number;
}

// Skill definition
export interface Skill {
  id: string;
  name: string;
  description: string;
  relatedStat: StatType;
  effect: (adventurer: Adventurer) => void;
}

// Adventurer state
export interface Adventurer {
  name: string;
  class: CharacterClass;
  level: number;
  exp: number;
  expToNextLevel: number;
  stats: Stats;
  baseStats: Stats;
  trainingLevels: TrainingLevels;
  trainingExp: TrainingExp;
  fatigue: number;
  mood: Mood;
  condition: Condition;
  skills: Skill[];
  hp: number;
  maxHp: number;
}

// Game state
export interface GameState {
  adventurer: Adventurer | null;
  turn: number;
  dungeonLevel: number;
  currentDungeonLevel: number;
  gameLog: string[];
  trainingHistory: StatType[];
  inCombat: boolean;
  enemy: Enemy | null;
}

// Enemy definition
export interface Enemy {
  name: string;
  level: number;
  hp: number;
  maxHp: number;
  stats: Stats;
  isBoss: boolean;
}

// Action types
export type GameAction =
  | { type: 'SELECT_CHARACTER'; characterClass: CharacterClass }
  | { type: 'TRAIN_STAT'; stat: StatType }
  | { type: 'REST' }
  | { type: 'TAVERN' }
  | { type: 'ENTER_DUNGEON' }
  | { type: 'ATTACK'; skill?: Skill }
  | { type: 'FLEE' }
  | { type: 'USE_SKILL'; skill: Skill }
  | { type: 'SELECT_SKILL'; skill: Skill }
  | { type: 'NEW_GAME' };
