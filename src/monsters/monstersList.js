import demon from '../pics/opponents/demon.png'
import leviathan from '../pics/opponents/leviathan.png'
import thanatos from '../pics/opponents/thanatos.png'
import gazer from '../pics/opponents/gazer.png'
import mermaid from '../pics/opponents/mermaid.png'
import dragonemperor from '../pics/opponents/dragonemperor.png'

const monstersList = {
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
    items: [`STR`, `LCK`],
    pic: [demon]
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
    pic: [dragonemperor]
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
    pic: [thanatos]
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
    items: [`STR`, `LCK`],
    pic: [gazer]
  },
  mermaid: {
    name: [`Arliette`, `Sasha`],
    STR: [3, 5],
    DEX: [3, 6],
    CON: [2, 4],
    MAG: [10, 15],
    LCK: [4, 7],
    fumble: 2,
    maxHitPoints: [40, 70],
    maxMagicPoints: [100, 200],
    items: [`STR`, `LCK`],
    pic: [mermaid]
  }
}

export {
  monstersList
}