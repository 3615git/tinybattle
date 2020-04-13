
/**
  * @desc Starting a new battle
*/

const startBattle = (data) => {
  // Set log to battleStart
  data.log = { type: `battleStart` }
  // Set game state
  data.game.state = `battle`

  return data
}

export { startBattle }
