
/**
  * @desc Opening shop
*/

const defeat = (data) => {
  // Set game state
  data.game.state = `defeat`

  return data
}

export { defeat }
