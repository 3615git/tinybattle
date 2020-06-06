import { onNewItem } from '../../actions/settings/onNewItem'
import { forceScore } from '../../actions/score/score'

/**
  * @desc Moveitem or weapon
*/

const moveItem = (data, type, char, item) => {
  // Handle loot
  data = onNewItem(data, type, char, item)
  // Remove item from opponent
  data.opponent[type][char] = {}

  // Score
  data = forceScore(data, `shop/items/looted`, `alltime`)

  return data
}

export { moveItem }
