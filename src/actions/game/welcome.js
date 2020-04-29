/**
  * @desc Resetting game to title screen
*/

const welcome = (data) => {
  // Set game state
  data.game.state = `welcome`

  return data
}

export { welcome }
