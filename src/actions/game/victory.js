import { forceScore } from '../../actions/score/score'

/**
  * @desc Victory is yours
*/

const victory = (data) => {
  // Get reward
  data.player.gold += data.opponent.reward
  // Loot screen
  data.game.state = `victory`

  // Score
  data = forceScore(data, `shop/gold/won`, `alltime`, data.opponent.reward)
  data = forceScore(data, `battles/victories`, `game`)
  data = forceScore(data, `opponents/${data.opponent.job}/victories`, `alltime`)

  return data
}

export { victory }
