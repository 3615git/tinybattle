import { diceRoll } from '../utils/utils'
import rpgDice from "rpgdicejs"

const toHit = (activePlayer, targetPlayer) => {
  // Item bonus / item malus
  const activePlayerItem = activePlayer.items.DEX ? activePlayer.items.DEX.score : 0
  const targetPlayerItem = targetPlayer.items.DEX ? targetPlayer.items.DEX.score : 0

  return 20 - (10 + activePlayer.DEX + activePlayerItem - targetPlayer.DEX - targetPlayerItem)
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
  const playerLuck = activePlayer.LCK
  const playerLuckItem = activePlayer.items.LCK ? activePlayer.items.LCK.score : 0
  return 20 - playerLuck - playerLuckItem
}

// Fumble chance
const fumbleChance = (activePlayer) => {
  return 1
}

// Damage count
const damage = (activePlayer, targetPlayer, critical) => {
  // Item bonus / item malus
  const activePlayerItem = activePlayer.items.STR ? activePlayer.items.STR.score : false
  const targetPlayerItem = targetPlayer.items.CON ? targetPlayer.items.CON.score : 0

  // Item damage
  let itemDamage = 0 
  let itemDamageResults = 0

  if (activePlayerItem) {
    let itemDamageRoll = rpgDice.eval(activePlayerItem)
    itemDamageResults = itemDamageRoll.render()
    itemDamage = itemDamageRoll.value
  }

  // Critical hit bonus, @TBT : ignores opponent CON + double STR
  let criticalBonus = critical ? activePlayer.STR + targetPlayer.CON : 0

  let damage = activePlayer.STR - targetPlayer.CON - targetPlayerItem + itemDamage + criticalBonus
  if (damage < 0) damage = 0
  
  return {
    roll: itemDamageResults,
    damage: damage
  }
}

export {
  toHit,
  hit, 
  damage,
  criticalChance,
  fumbleChance
}