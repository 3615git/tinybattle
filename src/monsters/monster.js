import { gameSettings } from '../conf/settings'
import { monsterProfiles, monsterPics } from './monsterList'
import { getMonsterItems } from './getMonsterItems'
import { getMonsterWeapons } from './getMonsterWeapons'
import { getMonsterReward } from './getMonsterReward'
import { getMonsterXp } from './getMonsterXp'
import { getRandomInt, randomValue, generateWeight } from '../utils/utils'

function monsterName(monsterData) {
  return monsterData.name[Math.floor(Math.random() * monsterData.name.length)]
}

function monsterPic(type) {
  // Try to find pic in pics array
  if (monsterPics[type]) return monsterPics[type]
  else return monsterPics[`mimic`]
}

// Check if current monster is elite level
function monsterElite(monsterData) {
  const eliteRate = monsterData.elite ? monsterData.elite : 0
  return getRandomInt(1, 100) <= eliteRate
}

function monsterStats(monsterData, level, elite) {
  const { maxLevel, monsterCharPointsRange, eliteCharPointsRange, beastHealthBoostRange, manualCharBoostRange } = gameSettings

  // Get points counts (base * level)
  let points = monsterCharPointsRange[0] + Math.round(((monsterCharPointsRange[1] - monsterCharPointsRange[0]) / maxLevel) * level)
  // Beasts have no items, so they have some bonus points
  if (!monsterData.humanoid) points += level * 6
  // Apply random elite bonus
  if (elite) points += Math.round(points * getRandomInt(eliteCharPointsRange[0], eliteCharPointsRange[1]) / 100)

  // Weight of points
  let chars = []
  let weights = []
  let profile = monsterProfiles[monsterData.profile]

  // Loops weights
  for (let [key, value] of Object.entries(profile)) {
    // LCK is not weighted
    if (key !== `LCK`) {
      chars.push(key)
      weights.push(value)
    }
  }
  const weighedPoints = generateWeight(chars, weights)

  // Draw randomized stats
  let monsterCHAR = []
  monsterCHAR[`LCK`] = monsterProfiles[monsterData.profile].LCK
  for (let index = 0; index < points; index++) {
    // Draw a point
    let draw = randomValue(weighedPoints)
    if (monsterCHAR[draw]) monsterCHAR[draw]++
    else monsterCHAR[draw] = 1
  }

  // Apply optional boost
  if (monsterData.boost) {
    for (let index = 0; index < monsterData.boost.length; index++) {
      monsterCHAR[monsterData.boost[index]] += Math.round(monsterCHAR[monsterData.boost[index]] * getRandomInt(manualCharBoostRange[0], manualCharBoostRange[1]) / 100)
    }
  }

  // Compute HP
  let hitPoints = monsterCHAR[`CON`] * 10
  
  // Beasts have a random HP boost
  if (!monsterData.humanoid) hitPoints += Math.round(hitPoints * getRandomInt(beastHealthBoostRange[0], beastHealthBoostRange[1]) / 100)
  const magicPoints = monsterCHAR[`MAG`] * 10 // Useless ATM

  return {
    STR: monsterCHAR[`STR`] ? monsterCHAR[`STR`] : 1,
    DEX: monsterCHAR[`DEX`] ? monsterCHAR[`DEX`] : 1,
    CON: monsterCHAR[`CON`] ? monsterCHAR[`CON`] : 1,
    MAG: monsterCHAR[`MAG`] ? monsterCHAR[`MAG`] : 1,
    LCK: monsterCHAR[`LCK`] ? monsterCHAR[`LCK`] : 1,
    hitPoints: hitPoints,
    maxHitPoints: hitPoints,
    magicPoints: magicPoints,
    maxMagicPoints: magicPoints,
    items: monsterData.items,
    weapons: monsterData.weapons,
    humanoid: monsterData.humanoid
  }
}

function monsterInfo(type, level, monsters) {
  const monsterData = monsters[type]
  // console.log(monsterData)
  const elite = monsterElite(monsterData)
  const monsterSpecs = monsterStats(monsterData, level, elite)
  const monsterItems = getMonsterItems(monsterSpecs[`items`], level, monsterSpecs[`humanoid`], elite)
  const monsterWeapons = getMonsterWeapons(monsterSpecs[`weapons`], level, monsterSpecs[`humanoid`], elite)
  const monsterXp = getMonsterXp(monsterSpecs, monsterItems)

  // Computing final HP
  let CONItemBuff = monsterItems[`CON`] && monsterItems[`CON`].score ? monsterItems[`CON`].score * 10 : 0
  let MAGItemBuff = monsterItems[`MAG`] && monsterItems[`MAG`].score ? monsterItems[`MAG`].score * 10 : 0

  return {
    name: monsterName(monsterData),
    job: type,
    xp: monsterXp,
    reward: getMonsterReward(level, elite),
    element: monsterData.element,
    elite: elite,
    humanoid: monsterData.humanoid ? true : false,
    pic: monsterPic(type),
    verticalPosition: monsterData.verticalPosition,
    STR: monsterSpecs[`STR`],
    DEX: monsterSpecs[`DEX`],
    CON: monsterSpecs[`CON`],
    MAG: monsterSpecs[`MAG`],
    LCK: monsterSpecs[`LCK`],
    fumble: monsterData.fumble,
    hitPoints: monsterSpecs[`hitPoints`] + CONItemBuff,
    maxHitPoints: monsterSpecs[`maxHitPoints`] + CONItemBuff,
    magicPoints: monsterSpecs[`magicPoints`] + MAGItemBuff,
    maxMagicPoints: monsterSpecs[`maxMagicPoints`] + MAGItemBuff,
    items: monsterItems,
    weapons: monsterWeapons
  }
}

export {
  monsterInfo, monsterPic
}