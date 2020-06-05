import { magicalHit, magicalDamage } from './hit'
import { rage } from './rage'
import { energyBurn } from './energy'
import { pushBuff } from './stats'
import { formatDataLog } from '../../utils/formatDataLog'
import { findBuff } from '../../actions/combat/stats'
import { score } from '../../actions/score/score'

/**
  * @desc Computing the basic magical attack results
*/

const cast = (data, manaResest = false) => {
  let { player, opponent, game } = data

  let activePlayer = game.playerTurn ? {...player} : {...opponent}
  let targetPlayer = game.playerTurn ? {...opponent} : {...player}

  let damageResult, rageResult, rageResultDamage, displayEffect

  // Hit ?
  const hitResult = magicalHit(activePlayer, targetPlayer)

  // Amount of mana burned by item/attack
  let manaburnResult = activePlayer.weapons.MAG ? activePlayer.weapons.MAG.cost : 0
  // Applying rage & mana burn to player
  rageResult = rage(`cast`, activePlayer, manaburnResult)
  activePlayer.magicalRage = rageResult
  activePlayer = energyBurn(activePlayer, manaburnResult, `magical`)

  /* Compute damages */

  // Special effects
  const reflect = findBuff(activePlayer, `temporary`, `reflect`) > 0
  const boost = findBuff(activePlayer, `temporary`, `boost`) > 0

  if (reflect) displayEffect = "reflectEffect"
  if (boost) displayEffect = "boostEffect"

  // Critical hit
  if (hitResult.hit && hitResult.critical) {
    damageResult = magicalDamage(activePlayer, targetPlayer, true)

    // Applying damage
    if (boost) damageResult.damage = Math.round(damageResult.damage * 1.5)

    if (reflect) {
      activePlayer.hitPoints -= damageResult.damage
      if (activePlayer.hitPoints < 0) activePlayer.hitPoints = 0
    }
    else {
      targetPlayer.hitPoints -= damageResult.damage
      if (targetPlayer.hitPoints < 0) targetPlayer.hitPoints = 0
      // Applying physical rage to target player
      rageResultDamage = rage(`attack`, targetPlayer, damageResult.damage)
      targetPlayer.physicalRage = rageResultDamage
    }
    // Score
    data = score(data, `action/cast/critical`, `game`)
    data = score(data, `action/cast/damage`, `game`, damageResult.damage)
    data = score(data, `damage`, `game`, damageResult.damage)
  }
  // Normal hit
  else if (hitResult.hit && !hitResult.critical) {
    damageResult = magicalDamage(activePlayer, targetPlayer, false)
    
    // Applying damage
    if (boost) damageResult.damage = Math.round(damageResult.damage * 1.5)

    if (reflect) {
      activePlayer.hitPoints -= damageResult.damage
      if (activePlayer.hitPoints < 0) activePlayer.hitPoints = 0
    }
    else {
      targetPlayer.hitPoints -= damageResult.damage
      if (targetPlayer.hitPoints < 0) targetPlayer.hitPoints = 0
      // Applying physical rage to target player
      rageResultDamage = rage(`attack`, targetPlayer, damageResult.damage)
      targetPlayer.physicalRage = rageResultDamage
    }

    // Score
    data = score(data, `action/cast/hit`, `game`)
    data = score(data, `action/cast/damage`, `game`, damageResult.damage)
    data = score(data, `damage`, `game`, damageResult.damage)
  }
  // Fumble miss
  else if (!hitResult.hit && hitResult.fumble) {
    // Give LCK bonus to opponent 
    pushBuff(targetPlayer, `temporary`, `LCK`, 1, `castfumble`, 5)
    // Reset rage because of the fumble
    activePlayer.magicalRage = 0
    // Score
    data = score(data, `action/cast/fumble`, `game`)
  }
  // Miss
  else if (!hitResult.hit && !hitResult.fumble) {
    // Score
    data = score(data, `action/cast/miss`, `game`)
  }

  // Reset rage because of the special cast
  if (manaResest) activePlayer.magicalRage = 0

  // Score
  data = score(data, `action/cast/total`, `game`)

  // Build log
  let log = {
    type: `cast`,
    activePlayer,
    targetPlayer,
    data: {
      hit: hitResult,
      reflect: reflect,
      boost: boost,
      displayEffect: displayEffect,
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
