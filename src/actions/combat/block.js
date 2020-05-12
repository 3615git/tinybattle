import { pushBuff } from './stats'
import { energyRestore } from './energy'
import rpgDice from "rpgdicejs"
import { formatDataLog } from '../../utils/utils'

/**
  * @desc Computing the basic physical attack results
*/

const block = (data) => {
  let { player, opponent, game } = data

  let activePlayer = game.playerTurn ? {...player} : {...opponent}
  let targetPlayer = game.playerTurn ? {...opponent} : {...player}

  // Defends gives temporary DEX2 and healt restore but opponent will strike harder
  const DEXbonus = Math.ceil(activePlayer.DEX / 2)
  const STRbonus = Math.ceil(targetPlayer.STR / 2)
  pushBuff(activePlayer, `temporary`, `DEX`, DEXbonus, `block`)
  pushBuff(targetPlayer, `temporary`, `STR`, STRbonus, `block`)
  // Defends restores CON/2 + 1dCON life
  let healRoll = rpgDice.eval(`d`+activePlayer.CON)
  let healValue = Math.ceil(activePlayer.CON / 2) + healRoll.value
  activePlayer = energyRestore(activePlayer, healValue, `hitPoints`)
  // Defends also restore CON stamina
  activePlayer = energyRestore(activePlayer, activePlayer.CON, `stamina`)

  // Build logs
  let log = {
    type: `block`,
    activePlayer,
    targetPlayer,
    data: {
      dexBonus: DEXbonus,
      strBonus: STRbonus,
      healRoll: healRoll.value,
      healValue: healValue,
      maxHeal: activePlayer.CON
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
