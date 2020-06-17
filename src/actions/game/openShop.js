/**
  * @desc Opening shop
*/

const openShop = (data) => {

  // Set game state
  data.game.state = `shop`

  return data
}

export { openShop }
