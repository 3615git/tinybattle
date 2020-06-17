import { gameSettings } from "../../conf/settings"
import { getMonsterFromLevel } from '../../monsters/getMonsterFromLevel'

/**
  * @desc Creating new game
*/

const gameCreate = (data) => {
  // Set game state
  data.game.state = `gameCreate`

  // Prepare opponent roadmap
  const monsterTiers = data.monsterTiers
  const monsters = data.monsters
  let opponentMap = []
  let pastOpponents = []

  for (let level = 1; level <= gameSettings.maxLevel; level++) {
    let levelMonster
    // Boss
    if ( level % 5 === 0 ) {
      levelMonster = getMonsterFromLevel(level, monsterTiers, monsters, pastOpponents, true)
    } else {
      levelMonster = getMonsterFromLevel(level, monsterTiers, monsters, pastOpponents)
    }
    // Add to roadmap
    opponentMap.push(levelMonster)
    // Add monster to history
    pastOpponents.push(levelMonster.job)
  }

  data.game.opponentMap = opponentMap

  return data
}

export { gameCreate }
