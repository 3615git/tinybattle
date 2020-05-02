import demon from '../pics/opponents/demon.png'
import leviathan from '../pics/opponents/leviathan.png'
import thanatos from '../pics/opponents/thanatos.png'
import gazer from '../pics/opponents/gazer.png'
import arcanegolem from '../pics/opponents/arcanegolem.png'
import dryad from '../pics/opponents/dryad.png'
import dragonemperor from '../pics/opponents/dragonemperor.png'
import blindworm from '../pics/opponents/blindworm.png'
import gladius from '../pics/opponents/gladius.png'
import feralbeast from '../pics/opponents/feralbeast.png'
import feralbeast2 from '../pics/opponents/feralbeast2.png'
import bloodmage from '../pics/opponents/bloodmage.png'
import automaton from '../pics/opponents/automaton.png'
import astrallich from '../pics/opponents/astrallich.png'
import giantfish from '../pics/opponents/giantfish.png'
import stonegolem from '../pics/opponents/stonegolem.png'
import excelsios from '../pics/opponents/excelsios.png'
import golddragon from '../pics/opponents/golddragon.png'
import eldritchslime from '../pics/opponents/eldritchslime.png'
import hades from '../pics/opponents/hades.png'
import radulac from '../pics/opponents/radulac.png'
import tiamat from '../pics/opponents/tiamat.png'
import caveworm from '../pics/opponents/caveworm.png'
import crow from '../pics/opponents/crow.png'
import drakenvamp from '../pics/opponents/drakenvamp.png'
import garuda from '../pics/opponents/garuda.png'
import tenteye from '../pics/opponents/tenteye.png'
import voidgargoyle from '../pics/opponents/voidgargoyle.png'
import behemoth from '../pics/opponents/behemoth.png'
import warlock from '../pics/opponents/warlock.png'
import lamprey from '../pics/opponents/lamprey.png'

