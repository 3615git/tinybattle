/**
  * @desc Battle intro and monster presentation
*/

const battleIntro = (data) => {
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
