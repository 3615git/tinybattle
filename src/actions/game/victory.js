// import { getMonsterFromLevel } from '../../monsters/getMonsterFromLevel' // TO BE REMOVED
// import { createPlayer } from '../../actions/settings/createPlayer' // TO BE REMOVED

/**
  * @desc Victory is yours
*/

const victory = (data) => {
  // Set game state
  // data.opponent = getMonsterFromLevel(1) // TO BE REMOVED
  // data = createPlayer(data, `warrior`) // TO BE REMOVED

  // Get reward
  data.player.gold += data.opponent.reward
  // Loot screen
  data.game.state = `victory`

  return data
}

export { victory }
