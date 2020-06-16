import { bestScore } from '../../actions/score/score'
import { getMonsterFromLevel } from '../../monsters/getMonsterFromLevel'
import { gameSettings } from "../../conf/settings"

/**
  * @desc Displaying next level number
*/

const levelTransition = (data) => {
  // Initialize level if needed
  if (typeof data.game.level !== 'number' || !data.game.level) data.game.level = 0
  // Increment level 
  const previousLevel = data.game.level
  data.game.level = previousLevel + 1
  // Set game state
  data.game.state = `levelTransition`


  // TO BE REMOVED : temporary endgame fix for Thomas :)
  if (data.game.level > gameSettings.maxLevel) data.game.level = gameSettings.maxLevel

  // Prepare opponent data from level
  const level = data.game.level
  const monsterTiers = data.monsterTiers
  const monsters = data.monsters

  // Create monster
  data.opponent = getMonsterFromLevel(level, monsterTiers, monsters, data.game.pastOpponents)

  // Add monster to history
  if (!data.game.pastOpponents) data.game.pastOpponents = [data.opponent.job]
  else data.game.pastOpponents.push(data.opponent.job)

  // Score
  data = bestScore(data, `maxlevel`, `run`, previousLevel + 1)

  return data
}

export { levelTransition }
