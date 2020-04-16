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

const itemQualityBonus = {
  normal: [0,0],
  magic: [1,3],
  rare: [4,6],
  legendary: [7,10]
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
  itemQualityBonus
}