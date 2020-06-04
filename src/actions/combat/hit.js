import { diceRoll, getRandomInt, randomValue } from '../../utils/utils'
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

// Turns D20 to hit into classic %
const hitChance = (toHit) => {
  return (20 - toHit) * 5
}

// Physical hit chance
// @todo : merge both
const physicalHit = (activePlayer, targetPlayer) => {
  // const roll = diceRoll(20)
  const roll = 1
  let hit = roll >= toHit(activePlayer, targetPlayer, `physical`)
  const critical = roll >= criticalChance(activePlayer)
  const fumble = roll <= fumbleChance(activePlayer)

  // Fixing "always hit" bug fur super high scores
  if (fumble) hit = false

  return {
    roll,
    toHit: toHit(activePlayer, targetPlayer, `physical`),
    hit,
    critical,
    fumble
  }
}

// Magical hit chance
// @todo : merge both
const magicalHit = (activePlayer, targetPlayer) => {
  const roll = diceRoll(20)
  let hit = roll >= toHit(activePlayer, targetPlayer, `magical`)
  const critical = roll >= criticalChance(activePlayer)
  const fumble = roll <= fumbleChance(activePlayer)

  // Fixing "always hit" bug fur super high scores
  if (fumble) hit = false

  return {
    roll,
    toHit: toHit(activePlayer, targetPlayer, `magical`),
    hit,
    critical,
    fumble
  }
}

// Elemental fight rules
const elementalRules = (a,b) => {
  let bonus

  if (a === `fire`) {
    if (b === `fire`) bonus = false
    if (b === `water`) bonus = false
    if (b === `earth`) bonus = true
  }
  else if (a === `water`) {
    if (b === `fire`) bonus = true
    if (b === `water`) bonus = false
    if (b === `earth`) bonus = false
  }
  else if (a === `earth`) {
    if (b === `fire`) bonus = false
    if (b === `water`) bonus = true
    if (b === `earth`) bonus = false
  } 
  // Lights only crits against darkness
  else if (a === `light`) {
    if (b === `darkness`) bonus = true
    else bonus = false
  }
  // Darkness crits against all, at random
  else if (a === `darkness`) {
    let roll = randomValue([1,2,3])
    if (roll === 1) bonus = true
    else bonus = false
  }
  return bonus
}

// Elemental damage bonus
const elementalDamage = (activePlayer, targetPlayer, CHAR, damage) => {
  // If activePlayer has item
  const weaponElement = activePlayer.weapons[CHAR].element
  // If targetPlayer has base element
  const targetElement = targetPlayer.element
  // If element has ascendant
  if (weaponElement && targetElement) {
    if (elementalRules(weaponElement, targetElement)) {
      return Math.round(damage*50/100)
    } else return false
  } else return false
}

// Critical chance
const criticalChance = (activePlayer) => {
  const playerLuck = getStat(activePlayer, `LCK`)
  
  return 20 - playerLuck.total
}

// Fumble chance
const fumbleChance = (activePlayer) => {
  const playerFumble = getStat(activePlayer, `fumble`)

  return playerFumble.total
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
  let elementalBonus = 0

  let baseDamage = activePlayerSTR.total - targetPlayerCON.total

  if (activePlayerItem) {
    let itemDamageRoll = rpgDice.eval(activePlayerItem)
    itemDamageResults = itemDamageRoll.render()
    itemDamage = itemDamageRoll.value
    elementalBonus = elementalDamage(activePlayer, targetPlayer, `STR`, baseDamage+itemDamage)
  }

  // Critical hit bonus, @TBT : ignores opponent CON + double STR
  let criticalBonus = critical ? activePlayerSTR.total + targetPlayerCON.total : 0

  let damage = baseDamage + itemDamage + criticalBonus + elementalBonus
  if (damage < 0) damage = 0

  // console.log(`baseDamage`, baseDamage)
  // console.log(`itemDamage`, itemDamage)
  // console.log(`criticalBonus`, criticalBonus)
  // console.log(`elementalBonus`, elementalBonus)
  // console.log(`damage`, damage)
  
  return {
    roll: itemDamageResults,
    base: baseDamage,
    item: itemDamage,
    critical: criticalBonus,
    elemental: elementalBonus,
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
  let elementalBonus = 0

  let baseDamage = activePlayerMAG.total - targetPlayerMAG.total


  if (activePlayerItem) {
    let itemDamageRoll = rpgDice.eval(activePlayerItem)
    itemDamageResults = itemDamageRoll.render()
    itemDamage = itemDamageRoll.value
    elementalBonus = elementalDamage(activePlayer, targetPlayer, `MAG`, baseDamage+itemDamage)
  }

  // Critical hit bonus, @TBT : ignores opponent MAG + double MAG
  let criticalBonus = critical ? activePlayerMAG.total + targetPlayerMAG.total : 0

  let damage = baseDamage + itemDamage + criticalBonus + elementalBonus
  if (damage < 0) damage = 0

  return {
    roll: itemDamageResults,
    base: baseDamage,
    item: itemDamage,
    critical: criticalBonus,
    elemental: elementalBonus,
    damage: damage
  }
}

// Set hit state for UI display
const displayHits = (prevState, nextState) => {
  nextState.game.playerHit = prevState.player.hitPoints > nextState.player.hitPoints
  nextState.game.opponentHit = prevState.opponent.hitPoints > nextState.opponent.hitPoints
  return nextState
}

// Roll dice on the skill wheel
const skillWheelRoll = (items) => {
  // roll d8
  const roll = getRandomInt(0,7)
  let positions, wheelVariations

  // Wheel with prizes
  if (items) {
    positions = [items[0], items[1], items[2], `fumble`, items[3], items[4], items[5], `fumble`]
    // return value and position
    return {
      result: positions[roll],
      positions: positions,
      position: roll
    }
  } 
  // Wheel with skill
  else {
    positions = [`success`, `critical`, `success`, `fumble`, `success`, `fumble`, `success`, `critical` ]
    wheelVariations = {
      success: [0,2,4,6],
      critical: [1,7],
      fumble: [3,5]
    }
    // return value and position
    return {
      result: positions[roll],
      positions: positions,
      position: randomValue(wheelVariations[positions[roll]])
    }
  }
}

export {
  toHit,
  hitChance,
  physicalHit, 
  magicalHit,
  physicalDamage,
  magicalDamage,
  criticalChance,
  fumbleChance,
  displayHits,
  skillWheelRoll
}