import { defaultChars, defaultInstants } from "../../conf/settings"
import { getMonsterWeapons } from '../../monsters/getMonsterWeapons'
import { getMonsterItems } from '../../monsters/getMonsterItems'
import { gameSettings } from "../../conf/settings"
import { getShopInstants } from '../../monsters/getShopInstants'

/**
  * @desc Create initial player
*/

const createPlayer = (data, style) => {

  let previousName = data.player ? data.player.name : ``
  let previousGold = data.player ? data.player.gold : 0

  // Set basic player info
  data.player = {
    name: previousName,
    level: 1,
    gold: previousGold,
    items: {},
    weapons: {},
    skills : {},
  }

  // Define characs
  data.player.STR = defaultChars[style].STR
  data.player.DEX = defaultChars[style].DEX
  data.player.CON = defaultChars[style].CON
  data.player.MAG = defaultChars[style].MAG
  data.player.LCK = defaultChars[style].LCK
  data.player.fumble = defaultChars[style].fumble

  // Get default weapons
  const weapons = getMonsterWeapons([`STR`, `MAG`], 1, true, false, `normal`)
  data.player.weapons.STR = weapons[`STR`]
  data.player.weapons.MAG = weapons[`MAG`]

  // Get default free item
  const item = getMonsterItems([defaultChars[style].startItem], 1, true, false, `normal`)
  // Start item is junk, so make sure bonus is crap
  if (item[defaultChars[style].startItem].score > 2) item[defaultChars[style].startItem].score = 2
  // Set data
  data.player.items[defaultChars[style].startItem] = item[defaultChars[style].startItem]

  // Compute stamina + mana
  data.player.hitPoints = data.player.CON * 10
  data.player.maxHitPoints = data.player.CON * 10 
  data.player.magicPoints = data.player.MAG * 10 
  data.player.maxMagicPoints = data.player.MAG * 10 
  data.player.stamina = data.player.STR * 10
  data.player.maxStamina = data.player.STR * 10 
  data.player.physicalRage = 0
  data.player.maxPhysicalRage = Math.round(data.player.maxHitPoints * 50 / 100)
  data.player.magicalRage = 0
  data.player.maxMagicalRage = Math.round(data.player.maxMagicPoints * 50 / 100)

  // Create secondary attacks counters
  data.player.skills.heal = { current: gameSettings.skillsRecharge.heal, ready: gameSettings.skillsRecharge.heal }
  data.player.skills.stun = { current: gameSettings.skillsRecharge.stun, ready: gameSettings.skillsRecharge.stun }
  data.player.skills.itembreak = { current: gameSettings.skillsRecharge.itembreak, ready: gameSettings.skillsRecharge.itembreak }
  data.player.skills.reflect = { current: gameSettings.skillsRecharge.reflect, ready: gameSettings.skillsRecharge.reflect }
  data.player.skills.psyblast = { current: gameSettings.skillsRecharge.psyblast, ready: gameSettings.skillsRecharge.psyblast }
  data.player.skills.curse = { current: gameSettings.skillsRecharge.curse, ready: gameSettings.skillsRecharge.curse }
  
  // Instant items
  data.player.instants = []
  let catalog = defaultInstants[style]
  let startInstants = getShopInstants(catalog, 1, `normal`)
  // eslint-disable-next-line no-unused-vars
  for (let [key, value] of Object.entries(startInstants)) {
    data.player.instants.push(value)
  }

  // Overwrite with legacy items
  if (data.game && data.game.legacy) {
    for (let [key] of Object.entries(data.game.legacy)) {
      for (let [itemKey, itemValue] of Object.entries(data.game.legacy[key])) {
        data.player[key][itemKey] = itemValue
      }
    }
  }

  return data
}

export { createPlayer }
