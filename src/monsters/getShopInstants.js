
import { getItemQuality } from '../utils/forge'
import { randomValue } from "../utils/utils"
import { getInstant } from '../utils/forge'


function getShopInstant(effect, level, forceQuality = false) {

  let option
  // Check if item is special
  const itemQuality = forceQuality ? forceQuality : getItemQuality(level, false) // Get item rank

  // Ranges
  let tempCharRange = [`STR`, `DEX`, `MAG`]
  let permCharRange = [`STR`, `DEX`, `CON`, `MAG`]
  if (effect === `temporaryupgrade`) option = randomValue(tempCharRange)
  if (effect === `permanentupgrade`) option = randomValue(permCharRange)
  if (effect === `temporaryluckupgrade`) option = `LCK`

  // Generate item conf
  return getInstant(effect, itemQuality, level, option)
}

function getShopInstants(items, level, forceQuality = false) {
  let shopItems = {}
  if (items) {
    // Parse items array
    for (var i = 0; i < items.length; i++) {
      // Get each item
      shopItems[items[i]] = getShopInstant(items[i], level, forceQuality)
    }
  }

  // Return conf
  return shopItems
}

export {
  getShopInstants
}