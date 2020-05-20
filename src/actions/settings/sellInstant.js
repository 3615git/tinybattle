
/**
  * @desc Sell item or weapon
*/

const sellInstant = (data, index, item) => {
  // Get item value
  let prevGold = data.player.gold
  let nextGold = prevGold + item.reward
  data.player.gold = nextGold
  // Remove item from opponent
  data.player.instants[index]= null

  return data
}

export { sellInstant }
