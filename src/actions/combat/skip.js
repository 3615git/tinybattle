import { formatDataLog } from '../../utils/formatDataLog'

/**
  * @desc Skipping turn
*/

const skip = (data) => {
  let { player, opponent, game } = data

  let activePlayer = game.playerTurn ? {...player} : {...opponent}
  let targetPlayer = game.playerTurn ? {...opponent} : {...player}

  // Skip

  // Build logs
  let log = {
    type: `skip`,
    delay: `immediate`,
    activePlayer,
    targetPlayer,
    data: {}
  }
  log.display = formatDataLog(`skip`, log, game)

  // Apply changes
  data.player = game.playerTurn ? activePlayer : targetPlayer
  data.opponent = !game.playerTurn ? activePlayer : targetPlayer
  data.log = log
  data.dataLogs.push(formatDataLog(`skip`, log, game))

  return data 
}

export { skip }
