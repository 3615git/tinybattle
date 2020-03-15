import demon from '../pics/opponents/demon.png'
import leviathan from '../pics/opponents/leviathan.png'
import thanatos from '../pics/opponents/thanatos.png'

const monstersList = {
  demon: {
    name: [`Korganas`, `Ilnokt`, `Banduuz`],
    STR: [8,12],
    DEX: [5,9],
    CON: [10,15],
    MAG: [2,6],
    LCK: [0,3],
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
    maxHitPoints: [80, 130],
    maxMagicPoints: [20, 30],
    items: [`STR`, `LCK`],
    pic: [thanatos]
  }
}

export {
  monstersList
}