import { monsterInfo } from '../monsters/monster'
import { randomValue } from '../utils/utils'
import { gameSettings } from "../conf/settings"

function getLevelInfo(level, monsterTiers) {
  let levelMonsters
  
  // Tier switch
  levelMonsters = monsterTiers[Math.ceil(level / (gameSettings.maxLevel / gameSettings.zones))]

  const levelInfo = {
    monsters: levelMonsters
  }

  return levelInfo
}

function getMonsterFromLevel(level, monsterTiers, monsters) {
  const levelInfo = getLevelInfo(level, monsterTiers)
  // Todo : remove alredy played monsters from array
  const monster = randomValue(levelInfo.monsters)
  
  return monsterInfo(monster, level, monsters)
}

export {
  getMonsterFromLevel
}