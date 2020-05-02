import { monsterInfo } from '../monsters/monster'
import { monsterTiers } from '../monsters/monsterList'
import { randomValue } from '../utils/utils'
import { gameSettings } from "../conf/settings"

function getLevelInfo(level) {
  let levelMonsters
  
  // Tier switch
  levelMonsters = monsterTiers[Math.ceil(level / (gameSettings.maxLevel / gameSettings.zones))]

  const levelInfo = {
    monsters: levelMonsters
  }

  return levelInfo
}

function getMonsterFromLevel(level) {
  const levelInfo = getLevelInfo(level)
  // Todo : remove alredy played monsters from array
  const monster = randomValue(levelInfo.monsters)
  
  return monsterInfo(monster, level)
}

export {
  getMonsterFromLevel
}