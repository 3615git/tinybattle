import { forceScore } from '../../actions/score/score'
import { getOpponentMap } from '../../monsters/getOpponentMap'

/**
  * @desc Enters permadeath loop
*/

const nextLoop = (data) => {

  // Set game state 
  data.game.state = `nextLoop`

  // Setting a loop counter (maybe multiple loops one day...)
  if (data.game.loop) data.game.loop = data.game.loop + 1
  else data.game.loop = 1

  // Reset run
  data.opponent = {}
  data.log = {}
  data.dataLogs = {}
  data.score.run = {}
  data.game.level = 0
  data.game.pastOpponents = []

  // Prepare opponent roadmap
  const monsterTiers = data.monsterTiers
  const monsters = data.monsters
  data.game.opponentMap = getOpponentMap(monsters, monsterTiers, true)

  // Score
  data = forceScore(data, `loops`, `alltime`)

  return data
}

export { nextLoop }
