import { pushBuff } from './stats'
import { energyRestore } from './energy'
import { formatDataLog } from '../../utils/formatDataLog'
import { rage } from './rage'

/**
  * @desc Computing the basic physical attack results
*/

const block = (data) => {
  let { player, opponent, game } = data

  let activePlayer = game.playerTurn ? {...player} : {...opponent}
  let targetPlayer = game.playerTurn ? {...opponent} : {...player}

  // Defends gives temporary DEX and CON bonus but opponent will strike harder and MAG is reduced
  const DEXbonus = Math.ceil(activePlayer.DEX / 2)
  const CONbonus = activePlayer.CON
  const MAGmalus = -Math.ceil(activePlayer.MAG / 2)
  const STRbonus = Math.ceil(targetPlayer.STR / 2)
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
