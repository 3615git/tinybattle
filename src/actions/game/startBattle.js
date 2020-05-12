import { formatDataLog } from '../../utils/utils'

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

  return data
}

export { startBattle }
