// import { diceRoll } from '../utils/utils'
// import { rage } from '../combat/rage'
import { hit, damage } from '../combat/hit'

/**
  * @desc description of the component
  * @todo Use a todo tag to store future changes
*/

const physicalAttack = (data) => {
  let { player, opponent, playerTurn } = data

  let activePlayer = playerTurn ? {...player} : {...opponent}
  let targetPlayer = playerTurn ? {...opponent} : {...player}

  let damageResult

  // Hit ?
  const hitResult = hit(activePlayer, targetPlayer)

  console.log(hitResult)

  // Compute damages
  if (hitResult.hit) {
    damageResult = damage(activePlayer, targetPlayer)
    // Applying damage
    targetPlayer.hitPoints -= damageResult.damage
  }

  console.log(damageResult)

  /*

  let result = activePlayer.STR

  // todo : combat system
  // todo : add item bonus
  // todo : remove shield/dodge
  // todo : small functions for phy damage

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

  // Final HP count
  targetPlayer.hitPoints -= result

  // Rage
  // todo : return updated state
  // rage(`physical`, targetPlayer, result)

  // Display result
  // todo : only return updated data to log dispatcher
  // this.makeLog(`physicalAttack`, roll, special, result)

  */

  const nextState = {
    data: {
      player: playerTurn ? activePlayer : targetPlayer,
      opponent: !playerTurn ? activePlayer : targetPlayer,
      playerTurn: !playerTurn
    },
    log: hitResult.roll
  } 

  return nextState 

}

export { physicalAttack }
