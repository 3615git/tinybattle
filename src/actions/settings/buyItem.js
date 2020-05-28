import { onNewItem } from '../../actions/settings/onNewItem'

/**
  * @desc Set item or weapon
*/

const buyItem = (data, type, char, item) => {
  // Handle purchase
  data = onNewItem(data, type, char, item)
  // Pay item price
  data.player.gold -= item.price

  return data
}

export { buyItem }
