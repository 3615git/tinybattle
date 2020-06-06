import { forceScore } from '../../actions/score/score'

/**
  * @desc Set item or weapon
*/

const buyInstant = (data, item) => {
  // Set item
  let position = false
  if (data.player.instants) {
    for (let index = 0; index < data.player.instants.length; index++) {
      if (!data.player.instants[index]) {
        position = index
        break;
      }  
    }
  } else {
    data.player.instants = []
  }

  if (position !== false) {
    // Overwriting a null
    data.player.instants[position] = item
  }
  else {
    // Pushing at the end
    data.player.instants.push(item)
  }
  
  // Pay item price
  data.player.gold -= item.price

  // Score
  data = forceScore(data, `shop/gold/spent`, `alltime`, item.price)
  data = forceScore(data, `shop/items/purchased`, `alltime`)

  return data
}

export { buyInstant}
