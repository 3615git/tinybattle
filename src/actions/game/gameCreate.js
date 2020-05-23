
/**
  * @desc Opening shop
*/

const gameCreate = (data) => {
  // Set game state
  data.game.state = `gameCreate`
  // Erase opponent history
  data.game.pastOpponents = []

  return data
}

export { gameCreate }
