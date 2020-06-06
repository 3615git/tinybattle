import { forceScore } from '../../actions/score/score'

/**
  * @desc Restart game to level 0
*/

const resetLevel = (data) => {
  data.game.level = 0 

  // Score
  data = forceScore(data, `runs`, `game`)
  // Reset run
  data.score.run = {}

  return data
}

export { resetLevel }
