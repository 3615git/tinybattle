// import { createPlayer } from '../../actions/settings/createPlayer' // TO BE REMOVED

/**
  * @desc Opening shop
*/

const openShop = (data) => {
  // data = createPlayer(data, `warrior`) // TO BE REMOVED
  // data.game.level = 1 // TO BE REMOVED
  // data.player.gold = 1000 // TO BE REMOVED
  
  // Set game state
  data.game.state = `shop`

  return data
}

export { openShop }
