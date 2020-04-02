import { diceRoll } from '../../utils/utils'
import { getStat } from './stats'
import rpgDice from "rpgdicejs"

const toHit = (activePlayer, targetPlayer, type) => {
  if (type === `physical`) {
    // Get DEX from both players
    const activePlayerDEX = getStat(activePlayer, `DEX`)
    const targetPlayerDEX = getStat(targetPlayer, `DEX`)
  
    return 20 - (10 + activePlayerDEX.total - targetPlayerDEX.total)
  }
  if (type === `magical`) {
    // Get MAG from both players
    const activePlayerMAG = getStat(activePlayer, `MAG`)
    const targetPlayerMAG = getStat(targetPlayer, `MAG`)

    return 20 - (10 + activePlayerMAG.total - targetPlayerMAG.total)
  }
}

// Physical hit chance
const physicalHit = (activePlayer, targetPlayer) => {
  const roll = diceRoll(20)
  const hit = roll >= toHit(activePlayer, targetPlayer, `physical`)
  const critical = roll >= criticalChance(activePlayer)
  const fumble = roll <= fumbleChance(activePlayer)

  return {
    roll,
    toHit: toHit(activePlayer, targetPlayer, `physical`),
    hit,
    critical,
    fumble
  }
}

// Magical hit chance
const magicalHit = (activePlayer, targetPlayer) => {
  const roll = diceRoll(20)
  const hit = roll >= toHit(activePlayer, targetPlayer, `magical`)
  const critical = roll >= criticalChance(activePlayer)
  const fumble = roll <= fumbleChance(activePlayer)

  return {
    roll,
    toHit: toHit(activePlayer, targetPlayer, `magical`),
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

// Physical damage count
const physicalDamage = (activePlayer, targetPlayer, critical) => {
  // Item bonus / item malus
  const activePlayerSTR = getStat(activePlayer, `STR`)
  const targetPlayerCON = getStat(targetPlayer, `CON`)
  // Weapon
  const activePlayerItem = activePlayer.weapons.STR ? activePlayer.weapons.STR.score : false

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

// Magical damage count
const magicalDamage = (activePlayer, targetPlayer, critical) => {
  // Item bonus / item malus
  const activePlayerMAG = getStat(activePlayer, `MAG`)
  const targetPlayerMAG = getStat(targetPlayer, `MAG`)
  // Weapon
  const activePlayerItem = activePlayer.weapons.MAG ? activePlayer.weapons.MAG.score : false

  // Item damage
  let itemDamage = 0
  let itemDamageResults = 0

  if (activePlayerItem) {
    let itemDamageRoll = rpgDice.eval(activePlayerItem)
    itemDamageResults = itemDamageRoll.render()
    itemDamage = itemDamageRoll.value
  }

  // Critical hit bonus, @TBT : ignores opponent MAG + double STR
  let criticalBonus = critical ? activePlayerMAG.total + targetPlayerMAG.total : 0

  let damage = activePlayerMAG.total - targetPlayerMAG.total + itemDamage + criticalBonus
  if (damage < 0) damage = 0

  return {
    roll: itemDamageResults,
    damage: damage
  }
}

export {
  toHit,
  physicalHit, 
  magicalHit,
  physicalDamage,
  magicalDamage,
  criticalChance,
  fumbleChance
}