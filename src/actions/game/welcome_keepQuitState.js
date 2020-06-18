/**
  * @desc Resetting game to title screen
*/

const welcome_keepQuitState = (data) => {
  // Set game state
  data.game.state = `welcome`

  return data
}

export { welcome_keepQuitState }
