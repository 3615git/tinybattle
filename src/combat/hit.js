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

  return {
    roll: roll,
    toHit: toHit(activePlayer, targetPlayer),
    hit: hit
  }
}

// Damage count
const damage = (activePlayer, targetPlayer) => {
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

  const damage = activePlayer.STR - targetPlayer.CON - targetPlayerItem + itemDamage
  
  return {
    roll: itemDamageResults,
    damage: damage
  }
}

export {
  toHit,
  hit, 
  damage
}