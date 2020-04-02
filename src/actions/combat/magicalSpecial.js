import { resetRage } from './rage'
import { pushBuff } from './stats'
import { magicalAttack } from './magicalAttack'
import { getStat } from './stats'

/**
  * @desc Computing the special magical attack results
*/

const magicalSpecial = (data) => {
  let { player, opponent, game } = data

  let activePlayer = game.playerTurn ? { ...player } : { ...opponent }

  // Push DEX and STR buff for next attack
  const activePlayerMAG = getStat(activePlayer, `MAG`)
  const activePlayerLCK = getStat(activePlayer, `LCK`)

  pushBuff(activePlayer, `temporary`, `MAG`, activePlayerMAG.natural*2)
  pushBuff(activePlayer, `temporary`, `LCK`, activePlayerLCK.natural)
  // Reset rage
  activePlayer = resetRage(`magical`, activePlayer)
  // Update data
  data.player = activePlayer

  // Returns updated physical attack
  return magicalAttack(data)
}

export { magicalSpecial }
