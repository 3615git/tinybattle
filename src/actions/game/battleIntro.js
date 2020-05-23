import { getMonsterFromLevel } from '../../monsters/getMonsterFromLevel'

/**
  * @desc Battle intro and monster presentation
*/

const battleIntro = (data) => {
  // Prepare opponent data from level
  const level = data.game.level
  const monsterTiers = data.monsterTiers
  const monsters = data.monsters

  // Create monster
  data.opponent = getMonsterFromLevel(level, monsterTiers, monsters, data.game.pastOpponents)

  // Add monster to history
  if (!data.game.pastOpponents) data.game.pastOpponents = [data.opponent.job]
  else data.game.pastOpponents.push(data.opponent.job)

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
