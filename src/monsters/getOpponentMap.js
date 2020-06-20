import { gameSettings } from "../conf/settings"
import { getMonsterFromLevel } from '../monsters/getMonsterFromLevel'

function getOpponentMap(monsters, monsterTiers, loop) {

  let opponentMap = []
  let pastOpponents = []

  for (let level = 1; level <= gameSettings.maxLevel; level++) {
    let levelMonster
    // Boss
    if ( level % 5 === 0 ) {
      levelMonster = getMonsterFromLevel(level, monsterTiers, monsters, pastOpponents, true, loop)
    } else {
      levelMonster = getMonsterFromLevel(level, monsterTiers, monsters, pastOpponents, false, loop)
    }
    // Add to roadmap
    opponentMap.push(levelMonster)
    // Add monster to history
    pastOpponents.push(levelMonster.job)
  }

  return opponentMap
}

export {
  getOpponentMap
}