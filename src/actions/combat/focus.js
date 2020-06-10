import { pushBuff } from './stats'
import { formatDataLog } from '../../utils/formatDataLog'
import { score } from '../../actions/score/score'
import { getStat } from './stats'

/**
  * @desc Computing the results of magical defense
*/

const focus = (data) => {
  let { player, opponent, game } = data

  let activePlayer = game.playerTurn ? {...player} : {...opponent}
  let targetPlayer = game.playerTurn ? {...opponent} : {...player}

  // Defends gives temporary MAGx2, lasts 2 turns, but decreases DEX and STR by half
  const activePlayerMAG = getStat(activePlayer, `MAG`)
  const activePlayerDEX = getStat(activePlayer, `DEX`)
  const targetPlayerSTR = getStat(targetPlayer, `STR`)
  // Computing bonus 
  const MAGbonus = Math.ceil(activePlayerMAG.total)
  const DEXmalus = -Math.abs(Math.ceil(activePlayerDEX.total / 2))
  const STRmalus = -Math.abs(Math.ceil(targetPlayerSTR.total / 2))
  // Applying buffs
  pushBuff(activePlayer, `temporary`, `DEX`, DEXmalus, `focus`, 2)
  pushBuff(activePlayer, `temporary`, `STR`, STRmalus, `focus`, 2)
  pushBuff(activePlayer, `temporary`, `MAG`, MAGbonus, `focus`, 2)

  // Score
  data = score(data, `action/focus/total`, `game`)

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
