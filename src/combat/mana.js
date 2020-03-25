import { getStat } from '../combat/stats'

// Refesh mana
const manaRefresh = (data) => {
  let { player, opponent, game } = data

  let activePlayer = !game.playerTurn ? { ...player } : { ...opponent }

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

  return data
}

const manaBurn = (player, value) => {
  player.magicPoints = player.magicPoints - value
  if (player.magicPoints < 0) player.magicPoints = 0
  return player
}

export {
  manaRefresh, 
  manaBurn
}