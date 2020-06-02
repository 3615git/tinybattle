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

const sideEffects = (data, nextData, type, char) => {
  // Refresh energies
  nextData = maxEnergyRefresh(nextData)

  /** Special behaviors */

  /** Check for sets items */
  let setElements = {}
  for (let [key, value] of Object.entries(nextData.player.items)) { 
    if (value.element) setElements[value.element] = (setElements[value.element] || 0) + 1; 
  } 
  // Remove set buffs
  resetBuffByOrigin(nextData, `player`, `permanent`, `setItems`)
  // Update set buffs
  for (let [element, value] of Object.entries(setElements)) {
    if (value > 1) {
      for (let index = 1; index < value; index++) {
        if (setElementsToChar[element]) pushBuff(nextData.player, `permanent`, setElementsToChar[element], value*2, `setItems`)
      }
    }
  }
  console.log(nextData.player.buff[`permanent`])


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

export { onNewItem, sideEffects }
