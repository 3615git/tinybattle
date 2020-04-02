// import { diceRoll } from '../utils/utils'
import { rage } from './rage'
import { physicalHit, physicalDamage } from './hit'
import { pushBuff } from './stats'
import { energyBurn } from './energy'

/**
  * @desc Computing the basic physical attack results
*/

const physicalAttack = (data) => {
  let { player, opponent, game } = data

  let activePlayer = game.playerTurn ? {...player} : {...opponent}
  let targetPlayer = game.playerTurn ? {...opponent} : {...player}

  let damageResult, rageResult

  // Hit ?
  const hitResult = physicalHit(activePlayer, targetPlayer)

  // Amount of stamina burned by item/attack
  let staminaburnResult = activePlayer.weapons.STR ? activePlayer.weapons.STR.cost : 0
  // Applying stamina burn
  activePlayer = energyBurn(activePlayer, staminaburnResult, `physical`)

  /* Compute damages */

  // Critical hit
  if (hitResult.hit && hitResult.critical) {
    damageResult = physicalDamage(activePlayer, targetPlayer, true)
    rageResult = rage(`physicalAttack`, targetPlayer, damageResult.damage)
    // Applying damage
    targetPlayer.hitPoints -= damageResult.damage
    if (targetPlayer.hitPoints < 0) targetPlayer.hitPoints = 0
    // Applying rage
    targetPlayer.physicalRage = rageResult
  }
  // Normal hit
  else if (hitResult.hit && !hitResult.critical) {
    damageResult = physicalDamage(activePlayer, targetPlayer, false)
    rageResult = rage(`physicalAttack`, targetPlayer, damageResult.damage)
    // Applying damage
    targetPlayer.hitPoints -= damageResult.damage
    if (targetPlayer.hitPoints < 0) targetPlayer.hitPoints = 0
    // Applying rage
    targetPlayer.physicalRage = rageResult
  }
  // Fumble miss
  else if (!hitResult.hit && hitResult.fumble) {
    // Give LCK bonus to opponent 
    pushBuff(targetPlayer, `temporary`, `LCK`, 1, 5)
    // Reset rage because of the fumble
    activePlayer.physicalRage = 0
  }
  // Miss
  else if (!hitResult.hit && !hitResult.fumble) {
    // nothing to do
  }

  // Build log
  let log = {
    type: `physicalAttack`,
    activePlayer,
    targetPlayer,
    data: {
      hit: hitResult,
      critical: false,
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

export { physicalAttack }
