import {
  GameState,
  GameAction,
  MOOD_LEVELS,
} from './types';
import {
  createAdventurer,
  trainStat,
  rest,
  visitTavern,
  getTopTrainedStats,
  getRandomSkills,
  createEnemy,
  calculateDamage,
  enemyTurn,
} from './gameLogic';

export const initialGameState: GameState = {
  adventurer: null,
  turn: 0,
  dungeonLevel: 1,
  currentDungeonLevel: 0,
  gameLog: ['Welcome to the Adventurer\'s School! Select your starting adventurer.'],
  trainingHistory: [],
  inCombat: false,
  enemy: null,
};

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SELECT_CHARACTER': {
      const names = {
        swordsman: 'Valor',
        mage: 'Arcanus',
        rogue: 'Shadow',
      };

      const adventurer = createAdventurer(
        action.characterClass,
        names[action.characterClass]
      );

      return {
        ...state,
        adventurer,
        turn: 1,
        gameLog: [
          ...state.gameLog,
          `${adventurer.name} the ${action.characterClass} joins your school!`,
          'Begin training to prepare for the Dungeon Tower!',
        ],
      };
    }

    case 'TRAIN_STAT': {
      if (!state.adventurer) return state;

      const result = trainStat(state.adventurer, action.stat);
      const newTrainingHistory = [...state.trainingHistory, action.stat];

      // Check if adventurer leveled up
      let additionalLog: string[] = [];

      if (result.adventurer.level > state.adventurer.level) {
        // Offer skill choices
        const topStats = getTopTrainedStats(newTrainingHistory);
        const availableSkills = getRandomSkills(topStats, result.adventurer.skills);

        if (availableSkills.length > 0) {
          additionalLog.push('Choose a new skill to learn!');
        }
      }

      return {
        ...state,
        adventurer: result.adventurer,
        turn: state.turn + 1,
        trainingHistory: newTrainingHistory,
        gameLog: [...state.gameLog, `Turn ${state.turn}: ${result.message}`, ...additionalLog],
      };
    }

    case 'REST': {
      if (!state.adventurer) return state;

      const result = rest(state.adventurer);

      return {
        ...state,
        adventurer: result.adventurer,
        turn: state.turn + 1,
        gameLog: [...state.gameLog, `Turn ${state.turn}: ${result.message}`],
      };
    }

    case 'TAVERN': {
      if (!state.adventurer) return state;

      const result = visitTavern(state.adventurer);

      return {
        ...state,
        adventurer: result.adventurer,
        turn: state.turn + 1,
        gameLog: [...state.gameLog, `Turn ${state.turn}: ${result.message}`],
      };
    }

    case 'ENTER_DUNGEON': {
      if (!state.adventurer) return state;

      const levelToChallenge = state.currentDungeonLevel + 1;

      // Check if it's the right turn
      if (state.turn % 10 !== 0) {
        return {
          ...state,
          gameLog: [
            ...state.gameLog,
            `The Dungeon Tower opens every 10 turns. Next opening: Turn ${Math.ceil(state.turn / 10) * 10}`,
          ],
        };
      }

      if (levelToChallenge > 10) {
        return {
          ...state,
          gameLog: [
            ...state.gameLog,
            'All dungeon levels have been conquered!',
          ],
        };
      }

      const isBoss = levelToChallenge === 10;
      const enemy = createEnemy(levelToChallenge, isBoss);

      return {
        ...state,
        inCombat: true,
        enemy,
        gameLog: [
          ...state.gameLog,
          `${state.adventurer.name} enters Dungeon Tower Level ${levelToChallenge}!`,
          `A ${enemy.name} (Lv ${enemy.level}) appears! HP: ${enemy.hp}`,
        ],
      };
    }

    case 'ATTACK': {
      if (!state.adventurer || !state.enemy || !state.inCombat) return state;

      const newState = { ...state };
      const newAdventurer = { ...state.adventurer };
      let newEnemy = { ...state.enemy };
      let newLog = [...state.gameLog];

      // Player attacks
      const playerAttack = calculateDamage(newAdventurer, newEnemy, action.skill);

      if (playerAttack.evaded) {
        newLog.push(`${newAdventurer.name}'s attack was evaded!`);
      } else {
        newEnemy.hp -= playerAttack.damage;
        const critText = playerAttack.isCritical ? ' CRITICAL!' : '';
        const skillText = action.skill ? ` using ${action.skill.name}` : '';
        newLog.push(
          `${newAdventurer.name} attacks${skillText} for ${playerAttack.damage} damage!${critText}`
        );
      }

      // Check if enemy is defeated
      if (newEnemy.hp <= 0) {
        const levelCompleted = newEnemy.level;
        newAdventurer.exp += newAdventurer.expToNextLevel; // Full level worth of exp
        newAdventurer.level += 1;
        newAdventurer.expToNextLevel = Math.floor(newAdventurer.expToNextLevel * 1.5);

        // Mood boost
        const moodIndex = MOOD_LEVELS.indexOf(newAdventurer.mood);
        const newMoodIndex = Math.min(MOOD_LEVELS.length - 1, moodIndex + 1);
        newAdventurer.mood = MOOD_LEVELS[newMoodIndex];

        // Update max HP
        const newMaxHp = 100 + newAdventurer.stats.defense * 5;
        newAdventurer.maxHp = newMaxHp;
        newAdventurer.hp = newMaxHp;

        newLog.push(
          `Victory! ${newEnemy.name} defeated!`,
          `${newAdventurer.name} gained a full level! Now level ${newAdventurer.level}!`,
          `Mood improved to ${newAdventurer.mood}!`
        );

        if (levelCompleted === 10) {
          newLog.push('CONGRATULATIONS! The Dungeon Tower has been conquered!');
        }

        return {
          ...newState,
          adventurer: newAdventurer,
          currentDungeonLevel: levelCompleted,
          inCombat: false,
          enemy: null,
          gameLog: newLog,
        };
      }

      // Enemy attacks back
      const enemyAttack = enemyTurn(newEnemy, newAdventurer);

      if (enemyAttack.evaded) {
        newLog.push(`${newEnemy.name}'s attack was evaded by ${newAdventurer.name}!`);
      } else {
        newAdventurer.hp -= enemyAttack.damage;
        const critText = enemyAttack.isCritical ? ' CRITICAL!' : '';
        newLog.push(
          `${newEnemy.name} attacks for ${enemyAttack.damage} damage!${critText}`
        );
      }

      // Check if adventurer is defeated
      if (newAdventurer.hp <= 0) {
        newAdventurer.hp = newAdventurer.maxHp; // Restore HP

        // 20% chance for condition
        if (Math.random() < 0.2) {
          const conditions = ['Injured', 'Hexed', 'Unmotivated'] as const;
          newAdventurer.condition = conditions[Math.floor(Math.random() * conditions.length)];
          newLog.push(
            `${newAdventurer.name} was defeated and returns to the school...`,
            `${newAdventurer.name} is now ${newAdventurer.condition}!`
          );
        } else {
          newLog.push(`${newAdventurer.name} was defeated and returns to the school...`);
        }

        // Lower mood
        const moodIndex = MOOD_LEVELS.indexOf(newAdventurer.mood);
        const newMoodIndex = Math.max(0, moodIndex - 1);
        newAdventurer.mood = MOOD_LEVELS[newMoodIndex];
        newLog.push(`Mood lowered to ${newAdventurer.mood}.`);

        return {
          ...newState,
          adventurer: newAdventurer,
          inCombat: false,
          enemy: null,
          gameLog: newLog,
        };
      }

      return {
        ...newState,
        adventurer: newAdventurer,
        enemy: newEnemy,
        gameLog: newLog,
      };
    }

    case 'USE_SKILL': {
      if (!state.adventurer || !state.enemy || !state.inCombat) return state;

      // Use the skill temporarily for this attack
      const tempAdventurer = { ...state.adventurer, stats: { ...state.adventurer.stats } };
      action.skill.effect(tempAdventurer);

      return gameReducer(state, { type: 'ATTACK', skill: action.skill });
    }

    case 'SELECT_SKILL': {
      if (!state.adventurer) return state;

      const newAdventurer = {
        ...state.adventurer,
        skills: [...state.adventurer.skills, action.skill],
      };

      return {
        ...state,
        adventurer: newAdventurer,
        gameLog: [
          ...state.gameLog,
          `${state.adventurer.name} learned ${action.skill.name}!`,
        ],
      };
    }

    case 'FLEE': {
      if (!state.adventurer || !state.enemy || !state.inCombat) return state;

      return {
        ...state,
        inCombat: false,
        enemy: null,
        gameLog: [
          ...state.gameLog,
          `${state.adventurer.name} fled from battle!`,
        ],
      };
    }

    case 'NEW_GAME': {
      return {
        ...initialGameState,
        gameLog: ['Welcome to the Adventurer\'s School! Select your starting adventurer.'],
      };
    }

    default:
      return state;
  }
}
