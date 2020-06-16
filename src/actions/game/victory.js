import { forceScore } from '../../actions/score/score'
import { gameSettings } from "../../conf/settings"

/**
  * @desc Victory is yours
*/

const victory = (data) => {
  // Get reward
  data.player.gold += data.opponent.reward
  // Win XP
  data.player.xp += data.opponent.xp

  // Score
  data = forceScore(data, `shop/gold/won`, `alltime`, data.opponent.reward)
  data = forceScore(data, `battles/victories`, `game`)
  data = forceScore(data, `opponents/${data.opponent.job}/victories`, `alltime`)

  // Loot screen or endgame
  if (data.game.level === gameSettings.maxLevel) {
    data.game.state = `endgame`
  } else {
    data.game.state = `victory`
  }

  return data
}

export { victory }
