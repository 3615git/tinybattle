import { monsterList } from './monsterList'

function monsterName(monsterData) {
  // todo : bosses have a prefix
  return monsterData.name[Math.floor(Math.random() * monsterData.name.length)]
}

function monsterPic(monsterData) {
  return monsterData.pic[Math.floor(Math.random() * monsterData.pic.length)]
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
    maxMagicPoints: magicPoints
  }
}

function monsterInfo(type) {
  const monsterData = monsterList[type]
  const monsterSpecs = monsterStats(monsterData)

  return {
    name: monsterName(monsterData),
    job: type,
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
    items: {},
    weapons: {},
  }
}

export {
  monsterInfo
}