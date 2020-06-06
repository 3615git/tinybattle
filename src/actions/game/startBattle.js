import { formatDataLog } from '../../utils/formatDataLog'
import { forceScore, pushScore } from '../../actions/score/score'

/**
  * @desc Starting a new battle
*/

const startBattle = (data) => {
  // Reset log
  data.log = {} // was {type: `battleStart`}
  // Set dataLog to battleStart
  data.dataLogs = []
  data.dataLogs.push(formatDataLog(`battleStart`, data.log, data.game))
  // Set game state
  data.game.state = `battle`

  // Score
  data = forceScore(data, `battles/total`, `game`)
  data = forceScore(data, `opponents/${data.opponent.job}/total`, `alltime`)
  data = pushScore(data, `history`, `onlyrun`, [data.opponent.job, data.opponent.name, data.opponent.elite])

  return data
}

export { startBattle }
