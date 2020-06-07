import { score } from '../../actions/score/score'
import { initialState } from '../../conf/settings'

/**
  * @desc Restart game to level 0
*/

const resetGame = (data) => {

  // Reset everything
  data.game = initialState.game
  data.player = {}
  data.opponent = {}
  data.log = {}
  data.dataLogs = {}
  data.score.run = {}
  data.score.game = {}

  // Return home 
  data.game.state = `allReset`

  // Score
  data = score(data, `resets`, `alltime`)

  return data
}

export { resetGame }
