import { pushBuff } from './stats'
import { energyRestore } from './energy'
import { formatDataLog } from '../../utils/formatDataLog'
import { rage } from './rage'
import { score } from '../../actions/score/score'
import { getStat } from './stats'

/**
  * @desc Computing the basic physical attack results
*/

const block = (data) => {
  let { player, opponent, game } = data

  let activePlayer = game.playerTurn ? {...player} : {...opponent}
  let targetPlayer = game.playerTurn ? {...opponent} : {...player}

  // Defends gives temporary DEX and CON bonus but opponent will strike harder and MAG is reduced
  const activePlayerDEX = getStat(activePlayer, `DEX`)
  const activePlayerCON = getStat(activePlayer, `CON`)
  const activePlayerMAG = getStat(activePlayer, `MAG`)
  const targetPlayerSTR = getStat(targetPlayer, `STR`)
  // Computing bonus 
  const DEXbonus = Math.ceil(activePlayerDEX.total / 2)
  const CONbonus = activePlayerCON.total
  const MAGmalus = -Math.ceil(activePlayerMAG.total / 2)
  const STRbonus = Math.ceil(targetPlayerSTR.total / 2)
  // Applying buffs
  pushBuff(activePlayer, `temporary`, `DEX`, DEXbonus, `block`)
  pushBuff(activePlayer, `temporary`, `CON`, CONbonus, `block`)
  pushBuff(activePlayer, `temporary`, `MAG`, MAGmalus, `block`)
  pushBuff(targetPlayer, `temporary`, `STR`, STRbonus, `defending`)
  // Defends restores CON stamina
  activePlayer = energyRestore(activePlayer, activePlayer.CON, `stamina`)

  // Applying rage
  let rageBonus = activePlayer.CON
  let rageResult = rage(`attack`, activePlayer, rageBonus)
  activePlayer.physicalRage = rageResult

  // Score
  data = score(data, `action/block/total`, `game`)

  // Build logs
  let log = {
    type: `block`,
    delay: `immediate`,
    activePlayer,
    targetPlayer,
    data: {
      dexBonus: DEXbonus,
      conBonus: CONbonus,
      magMalus: MAGmalus,
      strBonus: STRbonus,
      rageBonus: rageBonus
    }
  }
  log.display = formatDataLog(`block`, log, game)

  // Apply changes
  data.player = game.playerTurn ? activePlayer : targetPlayer
  data.opponent = !game.playerTurn ? activePlayer : targetPlayer
  data.log = log
  data.dataLogs.push(formatDataLog(`block`, log, game))

  return data 
}

export { block }
