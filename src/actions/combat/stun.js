import { pushBuff } from './stats'
import { formatDataLog } from '../../utils/formatDataLog'
import { skillWheelRoll } from '../../actions/combat/hit'
import { score } from '../../actions/score/score'
import { getStat } from './stats'

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
  const activePlayerDEX = getStat(activePlayer, `DEX`)
  const activePlayerSTR = getStat(activePlayer, `STR`)
  const targetPlayerDEX = getStat(targetPlayer, `DEX`)

  switch (hit.result) {
    case `success`:
      DEXmalus = -Math.abs(Math.ceil(targetPlayerDEX.total / 2))
      rounds = 2
      pushBuff(targetPlayer, `temporary`, `STUN`, rounds, `stun`, 4)
      pushBuff(targetPlayer, `temporary`, `DEX`, DEXmalus, `stun`, 6)
      // Score
      data = score(data, `action/stun/success`, `game`)
      break;
    case `critical`:
      DEXmalus = -Math.abs(targetPlayerDEX.total)
      rounds = 3
      pushBuff(targetPlayer, `temporary`, `STUN`, rounds, `stun`, 6)
      pushBuff(targetPlayer, `temporary`, `DEX`, DEXmalus, `stun`, 8)
      // Score
      data = score(data, `action/stun/critical`, `game`)
      break;
    case `fumble`:
      DEXmalus = -Math.abs(Math.ceil(activePlayerDEX.total / 2))
      STRmalus = -Math.abs(Math.ceil(activePlayerSTR.total / 2))
      pushBuff(activePlayer, `temporary`, `DEX`, DEXmalus, `stun`, 2)
      pushBuff(activePlayer, `temporary`, `STR`, STRmalus, `stun`, 2)
      // Score
      data = score(data, `action/stun/fumble`, `game`)
      break;

    default:
      break;
  }

  // Reset skill energy
  activePlayer.skills.stun.current = 0

  // Score
  data = score(data, `action/stun/total`, `game`)

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
