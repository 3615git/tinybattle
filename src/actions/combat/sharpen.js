import { formatDataLog } from '../../utils/formatDataLog'
import { instantUse } from './energy'
import { weaponElements } from "../../conf/settings_items"
import { randomValue } from "../../utils/utils"
import { skillWheelRoll } from '../../actions/combat/hit'

/**
  * @desc Computing the results of sharpen instant
*/

const sharpen = (data, item, id) => {
  let { player, opponent, game } = data

  let activePlayer = game.playerTurn ? { ...player } : { ...opponent }
  let targetPlayer = game.playerTurn ? { ...opponent } : { ...player }

  // Select weapon
  let weapon = activePlayer.weapons[item.value]
  let weaponScore = weapon.score.split(`d`)
  let element

  // Get current sharpen score
  let sharpenScore = weapon.sharpen ? weapon.sharpen : 0
  // Wheel roll, can be sharpen (+1D) or fail
  let wheelItems = []
  for (let i = 0; i < 6; i++) {
    if (i < sharpenScore) wheelItems.push(`fumble`)
    else wheelItems.push({ category: `items`, item: { type: item.type, id: item.id} })
  }
  // Succes ratio goes down with sharpen count (but can't be 0, still a 1/8 chance at worst)
  if (sharpenScore > 5) wheelItems[5] = { category: `items`, item: { type: item.type, id: item.id } }
  
  // Compute skill roll
  const hit = skillWheelRoll(wheelItems)

  switch (hit.result) {
    case `fumble`:
      // Do nothing
      break;

    default:
      // Success ! Add 1D
      if (Number.isInteger(parseInt(weaponScore[0]))) weaponScore[0]++
      else weaponScore[0] = 2
      weapon.score = weaponScore.join('d')
      // Give random element to classic items
      if (weapon.quality !== `unique`) {
        element = randomValue(weaponElements.elementsonly)
        weapon.element = element
      } else {
        element = false
      }
      // Add + 1 sharpen score
      activePlayer.weapons[item.value].sharpen = sharpenScore + 1
      break;
  }

  // Update weapon
  activePlayer.weapons[item.value] = weapon

  // Update instant counter
  activePlayer = instantUse(activePlayer, id)

  // Build log
  let log = {
    type: `sharpen`,
    // delay: `immediate`,
    activePlayer,
    targetPlayer,
    data: {
      hit: hit.result,
      wheelPositions: hit.positions,
      wheelPosition: hit.position,
      icon: [item.type, item.id, weapon.type, weapon.id],
      element: element
    }
  }
  log.display = formatDataLog(`sharpen`, log, game)

  // Apply changes
  data.player = game.playerTurn ? activePlayer : targetPlayer
  data.opponent = !game.playerTurn ? activePlayer : targetPlayer
  data.log = log
  data.dataLogs.push(formatDataLog(`sharpen`, log, game))

  return data
}

export { sharpen }
