import demon from '../pics/opponents/demon.png'
import leviathan from '../pics/opponents/leviathan.png'
import thanatos from '../pics/opponents/thanatos.png'
import gazer from '../pics/opponents/gazer.png'
import arcanegolem from '../pics/opponents/arcanegolem.png'
import dryad from '../pics/opponents/dryad.png'
import dragonemperor from '../pics/opponents/dragonemperor.png'
import blindworm from '../pics/opponents/blindworm.png'

const monsterTiers = {
  low: [`arcanegolem`],
  // low: [`gazer`, `arcanegolem`, `dryad`, `blindworm`],
  medium: [`thanatos`, `leviathan`],
  high: [`demon`,  `dragonemperor`]
}

const monsterProfiles = {
  brute: { STR: 10, DEX: 4, CON: 5, MAG: 1, LCK: 1 },     // High STR
  tank: { STR: 5, DEX: 4, CON: 11, MAG: 1, LCK: 1 },      // High CON
  duelist: { STR: 8, DEX: 9, CON: 2, MAG: 1, LCK: 4 },    // Hit strong, high luck, low HP
  archmage: { STR: 1, DEX: 1, CON: 3, MAG: 15, LCK: 2 },  // Ultra high MAG
  wizard: { STR: 2, DEX: 2, CON: 5, MAG: 11, LCK: 1 },    // High MAG
  balanced: { STR: 5, DEX: 5, CON: 5, MAG: 5, LCK: 2 },   // Full random
}

const monsterList = {
  arcanegolem: {
    name: [`Arcane Golem`, `Crystal Golem`, `Ice elemental`],
    element: `water`,
    profile: `tank`,
    boost: [`CON`],
    fumble: 2,
    elite: 10,
    pic: [arcanegolem]
  },
  blindworm: {
    name: [`Blind Worm`, `Cave Worm`, `Earth worm`],
    element: `earth`,
    profile: `brute`,
    fumble: 2,
    elite: 5,
    pic: [blindworm]
  },
  demon: {
    name: [`Korganas`, `Ilnokt`, `Banduuz`],
    element: `fire`,
    profile: `balanced`,
    boost: [`STR`, `MAG`],
    items: [`STR`, `DEX`, `CON`, `MAG`, `LCK`],
    weapons: [`STR`, `MAG`],
    humanoid: true,
    elite: 80,
    pic: [demon]
  },
  dragonemperor: {
    name: [`Dragon Emperor`],
    element: `darkness`,
    profile: `brute`,
    boost: [`CON`, `MAG`],
    fumble: 3,
    items: [`STR`, `DEX`, `CON`, `MAG`, `LCK`],
    weapons: [`STR`, `MAG`],
    humanoid: true,
    elite: 80,
    pic: [dragonemperor]
  },
  dryad: {
    name: [`Dryad`, `Sylve duelist`],
    element: `earth`,
    profile: `duelist`,
    boost: [`DEX`],
    fumble: 2,
    items: [`DEX`],
    weapons: [`STR`],
    humanoid: true,
    elite: 10,
    pic: [dryad]
  },
  gazer: {
    name: [`Eldritch Abomination`, `Boorkh Agrh`],
    element: `darkness`,
    profile: `archmage`,
    boost: [`MAG`],
    fumble: 2,
    items: [`MAG`, `LCK`],
    weapons: [`MAG`],
    humanoid: true,
    elite: 70,
    pic: [gazer]
  },
  leviathan: {
    name: [`Fire Wyvern`, `Fire Drake`, `Fire Worm`],
    element: `fire`,
    profile: `brute`,
    boost: [`CON`],
    fumble: 4,
    elite: 30,
    pic: [leviathan]
  },
  thanatos: {
    name: [`Thanatos`],
    element: `darkness`,
    profile: `wizard`,
    fumble: 0,
    items: [`STR`, `LCK`],
    weapons: [`STR`, `MAG`],
    humanoid: true,
    elite: 70,
    pic: [thanatos]
  }
}

export {
  monsterProfiles,
  monsterList,
  monsterTiers
}