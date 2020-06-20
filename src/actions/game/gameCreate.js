import { getOpponentMap } from '../../monsters/getOpponentMap'

/**
  * @desc Creating new game
*/

const gameCreate = (data) => {
  // Set game state
  data.game.state = `gameCreate`

  // Prepare opponent roadmap
  const monsterTiers = data.monsterTiers
  const monsters = data.monsters

  data.game.opponentMap = getOpponentMap(monsters, monsterTiers, false)

  return data
}

export { gameCreate }
