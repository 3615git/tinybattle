import demon from '../pics/opponents/demon.png'
import leviathan from '../pics/opponents/leviathan.png'
import thanatos from '../pics/opponents/thanatos.png'
import gazer from '../pics/opponents/gazer.png'
import arcanegolem from '../pics/opponents/arcanegolem.png'
import dryad from '../pics/opponents/dryad.png'
import dragonemperor from '../pics/opponents/dragonemperor.png'
import blindworm from '../pics/opponents/blindworm.png'

const monsterTiers = {
  low: [`gazer`, `arcanegolem`, `dryad`, `blindworm`],
  // low: [`demon`],
  medium: [`thanatos`, `leviathan`],
  high: [`demon`,  `dragonemperor`]
}

const monsterList = {
  arcanegolem: {
    name: [`Arcane Golem`],
    STR: [3, 5],
    DEX: [3, 6],
    CON: [1, 2],
    MAG: [2, 3],
    LCK: [4, 7],
    fumble: 2,
    maxHitPoints: [10, 20],
    maxMagicPoints: [100, 200],
    items: [`STR`, `LCK`],
    pic: [arcanegolem]
  },
  blindworm: {
    name: [`Blind Worm`, `Cave Worm`],
    STR: [3, 5],
    DEX: [3, 6],
    CON: [1, 2],
    MAG: [2, 3],
    LCK: [4, 7],
    fumble: 2,
    maxHitPoints: [10, 20],
    maxMagicPoints: [100, 200],
    items: [`STR`, `LCK`],
    pic: [blindworm]
  },
  demon: {
    name: [`Korganas`, `Ilnokt`, `Banduuz`],
    STR: [8,12],
    DEX: [5,9],
    CON: [10,15],
    MAG: [2,6],
    LCK: [0,3],
    fumble: 2,
    maxHitPoints: [80,130],
    maxMagicPoints: [20, 30],
    items: [`STR`, `DEX`, `CON`, `MAG`, `LCK`],
    weapons: [`STR`, `MAG`],
    humanoid: true,
    elite: 70,
    pic: [demon]
  },
  dragonemperor: {
    name: [`Dragon Emperor`],
    STR: [8, 12],
    DEX: [5, 9],
    CON: [10, 15],
    MAG: [2, 6],
    LCK: [0, 3],
    fumble: 4,
    maxHitPoints: [80, 130],
    maxMagicPoints: [20, 30],
    items: [`STR`, `LCK`],
    weapons: [`STR`, `MAG`],
    pic: [dragonemperor]
  },
  dryad: {
    name: [`Dryad`],
    STR: [3, 5],
    DEX: [3, 6],
    CON: [1, 2],
    MAG: [2, 3],
    LCK: [4, 7],
    fumble: 2,
    maxHitPoints: [10, 20],
    maxMagicPoints: [100, 200],
    items: [`STR`, `LCK`],
    weapons: [`STR`],
    humanoid: true,
    pic: [dryad]
  },
  gazer: {
    name: [`Eldritch Abomination`, `Bo'orkh Ag'rh`],
    STR: [3, 5],
    DEX: [3, 6],
    CON: [2, 4],
    MAG: [10, 15],
    LCK: [4, 7],
    fumble: 2,
    maxHitPoints: [40, 70],
    maxMagicPoints: [100, 200],
    items: [`STR`, `DEX`, `MAG`, `LCK`],
    weapons: [`MAG`],
    humanoid: true,
    elite: 70,
    pic: [gazer]
  },
  leviathan: {
    name: [`Leviathan`],
    STR: [8, 12],
    DEX: [5, 9],
    CON: [10, 15],
    MAG: [2, 6],
    LCK: [0, 3],
    fumble: 4,
    maxHitPoints: [80, 130],
    maxMagicPoints: [20, 30],
    items: [`STR`, `LCK`],
    pic: [leviathan]
  },
  thanatos: {
    name: [`Thanatos`],
    STR: [8, 12],
    DEX: [5, 9],
    CON: [10, 15],
    MAG: [2, 6],
    LCK: [0, 3],
    fumble: 0,
    maxHitPoints: [80, 130],
    maxMagicPoints: [20, 30],
    items: [`STR`, `LCK`],
    humanoid: true,
    pic: [thanatos]
  }
}

export {
  monsterList,
  monsterTiers
}