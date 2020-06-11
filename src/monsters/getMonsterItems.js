import { getItemFromChar, getItemIdFromLevel, getItemPowerFromLevel, getItemQuality } from '../utils/forge'
import { getRandomInt } from "../utils/utils"
import { getItemPrice } from '../monsters/getMonsterReward'


function getMonsterItem(CHAR, level, humanoid, elite, forceQuality = false) {
  const itemType = getItemFromChar(CHAR, humanoid) // Get item type from char
  // Check if item is special
  const itemQuality = forceQuality ? forceQuality : getItemQuality(level, elite) // Get item rank
  const itemId = getItemIdFromLevel(itemType, level) // Select item id from level
  const itemScore = getItemPowerFromLevel(CHAR, level) // Select item power from level

  // Generate item conf
  return {
    type: itemType,
    char: CHAR,
    id: itemId,
    score: itemScore, 
    quality: itemQuality,
    reward: getItemPrice(level, itemQuality),
    price: getItemPrice(level, itemQuality, `buy`)
  }
}

function getMonsterItems(items, level, humanoid, elite, forceQuality = false) {
  let monsterItems = {}
  if (items) {
    // Parse items array
    for (var i = 0; i < items.length; i++) {
      // Get each item
      monsterItems[items[i]] = getMonsterItem(items[i], level, humanoid, elite, forceQuality)
    }
  }

  // Return conf
  return monsterItems
}

export {
  getMonsterItems
}