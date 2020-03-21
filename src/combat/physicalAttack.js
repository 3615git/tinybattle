// import { diceRoll } from '../utils/utils'
import { rage } from '../combat/rage'
import { hit, damage } from '../combat/hit'
import { pushBuff } from './stats'

/**
  * @desc Computing the basic physical attack results
*/

const physicalAttack = (data) => {
  let { player, opponent, game } = data

  let activePlayer = game.playerTurn ? {...player} : {...opponent}
  let targetPlayer = game.playerTurn ? {...opponent} : {...player}

  let damageResult, rageResult

  // Hit ?
  const hitResult = hit(activePlayer, targetPlayer)

  /* Compute damages */

  // Critical hit
  if (hitResult.hit && hitResult.critical) {
    damageResult = damage(activePlayer, targetPlayer, true)
    rageResult = rage(`physicalAttack`, targetPlayer, damageResult.damage)
    // Applying damage
    targetPlayer.hitPoints -= damageResult.damage
    if (targetPlayer.hitPoints < 0) targetPlayer.hitPoints = 0
    // Applying rage
    targetPlayer.physicalRage = rageResult
  }
  // Normal hit
  else if (hitResult.hit && !hitResult.critical) {
    damageResult = damage(activePlayer, targetPlayer, false)
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
