import { gameSettings } from "../conf/settings"
import { charItems, itemRanges, charPower, itemQuality } from "../conf/settings_items"
import { getRandomInt, randomValue } from "../utils/utils"

// Item utils
function getItemFromChar(CHAR, humanoid) {
  const items = humanoid ? charItems.humanoid[CHAR] : charItems.beast[CHAR]
  return items[Math.floor(Math.random() * items.length)]
}

function getItemIdFromLevel(itemType, level) {
  // Cut item range into level segments
  const itemRange = itemRanges[itemType]
  const lowTier = Math.floor(itemRange / gameSettings.maxLevel)
  const hightTier = Math.ceil(itemRange / gameSettings.maxLevel)
  // Get low and high points of the range
  const possibleItemLow = lowTier * (level - 1) < 1 ? 1 : lowTier * (level - 1)
  const possibleItemHigh = hightTier * level > itemRange ? itemRange : hightTier * level

  return getRandomInt(possibleItemLow, possibleItemHigh)
}

function getItemPowerFromLevel(CHAR, level) {
  // Cut power range into level segments
  const powerRange = charPower[CHAR]
  const lowTier = Math.floor(powerRange / gameSettings.maxLevel)
  const hightTier = Math.ceil(powerRange / gameSettings.maxLevel)
  // Get low and high points of the range
  const possiblePowerLow = lowTier * (level - 1) < 1 ? 1 : lowTier * (level - 1)
  const possiblePowerHigh = hightTier * level > powerRange ? powerRange : hightTier * level

  return getRandomInt(possiblePowerLow, possiblePowerHigh)
}

function getItemQuality(elite) {
  const qualities = itemQuality.quality
  const weight = elite ? itemQuality.eliteWeight : itemQuality.basicWeight

  var weighedqualities = []
  var currentquality = 0
  var i

  while (currentquality < qualities.length) {
    for (i = 0; i < weight[currentquality]; i++)
      weighedqualities[weighedqualities.length] = qualities[currentquality]
    currentquality++
  }

  return randomValue(weighedqualities)
}

// Weapon utils
function getWeaponType(type, humanoid) {
  const weapons = humanoid 
    ? type === `STR` 
      ? charItems.humanoid[`physicalWeapon`] 
      : charItems.humanoid[`magicalWeapon`]
    : type === `STR`
      ? charItems.beast[`physicalWeapon`]
      : charItems.beast[`magicalWeapon`]
  return weapons[Math.floor(Math.random() * weapons.length)]
}

function getWeaponScore(type, level, itemQuality) {
  // Pick from a weighed array of dice (d4, d6, d8, d10, d12, d20)

  // Pick from a weighed array of multiplicators

  return `2d10`
}

function getWeaponBonus(type, level, itemQuality) {
  // Pick from a weighed array of bonuses

  return 3
}

function getWeaponCost(type, level, itemQuality) {
  // Pick from a weighed array of costs (stamina : lower is rare / mana : equally balanced)

  return 6
}

export {
  getItemFromChar,
  getItemIdFromLevel,
  getItemPowerFromLevel,
  getItemQuality,
  getWeaponType,
  getWeaponScore, 
  getWeaponBonus, 
  getWeaponCost
}