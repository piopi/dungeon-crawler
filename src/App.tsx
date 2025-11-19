import { useReducer, useState, useEffect, useRef } from 'react';
import { gameReducer, initialGameState } from './gameReducer';
import { CharacterClass, StatType, Skill } from './types';
import { getRandomSkills, getTopTrainedStats } from './gameLogic';
import './App.css';

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const [showSkillSelection, setShowSkillSelection] = useState(false);
  const [availableSkills, setAvailableSkills] = useState<Skill[]>([]);
  const logRef = useRef<HTMLDivElement>(null);
  const prevLevel = useRef<number>(0);

  // Auto-scroll game log
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [state.gameLog]);

  // Check for level up and skill selection
  useEffect(() => {
    if (state.adventurer && state.adventurer.level > prevLevel.current && prevLevel.current > 0) {
      const topStats = getTopTrainedStats(state.trainingHistory);
      const skills = getRandomSkills(topStats, state.adventurer.skills);
      if (skills.length > 0) {
        setAvailableSkills(skills);
        setShowSkillSelection(true);
      }
    }
    if (state.adventurer) {
      prevLevel.current = state.adventurer.level;
    }
  }, [state.adventurer?.level]);

  const handleSelectCharacter = (characterClass: CharacterClass) => {
    dispatch({ type: 'SELECT_CHARACTER', characterClass });
  };

  const handleTrain = (stat: StatType) => {
    dispatch({ type: 'TRAIN_STAT', stat });
  };

  const handleRest = () => {
    dispatch({ type: 'REST' });
  };

  const handleTavern = () => {
    dispatch({ type: 'TAVERN' });
  };

  const handleEnterDungeon = () => {
    dispatch({ type: 'ENTER_DUNGEON' });
  };

  const handleAttack = () => {
    dispatch({ type: 'ATTACK' });
  };

  const handleUseSkill = (skill: Skill) => {
    dispatch({ type: 'USE_SKILL', skill });
  };

  const handleSelectSkill = (skill: Skill) => {
    dispatch({ type: 'SELECT_SKILL', skill });
    setShowSkillSelection(false);
  };

  const handleFlee = () => {
    dispatch({ type: 'FLEE' });
  };

  const handleNewGame = () => {
    dispatch({ type: 'NEW_GAME' });
    prevLevel.current = 0;
  };

  const renderCharacterSelection = () => (
    <div className="character-selection fade-in">
      <div className="character-card" onClick={() => handleSelectCharacter('swordsman')}>
        <h3>⚔️ SWORDSMAN ⚔️</h3>
        <div className="character-stats">
          <div className="stat-row">
            <span>Strength:</span>
            <span style={{ color: '#a3be8c' }}>★★★★☆</span>
          </div>
          <div className="stat-row">
            <span>Magic:</span>
            <span style={{ color: '#bf616a' }}>★☆☆☆☆</span>
          </div>
          <div className="stat-row">
            <span>Defense:</span>
            <span style={{ color: '#88c0d0' }}>★★★☆☆</span>
          </div>
          <div className="stat-row">
            <span>Evasion:</span>
            <span style={{ color: '#d8dee9' }}>★☆☆☆☆</span>
          </div>
          <div className="stat-row">
            <span>Critical:</span>
            <span style={{ color: '#ebcb8b' }}>★★☆☆☆</span>
          </div>
          <p style={{ marginTop: '15px', fontSize: '8px', lineHeight: '1.6' }}>
            A stalwart warrior with high strength and defense. Excels in direct combat.
          </p>
        </div>
      </div>

      <div className="character-card" onClick={() => handleSelectCharacter('mage')}>
        <h3>🔮 MAGE 🔮</h3>
        <div className="character-stats">
          <div className="stat-row">
            <span>Strength:</span>
            <span style={{ color: '#bf616a' }}>★☆☆☆☆</span>
          </div>
          <div className="stat-row">
            <span>Magic:</span>
            <span style={{ color: '#a3be8c' }}>★★★★★</span>
          </div>
          <div className="stat-row">
            <span>Defense:</span>
            <span style={{ color: '#bf616a' }}>★☆☆☆☆</span>
          </div>
          <div className="stat-row">
            <span>Evasion:</span>
            <span style={{ color: '#d8dee9' }}>★★☆☆☆</span>
          </div>
          <div className="stat-row">
            <span>Critical:</span>
            <span style={{ color: '#ebcb8b' }}>★☆☆☆☆</span>
          </div>
          <p style={{ marginTop: '15px', fontSize: '8px', lineHeight: '1.6' }}>
            A powerful spellcaster with unmatched magic but fragile defenses.
          </p>
        </div>
      </div>

      <div className="character-card" onClick={() => handleSelectCharacter('rogue')}>
        <h3>🗡️ ROGUE 🗡️</h3>
        <div className="character-stats">
          <div className="stat-row">
            <span>Strength:</span>
            <span style={{ color: '#d8dee9' }}>★★☆☆☆</span>
          </div>
          <div className="stat-row">
            <span>Magic:</span>
            <span style={{ color: '#bf616a' }}>★☆☆☆☆</span>
          </div>
          <div className="stat-row">
            <span>Defense:</span>
            <span style={{ color: '#bf616a' }}>★☆☆☆☆</span>
          </div>
          <div className="stat-row">
            <span>Evasion:</span>
            <span style={{ color: '#a3be8c' }}>★★★★☆</span>
          </div>
          <div className="stat-row">
            <span>Critical:</span>
            <span style={{ color: '#a3be8c' }}>★★★★★</span>
          </div>
          <p style={{ marginTop: '15px', fontSize: '8px', lineHeight: '1.6' }}>
            A nimble assassin with devastating critical strikes and high evasion.
          </p>
        </div>
      </div>
    </div>
  );

  const renderAdventurerInfo = () => {
    if (!state.adventurer) return null;

    const { adventurer } = state;
    const hpPercent = (adventurer.hp / adventurer.maxHp) * 100;
    const expPercent = (adventurer.exp / adventurer.expToNextLevel) * 100;

    return (
      <div className="panel fade-in">
        <h2 className="panel-title">📜 ADVENTURER STATUS</h2>
        <div className="adventurer-info">
          <div className="info-row">
            <span className="info-label">Name:</span>
            <span className="info-value">{adventurer.name}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Class:</span>
            <span className="info-value">{adventurer.class.toUpperCase()}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Level:</span>
            <span className="info-value">{adventurer.level}</span>
          </div>

          <div className="hp-bar-container">
            <div style={{ fontSize: '9px', marginBottom: '5px', color: '#88c0d0' }}>HP</div>
            <div className="hp-bar">
              <div
                className={`hp-fill ${hpPercent < 30 ? 'low' : ''}`}
                style={{ width: `${hpPercent}%` }}
              />
              <div className="hp-text">
                {adventurer.hp} / {adventurer.maxHp}
              </div>
            </div>
          </div>

          <div className="hp-bar-container">
            <div style={{ fontSize: '9px', marginBottom: '5px', color: '#88c0d0' }}>EXP</div>
            <div className="hp-bar">
              <div className="hp-fill" style={{ width: `${expPercent}%`, background: 'linear-gradient(90deg, #ebcb8b 0%, #d08770 100%)' }} />
              <div className="hp-text">
                {adventurer.exp} / {adventurer.expToNextLevel}
              </div>
            </div>
          </div>

          <div className="info-row">
            <span className="info-label">Mood:</span>
            <span className={`info-value mood-${adventurer.mood.toLowerCase()}`}>
              {adventurer.mood}
            </span>
          </div>

          <div className="info-row">
            <span className="info-label">Fatigue:</span>
            <span className="info-value" style={{ color: adventurer.fatigue > 20 ? '#bf616a' : '#d8dee9' }}>
              {adventurer.fatigue}
            </span>
          </div>

          {adventurer.condition && (
            <div className="info-row">
              <span className="info-label">Condition:</span>
              <span className="condition">{adventurer.condition}</span>
            </div>
          )}

          <h3 style={{ color: '#88c0d0', fontSize: '11px', marginTop: '15px', marginBottom: '10px' }}>
            STATS
          </h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-name">STR</div>
              <div className="stat-value">{Math.floor(adventurer.stats.strength)}</div>
            </div>
            <div className="stat-item">
              <div className="stat-name">MAG</div>
              <div className="stat-value">{Math.floor(adventurer.stats.magic)}</div>
            </div>
            <div className="stat-item">
              <div className="stat-name">DEF</div>
              <div className="stat-value">{Math.floor(adventurer.stats.defense)}</div>
            </div>
            <div className="stat-item">
              <div className="stat-name">EVA</div>
              <div className="stat-value">{Math.floor(adventurer.stats.evasion)}%</div>
            </div>
            <div className="stat-item">
              <div className="stat-name">CRIT</div>
              <div className="stat-value">{Math.floor(adventurer.stats.criticalRate)}%</div>
            </div>
            <div className="stat-item">
              <div className="stat-name">CRIT DMG</div>
              <div className="stat-value">{Math.floor(adventurer.stats.criticalDamage)}%</div>
            </div>
          </div>

          {adventurer.skills.length > 0 && (
            <>
              <h3 style={{ color: '#88c0d0', fontSize: '11px', marginTop: '15px', marginBottom: '10px' }}>
                LEARNED SKILLS
              </h3>
              <div style={{ fontSize: '8px' }}>
                {adventurer.skills.map(skill => (
                  <div key={skill.id} style={{ marginBottom: '8px', padding: '8px', background: '#3b4252', border: '1px solid #4c566a' }}>
                    <div style={{ color: '#88c0d0', marginBottom: '3px' }}>{skill.name}</div>
                    <div style={{ color: '#d8dee9', fontSize: '7px', lineHeight: '1.4' }}>{skill.description}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const renderTrainingActions = () => {
    if (!state.adventurer || state.inCombat) return null;

    const isDungeonTurn = state.turn % 10 === 0 && state.turn > 0;
    const canChallengeDungeon = state.currentDungeonLevel < 10;

    return (
      <div className="panel fade-in">
        <h2 className="panel-title">🎯 TRAINING ACTIONS</h2>
        <div className="actions">
          <button className="btn btn-primary" onClick={() => handleTrain('strength')}>
            Train STR
          </button>
          <button className="btn btn-primary" onClick={() => handleTrain('magic')}>
            Train MAG
          </button>
          <button className="btn btn-primary" onClick={() => handleTrain('defense')}>
            Train DEF
          </button>
          <button className="btn btn-primary" onClick={() => handleTrain('evasion')}>
            Train EVA
          </button>
          <button className="btn btn-primary" onClick={() => handleTrain('criticalRate')}>
            Train CRIT
          </button>
          <button className="btn btn-primary" onClick={() => handleTrain('criticalDamage')}>
            Train CRIT DMG
          </button>
          <button className="btn btn-success" onClick={handleRest}>
            💤 Rest
          </button>
          <button className="btn btn-warning" onClick={handleTavern}>
            🍺 Tavern
          </button>
          {isDungeonTurn && canChallengeDungeon && (
            <button className="btn btn-danger" onClick={handleEnterDungeon} style={{ gridColumn: '1 / -1' }}>
              ⚔️ ENTER DUNGEON TOWER ⚔️
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderCombat = () => {
    if (!state.inCombat || !state.enemy || !state.adventurer) return null;

    const enemyHpPercent = (state.enemy.hp / state.enemy.maxHp) * 100;

    return (
      <div className="panel fade-in">
        <h2 className="panel-title">⚔️ COMBAT</h2>
        <div className="combat-container">
          <div className="enemy-info">
            <div className="enemy-name">{state.enemy.isBoss ? '👑' : '💀'} {state.enemy.name}</div>
            <div className="enemy-level">Level {state.enemy.level}</div>
            <div className="hp-bar-container">
              <div className="hp-bar">
                <div className="hp-fill" style={{ width: `${enemyHpPercent}%`, background: 'linear-gradient(90deg, #bf616a 0%, #d08770 100%)' }} />
                <div className="hp-text">
                  {state.enemy.hp} / {state.enemy.maxHp}
                </div>
              </div>
            </div>
          </div>

          <div className="actions">
            <button className="btn btn-danger" onClick={handleAttack}>
              ⚔️ Attack
            </button>
            <button className="btn btn-warning" onClick={handleFlee}>
              🏃 Flee
            </button>
          </div>

          {state.adventurer.skills.length > 0 && (
            <div className="skills-list">
              <div style={{ fontSize: '10px', color: '#88c0d0', marginBottom: '10px' }}>
                SKILLS
              </div>
              {state.adventurer.skills.map(skill => (
                <button
                  key={skill.id}
                  className="btn skill-btn"
                  onClick={() => handleUseSkill(skill)}
                >
                  <div className="skill-name">✨ {skill.name}</div>
                  <div className="skill-desc">{skill.description}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderGameInfo = () => {
    if (!state.adventurer) return null;

    const dungeonProgress = (state.currentDungeonLevel / 10) * 100;
    const nextDungeonTurn = Math.ceil(state.turn / 10) * 10;

    return (
      <div>
        <div className="turn-counter">
          <div>Turn <span className="turn-number">{state.turn}</span></div>
          {state.currentDungeonLevel < 10 && (
            <div style={{ fontSize: '9px', marginTop: '8px', color: '#d8dee9' }}>
              Next Dungeon: Turn {nextDungeonTurn}
            </div>
          )}
        </div>

        <div className="dungeon-progress">
          <div className="progress-title">🏰 DUNGEON TOWER PROGRESS</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${dungeonProgress}%` }} />
            <div className="progress-text">
              Level {state.currentDungeonLevel} / 10
            </div>
          </div>
          {state.currentDungeonLevel === 10 && (
            <div className="game-over fade-in" style={{ marginTop: '20px' }}>
              <h2>🎉 VICTORY! 🎉</h2>
              <div className="pixel-art">👑</div>
              <p style={{ fontSize: '10px', lineHeight: '1.8' }}>
                The Dungeon Tower has been conquered!<br />
                {state.adventurer.name} is a true hero!
              </p>
              <button className="btn btn-success" onClick={handleNewGame} style={{ marginTop: '20px' }}>
                New Game
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderSkillSelection = () => {
    if (!showSkillSelection) return null;

    return (
      <div className="modal-overlay">
        <div className="modal">
          <h2 className="modal-title">🌟 LEVEL UP! 🌟</h2>
          <p style={{ fontSize: '10px', textAlign: 'center', marginBottom: '20px', color: '#d8dee9' }}>
            Choose a new skill to learn:
          </p>
          <div className="skill-options">
            {availableSkills.map(skill => (
              <div
                key={skill.id}
                className="skill-option"
                onClick={() => handleSelectSkill(skill)}
              >
                <div style={{ color: '#88c0d0', fontSize: '11px', marginBottom: '10px' }}>
                  {skill.name}
                </div>
                <div style={{ color: '#d8dee9', fontSize: '8px', lineHeight: '1.6' }}>
                  {skill.description}
                </div>
                <div style={{ color: '#ebcb8b', fontSize: '7px', marginTop: '8px' }}>
                  Related to: {skill.relatedStat.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      <div className="game-title">
        <div>🏰 DUNGEON TOWER 🏰</div>
        <div className="subtitle">Adventurer's School</div>
      </div>

      {!state.adventurer && renderCharacterSelection()}

      {state.adventurer && (
        <>
          {renderGameInfo()}

          <div className="game-container">
            {renderAdventurerInfo()}
            {state.inCombat ? renderCombat() : renderTrainingActions()}
          </div>

          <div className="game-log" ref={logRef}>
            {state.gameLog.map((entry, index) => (
              <div key={index} className="log-entry">
                {entry}
              </div>
            ))}
          </div>

          <button
            className="btn btn-danger"
            onClick={handleNewGame}
            style={{ marginTop: '20px', width: '100%' }}
          >
            New Game
          </button>
        </>
      )}

      {renderSkillSelection()}
    </div>
  );
}

export default App;
