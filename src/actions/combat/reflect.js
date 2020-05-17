import { pushBuff } from './stats'
import { formatDataLog } from '../../utils/formatDataLog'
import { skillWheelRoll } from '../../actions/combat/hit'

/**
  * @desc Computing the results of reflect skill
*/

const reflect = (data) => {
  let { player, opponent, game } = data

  let activePlayer = game.playerTurn ? { ...player } : { ...opponent }
  let targetPlayer = game.playerTurn ? { ...opponent } : { ...player }

  // Fumble can raise fumble rate
  let wheelItems = [
    { item: { type: "skill", id: 14, effect: `reflect` } },
    { item: { type: "skill", id: 14, effect: `reflect` }},
    { item: { type: "skill", id: 14, effect: `reflect` }},
    { item: { type: "skill", id: 14, effect: `reflect` }},
    { item: { type: "skill", id: 14, effect: `reflect` }},
    { item: { type: "skill", id: 16, effect: `boost` } },
  ]

  const hit = skillWheelRoll(wheelItems)

  let reflect

  switch (hit.result) {
    case `fumble`:
      reflect = `miss`
      break;

    default:
      if (hit.result.item.effect === `reflect`) {
        reflect = `success`
        pushBuff(targetPlayer, `temporary`, `reflect`, 1, `reflect`)
      } else {
        reflect = `boost`
        pushBuff(targetPlayer, `temporary`, `boost`, 1, `boost`)
      }
      break;
  }

  // Reset skill energy
  activePlayer.skills.reflect.current = 0

  // Build log
  let log = {
    type: `reflect`,
    delay: `long`,
    activePlayer,
    targetPlayer,
    data: {
      hit: hit.result,
      wheelPositions: hit.positions,
      wheelPosition: hit.position,
      reflect: reflect
    }
  }
  log.display = formatDataLog(`reflect`, log, game)

  // Apply changes
  data.player = game.playerTurn ? activePlayer : targetPlayer
  data.opponent = !game.playerTurn ? activePlayer : targetPlayer
  data.log = log
  data.dataLogs.push(formatDataLog(`reflect`, log, game))

  return data
}

export { reflect }
