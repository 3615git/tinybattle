import { pushBuff } from './stats'
import { formatDataLog } from '../../utils/formatDataLog'
import { skillWheelRoll } from '../../actions/combat/hit'

/**
  * @desc Computing the results of stun skill
*/

const stun = (data) => {
  let { player, opponent, game } = data

  let activePlayer = game.playerTurn ? { ...player } : { ...opponent }
  let targetPlayer = game.playerTurn ? { ...opponent } : { ...player }

  // Stun can make opponent skip a fex turns
  const hit = skillWheelRoll()
  let DEXmalus, STRmalus, rounds

  switch (hit.result) {
    case `success`:
      rounds = 1
      pushBuff(targetPlayer, `temporary`, `STUN`, rounds, `stun`, 2)
      break;
    case `critical`:
      rounds = 2
      pushBuff(targetPlayer, `temporary`, `STUN`, rounds, `stun`, 4)
      break;
    case `fumble`:
      DEXmalus = -Math.abs(Math.ceil(activePlayer.DEX / 2))
      STRmalus = -Math.abs(Math.ceil(activePlayer.STR / 2))
      pushBuff(activePlayer, `temporary`, `DEX`, DEXmalus, `stun`, 2)
      pushBuff(activePlayer, `temporary`, `STR`, STRmalus, `stun`, 2)
      break;

    default:
      break;
  }

  // Reset skill energy
  activePlayer.skills.stun.current = 0

  // Build log
  let log = {
    type: `stun`,
    delay: `long`,
    activePlayer,
    targetPlayer,
    data: {
      hit: hit.result,
      wheelPosition: hit.position,
      dexMalus: DEXmalus,
      strMalus: STRmalus,
      rounds: rounds
    }
  }
  log.display = formatDataLog(`stun`, log, game)

  // Apply changes
  data.player = game.playerTurn ? activePlayer : targetPlayer
  data.opponent = !game.playerTurn ? activePlayer : targetPlayer
  data.log = log
  data.dataLogs.push(formatDataLog(`stun`, log, game))

  return data
}

export { stun }
