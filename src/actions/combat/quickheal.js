import { formatDataLog } from '../../utils/formatDataLog'
import { energyRestore, instantUse } from './energy'
import { score } from '../../actions/score/score'

/**
  * @desc Computing the results of quick heal instant
*/

const quickheal = (data, item, id) => {
  let { player, opponent, game } = data

  let activePlayer = game.playerTurn ? { ...player } : { ...opponent }
  let targetPlayer = game.playerTurn ? { ...opponent } : { ...player }

  let healValue = item.value
  activePlayer = energyRestore(activePlayer, healValue, `hitPoints`)

  // Update instant counter
  activePlayer = instantUse(activePlayer, id)

  // Score
  data = score(data, `instant/quickheal/total`, `game`)
  data = score(data, `instant/quickheal/heal`, `game`, healValue)
  data = score(data, `heal`, `game`, healValue)

  // Build log
  let log = {
    type: `quickheal`,
    delay: `immediate`,
    activePlayer,
    targetPlayer,
    data: {
      healValue: healValue,
      icon: [item.type, item.id]
    }
  }
  log.display = formatDataLog(`quickheal`, log, game)

  // Apply changes
  data.player = game.playerTurn ? activePlayer : targetPlayer
  data.opponent = !game.playerTurn ? activePlayer : targetPlayer
  data.log = log
  data.dataLogs.push(formatDataLog(`quickheal`, log, game))

  return data
}

export { quickheal }
