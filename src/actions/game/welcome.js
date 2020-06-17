/**
  * @desc Resetting game to title screen
*/

const welcome = (data) => {
  // Erasing quit save state
  delete data.game.quitState
  // Set game state
  data.game.state = `welcome`

  return data
}

export { welcome }
