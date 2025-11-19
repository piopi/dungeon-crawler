import {
  Adventurer,
  CharacterClass,
  Stats,
  StatType,
  MOOD_MODIFIERS,
  MOOD_LEVELS,
  Condition,
  Skill,
  Enemy,
} from './types';
import { SKILLS } from './skills';

// Base stats for each class
const CLASS_BASE_STATS: Record<CharacterClass, Stats> = {
  swordsman: {
    strength: 15,
    magic: 5,
    defense: 12,
    evasion: 5,
    criticalRate: 10,
    criticalDamage: 150,
  },
  mage: {
    strength: 5,
    magic: 18,
    defense: 6,
    evasion: 7,
    criticalRate: 8,
    criticalDamage: 140,
  },
  rogue: {
    strength: 8,
    magic: 6,
    defense: 7,
    evasion: 15,
    criticalRate: 20,
    criticalDamage: 200,
  },
};

// Create a new adventurer
export function createAdventurer(characterClass: CharacterClass, name: string): Adventurer {
  const baseStats = { ...CLASS_BASE_STATS[characterClass] };
  const maxHp = 100 + baseStats.defense * 5;

  return {
    name,
    class: characterClass,
    level: 1,
    exp: 0,
    expToNextLevel: 100,
    stats: { ...baseStats },
    baseStats: { ...baseStats },
    trainingLevels: {
      strength: 1,
      magic: 1,
      defense: 1,
      evasion: 1,
      criticalRate: 1,
      criticalDamage: 1,
    },
    trainingExp: {
      strength: 0,
      magic: 0,
      defense: 0,
      evasion: 0,
      criticalRate: 0,
      criticalDamage: 0,
    },
    fatigue: 0,
    mood: 'Neutral',
    condition: null,
    skills: [],
    hp: maxHp,
    maxHp,
  };
}

// Calculate failure rate based on fatigue
export function calculateFailureRate(fatigue: number, condition: Condition): number {
  let baseRate = fatigue * 2; // 0% at 0 fatigue, increases by 2% per fatigue

  if (condition === 'Injured') {
    baseRate += 20; // +20% failure rate when injured
  }

  return Math.min(baseRate, 95); // Cap at 95%
}

