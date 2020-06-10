import { resetRage } from './rage'
import { pushBuff } from './stats'
import { cast } from './cast'
import { getStat } from './stats'
import { formatDataLog } from '../../utils/formatDataLog'
import { score } from '../../actions/score/score'

/**
  * @desc Computing the special magical attack results
*/

const specialcast = (data) => {
  let { player, opponent, game } = data

  let activePlayer = game.playerTurn ? { ...player } : { ...opponent }

  // Push DEX and STR buff for next attack
  const activePlayerMAG = getStat(activePlayer, `MAG`)
  const activePlayerLCK = getStat(activePlayer, `LCK`)
  const magBonus = activePlayerMAG.natural
  const lckBonus = activePlayerLCK.natural
  pushBuff(activePlayer, `temporary`, `MAG`, magBonus, `specialcast`)
  pushBuff(activePlayer, `temporary`, `LCK`, lckBonus, `specialcast`)
  // Reset rage
  activePlayer = resetRage(`magical`, activePlayer)
  // Update data
  data.player = activePlayer

  // Score
  data = score(data, `action/specialcast/total`, `game`)

  // Build log
  let log = {
    type: `specialcast`,
    activePlayer,
    data: {
      magBonus,
      lckBonus
    }
  }

  // Logs
  data.dataLogs.push(formatDataLog(`specialcast`, log, game))

  // Returns updated magical attack
  return cast(data, true)
}

export { specialcast }
