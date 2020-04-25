import { getWeaponType, getItemQuality, getItemIdFromLevel, getWeaponDamage, getWeaponCost, getWeaponElement } from '../utils/forge'

function getMonsterWeapon(type, level, humanoid, elite, forceQuality = false) {
  // Get weapon type
  const weaponType = getWeaponType(type, humanoid) // Get weapon from type
  const itemQuality = forceQuality ? forceQuality : getItemQuality(level, elite) // Get item rank
  const itemId = getItemIdFromLevel(weaponType, level) // Select item id from level
  const weaponDamage = getWeaponDamage(itemQuality) // Get weapon damage from level
  const weaponElement = getWeaponElement() // Get weapon cost
  const weaponCost = getWeaponCost(type, itemQuality) // Get weapon cost

    return {
      type: weaponType,
      char: type,
      id: itemId,
      score: weaponDamage,
      element: weaponElement,
      cost: weaponCost,
      quality: itemQuality
  }
}

function getMonsterWeapons(types, level, humanoid, elite, forceQuality=false) {
  let monsterWeapons = {}

  if (types) {
    // Parse items array
    for (var i = 0; i < types.length; i++) {
      // Get each weapons
      monsterWeapons[types[i]] = getMonsterWeapon(types[i], level, humanoid, elite, forceQuality)
    }
  }

  // Return conf
  return monsterWeapons
}

export {
  getMonsterWeapons
}