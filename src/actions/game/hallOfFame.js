
/**
  * @desc Resetting game to title screen
  * @todo Reset most of the store to initial state
*/

const hallOfFame = (data) => {
  // Set game state
  data.game.state = `hallOfFame`

  return data
}

export { hallOfFame }
