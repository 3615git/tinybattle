// import { diceRoll } from '../utils/utils'
import { magicalHit, magicalDamage } from './hit'
import { rage } from './rage'
import { energyBurn } from './energy'
import { pushBuff } from './stats'
import { formatDataLog } from '../../utils/utils'

/**
  * @desc Computing the basic magical attack results
*/

const cast = (data) => {
  let { player, opponent, game } = data

  let activePlayer = game.playerTurn ? {...player} : {...opponent}
  let targetPlayer = game.playerTurn ? {...opponent} : {...player}

  let damageResult, rageResult, rageResultDamage

  // Hit ?
  const hitResult = magicalHit(activePlayer, targetPlayer)

  // Amount of mana burned by item/attack
  let manaburnResult = activePlayer.weapons.MAG ? activePlayer.weapons.MAG.cost : 0
  // Applying rage & mana burn to player
  rageResult = rage(`cast`, activePlayer, manaburnResult)
  activePlayer.magicalRage = rageResult
  activePlayer = energyBurn(activePlayer, manaburnResult, `magical`)

  /* Compute damages */

  // Critical hit
  if (hitResult.hit && hitResult.critical) {
    damageResult = magicalDamage(activePlayer, targetPlayer, true)
    // Applying damage
    targetPlayer.hitPoints -= damageResult.damage
    if (targetPlayer.hitPoints < 0) targetPlayer.hitPoints = 0
    // Applying physical rage to target player
    rageResultDamage = rage(`attack`, targetPlayer, damageResult.damage)
    targetPlayer.physicalRage = rageResultDamage
  }
  // Normal hit
  else if (hitResult.hit && !hitResult.critical) {
    damageResult = magicalDamage(activePlayer, targetPlayer, false)
    // Applying damage
    targetPlayer.hitPoints -= damageResult.damage
    if (targetPlayer.hitPoints < 0) targetPlayer.hitPoints = 0
    // Applying physical rage to target player
    rageResultDamage = rage(`attack`, targetPlayer, damageResult.damage)
    targetPlayer.physicalRage = rageResultDamage
  }
  // Fumble miss
  else if (!hitResult.hit && hitResult.fumble) {
    // Give LCK bonus to opponent 
    pushBuff(targetPlayer, `temporary`, `LCK`, 1, `castfumble`, 5)
    // Reset rage because of the fumble
    activePlayer.magicalRage = 0
  }
  // Miss
  else if (!hitResult.hit && !hitResult.fumble) {
    // nothing to do
  }

  // Build log
  let log = {
    type: `cast`,
    activePlayer,
    targetPlayer,
    data: {
      hit: hitResult,
      damage: damageResult
    }
  }
  log.display = formatDataLog(`cast`, log, game)

  // Apply changes
  data.player = game.playerTurn ? activePlayer : targetPlayer
  data.opponent = !game.playerTurn ? activePlayer : targetPlayer
  data.log = log
  data.dataLogs.push(formatDataLog(`cast`, log, game))

  return data 
}

export { cast }
