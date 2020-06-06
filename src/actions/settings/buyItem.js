import { onNewItem } from '../../actions/settings/onNewItem'
import { forceScore } from '../../actions/score/score'

/**
  * @desc Set item or weapon
*/

const buyItem = (data, type, char, item) => {
  // Handle purchase
  data = onNewItem(data, type, char, item)
  // Pay item price
  data.player.gold -= item.price

  // Score
  data = forceScore(data, `shop/gold/spent`, `alltime`, item.price)
  data = forceScore(data, `shop/items/purchased`, `alltime`)

  return data
}

export { buyItem }
