
/**
  * @desc Set ui color (for monsters)
*/

const setUIColor = (data, color) => {
  // Set game state
  data.game.uicolor = color

  return data
}

export { setUIColor }
