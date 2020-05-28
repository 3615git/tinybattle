import { onNewItem } from '../../actions/settings/onNewItem'

/**
  * @desc Moveitem or weapon
*/

const moveItem = (data, type, char, item) => {
  // Handle loot
  data = onNewItem(data, type, char, item)
  // Remove item from opponent
  data.opponent[type][char] = {}

  return data
}

export { moveItem }
