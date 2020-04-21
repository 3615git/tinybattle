// Type of items for each char
const charItems = {
  humanoid: {
    STR: [`belt`, `glove`, `ring`],
    DEX: [`glove`, `ring`, `shoe`],
    CON: [`armor`, `helmet`, `shield`],
    MAG: [`amulet`, `book`, `ring`],
    LCK: [`amulet`, `crystal`, `gem`],
    physicalWeapon: [`axe`, `bow`, `flail`, `hammer`, `mace`, `morningstar`, `sword`],
    magicalWeapon: [`cross`, `sceptre`, `wand`]
  },
  beast: {
    STR: [],
    DEX: [],
    CON: [],
    MAG: [],
    LCK: [],
    physicalWeapon: [],
    magicalWeapon: []
  }
}

// Maximum power range of items for each char
const charPower = {
  STR: 20,
  DEX: 20,
  CON: 20,
  MAG: 20,
  LCK: 5
}

// Repartition of item quality
const itemQuality = {
  quality: [`normal`, `magic`, `rare`, `legendary`],
  basicWeight: [90, 5, 2, 1],
  eliteWeight: [40, 30, 20, 10]
}

const weaponElements = {
  elements: [`none`, `fire`, `water`, `earth`],
  basicWeight: [20, 1, 1, 1]
}

const itemQualityBonus = {
  normal: [0,0],
  magic: [1,3],
  rare: [4,6],
  legendary: [7,10]
}

const weaponDamage = {
  damage: [`d4`, `d6`, `d8`, `d10`, `d12`, `d20`],
  normal: [50, 40, 20, 10, 5, 1],
  magic: [10, 30, 40, 30, 30, 5],
  rare: [5, 10, 20, 30, 40, 10],
  legendary: [1, 5, 10, 40, 40, 15]
}

const weaponMultiplicator = {
  damage: [``, `2`, `3`, `4`, `5`],
  normal: [70, 20, 5, 1, 1],
  magic: [40, 40, 10, 3, 3],
  rare: [10, 50, 30, 8, 5],
  legendary: [1, 20, 40, 15, 10]
}

const weaponBonus = {
  damage: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  normal: [50, 50, 30, 20, 10, 5, 3, 2, 1, 1, 1],
  magic: [10, 50, 50, 30, 20, 10, 6, 4, 3, 2, 1],
  rare: [5, 10, 40, 50, 40, 30, 15, 10, 6, 4, 3],
  legendary: [1, 1, 10, 30, 40, 50, 40, 30, 20, 10, 8]
}

const weaponCost = {
  physicalWeapon: {
    normal: [10,20],
    magic: [8,15],
    rare: [6,10],
    legendary: [4,8]
  },
  magicalWeapon: {
    normal: [3,15],
    magic: [3,15],
    rare: [3,15],
    legendary: [3,15]
  }
}

// @todo : share variables https://itnext.io/sharing-variables-between-js-and-sass-using-webpack-sass-loader-713f51fa7fa0
const itemRanges = {
  "amulet": 43,
  "armor": 194,
  "axe": 120,
  "bag": 12,
  "belt": 2,
  "book": 25,
  "bow": 28,
  "coin": 12,
  "coins": 12,
  "cross": 36,
  "crystal": 12,
  "flail": 26,
  "gem": 13,
  "glove": 11,
  "hammer": 36,
  "helmet": 181,
  "mace": 71,
  "morningstar": 23,
  "potion": 60,
  "ring": 20,
  "sceptre": 22,
  "shield": 145,
  "shoe": 44,
  "sword": 162,
  "vial": 8,
  "wand": 18
}

export {
  charItems, 
  charPower,
  itemQuality,
  itemRanges,
  itemQualityBonus,
  weaponDamage,
  weaponMultiplicator, 
  weaponBonus,
  weaponCost,
  weaponElements
}