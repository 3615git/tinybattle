
/**
  * @desc Resetting game to title screen
  * @todo Reset most of the store to initial state
*/

const welcome = (data) => {
  // Set game state
  data.game.state = `welcome`

  return data
}

export { welcome }
