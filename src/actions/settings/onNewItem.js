import { maxEnergyRefresh } from '../../actions/combat/energy'
import { pushBuff, getStat, resetBuffByOrigin } from '../../actions/combat/stats'
import { gameSettings } from "../../conf/settings"
import { setElementsToChar } from "../../conf/settings_items"

/**
  * @desc Optional updates on item acquisition (from loot or shop)
*/

const onNewItem = (data, type, char, item) => {
  // Next state
  let nextData = JSON.parse(JSON.stringify(data))

  // Get item
  nextData.player[type][char] = item

  // Compute side effects
  nextData = sideEffects(data, nextData, type, char)

  return nextData
}

const setBonus = (data) => {
  /** Check for sets items */
  let setElements = {}
  // eslint-disable-next-line no-unused-vars
  for (let [key, value] of Object.entries(data.player.items)) {
    if (value.element) setElements[value.element] = (setElements[value.element] || 0) + 1;
  }
  // Remove set buffs
  resetBuffByOrigin(data, `player`, `permanent`, `setItems`)
  data.player.setItems = {}
  // Update set buffs
  for (let [element, value] of Object.entries(setElements)) {
    if (value > 1) {
      for (let index = 1; index < value; index++) {
        if (setElementsToChar[element]) pushBuff(data.player, `permanent`, setElementsToChar[element], value * 2, `setItems`)
        data.player.setItems[element] = value
      }
    }
  }

  return data
}

const sideEffects = (data, nextData, type, char) => {
  // Refresh energies
  nextData = maxEnergyRefresh(nextData)

  /** Special behaviors */

  // Item sets bonus
  nextData = setBonus(nextData)

  /** CON items upgrades current HP following ratio */
  if ((type === "items" || type === "upgrade") && char === `CON`) {
    // Previous and next CON
    let previousCON = getStat(data.player, `CON`)
    let nextCON = getStat(nextData.player, `CON`)
    let HPgain = (nextCON.static - previousCON.static) * gameSettings.maxEnergyMultiplyer.CON
    // Upgrading HP
    nextData.player.hitPoints = nextData.player.hitPoints + HPgain
  }

  return nextData
}

export { onNewItem, sideEffects, setBonus }
