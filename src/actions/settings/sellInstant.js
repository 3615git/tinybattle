import { forceScore } from '../../actions/score/score'

/**
  * @desc Sell item or weapon
*/

const sellInstant = (data, index, item) => {
  // Get item value
  let prevGold = data.player.gold
  let nextGold = prevGold + item.reward
  data.player.gold = nextGold
  // Remove item from opponent
  data.player.instants[index]= null

  // Score
  data = forceScore(data, `shop/gold/won`, `alltime`, item.reward)
  data = forceScore(data, `shop/items/sold`, `alltime`)

  return data
}

export { sellInstant }