// Train a stat
export function trainStat(
  adventurer: Adventurer,
  targetStat: StatType
): { success: boolean; message: string; adventurer: Adventurer; newCondition?: Condition } {
  const newAdventurer = { ...adventurer };

  // Check if Unmotivated (20% chance to not show up)
  if (newAdventurer.condition === 'Unmotivated' && Math.random() < 0.2) {
    return {
      success: false,
      message: `${adventurer.name} didn't show up to training due to being Unmotivated!`,
      adventurer: newAdventurer,
    };
  }

  // Check if Hexed (random stat is trained instead)
  let statToTrain = targetStat;
  if (newAdventurer.condition === 'Hexed') {
    const stats: StatType[] = ['strength', 'magic', 'defense', 'evasion', 'criticalRate', 'criticalDamage'];
    statToTrain = stats[Math.floor(Math.random() * stats.length)];
    if (statToTrain !== targetStat) {
      newAdventurer.condition = null; // Hex consumed
    }
  }

  // Calculate failure rate
  const failureRate = calculateFailureRate(newAdventurer.fatigue, newAdventurer.condition);
  const failed = Math.random() * 100 < failureRate;

  // Increase fatigue
  newAdventurer.fatigue += 1;

  const trainingLevel = newAdventurer.trainingLevels[statToTrain];
  const levelBonus = (trainingLevel - 1) * 0.1; // +10% per level above 1
  const moodModifier = MOOD_MODIFIERS[newAdventurer.mood];

  let expGained = 20;
  let message = '';

  if (failed) {
    // Training failed
    expGained = 10; // 50% exp
    newAdventurer.trainingExp[statToTrain] += expGained;
    newAdventurer.exp += expGained;

    // Lower mood
    const moodIndex = MOOD_LEVELS.indexOf(newAdventurer.mood);
    const moodDrop = Math.random() < 0.5 ? 1 : 2;
    const newMoodIndex = Math.max(0, moodIndex - moodDrop);
    newAdventurer.mood = MOOD_LEVELS[newMoodIndex];

    // 30% chance to get a condition
    let newCondition: Condition = null;
    if (Math.random() < 0.3 && !newAdventurer.condition) {
      const conditions: Condition[] = ['Injured', 'Hexed', 'Unmotivated'];
      newCondition = conditions[Math.floor(Math.random() * conditions.length)];
      newAdventurer.condition = newCondition;
    }

    message = `Training failed! ${adventurer.name} is feeling discouraged. (${expGained} exp gained)`;
    if (newCondition) {
      message += ` ${adventurer.name} is now ${newCondition}!`;
    }

    return { success: false, message, adventurer: newAdventurer, newCondition };
  }

  // Training succeeded
  newAdventurer.trainingExp[statToTrain] += expGained;
  newAdventurer.exp += expGained;

  // Calculate stat gain
  let baseStatGain = 1;
  if (statToTrain === 'criticalRate' || statToTrain === 'evasion') {
    baseStatGain = 0.5; // Percentage stats gain slower
  }
  if (statToTrain === 'criticalDamage') {
    baseStatGain = 2; // Critical damage gains more
  }

  const statGain = baseStatGain * (1 + levelBonus) * (1 + moodModifier);
  newAdventurer.stats[statToTrain] += statGain;

  // Check if training level increases
  const expNeeded = trainingLevel * 5 * 20; // Every 5 successful trainings
  if (newAdventurer.trainingExp[statToTrain] >= expNeeded) {
    newAdventurer.trainingLevels[statToTrain] += 1;
    message = `Training successful! ${statToTrain.toUpperCase()} increased by ${statGain.toFixed(1)}! Training level increased to ${newAdventurer.trainingLevels[statToTrain]}! (${expGained} exp)`;
  } else {
    message = `Training successful! ${statToTrain.toUpperCase()} increased by ${statGain.toFixed(1)}! (${expGained} exp)`;
  }

  // Check for level up
  if (newAdventurer.exp >= newAdventurer.expToNextLevel) {
    newAdventurer.level += 1;
    newAdventurer.exp -= newAdventurer.expToNextLevel;
    newAdventurer.expToNextLevel = Math.floor(newAdventurer.expToNextLevel * 1.5);

    // Update max HP
    const newMaxHp = 100 + newAdventurer.stats.defense * 5;
    newAdventurer.maxHp = newMaxHp;
    newAdventurer.hp = newMaxHp;

    message += ` LEVEL UP! ${adventurer.name} is now level ${newAdventurer.level}!`;
  }

  return { success: true, message, adventurer: newAdventurer };
}

// Rest to reduce fatigue
export function rest(adventurer: Adventurer): { message: string; adventurer: Adventurer } {
  const newAdventurer = { ...adventurer };

  const fatigueReduction = Math.floor(newAdventurer.fatigue * 0.5) + 5; // Reduce 50% + 5
  newAdventurer.fatigue = Math.max(0, newAdventurer.fatigue - fatigueReduction);

  // Small chance to remove condition
  if (newAdventurer.condition && Math.random() < 0.3) {
    const oldCondition = newAdventurer.condition;
    newAdventurer.condition = null;
    return {
      message: `${adventurer.name} rested and feels refreshed! Fatigue reduced by ${fatigueReduction}. ${oldCondition} condition removed!`,
      adventurer: newAdventurer,
    };
  }

  return {
    message: `${adventurer.name} rested and feels refreshed! Fatigue reduced by ${fatigueReduction}.`,
    adventurer: newAdventurer,
  };
}

// Visit tavern to improve mood
export function visitTavern(adventurer: Adventurer): { message: string; adventurer: Adventurer } {
  const newAdventurer = { ...adventurer };

  const moodIndex = MOOD_LEVELS.indexOf(newAdventurer.mood);
  const moodBoost = Math.random() < 0.5 ? 1 : 2;
  const newMoodIndex = Math.min(MOOD_LEVELS.length - 1, moodIndex + moodBoost);
  newAdventurer.mood = MOOD_LEVELS[newMoodIndex];

  // Small chance to remove Unmotivated condition
  if (newAdventurer.condition === 'Unmotivated' && Math.random() < 0.5) {
    newAdventurer.condition = null;
    return {
      message: `${adventurer.name} had a great time at the tavern! Mood improved to ${newAdventurer.mood}! Unmotivated condition removed!`,
      adventurer: newAdventurer,
    };
  }

  return {
    message: `${adventurer.name} had a great time at the tavern! Mood improved to ${newAdventurer.mood}!`,
    adventurer: newAdventurer,
  };
}

