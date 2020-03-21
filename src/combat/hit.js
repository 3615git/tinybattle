import { diceRoll } from '../utils/utils'
import { getStat } from '../combat/stats'
import rpgDice from "rpgdicejs"

const toHit = (activePlayer, targetPlayer) => {
  // Get DEX from both players
  const activePlayerDEX = getStat(activePlayer, `DEX`)
  const targetPlayerDEX = getStat(targetPlayer, `DEX`)

  return 20 - (10 + activePlayerDEX.total - targetPlayerDEX.total)
}

// Hit chance
const hit = (activePlayer, targetPlayer) => {
  const roll = diceRoll(20)
  const hit = roll >= toHit(activePlayer, targetPlayer)
  const critical = roll >= criticalChance(activePlayer)
  const fumble = roll <= fumbleChance(activePlayer)

  return {
    roll,
    toHit: toHit(activePlayer, targetPlayer),
    hit,
    critical,
    fumble
  }
}

// Critical chance
const criticalChance = (activePlayer) => {
  const playerLuck = getStat(activePlayer, `LCK`)
  
  return 20 - playerLuck.total
}

// Fumble chance
const fumbleChance = (activePlayer) => {
  return activePlayer.fumble
}

// Damage count
const damage = (activePlayer, targetPlayer, critical) => {
  // Item bonus / item malus
  const activePlayerSTR = getStat(activePlayer, `STR`)
  const targetPlayerCON = getStat(targetPlayer, `CON`)
  // Weapon
  const activePlayerItem = activePlayer.items.STR ? activePlayer.items.STR.score : false

  // Item damage
  let itemDamage = 0 
  let itemDamageResults = 0

  if (activePlayerItem) {
    let itemDamageRoll = rpgDice.eval(activePlayerItem)
    itemDamageResults = itemDamageRoll.render()
    itemDamage = itemDamageRoll.value
  }

  // Critical hit bonus, @TBT : ignores opponent CON + double STR
  let criticalBonus = critical ? activePlayerSTR.total + targetPlayerCON.total : 0

  let damage = activePlayerSTR.total - targetPlayerCON.total + itemDamage + criticalBonus
  if (damage < 0) damage = 0
  
  return {
    roll: itemDamageResults,
    damage: damage
  }
}

// Heal a player
const heal = (player, value) => {
  player.hitPoints += value
  if (player.hitPoints > player.maxHitPoints) player.hitPoints = player.maxHitPoints
  return player
}

export {
  toHit,
  hit, 
  heal,
  damage,
  criticalChance,
  fumbleChance
}