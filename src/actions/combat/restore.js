import { formatDataLog } from '../../utils/formatDataLog'
import { instantUse, energyRestore } from './energy'
import { score } from '../../actions/score/score'

/**
  * @desc Computing the results of restore instant
*/

const restore = (data, item, id) => {
  let { player, opponent, game } = data

  let activePlayer = game.playerTurn ? { ...player } : { ...opponent }
  let targetPlayer = game.playerTurn ? { ...opponent } : { ...player }

  // Restore energies
  activePlayer = energyRestore(activePlayer, 100, `magicPoints`)
  activePlayer = energyRestore(activePlayer, 100, `stamina`)
  activePlayer = energyRestore(activePlayer, 100, `skills`)

  // Update instant counter
  activePlayer = instantUse(activePlayer, id)

  // Score
  data = score(data, `instant/restore/total`, `game`)

  // Build log
  let log = {
    type: `restore`,
    delay: `immediate`,
    activePlayer,
    targetPlayer,
    data: {
      icon: [item.type, item.id]
    }
  }
  log.display = formatDataLog(`restore`, log, game)

  // Apply changes
  data.player = game.playerTurn ? activePlayer : targetPlayer
  data.opponent = !game.playerTurn ? activePlayer : targetPlayer
  data.log = log
  data.dataLogs.push(formatDataLog(`restore`, log, game))

  return data
}

export { restore }
