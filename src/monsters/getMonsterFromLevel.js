import { monsterInfo } from '../monsters/monster'
import { monsterTiers } from '../monsters/monsterList'
import { randomValue } from '../utils/utils'

function getLevelInfo(level) {
  let levelMonsters
  
  // Tier switch
  switch (level) {
    case level = 3:
      levelMonsters = monsterTiers[`high`]
      break;
    case level = 2:
      levelMonsters = monsterTiers[`medium`]
      break;
    case level = 1:
      levelMonsters = monsterTiers[`low`]
      break;
    default:
      break;
  }

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