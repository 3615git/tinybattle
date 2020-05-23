/**
  * @desc Resetting game to title screen + saving exit state
*/

const quit = (data) => {
  // Saving current state (to be able to come back later)
  data.game.quitState = data.game.state
  // Set game state
  data.game.state = `welcome`

  return data
}

export { quit }
