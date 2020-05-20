import { formatDataLog } from '../../utils/formatDataLog'
import { instantUse } from './energy'
import { weaponElements } from "../../conf/settings_items"
import { randomValue } from "../../utils/utils"

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

  // Add 1D
  if (Number.isInteger(parseInt(weaponScore[0]))) weaponScore[0]++
  else weaponScore[0] = 2
  weapon.score = weaponScore.join('d')
  // Give random element
  let element = randomValue(weaponElements.elementsonly)
  weapon.element = element

  // Update weapon
  activePlayer.weapons[item.value] = weapon

  // Update instant counter
  activePlayer = instantUse(activePlayer, id)

  // Build log
  let log = {
    type: `sharpen`,
    delay: `immediate`,
    activePlayer,
    targetPlayer,
    data: {
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
