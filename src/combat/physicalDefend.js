import { pushBuff } from './stats'
import { heal } from './hit'
import rpgDice from "rpgdicejs"

/**
  * @desc Computing the basic physical attack results
*/

const physicalDefend = (data) => {
  let { player, opponent, game } = data

  let activePlayer = game.playerTurn ? {...player} : {...opponent}
  let targetPlayer = game.playerTurn ? {...opponent} : {...player}

  // // Defends gives temporary DEX2 and healt restore but opponent will strike harder
  const DEXbonus = Math.ceil(activePlayer.DEX / 2)
  const STRbonus = Math.ceil(targetPlayer.STR / 2)
  pushBuff(activePlayer, `temporary`, `DEX`, DEXbonus)
  pushBuff(targetPlayer, `temporary`, `STR`, STRbonus)
  // Defends restores CON/2 + 1dCON life
  let healRoll = rpgDice.eval(`d`+activePlayer.CON)
  let healValue = Math.ceil(activePlayer.CON / 2) + healRoll.value
  activePlayer = heal(activePlayer, healValue)

  // Build log
  let log = {
    type: `physicalDefend`,
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

  const nextState = {
    player: game.playerTurn ? activePlayer : targetPlayer,
    opponent: !game.playerTurn ? activePlayer : targetPlayer,
    game,
    log
  } 

  return nextState 
}

export { physicalDefend }
