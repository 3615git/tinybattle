import { rage } from './rage'
import { physicalHit, physicalDamage } from './hit'
import { pushBuff } from './stats'
import { energyBurn } from './energy'
import { formatDataLog } from '../../utils/formatDataLog'
import { findBuff } from '../../actions/combat/stats'
import { score } from '../../actions/score/score'

/**
  * @desc Computing the basic physical attack results
*/

const attack = (data) => {
  let { player, opponent, game } = data

  let activePlayer = game.playerTurn ? {...player} : {...opponent}
  let targetPlayer = game.playerTurn ? {...opponent} : {...player}

  let damageResult, rageResult, displayEffect

  // Hit ?
  const hitResult = physicalHit(activePlayer, targetPlayer)

  // Amount of stamina burned by item/attack
  let staminaburnResult = activePlayer.weapons.STR ? activePlayer.weapons.STR.cost : 0
  // Applying stamina burn
  activePlayer = energyBurn(activePlayer, staminaburnResult, `physical`)

  /* Compute damages */

  // Special effects
  const reflect = findBuff(activePlayer, `temporary`, `reflect`) > 0
  const boost = findBuff(activePlayer, `temporary`, `boost`) > 0

  if (reflect) displayEffect = "reflectEffect"
  if (boost) displayEffect = "boostEffect"

  // Critical hit
  if (hitResult.hit && hitResult.critical) {
    damageResult = physicalDamage(activePlayer, targetPlayer, true)
    rageResult = rage(`attack`, targetPlayer, damageResult.damage)

    // Applying damage
    if (boost) damageResult.damage = Math.round(damageResult.damage * 1.5)

    if (reflect) {
      activePlayer.hitPoints -= damageResult.damage
      if (activePlayer.hitPoints < 0) activePlayer.hitPoints = 0
    }
    else {
      targetPlayer.hitPoints -= damageResult.damage
      if (targetPlayer.hitPoints < 0) targetPlayer.hitPoints = 0
      // Applying rage
      targetPlayer.physicalRage = rageResult
    }
    // Score
    data = score(data, `action/attack/critical`, `game`)
    data = score(data, `action/attack/damage`, `game`, damageResult.damage)
    data = score(data, `damage`, `game`, damageResult.damage)
  }
  // Normal hit
  else if (hitResult.hit && !hitResult.critical) {
    damageResult = physicalDamage(activePlayer, targetPlayer, false)
    rageResult = rage(`attack`, targetPlayer, damageResult.damage)

    // Applying damage
    if (boost) damageResult.damage = Math.round(damageResult.damage * 1.5)

    if (reflect) {
      activePlayer.hitPoints -= damageResult.damage
      if (activePlayer.hitPoints < 0) activePlayer.hitPoints = 0
    }
    else {
      targetPlayer.hitPoints -= damageResult.damage
      if (targetPlayer.hitPoints < 0) targetPlayer.hitPoints = 0
      // Applying rage
      targetPlayer.physicalRage = rageResult
    }

    // Score
    data = score(data, `action/attack/hit`, `game`)
    data = score(data, `action/attack/damage`, `game`, damageResult.damage)
    data = score(data, `damage`, `game`, damageResult.damage)
  }
  // Fumble miss
  else if (!hitResult.hit && hitResult.fumble) {
    // Give LCK bonus to opponent 
    pushBuff(targetPlayer, `temporary`, `LCK`, 1, `attackfumble`, 5)
    // Reset rage because of the fumble
    activePlayer.physicalRage = 0
    // Score
    data = score(data, `action/attack/fumble`, `game`)
  }
  // Miss
  else if (!hitResult.hit && !hitResult.fumble) {
    // Score
    data = score(data, `action/attack/miss`, `game`)
  }

  // Score
  data = score(data, `action/attack/total`, `game`)

  // Build log
  let log = {
    type: `attack`,
    activePlayer,
    targetPlayer,
    data: {
      hit: hitResult,
      critical: false,
      reflect: reflect,
      boost: boost,
      displayEffect: displayEffect,
      damage: damageResult
    }
  }
  log.display = formatDataLog(`attack`, log, game)

  // Apply changes
  data.player = game.playerTurn ? activePlayer : targetPlayer
  data.opponent = !game.playerTurn ? activePlayer : targetPlayer
  data.log = log
  data.dataLogs.push(formatDataLog(`attack`, log, game))

  return data 
}

export { attack }
