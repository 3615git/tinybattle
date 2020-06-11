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
  STR: 30,
  DEX: 30,
  CON: 30,
  MAG: 30,
  LCK: 5
}

// Repartition of item quality
const itemQuality = {
  1: {
    quality: [`normal`, `magic`, `rare`, `legendary`],
    basicWeight: [80, 20, 0, 0],
    eliteWeight: [80, 20, 5, 1]
  },
  2: {
    quality: [`normal`, `magic`, `rare`, `legendary`],
    basicWeight: [0, 80, 20, 0],
    eliteWeight: [0, 80, 20, 1]
  },
  3: {
    quality: [`normal`, `magic`, `rare`, `legendary`],
    basicWeight: [0, 20, 80, 0],
    eliteWeight: [0, 20, 80, 1]
  },
  4: {
    quality: [`normal`, `magic`, `rare`, `legendary`],
    basicWeight: [0, 0, 80, 20],
    eliteWeight: [0, 0, 80, 30]
  },
  5: {
    quality: [`normal`, `magic`, `rare`, `legendary`],
    basicWeight: [0, 0, 20, 80],
    eliteWeight: [0, 0, 20, 90]
  }
}

const weaponElements = {
  elementsonly: [`fire`, `water`, `earth`],
  elements: [`none`, `fire`, `water`, `earth`],
  basicWeight: [8, 1, 1, 1]
}

const setElementsToChar = {
  fire: `STR`,
  earth: `CON`,
  water: `MAG`
}

const setCharToElements = {
  STR: `fire`,
  CON: `earth`,
  MAG: `water`
}

const weaponDamage = {
  damage: [`d4`, `d6`, `d8`, `d10`, `d12`, `d20`],
  normal: [50, 40, 20, 10, 5, 1],
  magic: [10, 30, 40, 30, 30, 5],
  rare: [5, 10, 20, 30, 40, 10],
  legendary: [1, 5, 10, 40, 40, 15]
}

// @todo : balance this
const weaponMultiplicator = {
  damage: [``, `2`, `3`, `4`, `5`],
  normal: [70, 30, 0, 0, 0],
  magic: [40, 40, 10, 3, 0],
  rare: [0, 50, 30, 15, 5],
  legendary: [0, 0, 40, 40, 20]
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

const instantSpecs = {
  quickheal: {
    normal: {
      value: 20,
      type: `food`,
      id: [0, 34]
    },
    magic: {
      value: 40,
      type: `food`,
      id: [35, 44]
    },
    rare: {
      value: 60,
      type: `potion`,
      id: [14, 14]
    },
    legendary: {
      value: 100,
      type: `potion`,
      id: [42,42]
    }
  },
  restore: {
    normal: {
      type: `spell`,
      id: 0,
      charges: 1
    },
    magic: {
      type: `spell`,
      id: 0,
      charges: 2
    },
    rare: {
      type: `spell`,
      id: 0,
      charges: 3
    },
    legendary: {
      type: `spell`,
      id: 0,
      charges: 4
    }
  },
  temporaryupgrade: {
    normal: {
      value: 5,
      type: `vial`
    },
    magic: {
      value: 10,
      type: `vial`
    },
    rare: {
      value: 20,
      type: `vial`
    },
    legendary: {
      value: 30,
      type: `vial`
    }
  },
  temporaryluckupgrade: {
    normal: {
      value: 2,
      type: `skill`,
      id: 9,
      charges: 1
    },
    magic: {
      value: 4,
      type: `skill`,
      id: 9,
      charges: 1
    },
    rare: {
      value: 6,
      type: `skill`,
      id: 9,
      charges: 2
    },
    legendary: {
      value: 10,
      type: `skill`,
      id: 9,
      charges: 3
    }
  },
  permanentupgrade: {
    normal: {
      value: 2,
      type: `spell`
    },
    magic: {
      value: 4,
      type: `spell`
    },
    rare: {
      value: 6,
      type: `spell`
    },
    legendary: {
      value: 10,
      type: `spell`
    }
  },
  damage: {
    normal: {
      value: 20,
      type: `throw`,
      id: [0, 13]
    },
    magic: {
      value: 30,
      type: `throw`,
      id: [0, 13]
    },
    rare: {
      value: 60,
      type: `throw`,
      id: [14, 33]
    },
    legendary: {
      value: 100,
      type: `throw`,
      id: [14, 33]
    }
  },
  sharpenphysical: {
    normal: {
      type: `tool`,
      id: [0, 3],
      charges: 1
    },
    magic: {
      type: `tool`,
      id: [4, 7],
      charges: 2
    },
    rare: {
      type: `tool`,
      id: [8, 11],
      charges: 3
    },
    legendary: {
      type: `tool`,
      id: [8, 11],
      charges: 4
    }
  },
  sharpenmagical: {
    normal: {
      type: `tool`,
      id: [0, 3],
      charges: 1
    },
    magic: {
      type: `tool`,
      id: [4, 7],
      charges: 2
    },
    rare: {
      type: `tool`,
      id: [8, 11],
      charges: 3
    },
    legendary: {
      type: `tool`,
      id: [8, 11],
      charges: 4
    }
  },
}

const uniqueItems = {
  items: {
    STR: {
      fire: [70,71],
      water: [74,75],
      earth: [72,73],
      light: [78,79],
      darkness: [76,77]
    },
    DEX: {
      fire: [60,61],
      water: [64,65],
      earth: [62,63],
      light: [68,69],
      darkness: [66,67]
    },
    CON: {
      fire: [40,41],
      water: [44,45],
      earth: [42,43],
      light: [48,49],
      darkness: [46,47]
    },
    MAG: {
      fire: [50,51],
      water: [54,55],
      earth: [52,53],
      light: [58,59],
      darkness: [56,57]
    },
    LCK: {
      fire: [80],
      water: [82],
      earth: [81],
      light: [84],
      darkness: [83]
    }
  },
  weapons: {
    STR: {
      fire: [0,1,2,3],
      water: [8,9,10,11],
      earth: [4,5,6,7],
      light: [16,17,18,19],
      darkness: [12,13,14,15]
    },
    MAG: {
      fire: [20,21,22,23],
      water: [28,29,30,31],
      earth: [24,25,26,27],
      light: [36,37,38,39],
      darkness: [32,33,34,35]
    }
  }
}

// @todo : share variables https://itnext.io/sharing-variables-between-js-and-sass-using-webpack-sass-loader-713f51fa7fa0
const itemRanges = {
  "amulet": 42,
  "armor": 192,
  "axe": 119,
  "bag": 11,
  "belt": 1,
  "book": 24,
  "bow": 27,
  "coin": 11,
  "coins": 11,
  "cross": 35,
  "crystal": 11,
  "drops": 20,
  "flail": 25,
  "food": 44,
  "gem": 12,
  "glove": 10,
  "hammer": 35,
  "helmet": 180,
  "mace": 70,
  "morningstar": 22,
  "potion": 69,
  "ring": 19,
  "sceptre": 21,
  "shield": 144,
  "shoe": 43,
  "skill": 17,
  "spell": 47,
  "sword": 161,
  "throw": 33,
  "tool": 11,
  "unique": 84,
  "vial": 7,
  "wand": 17
}

export {
  charItems, 
  charPower,
  itemQuality,
  itemRanges,
  weaponDamage,
  weaponMultiplicator, 
  weaponBonus,
  weaponCost,
  weaponElements,
  instantSpecs,
  uniqueItems,
  setElementsToChar,
  setCharToElements
}