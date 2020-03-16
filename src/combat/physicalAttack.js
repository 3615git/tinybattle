// import { diceRoll } from '../utils/utils'
import { rage } from '../combat/rage'
import { hit, damage } from '../combat/hit'

/**
  * @desc Computing the basic physical attack results
*/

const physicalAttack = (data) => {
  let { player, opponent, playerTurn } = data

  let activePlayer = playerTurn ? {...player} : {...opponent}
  let targetPlayer = playerTurn ? {...opponent} : {...player}

  let damageResult, rageResult

  // Hit ?
  const hitResult = hit(activePlayer, targetPlayer)

  console.log(data)

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
    // Give edge to opponent 
    targetPlayer.edge ? targetPlayer.edge++ : targetPlayer.edge = 1
    // Reset rage because of the fumble
    activePlayer.physicalRage = 0
  }
  // Miss
  else if (!hitResult.hit && !hitResult.fumble) {
    // nothing to do
  }

  // Removes edge of the active player
  // activePlayer.edge = false

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
    player: playerTurn ? activePlayer : targetPlayer,
    opponent: !playerTurn ? activePlayer : targetPlayer,
    playerTurn,
    log
  } 

  return nextState 
}

export { physicalAttack }
