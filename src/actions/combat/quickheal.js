import { formatDataLog } from '../../utils/formatDataLog'
import { energyRestore } from './energy'

/**
  * @desc Computing the results of quick heal instant
*/

const quickheal = (data, item) => {
  let { player, opponent, game } = data

  let activePlayer = game.playerTurn ? { ...player } : { ...opponent }
  let targetPlayer = game.playerTurn ? { ...opponent } : { ...player }
  console.log(item)
  let healValue = item.value
  activePlayer = energyRestore(activePlayer, healValue, `hitPoints`)

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
