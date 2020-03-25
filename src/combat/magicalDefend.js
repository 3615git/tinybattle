import { pushBuff } from './stats'
import { heal } from './hit'
import rpgDice from "rpgdicejs"

/**
  * @desc Computing the results of magical defense
*/

const magicalDefend = (data) => {
  let { player, opponent, game } = data

  let activePlayer = game.playerTurn ? {...player} : {...opponent}
  let targetPlayer = game.playerTurn ? {...opponent} : {...player}

  // Defends gives temporary MAGx3, lasts 2 turns, but decreases DEX and STR by half
  const MAGbonus = Math.ceil(activePlayer.MAG * 2)
  const DEXmalus = -Math.abs(Math.ceil(activePlayer.DEX / 2))
  const STRmalus = -Math.abs(Math.ceil(targetPlayer.STR / 2))
  pushBuff(activePlayer, `temporary`, `DEX`, DEXmalus, 1)
  pushBuff(activePlayer, `temporary`, `STR`, STRmalus, 1)
  pushBuff(activePlayer, `temporary`, `MAG`, MAGbonus, 2)

  // Build log
  let log = {
    type: `magicalDefend`,
    activePlayer,
    targetPlayer,
    data: {
      dexMalus: DEXmalus,
      strMalus: STRmalus,
      magBonus: MAGbonus
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

export { magicalDefend }
