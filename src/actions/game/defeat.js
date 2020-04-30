// import { createPlayer } from '../../actions/settings/createPlayer' // TO BE REMOVED

/**
  * @desc Selecting legacy items
*/

const defeat = (data) => {
  // data = createPlayer(data, `warrior`) // TO BE REMOVED
  // data.game.level = 1 // TO BE REMOVED
  // Set game state 
  data.game.state = `defeat`

  return data
}

export { defeat }