// Get top 3 most trained stats from last 10 turns
export function getTopTrainedStats(trainingHistory: StatType[]): StatType[] {
  const recent = trainingHistory.slice(-10);
  const counts: Record<string, number> = {};

  recent.forEach(stat => {
    counts[stat] = (counts[stat] || 0) + 1;
  });

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return sorted.slice(0, 3).map(([stat]) => stat as StatType);
}

// Get random skills based on trained stats
export function getRandomSkills(topStats: StatType[], existingSkills: Skill[]): Skill[] {
  const availableSkills = SKILLS.filter(skill =>
    !existingSkills.some(s => s.id === skill.id)
  );

  // Prefer skills related to top trained stats
  const relatedSkills = availableSkills.filter(skill =>
    topStats.includes(skill.relatedStat)
  );

  const skillPool = relatedSkills.length >= 3 ? relatedSkills : availableSkills;

  // Shuffle and pick 3
  const shuffled = [...skillPool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

// Create enemy based on dungeon level
export function createEnemy(dungeonLevel: number, isBoss: boolean = false): Enemy {
  const levelMultiplier = 1 + (dungeonLevel - 1) * 0.3;
  const bossMultiplier = isBoss ? 2.5 : 1;

  const baseHp = 50 * levelMultiplier * bossMultiplier;
  const baseStats: Stats = {
    strength: Math.floor(10 * levelMultiplier * bossMultiplier),
    magic: Math.floor(10 * levelMultiplier * bossMultiplier),
    defense: Math.floor(8 * levelMultiplier * bossMultiplier),
    evasion: Math.floor(5 * levelMultiplier),
    criticalRate: Math.floor(5 * levelMultiplier),
    criticalDamage: 150,
  };

  const names = isBoss
    ? ['Shadow Dragon', 'Dark Overlord', 'Ancient Lich', 'Demon King', 'Void Emperor']
    : ['Goblin', 'Orc Warrior', 'Dark Mage', 'Skeleton Knight', 'Gargoyle', 'Wraith', 'Troll'];

  return {
    name: isBoss ? names[dungeonLevel % names.length] : names[Math.floor(Math.random() * names.length)],
    level: dungeonLevel,
    hp: Math.floor(baseHp),
    maxHp: Math.floor(baseHp),
    stats: baseStats,
    isBoss,
  };
}

// Combat calculation
export function calculateDamage(
  attacker: Adventurer | Enemy,
  defender: Adventurer | Enemy,
  skill?: Skill
): { damage: number; isCritical: boolean; evaded: boolean } {
  // Check evasion
  const evadeChance = defender.stats.evasion;
  const evaded = Math.random() * 100 < evadeChance;

  if (evaded) {
    return { damage: 0, isCritical: false, evaded: true };
  }

  // Calculate base damage
  const attackPower = attacker.stats.strength + attacker.stats.magic;
  const defense = defender.stats.defense;

  let baseDamage = Math.max(1, attackPower - defense * 0.5);

  // Skill multiplier
  if (skill) {
    baseDamage *= 1.5; // Skills do 50% more damage
  }

  // Check for critical hit
  const critChance = attacker.stats.criticalRate;
  const isCritical = Math.random() * 100 < critChance;

  if (isCritical) {
    baseDamage *= attacker.stats.criticalDamage / 100;
  }

  return { damage: Math.floor(baseDamage), isCritical, evaded: false };
}

// Simple enemy AI
export function enemyTurn(enemy: Enemy, adventurer: Adventurer): { damage: number; isCritical: boolean; evaded: boolean } {
  return calculateDamage(enemy, adventurer);
}
