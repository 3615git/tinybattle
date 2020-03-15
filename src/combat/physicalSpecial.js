// import { diceRoll } from '../utils/utils'
import { rage } from '../combat/rage'
import { hit, damage } from '../combat/hit'

/**
  * @desc Computing the special physical attack results
*/

const physicalSpecial = (data) => {
  let { player, opponent, playerTurn } = data

  let activePlayer = playerTurn ? {...player} : {...opponent}
  let targetPlayer = playerTurn ? {...opponent} : {...player}

  let damageResult, rageResult

  // Hit ?
  const hitResult = hit(activePlayer, targetPlayer)

  // Compute damages
  if (hitResult.hit) {
    damageResult = damage(activePlayer, targetPlayer)
    rageResult = rage(`physicalAttack`, targetPlayer, damageResult.damage)
    // Applying damage
    targetPlayer.hitPoints -= damageResult.damage
    // Applying rage
    targetPlayer.physicalRage = rageResult
  }

  /*
  const roll = diceRoll(20)
  let special

  if (roll <= 3) {
    result -= parseInt(diceRoll(6))
    special = `fumble`
  }
  if (roll >= 17) {
    result += parseInt(diceRoll(6))
    special = `critical`
  }
  */

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
    playerTurn: !playerTurn,
    log: log
  } 

  return nextState 

}

export { physicalSpecial }
