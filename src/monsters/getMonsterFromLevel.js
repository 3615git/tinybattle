import { monsterInfo } from '../monsters/monster'
import { monstersList } from '../monsters/monstersList'
import { randomKey } from '../utils/utils'

function getMonsterFromLevel(level) {
  const monster = randomKey(monstersList)
  return monsterInfo(monster)
}

export {
  getMonsterFromLevel
}