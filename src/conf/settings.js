// Main game settings
const gameSettings = {
  maxLevel: 25, // Highest level of the game
  zones: 5, // Number of sections in levels (should be 5)
  combatSpeed: 3000,
  widgetDelay: 600,
  itemStateDelay: 2000,
  monsterCharPointsRange: [10, 100], // Range of monsters points, from level 1 to last level
  eliteCharPointsRange: [50, 100], // elite % spec bonus
  beastHealthBoostRange: [30, 100], // non humanoid HP boost
  manualCharBoostRange: [30, 60], // manual char boost specified in monster settings
  maxEnergyMultiplyer: {
    STR: 10,
    MAG: 10,
    CON: 10
  },
  skillsRecharge: {
    heal: 3,
    stun: 3,
    itembreak: 3,
    reflect: 4,
    psyblast: 3,
    curse: 3,
  },
  icons: {
    battleStart: [`book`, 1],
    block: [`skill`, 7],
    focus: [`skill`, 3],
    specialattack: [`skill`, 4],
    specialcast: [`skill`, 1],
    stun: [`skill`, 8],
    itembreak: [`skill`, 6],
    psyblast: [`skill`, 5],
    curse: [`skill`, 2],
    attackfumble: [`skill`, 9],
    castfumble: [`skill`, 9],
    critical: [`skill`, 10],
    fumble: [`skill`, 11],
    skip: [`skill`, 12],
    heal: [`skill`, 13],
    reflect: [`skill`, 14],
    defending: [`skill`, 15],
    boost: [`skill`, 16],
  }
}

// Initial game state
const initialState = {
  game: {
    state: `welcome`,
    settings: {
      combatSpeed: gameSettings.combatSpeed
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

// Default consumables
const defaultInstants = {
  warrior: [`quickheal`, `damage`, `sharpenphysical`],
  mage: [`quickheal`, `temporaryupgrade`, `sharpenmagical`],
  thief: [`quickheal`, `temporaryluckupgrade`, `restore`]
}

const legacyItemsCount = (level) => {
  // Gain 1 legacy item every x level
  return Math.ceil(level/(gameSettings.maxLevel/gameSettings.zones))
}

export {
  initialState,
  gameSettings,
  defaultChars,
  defaultInstants,
  legacyItemsCount
}