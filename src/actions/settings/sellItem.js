
/**
  * @desc Sell item or weapon
*/

const sellItem = (data, type, char) => {
  // Get item value
  let prevGold = data.player.gold
  let nextGold = prevGold + data.opponent[type][char].reward
  data.player.gold = nextGold
  // Remove item from opponent
  data.opponent[type][char] = {}

  return data
}

export { sellItem }
