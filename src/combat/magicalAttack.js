// import { diceRoll } from '../utils/utils'
import { magicalHit, magicalDamage } from '../combat/hit'
import { rage } from '../combat/rage'
import { manaBurn } from '../combat/mana'
import { pushBuff } from './stats'

/**
  * @desc Computing the basic magical attack results
*/

const magicalAttack = (data) => {
  let { player, opponent, game } = data

  let activePlayer = game.playerTurn ? {...player} : {...opponent}
  let targetPlayer = game.playerTurn ? {...opponent} : {...player}

  let damageResult, rageResult

  // Hit ?
  const hitResult = magicalHit(activePlayer, targetPlayer)

  // Amount of mana burned by item/attack
  let manaburnResult = activePlayer.items.MAG.cost ? activePlayer.items.MAG.cost : 0
  // Applying rage & mana burn
  rageResult = rage(`magicalAttack`, activePlayer, manaburnResult)
  activePlayer.magicalRage = rageResult
  activePlayer = manaBurn(activePlayer, manaburnResult)

  /* Compute damages */

  // Critical hit
  if (hitResult.hit && hitResult.critical) {
    damageResult = magicalDamage(activePlayer, targetPlayer, true)
    // Applying damage
    targetPlayer.hitPoints -= damageResult.damage
    if (targetPlayer.hitPoints < 0) targetPlayer.hitPoints = 0
  }
  // Normal hit
  else if (hitResult.hit && !hitResult.critical) {
    damageResult = magicalDamage(activePlayer, targetPlayer, false)
    // Applying damage
    targetPlayer.hitPoints -= damageResult.damage
    if (targetPlayer.hitPoints < 0) targetPlayer.hitPoints = 0
  }
  // Fumble miss
  else if (!hitResult.hit && hitResult.fumble) {
    // Give LCK bonus to opponent 
    pushBuff(targetPlayer, `temporary`, `LCK`, 1, 5)
    // Reset rage because of the fumble
    activePlayer.magicalRage = 0
  }
  // Miss
  else if (!hitResult.hit && !hitResult.fumble) {
    // nothing to do
  }

  // Build log
  let log = {
    type: `magicalAttack`,
    activePlayer,
    targetPlayer,
    data: {
      hit: hitResult,
      damage: damageResult
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

export { magicalAttack }
