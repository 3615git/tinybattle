import { getMonsterFromLevel } from '../../monsters/getMonsterFromLevel'

/**
  * @desc Battle intro and monster presentation
*/

const battleIntro = (data) => {
  // Initialize level if needed
  if (typeof data.game.level !== 'number' || !data.game.level) data.game.level = 0
  // Increment level 
  const previousLevel = data.game.level
  data.game.level = previousLevel + 1
  // Prepare opponent data from level
  data.opponent = getMonsterFromLevel(data.game.level)
  // Get initiative and playerTurn value
  data.game.playerTurn = true
  // Reset log
  data.game.log = null
  // Todo : Reset buffs

  // Todo : Reset stamina, life and mana

  // Rest hit UI
  data.game.playerHit = false
  data.game.opponentHit = false
  
  // Set game state
  data.game.state = `battleIntro`
  return data
}

export { battleIntro }
