import { initialState } from '../../conf/settings'

/**
  * @desc Resetting game, then display HOF
*/

const resetThenHallOfFame = (data) => {

  // Reset everything
  data.game = initialState.game
  data.player = {}
  data.opponent = {}
  data.log = {}
  data.dataLogs = {}
  data.score.run = {}
  data.score.game = {}
  
  // Set game state
  data.game.previousState = `permadeath`
  data.game.state = `hallOfFame`

  return data
}

export { resetThenHallOfFame }
