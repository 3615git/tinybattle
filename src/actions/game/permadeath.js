import { forceScore } from '../../actions/score/score'

/**
  * @desc Permadeath, game ended
*/

const permadeath = (data) => {

  // Set game state 
  data.game.state = `permadeath`

  // Score
  data = forceScore(data, `permadeath`, `alltime`)

  return data
}

export { permadeath }
