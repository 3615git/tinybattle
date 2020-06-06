import { resetRage } from './rage'
import { pushBuff } from './stats'
import { attack } from './attack'
import { getStat } from './stats'
import { formatDataLog } from '../../utils/formatDataLog'
import { score } from '../../actions/score/score'

/**
  * @desc Computing the special physical attack results
*/

const specialattack = (data) => {
  let { player, opponent, game } = data

  let activePlayer = game.playerTurn ? { ...player } : { ...opponent }

  // Push DEX and STR buff for next attack
  const activePlayerDEX = getStat(activePlayer, `DEX`)
  const activePlayerSTR = getStat(activePlayer, `STR`)
  const activePlayerLCK = getStat(activePlayer, `LCK`)
  const strBonus = activePlayerDEX.natural
  const dexBonus = activePlayerSTR.natural
  const lckBonus = activePlayerLCK.natural

  pushBuff(activePlayer, `temporary`, `STR`, strBonus, `specialattack`)
  pushBuff(activePlayer, `temporary`, `DEX`, dexBonus, `specialattack`)
  pushBuff(activePlayer, `temporary`, `LCK`, lckBonus, `specialattack`)
  // Reset rage
  activePlayer = resetRage(`physical`, activePlayer)
  // Update data
  data.player = activePlayer

  // Score
  data = score(data, `action/specialattack/total`, `game`)

  // Build log
  let log = {
    type: `specialattack`,
    activePlayer,
    data: {
      strBonus,
      dexBonus,
      lckBonus
    }
  }

  // Logs
  data.dataLogs.push(formatDataLog(`specialattack`, log, game))

  // Returns updated physical attack
  return attack(data)
}

export { specialattack }
