import { pushBuff } from './stats'
import { formatDataLog } from '../../utils/utils'

/**
  * @desc Computing the results of magical defense
*/

const focus = (data) => {
  let { player, opponent, game } = data

  let activePlayer = game.playerTurn ? {...player} : {...opponent}
  let targetPlayer = game.playerTurn ? {...opponent} : {...player}

  // Defends gives temporary MAGx2, lasts 2 turns, but decreases DEX and STR by half
  const MAGbonus = Math.ceil(activePlayer.MAG * 2)
  const DEXmalus = -Math.abs(Math.ceil(activePlayer.DEX / 2))
  const STRmalus = -Math.abs(Math.ceil(targetPlayer.STR / 2))
  pushBuff(activePlayer, `temporary`, `DEX`, DEXmalus, `focus`, 2)
  pushBuff(activePlayer, `temporary`, `STR`, STRmalus, `focus`, 2)
  pushBuff(activePlayer, `temporary`, `MAG`, MAGbonus, `focus`, 2)

  // Build log
  let log = {
    type: `focus`,
    delay: `immediate`,
    activePlayer,
    targetPlayer,
    data: {
      dexMalus: DEXmalus,
      strMalus: STRmalus,
      magBonus: MAGbonus
    }
  }
  log.display = formatDataLog(`focus`, log, game)

  // Apply changes
  data.player = game.playerTurn ? activePlayer : targetPlayer
  data.opponent = !game.playerTurn ? activePlayer : targetPlayer
  data.log = log
  data.dataLogs.push(formatDataLog(`focus`, log, game))

  return data 
}

export { focus }
