
/**
  * @desc Moveitem or weapon
*/

const moveItem = (data, type, char, item) => {
  // Get item
  data.player[type][char] = item
  // Remove item from opponent
  data.opponent[type][char] = {}

  return data
}

export { moveItem }
