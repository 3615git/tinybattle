
/**
  * @desc Opening shop
*/

const victory = (data) => {
  // Set game state
  data.game.state = `victory`

  return data
}

export { victory }
