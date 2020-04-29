import { monsterList } from './monsterList'
import { getMonsterItems } from './getMonsterItems'
import { getMonsterWeapons } from './getMonsterWeapons'
import { getMonsterReward } from './getMonsterReward'
import { getRandomInt } from '../utils/utils'

function monsterName(monsterData) {
  // todo : bosses have a prefix
  return monsterData.name[Math.floor(Math.random() * monsterData.name.length)]
}

function monsterPic(monsterData) {
  return monsterData.pic[Math.floor(Math.random() * monsterData.pic.length)]
}

// Check if current moster is elite level
function monsterElite(monsterData) {
  const eliteRate = monsterData.elite ? monsterData.elite : 0
  return getRandomInt(1, 100) <= eliteRate
}

function monsterStat(monsterData, stat) {
  // todo : bosses have better stats
  const statRange = monsterData[stat]
  const min = Math.min(...statRange) 
  const max = Math.max(...statRange) 

  // build array
  let rangeArray = []
  for (let index = min; index <= max; index++) {
    rangeArray.push(index)
  }
  return rangeArray[Math.floor(Math.random() * rangeArray.length)]
}

function monsterStats(monsterData) {
  // todo : bosses have better stats
  const hitPoints = monsterStat(monsterData, `maxHitPoints`)
  const magicPoints = monsterStat(monsterData, `maxMagicPoints`)
  return {
    STR: monsterStat(monsterData, `STR`),
    DEX: monsterStat(monsterData, `DEX`),
    CON: monsterStat(monsterData, `CON`),
    MAG: monsterStat(monsterData, `MAG`),
    LCK: monsterStat(monsterData, `LCK`),
    hitPoints: hitPoints,
    maxHitPoints: hitPoints,
    magicPoints: magicPoints,
    maxMagicPoints: magicPoints,
    items: monsterData.items,
    weapons: monsterData.weapons,
    humanoid: monsterData.humanoid
  }
}

function monsterInfo(type, level) {
  const monsterData = monsterList[type]
  const elite = monsterElite(monsterData)
  const monsterSpecs = monsterStats(monsterData)

  return {
    name: monsterName(monsterData),
    job: type,
    reward: getMonsterReward(level, elite),
    element: monsterData.element,
    elite: elite,
    humanoid: monsterData.humanoid ? true : false,
    pic: monsterPic(monsterData),
    STR: monsterSpecs[`STR`],
    DEX: monsterSpecs[`DEX`],
    CON: monsterSpecs[`CON`],
    MAG: monsterSpecs[`MAG`],
    LCK: monsterSpecs[`LCK`],
    fumble: monsterData.fumble,
    hitPoints: monsterSpecs[`hitPoints`],
    maxHitPoints: monsterSpecs[`maxHitPoints`],
    magicPoints: monsterSpecs[`magicPoints`],
    maxMagicPoints: monsterSpecs[`maxMagicPoints`],
    items: getMonsterItems(monsterSpecs[`items`], level, monsterSpecs[`humanoid`], elite),
    weapons: getMonsterWeapons(monsterSpecs[`weapons`], level, monsterSpecs[`humanoid`], elite)
  }
}

export {
  monsterInfo
}