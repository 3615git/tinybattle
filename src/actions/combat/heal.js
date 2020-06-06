import { pushBuff } from './stats'
import { formatDataLog } from '../../utils/formatDataLog'
import { skillWheelRoll } from '../../actions/combat/hit'
import { energyRestore } from './energy'
import { getRandomInt, capitalizeFirstLetter } from '../../utils/utils'
import { score } from '../../actions/score/score'

/**
  * @desc Computing the results of heal skill
*/

const heal = (data) => {
  let { player, opponent, game } = data

  let activePlayer = game.playerTurn ? { ...player } : { ...opponent }
  let targetPlayer = game.playerTurn ? { ...opponent } : { ...player }

  // Fumble can raise fumble rate
  let wheelItems = [
    { item: { type: "potion", id: 57, healCapacity: "small" } },
    { item: { type: "potion", id: 2, healCapacity: "medium" } },
    { item: { type: "potion", id: 57, healCapacity: "small" } },
    { item: { type: "potion", id: 2, healCapacity: "medium" } },
    { item: { type: "potion", id: 43, healCapacity: "large" } },
    { item: { type: "potion", id: 57, healCapacity: "small" } },
  ]

  let healRanges = {
    small: [10,20],
    medium: [20,50],
    large: [50,80]
  }

  const hit = skillWheelRoll(wheelItems)
  let FUMBLEmalus, healValue, healCapacity

  switch (hit.result) {
    case `fumble`:
      FUMBLEmalus = getRandomInt(3, 5)
      pushBuff(activePlayer, `temporary`, `fumble`, FUMBLEmalus, `curse`, 4)
      // Score
      data = score(data, `action/heal/fumble`, `game`)
      break;

    default:
      // Test potion size
      healCapacity = hit.result.item.healCapacity
      // Value is a % of maxHitPoints
      healValue = Math.round( getRandomInt(healRanges[healCapacity][0], healRanges[healCapacity][1]) * player.maxHitPoints / 100 )
      activePlayer = energyRestore(activePlayer, healValue, `hitPoints`)
      // Score
      data = score(data, `action/heal/success`, `game`)
      data = score(data, `action/heal/heal`, `game`, healValue)
      data = score(data, `heal`, `game`, healValue)
      break;
  }

  // Reset skill energy
  activePlayer.skills.heal.current = 0

  // Score
  data = score(data, `action/heal/total`, `game`)

  // Build log
  let log = {
    type: `heal`,
    delay: `long`,
    activePlayer,
    targetPlayer,
    data: {
      hit: hit.result,
      wheelPositions: hit.positions,
      wheelPosition: hit.position,
      fumbleMalus: FUMBLEmalus,
      healCapacity: healCapacity && capitalizeFirstLetter(healCapacity),
      healValue: healValue
    }
  }
  log.display = formatDataLog(`heal`, log, game)

  // Apply changes
  data.player = game.playerTurn ? activePlayer : targetPlayer
  data.opponent = !game.playerTurn ? activePlayer : targetPlayer
  data.log = log
  data.dataLogs.push(formatDataLog(`heal`, log, game))

  return data
}

export { heal }
