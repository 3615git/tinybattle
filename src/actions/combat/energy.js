import { getStat } from './stats'
import { gameSettings } from "../../conf/settings"

// Refesh max energy values
const maxEnergyRefresh = (data) => {
  let { player } = data
  let activePlayer = { ...player } 

  if (Object.keys(activePlayer).length !== 0) {
    // Compute maxHitPoints
    const playerCON = getStat(activePlayer, `CON`)
    const maxHitPoints = playerCON.static * gameSettings.maxEnergyMultiplyer.CON
    activePlayer.maxHitPoints = maxHitPoints
    // Compute maxMagicPoints
    const playerMAG = getStat(activePlayer, `MAG`)
    const maxMagicPoints = playerMAG.static * gameSettings.maxEnergyMultiplyer.MAG
    activePlayer.maxMagicPoints = maxMagicPoints
    // Compute maxStamina
    const playerSTR = getStat(activePlayer, `STR`)
    activePlayer.maxStamina = playerSTR.static * gameSettings.maxEnergyMultiplyer.STR
    // Compute maxPhysicalRage
    activePlayer.maxPhysicalRage = Math.round(maxHitPoints * 50 / 100)
    // Compute maxMagicalRage
    activePlayer.maxMagicalRage = Math.round(maxMagicPoints * 50 / 100)

    // Update data
    data.player = activePlayer
  }

  return data
}

// Refesh energy
const energyRefresh = (data, type) => {
  let { player, opponent, game } = data

  let activePlayer = !game.playerTurn ? { ...player } : { ...opponent }

  if (type === `magical`) {
    // Upgrade mana
    const activePlayerMAG = getStat(activePlayer, `MAG`)
    // Set to max mana if over limit
    const updatedMana =
      activePlayer.magicPoints + activePlayerMAG.total > activePlayer.maxMagicPoints
        ? activePlayer.maxMagicPoints
        : activePlayer.magicPoints + activePlayerMAG.total

    // Update data
    if (!game.playerTurn) data.player.magicPoints = updatedMana
    else data.opponent.magicPoints = updatedMana
  } 
  
  if (type === `physical`) {
    // Upgrade stamina
    const activePlayerCON = getStat(activePlayer, `CON`)
    // Set to max stamina if over limit
    const updatedStamina =
      (activePlayer.stamina + activePlayerCON.natural) > activePlayer.maxStamina
        ? activePlayer.maxStamina
        : activePlayer.stamina + activePlayerCON.natural

    // Update data
    if (!game.playerTurn) data.player.stamina = updatedStamina
    else data.opponent.stamina = updatedStamina
  }

  return data
}

const energyBurn = (player, value, type) => {
  // Burn mana
  if (type === `magical`) {
    player.magicPoints = player.magicPoints - value
    if (player.magicPoints < 0) player.magicPoints = 0
  }
  // Burn stamina
  if (type === `physical`) {
    player.stamina = player.stamina - value
    if (player.stamina < 0) player.stamina = 0
  }
  return player
}

// Heal a player
const energyRestore = (player, value, type) => {
  // Restore health
  if (type === `hitPoints`) {
    player.hitPoints += value
    if (player.hitPoints > player.maxHitPoints) player.hitPoints = player.maxHitPoints
  }
  // Restore stamina
  if (type === `stamina`) {
    player.stamina += value
    if (player.stamina > player.maxStamina) player.stamina = player.maxStamina
  }
  return player
}

export {
  maxEnergyRefresh,
  energyRefresh, 
  energyBurn,
  energyRestore
}