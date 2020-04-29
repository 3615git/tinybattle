
/**
  * @desc Keep item for legacy
*/

const keepItem = (data, type, char, item) => {
  // Save item
  if (!data.game.legacy) data.game.legacy = {}
  if (!data.game.legacy[type]) data.game.legacy[type] = {}
  
  data.game.legacy[type][char] = item

  return data
}

export { keepItem }
