// Main game settings
const gameSettings = {
  maxLevel: 50, // Highest level of the game
  zones: 5, // Number of sections in levels (should be 5)
  monsterCharPointsRange: [20, 100], // Range of monsters points, from level 1 to last level
  eliteCharPointsRange: [50, 100], // elite % spec bonus
  beastHealthBoostRange: [30, 100], // non humanoid HP boost
  manualCharBoostRange: [30, 60], // manual char boost specified in monster settings
}

// Initial game state
const initialState = {
  game: {
    state: `welcome`,
    settings: {
      combatSpeed: 1500
    }
  }
}

// Default char settings
const defaultChars = {
  warrior: {
    STR: 8,
    DEX: 4,
    CON: 6,
    MAG: 2,
    LCK: 1,
    fumble: 1,
    startItem: `STR`
  },
  mage: {
    STR: 2,
    DEX: 5,
    CON: 4,
    MAG: 9,
    LCK: 1,
    fumble: 1,
    startItem: `MAG`
  },
  thief: {
    STR: 5,
    DEX: 6,
    CON: 4,
    MAG: 5,
    LCK: 2,
    fumble: 2,
    startItem: `DEX`
  }
}

const legacyItemsCount = (level) => {
  // Gain 1 legacy item every x level
  return Math.ceil(level/(gameSettings.maxLevel/gameSettings.zones))
}

export {
  initialState,
  gameSettings,
  defaultChars,
  legacyItemsCount
}