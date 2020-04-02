import { resetRage } from './rage'
import { pushBuff } from './stats'
import { physicalAttack } from './physicalAttack'
import { getStat } from './stats'

/**
  * @desc Computing the special physical attack results
*/

const physicalSpecial = (data) => {
  let { player, opponent, game } = data

  let activePlayer = game.playerTurn ? { ...player } : { ...opponent }

  // Push DEX and STR buff for next attack
  const activePlayerDEX = getStat(activePlayer, `DEX`)
  const activePlayerSTR = getStat(activePlayer, `STR`)
  const activePlayerLCK = getStat(activePlayer, `LCK`)

  pushBuff(activePlayer, `temporary`, `STR`, activePlayerDEX.natural)
  pushBuff(activePlayer, `temporary`, `DEX`, activePlayerSTR.natural)
  pushBuff(activePlayer, `temporary`, `LCK`, activePlayerLCK.natural)
  // Reset rage
  activePlayer = resetRage(`physical`, activePlayer)
  // Update data
  data.player = activePlayer

  // Returns updated physical attack
  return physicalAttack(data)
}

export { physicalSpecial }
