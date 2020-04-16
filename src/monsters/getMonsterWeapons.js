import { getWeaponType, getItemQuality, getItemIdFromLevel, getWeaponScore, getWeaponBonus, getWeaponCost } from '../utils/forge'

function getMonsterWeapon(type, level, humanoid, elite) {
  // Get weapon type
  const weaponType = getWeaponType(type, humanoid) // Get weapon from type
  const itemQuality = getItemQuality(level, elite) // Get item rank
  const itemId = getItemIdFromLevel(weaponType, level) // Select item id from level
  const weaponScore = getWeaponScore(type, level, itemQuality) // Get weapon damage from level
  const weaponBonus = getWeaponBonus(type, level, itemQuality) // Get weapon static bonus from quality
  const weaponDamage = weaponScore + '+' + weaponBonus
  const weaponCost = getWeaponCost(type, level, itemQuality) // Get weapon cost

    return {
      type: weaponType,
      id: itemId,
      score: weaponDamage,
      cost: weaponCost,
      quality: itemQuality
  }
}

function getMonsterWeapons(types, level, humanoid, elite) {
  let monsterWeapons = {}

  // Parse items array
  for (var i = 0; i < types.length; i++) {
    // Get each weapons
    monsterWeapons[types[i]] = getMonsterWeapon(types[i], level, humanoid, elite)
  }

  // Return conf
  return monsterWeapons
}

export {
  getMonsterWeapons
}