// Main game settings
const gameSettings = {
  maxLevel : 3,                // Highest level of the game
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
  // Gain 1 legacy item every 10 level
  return Math.ceil(level/10)
}

export {
  initialState,
  gameSettings,
  defaultChars,
  legacyItemsCount
}