import { forceScore } from '../../actions/score/score'

/**
  * @desc Defeat, selecting legacy items
*/

const defeat = (data) => {

  // Set game state 
  data.game.state = `defeat`

  // Score
  data = forceScore(data, `battles/defeats`, `game`)
  data = forceScore(data, `opponents/${data.opponent.job}/defeats`, `alltime`)

  return data
}

export { defeat }
