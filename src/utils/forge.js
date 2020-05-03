import { gameSettings } from "../conf/settings"
import { charItems, itemRanges, charPower, itemQuality, weaponDamage, weaponMultiplicator, weaponBonus, weaponCost, weaponElements } from "../conf/settings_items"
import { getRandomInt, randomValue, generateWeight } from "../utils/utils"

// Item utils
function getItemFromChar(CHAR, humanoid) {
  const items = humanoid ? charItems.humanoid[CHAR] : charItems.beast[CHAR]
  if (items && items.length > 0) return items[Math.floor(Math.random() * items.length)]
  else return null
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
  const weighedqualities = generateWeight(qualities, weight)

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

function getWeaponDamage(itemQuality) {
  // Pick from a weighed array of dice (d4, d6, d8, d10, d12, d20)
  const heavyQualities = generateWeight(weaponDamage.damage, weaponDamage[itemQuality])
  // Pick from a weighed array of multiplicators
  const heavyMultiplicators = generateWeight(weaponMultiplicator.damage, weaponMultiplicator[itemQuality])
  // Pick from a weighed array of bonuses
  const heavyBonus = randomValue( generateWeight(weaponBonus.damage, weaponBonus[itemQuality]) )
  const displayBonus = (heavyBonus === 0) ? `` : `+` + heavyBonus
  return randomValue(heavyMultiplicators) + randomValue(heavyQualities) + displayBonus
}

function getWeaponCost(type, itemQuality) {
  const itemCostRange = type === `STR`
    ? weaponCost[`physicalWeapon`][itemQuality]
    : weaponCost[`magicalWeapon`][itemQuality]
  // Pick from a weighed array of costs (stamina : lower is rare / mana : equally balanced)
  const itemCost = getRandomInt(itemCostRange[0], itemCostRange[1]) 

  return itemCost
}

function getWeaponElement() {
  // Pick from a weighed array of elements
  const heavyElements = generateWeight(weaponElements.elements, weaponElements.basicWeight)

  return randomValue(heavyElements)
}

export {
  getItemFromChar,
  getItemIdFromLevel,
  getItemPowerFromLevel,
  getItemQuality,
  getWeaponType,
  getWeaponDamage, 
  getWeaponCost,
  getWeaponElement
}