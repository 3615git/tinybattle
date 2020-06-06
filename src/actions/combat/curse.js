import { pushBuff } from './stats'
import { formatDataLog } from '../../utils/formatDataLog'
import { skillWheelRoll } from '../../actions/combat/hit'
import { getRandomInt } from '../../utils/utils'
import { score } from '../../actions/score/score'

/**
  * @desc Computing the results of psyblast skill
*/

const curse = (data) => {
  let { player, opponent, game } = data

  let activePlayer = game.playerTurn ? { ...player } : { ...opponent }
  let targetPlayer = game.playerTurn ? { ...opponent } : { ...player }

  // Fumble can raise fumble rate
  const hit = skillWheelRoll()
  let FUMBLEmalus

  switch (hit.result) {
    case `success`:
      FUMBLEmalus = getRandomInt(5, 7)
      pushBuff(targetPlayer, `temporary`, `fumble`, FUMBLEmalus, `curse`, 4)
      // Score
      data = score(data, `action/curse/success`, `game`)
      break;
    case `critical`:
      FUMBLEmalus = getRandomInt(7, 9)
      pushBuff(targetPlayer, `temporary`, `fumble`, FUMBLEmalus, `curse`, 4)
      // Score
      data = score(data, `action/curse/critical`, `game`)
      break;
    case `fumble`:
      FUMBLEmalus = getRandomInt(3, 5)
      pushBuff(activePlayer, `temporary`, `fumble`, FUMBLEmalus, `curse`, 2)
      // Score
      data = score(data, `action/curse/fumble`, `game`)
      break;

    default:
      break;
  }

  // Reset skill energy
  activePlayer.skills.curse.current = 0

  // Score
  data = score(data, `action/curse/total`, `game`)

  // Build log
  let log = {
    type: `curse`,
    delay: `long`,
    activePlayer,
    targetPlayer,
    data: {
      hit: hit.result,
      wheelPosition: hit.position,
      fumbleMalus: FUMBLEmalus
    }
  }
  log.display = formatDataLog(`curse`, log, game)

  // Apply changes
  data.player = game.playerTurn ? activePlayer : targetPlayer
  data.opponent = !game.playerTurn ? activePlayer : targetPlayer
  data.log = log
  data.dataLogs.push(formatDataLog(`curse`, log, game))

  return data
}

export { curse }
