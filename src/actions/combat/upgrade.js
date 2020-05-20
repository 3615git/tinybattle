import { formatDataLog } from '../../utils/formatDataLog'
import { pushBuff } from './stats'
import { instantUse } from './energy'

/**
  * @desc Computing the results of upgrade instant
*/

const upgrade = (data, item, id) => {
  let { player, opponent, game } = data

  let activePlayer = game.playerTurn ? { ...player } : { ...opponent }
  let targetPlayer = game.playerTurn ? { ...opponent } : { ...player }

  let buffValue = item.value
  let buffChar = item.char
  let buffType = item.permancence

  // Push bugff
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
  data.player = game.playerTurn ? activePlayer : targetPlayer
  data.opponent = !game.playerTurn ? activePlayer : targetPlayer
  data.log = log
  data.dataLogs.push(formatDataLog(`upgrade`, log, game))

  return data
}

export { upgrade }
