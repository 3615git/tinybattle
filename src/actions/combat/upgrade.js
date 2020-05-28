import { formatDataLog } from '../../utils/formatDataLog'
import { pushBuff } from './stats'
import { instantUse } from './energy'
import { sideEffects } from '../../actions/settings/onNewItem'

/**
  * @desc Computing the results of upgrade instant
*/

const upgrade = (data, item, id) => {
  // Next state
  let nextData = JSON.parse(JSON.stringify(data))
  let { player, opponent, game } = nextData

  let activePlayer = game.playerTurn ? { ...player } : { ...opponent }
  let targetPlayer = game.playerTurn ? { ...opponent } : { ...player }

  let buffValue = item.value
  let buffChar = item.char
  let buffType = item.permancence

  // Push buff
  pushBuff(activePlayer, buffType, buffChar, buffValue, `instant`, 10)

  // Update instant counter
  activePlayer = instantUse(activePlayer, id)

  // Build log
  let log = {
    type: `upgrade`,
    delay: `immediate`,
    activePlayer,
    targetPlayer,
    data: {
      buffValue: buffValue,
      buffChar: buffChar,
      buffType: buffType,
      icon: [item.type, item.id]
    }
  }
  log.display = formatDataLog(`upgrade`, log, game)

  // Apply changes
  nextData.player = game.playerTurn ? activePlayer : targetPlayer
  nextData.opponent = !game.playerTurn ? activePlayer : targetPlayer

  // Compute side effects
  nextData = sideEffects(data, nextData, `upgrade`, buffChar)

  nextData.log = log
  nextData.dataLogs.push(formatDataLog(`upgrade`, log, game))

  return nextData
}

export { upgrade }
