# 🏰 Dungeon Tower - Adventurer's School 🏰

A retro-styled roguelike game where you play as a retired hero who runs an adventurer's school. Train aspiring heroes and help them conquer the legendary Dungeon Tower!

## 🎮 Game Overview

As the headmaster of an adventurer's school, your mission is to train young heroes to conquer the 10 levels of the Dungeon Tower. Choose from three unique character classes, each with their own strengths and weaknesses, and guide them through an intense 100-turn training regimen.

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 👥 Character Classes

### ⚔️ Swordsman
- **Strengths**: High Strength and Defense
- **Weaknesses**: Low Magic and Evasion
- **Playstyle**: Tanky frontline fighter who can take and deal heavy physical damage

### 🔮 Mage
- **Strengths**: Extremely high Magic
- **Weaknesses**: Low Strength and Defense
- **Playstyle**: Glass cannon that relies on magical power to overwhelm enemies

### 🗡️ Rogue
- **Strengths**: High Evasion, Critical Rate, and Critical Damage
- **Weaknesses**: Low Strength and Defense
- **Playstyle**: High-risk, high-reward assassin that relies on dodging and critical strikes

## 📊 Game Systems

### Stats Explained
- **Strength (STR)**: Increases physical attack damage
- **Magic (MAG)**: Increases magical attack damage
- **Defense (DEF)**: Reduces incoming damage and increases max HP
- **Evasion (EVA)**: Chance to completely dodge enemy attacks
- **Critical Rate (CRIT)**: Chance to land critical hits
- **Critical Damage (CRIT DMG)**: Damage multiplier for critical hits

### Training System
Each turn, you can train one of six stats. Training has the following mechanics:

- **Fatigue**: Increases with each training session, raising failure rate
- **Failure Rate**: Starts at 0%, increases by 2% per fatigue point
- **Success**: Grants full EXP and increases the trained stat
- **Failure**: Grants 50% EXP and may inflict negative conditions

#### Training Levels
- Every 5 successful training sessions for a stat increases its training level
- Each level grants +10% effectiveness for that stat's training
- Training experience persists between training sessions

### Mood System 😊
Your adventurer's mood affects training effectiveness:

- **Great** 🌟: +5% stat gains
- **Good** 😊: +2.5% stat gains
- **Neutral** 😐: No modifier
- **Bad** 😞: -2.5% stat gains
- **Awful** 😢: -5% stat gains

**Mood Management**:
- Fails lower mood by 1-2 levels
- Visit the **Tavern** to increase mood by 1-2 levels
- Dungeon victories increase mood

### Conditions 🤕
Adventurers can suffer from negative conditions:

- **Injured**: +20% failure rate on training
- **Hexed**: Trains a random stat instead of the chosen one
- **Unmotivated**: 20% chance to skip training entirely

**Removing Conditions**:
- Rest has a 30% chance to remove conditions
- Tavern has a 50% chance to remove Unmotivated

### Fatigue & Recovery 😴
- **Rest**: Reduces fatigue by 50% + 5 points
- Fatigue directly increases training failure rate
- Manage fatigue carefully to maintain training efficiency

### Skills System ✨
- Gain a new skill every time you level up
- Choose from 3 randomly selected skills based on your most-trained stats
- Skills can be used in combat to gain temporary stat boosts
- 18 unique skills tied to different stats

### Dungeon Tower 🏰
- Opens every **10th turn**
- 10 levels total, progressively harder enemies
- **Level 10**: Epic boss battle on turn 100

**Combat Mechanics**:
- Turn-based combat with basic attacks and skill usage
- **Victory**: Gain a full level worth of EXP and mood boost
- **Defeat**: 20% chance of gaining a negative condition, mood decreases
- Failed levels must be retried before the final boss

## 🎯 Winning Strategy

1. **Early Game (Turns 1-30)**:
   - Balance training between your class's strengths
   - Keep fatigue low with regular rest
   - Build mood at the tavern before dungeon runs

2. **Mid Game (Turns 31-70)**:
   - Focus on leveling up specific training levels
   - Collect powerful skills through strategic stat training
   - Prepare for progressively harder dungeon levels

3. **Late Game (Turns 71-100)**:
   - Max out your best stats
   - Ensure you have strong skills for the final boss
   - Keep mood and HP high before turn 100

## 🎨 Features

- ✅ Retro 8-bit pixel art aesthetic with Press Start 2P font
- ✅ Three unique character classes with distinct stat distributions
- ✅ Complex training system with fatigue and failure mechanics
- ✅ Mood system affecting training effectiveness
- ✅ Condition system adding challenge and variety
- ✅ 18 unique skills across 6 stat categories
- ✅ 10-level Dungeon Tower with progressive difficulty
- ✅ Turn-based combat with skills and basic attacks
- ✅ Comprehensive game log tracking all events
- ✅ Responsive design with retro styling

## 🛠️ Technologies Used

- **React 18** with TypeScript
- **Vite** for fast development and building
- **CSS3** for retro pixel-art styling
- **Google Fonts** (Press Start 2P)

## 📝 Game Design

This game draws inspiration from:
- Classic roguelikes (permadeath mechanics)
- Training simulators (stat progression)
- Monster raising games (mood and condition systems)
- Retro RPGs (8-bit aesthetic and turn-based combat)

## 🎮 Tips & Tricks

1. **Don't over-train**: High fatigue means high failure rates
2. **Use the tavern wisely**: Mood boosts are crucial for efficient training
3. **Plan your skills**: Focus training on stats you want skills for
4. **Conditions matter**: Rest or tavern can remove negative effects
5. **Dungeon timing**: Make sure you're ready every 10 turns
6. **Balance is key**: Don't neglect defense and evasion

## 🏆 Victory Condition

Successfully conquer all 10 levels of the Dungeon Tower by turn 100 to win the game!

## 📜 License

MIT

---

**Good luck, Headmaster! May your students become legendary heroes! 🌟**
