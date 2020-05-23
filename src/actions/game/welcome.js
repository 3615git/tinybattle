/**
  * @desc Resetting game to title screen
*/

const welcome = (data) => {
  // Erasing quit save satte
  delete data.game.quitState
  // Set game state
  data.game.state = `welcome`

  return data
}

export { welcome }
