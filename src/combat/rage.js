// Rage management
const rage = (type, player, value) => {
  if (type === `physical`) {
    player.physicalRage = (player.physicalRage + value > player.maxPhysicalRage) ? player.maxPhysicalRage : player.physicalRage + value
  }
  if (type === `magical`) {
    player.magicalRage = (player.magicalRage + value > player.maxMagicalRage) ? player.maxMagicalRage : player.magicalRage + value
  }

  return player
}

const resetRage = (type, player) => {
  if (type === `physical`) {
    player.physicalRage = 0
  }
  if (type === `magical`) {
    player.magicalRage = 0
  }

  return player
}

export {
  rage, 
  resetRage
}