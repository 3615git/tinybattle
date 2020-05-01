
/**
  * @desc Sell item or weapon
*/

const setGold = (data, mode, amount) => {
  // Get item value
  let prevGold = data.player.gold
  let nextGold = mode === `add` ? prevGold + amount : prevGold - amount
  data.player.gold = nextGold

  return data
}

export { setGold }
