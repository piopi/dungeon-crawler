import { PassiveAbility, CharacterClass } from './types';

export const PASSIVES: Record<CharacterClass, PassiveAbility> = {
  swordsman: {
    id: 'iron_resolve',
    name: 'Iron Resolve',
    description: 'Swordsmen never give up. +20% HP and  condition duration reduced by 1 turn',
    class: 'swordsman',
  },
  mage: {
    id: 'arcane_mind',
    name: 'Arcane Mind',
    description: 'Deep magical knowledge. Gain +50% EXP from all sources and +10% Magic training effectiveness',
    class: 'mage',
  },
  rogue: {
    id: 'lucky_strike',
    name: 'Lucky Strike',
    description: 'Fortune favors the bold. -10% training failure rate and 25% chance to gain double stats when training succeeds',
    class: 'rogue',
  },
};

export const CHARACTER_VISUALS: Record<CharacterClass, string> = {
  swordsman: `
    O
   /|\\
   / \\
  ⚔️ 🛡️
  `,
  mage: `
    O
   <|>
   / \\
  🔮 ✨
  `,
  rogue: `
    O
   /|\\
   < >
  🗡️ 💨
  `,
};

export const CHARACTER_COLORS: Record<CharacterClass, string> = {
  swordsman: '#bf616a', // Red
  mage: '#88c0d0',      // Blue
  rogue: '#a3be8c',     // Green
};
