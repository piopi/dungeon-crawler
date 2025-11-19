import { Skill, Adventurer } from './types';

export const SKILLS: Skill[] = [
  // Strength-based skills
  {
    id: 'power_strike',
    name: 'Power Strike',
    description: 'A devastating blow that uses raw strength (+20% STR in combat)',
    relatedStat: 'strength',
    effect: (adventurer: Adventurer) => {
      adventurer.stats.strength *= 1.2;
    },
  },
  {
    id: 'berserker_rage',
    name: 'Berserker Rage',
    description: 'Channel anger into power (+30% STR, -10% DEF)',
    relatedStat: 'strength',
    effect: (adventurer: Adventurer) => {
      adventurer.stats.strength *= 1.3;
      adventurer.stats.defense *= 0.9;
    },
  },
  {
    id: 'iron_will',
    name: 'Iron Will',
    description: 'Unbreakable determination (+15% STR, +15% DEF)',
    relatedStat: 'strength',
    effect: (adventurer: Adventurer) => {
      adventurer.stats.strength *= 1.15;
      adventurer.stats.defense *= 1.15;
    },
  },

  // Magic-based skills
  {
    id: 'arcane_blast',
    name: 'Arcane Blast',
    description: 'Unleash raw magical energy (+25% MAG in combat)',
    relatedStat: 'magic',
    effect: (adventurer: Adventurer) => {
      adventurer.stats.magic *= 1.25;
    },
  },
  {
    id: 'mana_shield',
    name: 'Mana Shield',
    description: 'Use magic to protect yourself (+20% MAG, +20% DEF)',
    relatedStat: 'magic',
    effect: (adventurer: Adventurer) => {
      adventurer.stats.magic *= 1.2;
      adventurer.stats.defense *= 1.2;
    },
  },
  {
    id: 'spell_mastery',
    name: 'Spell Mastery',
    description: 'Deep understanding of magic (+35% MAG)',
    relatedStat: 'magic',
    effect: (adventurer: Adventurer) => {
      adventurer.stats.magic *= 1.35;
    },
  },

  // Defense-based skills
  {
    id: 'shield_wall',
    name: 'Shield Wall',
    description: 'Impenetrable defense (+40% DEF)',
    relatedStat: 'defense',
    effect: (adventurer: Adventurer) => {
      adventurer.stats.defense *= 1.4;
    },
  },
  {
    id: 'fortify',
    name: 'Fortify',
    description: 'Strengthen your defenses (+25% DEF, +10% HP)',
    relatedStat: 'defense',
    effect: (adventurer: Adventurer) => {
      adventurer.stats.defense *= 1.25;
      adventurer.maxHp = Math.floor(adventurer.maxHp * 1.1);
      adventurer.hp = adventurer.maxHp;
    },
  },
  {
    id: 'counter_stance',
    name: 'Counter Stance',
    description: 'Defensive posture with counterattack (+20% DEF, +10% STR)',
    relatedStat: 'defense',
    effect: (adventurer: Adventurer) => {
      adventurer.stats.defense *= 1.2;
      adventurer.stats.strength *= 1.1;
    },
  },

  // Evasion-based skills
  {
    id: 'shadow_step',
    name: 'Shadow Step',
    description: 'Move like a shadow (+30% EVA)',
    relatedStat: 'evasion',
    effect: (adventurer: Adventurer) => {
      adventurer.stats.evasion *= 1.3;
    },
  },
  {
    id: 'acrobatics',
    name: 'Acrobatics',
    description: 'Nimble movements (+25% EVA, +10% CRIT RATE)',
    relatedStat: 'evasion',
    effect: (adventurer: Adventurer) => {
      adventurer.stats.evasion *= 1.25;
      adventurer.stats.criticalRate *= 1.1;
    },
  },
  {
    id: 'blur',
    name: 'Blur',
    description: 'Become hard to hit (+40% EVA, -10% STR)',
    relatedStat: 'evasion',
    effect: (adventurer: Adventurer) => {
      adventurer.stats.evasion *= 1.4;
      adventurer.stats.strength *= 0.9;
    },
  },

  // Critical Rate-based skills
  {
    id: 'precision_strike',
    name: 'Precision Strike',
    description: 'Strike with deadly accuracy (+30% CRIT RATE)',
    relatedStat: 'criticalRate',
    effect: (adventurer: Adventurer) => {
      adventurer.stats.criticalRate *= 1.3;
    },
  },
  {
    id: 'deadly_focus',
    name: 'Deadly Focus',
    description: 'Focus on vital points (+25% CRIT RATE, +15% CRIT DMG)',
    relatedStat: 'criticalRate',
    effect: (adventurer: Adventurer) => {
      adventurer.stats.criticalRate *= 1.25;
      adventurer.stats.criticalDamage += 15;
    },
  },
  {
    id: 'eagle_eye',
    name: 'Eagle Eye',
    description: 'See every weakness (+35% CRIT RATE)',
    relatedStat: 'criticalRate',
    effect: (adventurer: Adventurer) => {
      adventurer.stats.criticalRate *= 1.35;
    },
  },

  // Critical Damage-based skills
  {
    id: 'devastate',
    name: 'Devastate',
    description: 'Crushing critical strikes (+40 CRIT DMG)',
    relatedStat: 'criticalDamage',
    effect: (adventurer: Adventurer) => {
      adventurer.stats.criticalDamage += 40;
    },
  },
  {
    id: 'executioner',
    name: 'Executioner',
    description: 'Finish them off (+50 CRIT DMG, +10% CRIT RATE)',
    relatedStat: 'criticalDamage',
    effect: (adventurer: Adventurer) => {
      adventurer.stats.criticalDamage += 50;
      adventurer.stats.criticalRate *= 1.1;
    },
  },
  {
    id: 'savage_blow',
    name: 'Savage Blow',
    description: 'Brutal critical hits (+35 CRIT DMG, +10% STR)',
    relatedStat: 'criticalDamage',
    effect: (adventurer: Adventurer) => {
      adventurer.stats.criticalDamage += 35;
      adventurer.stats.strength *= 1.1;
    },
  },
];
