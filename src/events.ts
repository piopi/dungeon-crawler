import { StatType, CharacterClass } from './types';

export interface RandomEvent {
  id: string;
  title: string;
  description: string;
  effect: 'inspiration' | 'boost' | 'challenge' | 'story';
}

export const INSPIRATION_EVENTS: RandomEvent[] = [
  {
    id: 'memory_flash',
    title: '💭 Distant Memory',
    description: 'Your adventurer recalls a technique from their predecessor...',
    effect: 'inspiration',
  },
  {
    id: 'dream_vision',
    title: '🌙 Prophetic Dream',
    description: 'In their sleep, visions of a legendary warrior guide their training...',
    effect: 'inspiration',
  },
  {
    id: 'mentor_whisper',
    title: '👤 Ancestral Whisper',
    description: 'The spirit of past heroes whispers secrets of power...',
    effect: 'inspiration',
  },
];

export const RANDOM_EVENTS: RandomEvent[] = [
  {
    id: 'traveling_merchant',
    title: '🎒 Traveling Merchant',
    description: 'A mysterious merchant offers exotic training equipment! Training effectiveness increased this turn!',
    effect: 'boost',
  },
  {
    id: 'festival_day',
    title: '🎉 Festival Day!',
    description: 'The town celebrates! Your adventurer gains a massive mood boost!',
    effect: 'boost',
  },
  {
    id: 'harsh_weather',
    title: '⛈️ Storm Warning',
    description: 'A terrible storm rolls in. Training is more difficult, but persistence builds character...',
    effect: 'challenge',
  },
  {
    id: 'rival_appears',
    title: '⚔️ A Rival Appears!',
    description: 'A cocky rival challenges your adventurer to prove themselves! Motivation increases!',
    effect: 'boost',
  },
  {
    id: 'old_friend',
    title: '🤝 Reunion',
    description: 'An old friend visits the school, sharing stories and wisdom...',
    effect: 'story',
  },
  {
    id: 'mysterious_letter',
    title: '📜 Mysterious Letter',
    description: 'A letter arrives from the Dungeon Tower, hinting at the dangers ahead...',
    effect: 'story',
  },
];

export const TRAINING_FLAVOR: Record<StatType, string[]> = {
  strength: [
    'swings the training sword with determination!',
    'lifts heavy weights until muscles burn!',
    'practices powerful strikes on the training dummy!',
    'channels raw power through focused exercises!',
  ],
  magic: [
    'studies ancient tomes deep into the night!',
    'practices intricate spell circles!',
    'meditates to expand magical reserves!',
    'channels mystical energies through their body!',
  ],
  defense: [
    'endures rigorous defensive drills!',
    'strengthens their resolve and fortitude!',
    'practices blocking and parrying techniques!',
    'trains their body to withstand punishment!',
  ],
  evasion: [
    'dodges flying projectiles with grace!',
    'performs agility drills and acrobatics!',
    'practices lightning-fast footwork!',
    'hones their reflexes to razor sharpness!',
  ],
  criticalRate: [
    'studies weak points and vital strikes!',
    'practices precision striking techniques!',
    'trains their eye to spot vulnerabilities!',
    'meditates on the perfect moment to strike!',
  ],
  criticalDamage: [
    'practices devastating finishing blows!',
    'studies the art of the killing strike!',
    'channels maximum power into each attack!',
    'learns to exploit critical weaknesses!',
  ],
};

export const VICTORY_PHRASES: string[] = [
  'stands victorious over their fallen foe!',
  'emerges triumphant from the battle!',
  'proves their worth as a true adventurer!',
  'conquers another floor of the tower!',
  'grows stronger from the challenge!',
];

export const DEFEAT_PHRASES: string[] = [
  'fought bravely but fell in combat...',
  'was overwhelmed by the enemy\'s power...',
  'retreats to fight another day...',
  'learns a harsh lesson from defeat...',
  'barely escapes with their life...',
];

export const CLASS_INTRO_STORIES: Record<CharacterClass, string> = {
  swordsman: `The door creaks open as a young warrior enters your school.

Their eyes burn with determination, their hand resting on a worn sword hilt. "I am Valor," they announce. "I've heard tales of your legendary academy. Train me, master, and I shall conquer the Dungeon Tower in your name!"

You nod approvingly. This one has the heart of a true swordsman - brave, steadfast, and unbreakable. The tower awaits, but first... training begins.`,

  mage: `A cloaked figure materializes in a shimmer of arcane light.

"Forgive the dramatic entrance," they say with a slight smile, lowering their hood. "I am Arcanus, and I seek mastery of the mystical arts." Their eyes glow with barely contained magical power. "The Dungeon Tower calls to me. Its secrets, its magic... I must claim them all."

You recognize that hunger for knowledge. This mage will either rise to greatness or be consumed by their ambition. Only time - and training - will tell.`,

  rogue: `You don't hear them enter. One moment you're alone, the next a shadow detaches itself from the corner.

"Name's Shadow," the lithe figure says, twirling a dagger casually. "Best rogue in three kingdoms, or so they say. But the Dungeon Tower? That's a challenge even I can't resist." They grin. "Train me to be better. Sharper. Deadlier."

A rogue with confidence is dangerous. A rogue with skill is legendary. Let's see which one this Shadow truly is.`,
};

export const INTRO_STORY = `The old manor creaks in the mountain wind. Once, these halls echoed with the clash of steel and the incantations of powerful mages. Once, YOU were the greatest adventurer the realm had ever known.

But age catches even heroes. Now you pass on your legacy - running an adventurer's school for those brave (or foolish) enough to challenge the Dungeon Tower.

The Tower. Ten levels of nightmares, each more deadly than the last. Countless have tried. None have succeeded. But perhaps... perhaps the next generation will succeed where others failed.

Today, a new student arrives at your door...`;
