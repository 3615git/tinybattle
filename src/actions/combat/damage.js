import { formatDataLog } from '../../utils/formatDataLog'
import { instantUse } from './energy'
import { score } from '../../actions/score/score'

/**
  * @desc Computing the results of damage instant
*/

const damage = (data, item, id) => {
  let { player, opponent, game } = data

  let activePlayer = game.playerTurn ? { ...player } : { ...opponent }
  let targetPlayer = game.playerTurn ? { ...opponent } : { ...player }

  let damageResult = item.value

  // Damage opponent
  targetPlayer.hitPoints -= damageResult
  if (targetPlayer.hitPoints < 0) targetPlayer.hitPoints = 0
  // Applying rage
  targetPlayer.physicalRage = damageResult

  // Update rumble ui
  data.game.opponentHit = true

  // Update instant counter
  activePlayer = instantUse(activePlayer, id)

  // Score
  data = score(data, `instant/damage/total`, `game`)
  data = score(data, `instant/damage/damage`, `game`, damageResult)
  data = score(data, `damage`, `game`, damageResult)

  // Build log
  let log = {
    type: `damage`,
    delay: `immediate`,
    activePlayer,
    targetPlayer,
    data: {
      icon: [item.type, item.id],
      damage: damageResult
    }
  }
  log.display = formatDataLog(`damage`, log, game)

  // Apply changes
  data.player = game.playerTurn ? activePlayer : targetPlayer
  data.opponent = !game.playerTurn ? activePlayer : targetPlayer
  data.log = log
  data.dataLogs.push(formatDataLog(`damage`, log, game))

  return data
}

export { damage }
