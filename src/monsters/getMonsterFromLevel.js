import { monsterInfo } from '../monsters/monster'
import { randomValue } from '../utils/utils'
import { gameSettings } from "../conf/settings"

function getLevelInfo(level, monsterTiers, boss=false) {
  let levelMonsters

  // Tier switch
  if (boss) {
    levelMonsters = monsterTiers['boss-'+Math.ceil(level / (gameSettings.maxLevel / gameSettings.zones))]
  } else {
    levelMonsters = monsterTiers[Math.ceil(level / (gameSettings.maxLevel / gameSettings.zones))]
  }

  const levelInfo = {
    monsters: levelMonsters
  }

  return levelInfo
}

function getMonsterFromLevel(level, monsterTiers, monsters, pastOpponents, boss=false) {
  const levelInfo = getLevelInfo(level, monsterTiers, boss)
  // Remove alredy played monsters from array
  let availableOpponents
  if (pastOpponents) {
    availableOpponents = levelInfo.monsters.filter(function (el) {
      return pastOpponents.indexOf(el) < 0
    })
  } else {
    availableOpponents = levelInfo.monsters
  }

  const monster = randomValue(availableOpponents)
  
  return monsterInfo(monster, level, monsters)
}

export {
  getMonsterFromLevel
}