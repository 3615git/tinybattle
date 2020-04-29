
/**
  * @desc Set item or weapon
*/

const buyItem = (data, type, char, item) => {
  // Get item
  data.player[type][char] = item
  // Pay item price
  data.player.gold -= item.price

  return data
}

export { buyItem }
