// Rage management
const rage = (type, player, value) => {
  let rage 
  if (type === `attack`) {
    rage = (player.physicalRage + value > player.maxPhysicalRage) ? player.maxPhysicalRage : player.physicalRage + value
  }
  if (type === `cast`) {
    rage = (player.magicalRage + value > player.maxMagicalRage) ? player.maxMagicalRage : player.magicalRage + value
  }

  return rage
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