import { maxEnergyRefresh } from '../../actions/combat/energy'
import { getStat } from '../../actions/combat/stats'
import { gameSettings } from "../../conf/settings"

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

  // CON items upgrades current HP following ratio
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
