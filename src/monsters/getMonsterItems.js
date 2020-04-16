import { itemQualityBonus } from "../conf/settings_items"
import { getItemFromChar, getItemIdFromLevel, getItemPowerFromLevel, getItemQuality } from '../utils/forge'
import { getRandomInt } from "../utils/utils"

function getMonsterItem(CHAR, level, humanoid, elite) {
  const itemType = getItemFromChar(CHAR, humanoid) // Get item type from char
  // Check if item is special
  const itemQuality = getItemQuality(elite) // Get item rank
  const itemId = getItemIdFromLevel(itemType, level) // Select item id from level
  const itemScore = getItemPowerFromLevel(CHAR, level) // Select item power from level
  const itemBonus = getRandomInt(itemQualityBonus[itemQuality][0], itemQualityBonus[itemQuality][1]) // Get item bonus

  // Generate item conf
  return {
    type: itemType,
    id: itemId,  
    score: itemScore + itemBonus, 
    quality: itemQuality
  }
}

function getMonsterItems(items, level, humanoid, elite) {
  let monsterItems = {}
  // Parse items array
  for (var i = 0; i < items.length; i++) {
    // Get each item
    monsterItems[items[i]] = getMonsterItem(items[i], level, humanoid, elite)
  }

  // Return conf
  return monsterItems
}

export {
  getMonsterItems
}