const monsterTiers = {
  1: [`gazer`, `arcanegolem`, `dryad`, `blindworm`, `eldritchslime`, `garuda`, `lamprey`],
  2: [`thanatos`, `leviathan`, `astrallich`, `giantfish`, `caveworm`, `behemoth`],
  3: [`gladius`, `feralbeast`, `stonegolem`, `golddragon`, `crow`, `tenteye`],
  4: [`bloodmage`, `automaton`, `excelsios`, `radulac`, `drakenvamp`, `warlock`],
  5: [`demon`, `dragonemperor`, `hades`, `tiamat`, `voidgargoyle`],
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
  },
  // Vrac
  gladius: {
    name: [`Gladius`],
    element: `darkness`,
    profile: `brute`,
    fumble: 1,
    items: [`STR`, `DEX`, `CON`, `MAG`, `LCK`],
    weapons: [`STR`, `MAG`],
    humanoid: true,
    elite: 70,
    pic: [gladius]
  },
  feralbeast: {
    name: [`Feral Beast`],
    element: `darkness`,
    profile: `brute`,
    fumble: 1,
    items: [`STR`, `DEX`, `CON`, `MAG`, `LCK`],
    weapons: [`STR`, `MAG`],
    humanoid: true,
    elite: 70,
    pic: [feralbeast, feralbeast2]
  },
  bloodmage: {
    name: [`Blood Mage`],
    element: `darkness`,
    profile: `brute`,
    fumble: 1,
    items: [`STR`, `DEX`, `CON`, `MAG`, `LCK`],
    weapons: [`STR`, `MAG`],
    humanoid: true,
    elite: 70,
    pic: [bloodmage]
  },
  automaton: {
    name: [`Ancient Automaton`],
    element: `darkness`,
    profile: `brute`,
    fumble: 1,
    items: [`STR`, `DEX`, `CON`, `MAG`, `LCK`],
    weapons: [`STR`, `MAG`],
    humanoid: true,
    elite: 70,
    pic: [automaton]
  },
  astrallich: {
    name: [`Astral Lich`],
    element: `darkness`,
    profile: `brute`,
    fumble: 1,
    items: [`STR`, `DEX`, `CON`, `MAG`, `LCK`],
    weapons: [`STR`, `MAG`],
    humanoid: true,
    elite: 70,
    pic: [astrallich]
  },
  giantfish: {
    name: [`Giant Fish`],
    element: `darkness`,
    profile: `brute`,
    fumble: 1,
    items: [`STR`, `DEX`, `CON`, `MAG`, `LCK`],
    weapons: [`STR`, `MAG`],
    humanoid: true,
    elite: 70,
    pic: [giantfish]
  },
  stonegolem: {
    name: [`Stone Golem`],
    element: `darkness`,
    profile: `brute`,
    fumble: 1,
    items: [`STR`, `DEX`, `CON`, `MAG`, `LCK`],
    weapons: [`STR`, `MAG`],
    humanoid: true,
    elite: 70,
    pic: [stonegolem]
  },
  excelsios: {
    name: [`Excelsios`],
    element: `darkness`,
    profile: `brute`,
    fumble: 1,
    items: [`STR`, `DEX`, `CON`, `MAG`, `LCK`],
    weapons: [`STR`, `MAG`],
    humanoid: true,
    elite: 70,
    pic: [excelsios]
  },
  golddragon: {
    name: [`Gold Dragon`],
    element: `darkness`,
    profile: `brute`,
    fumble: 1,
    items: [`STR`, `DEX`, `CON`, `MAG`, `LCK`],
    weapons: [`STR`, `MAG`],
    humanoid: true,
    elite: 70,
    pic: [golddragon]
  },
  eldritchslime: {
    name: [`Eldritch Slime`],
    element: `darkness`,
    profile: `brute`,
    fumble: 1,
    items: [`STR`, `DEX`, `CON`, `MAG`, `LCK`],
    weapons: [`STR`, `MAG`],
    humanoid: true,
    elite: 70,
    pic: [eldritchslime]
  },
  hades: {
    name: [`Hades`],
    element: `darkness`,
    profile: `brute`,
    fumble: 1,
    items: [`STR`, `DEX`, `CON`, `MAG`, `LCK`],
    weapons: [`STR`, `MAG`],
    humanoid: true,
    elite: 70,
    pic: [hades]
  },
  radulac: {
    name: [`Vampire Ghoul`],
    element: `darkness`,
    profile: `brute`,
    fumble: 1,
    items: [`STR`, `DEX`, `CON`, `MAG`, `LCK`],
    weapons: [`STR`, `MAG`],
    humanoid: true,
    elite: 70,
    pic: [radulac]
  },
  tiamat: {
    name: [`Tiamat`],
    element: `darkness`,
    profile: `brute`,
    fumble: 1,
    items: [`STR`, `DEX`, `CON`, `MAG`, `LCK`],
    weapons: [`STR`, `MAG`],
    humanoid: true,
    elite: 70,
    pic: [tiamat]
  },
  caveworm: {
    name: [`Worm`],
    element: `darkness`,
    profile: `brute`,
    fumble: 1,
    items: [`STR`, `DEX`, `CON`, `MAG`, `LCK`],
    weapons: [`STR`, `MAG`],
    humanoid: true,
    elite: 70,
    pic: [caveworm]
  },
  crow: {
    name: [`Dark Crow`],
    element: `darkness`,
    profile: `brute`,
    fumble: 1,
    items: [`STR`, `DEX`, `CON`, `MAG`, `LCK`],
    weapons: [`STR`, `MAG`],
    humanoid: true,
    elite: 70,
    pic: [crow]
  },
  drakenvamp: {
    name: [`Drakenvamp`],
    element: `darkness`,
    profile: `brute`,
    fumble: 1,
    items: [`STR`, `DEX`, `CON`, `MAG`, `LCK`],
    weapons: [`STR`, `MAG`],
    humanoid: true,
    elite: 70,
    pic: [drakenvamp]
  },
  garuda: {
    name: [`Garuda`],
    element: `darkness`,
    profile: `brute`,
    fumble: 1,
    items: [`STR`, `DEX`, `CON`, `MAG`, `LCK`],
    weapons: [`STR`, `MAG`],
    humanoid: true,
    elite: 70,
    pic: [garuda]
  },
  tenteye: {
    name: [`Tenteye`],
    element: `darkness`,
    profile: `brute`,
    fumble: 1,
    items: [`STR`, `DEX`, `CON`, `MAG`, `LCK`],
    weapons: [`STR`, `MAG`],
    humanoid: true,
    elite: 70,
    pic: [tenteye]
  },
  voidgargoyle: {
    name: [`Void Gargoyle`],
    element: `darkness`,
    profile: `brute`,
    fumble: 1,
    items: [`STR`, `DEX`, `CON`, `MAG`, `LCK`],
    weapons: [`STR`, `MAG`],
    humanoid: true,
    elite: 70,
    pic: [voidgargoyle]
  },
  behemoth: {
    name: [`Behemoth`],
    element: `darkness`,
    profile: `brute`,
    fumble: 1,
    items: [`STR`, `DEX`, `CON`, `MAG`, `LCK`],
    weapons: [`STR`, `MAG`],
    humanoid: true,
    elite: 70,
    pic: [behemoth]
  },
  warlock: {
    name: [`Ork Warlock`],
    element: `darkness`,
    profile: `brute`,
    fumble: 1,
    items: [`STR`, `DEX`, `CON`, `MAG`, `LCK`],
    weapons: [`STR`, `MAG`],
    humanoid: true,
    elite: 70,
    pic: [warlock]
  },
  lamprey: {
    name: [`Dragon Lamprey`],
    element: `darkness`,
    profile: `brute`,
    fumble: 1,
    items: [`STR`, `DEX`, `CON`, `MAG`, `LCK`],
    weapons: [`STR`, `MAG`],
    humanoid: true,
    elite: 70,
    pic: [lamprey]
  },
}

export {
  monsterProfiles,
  monsterList,
  monsterTiers
}