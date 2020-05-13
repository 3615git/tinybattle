import { gameSettings } from "../conf/settings"

// Utils
function diceRoll(sides) {
  return Math.floor(Math.random() * sides) + 1
}

function randomProperty(obj) {
  var keys = Object.keys(obj);
  return obj[keys[keys.length * Math.random() << 0]]
}

function randomKey(obj) {
  var keys = Object.keys(obj);
  return keys[keys.length * Math.random() << 0]
}

function randomValue(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function limitValue(value, min, max) {
  if (value > max) value = max
  if (value < min) value = min
  return value
}

const sumOfArray = arr => arr.reduce((a, b) => a + b, 0)

function generateWeight(items, weight) {
  var weighedItems = []
  var currentItem = 0
  var i

  while (currentItem < items.length) {
    for (i = 0; i < weight[currentItem]; i++)
      weighedItems[weighedItems.length] = items[currentItem]
    currentItem++
  }

  return weighedItems
}

function clog(message, mode = "default") {
  let color, icon
  switch (mode) {
    case "location":
      color = "white"
      icon = "📍"
      break;
    case  "action":
      color = "red"
      icon = "🟥"
      break;
    case "reducer":
      color = "orange"
      icon = "🟧"
      break;
    case "function":
      color = "grey";
      icon ="🕹"
      break;
    case "stop":
      color = "red";
      icon = "👋🏼"
      break;
    case "error":
      color = "Red";
      break;
    case "warning":
      color = "Orange";
      break;
    default:
      color = "white"
      break;
  }

  if (mode === `data`) console.table(message);
  else console.log(`%c${icon} ${message}`, `color:${color}`);
}

function formatDataLog(type, fightLog, game) {
  let title, log, message, note, icon

  let playerColor = game 
    ? game.playerTurn ? `white` : game.uicolor.vibrant
    : null

  let targetColor = game
    ? !game.playerTurn ? `white` : game.uicolor.vibrant
    : null

  let playerDisplay = fightLog.activePlayer
    ? `<span style="color:${playerColor}">${fightLog.activePlayer.name}</span>`
    : null
  
  let opponentDisplay = fightLog.targetPlayer
    ? `<span style="color:${targetColor}">${fightLog.targetPlayer.name}</span>`
    : null

  let attackResult, damage

  switch (type) {
    case `battleStart`:
      log = `Battle starts !`
      icon = gameSettings.icons.battleStart
      break;

    case `skip`:
      title = `Nothing!`
      message = `Skip!`
      note = `${playerDisplay} skips turn!`
      log = `${playerDisplay} skips turn!`
      icon = gameSettings.icons.skip
      break;

    case `block`:
      title = `${playerDisplay} blocks!`
      message = `<span class="up">${fightLog.data.dexBonus}</span> DEX and <span class="up">${fightLog.data.healValue}</span> HP`
      note = `${opponentDisplay} <span class="up">${fightLog.data.strBonus}</span> STR`
      log = `${playerDisplay} blocks! <span class="up">${fightLog.data.dexBonus}</span> DEX and <span class="roll">${fightLog.data.healRoll}</span><span class="up">${fightLog.data.healValue}</span> HP. ${opponentDisplay} <span class="up">${fightLog.data.strBonus}</span> STR.`
      icon = gameSettings.icons.block
      break;

    case `focus`:
      title = `${playerDisplay} focus!`
      message = `<span class="up">${fightLog.data.magBonus}</span> MAG`
      note = `<span class="down">${fightLog.data.dexMalus}</span> DEX and <span class="down">${fightLog.data.strMalus}</span> STR`
      log = `${playerDisplay} focus! <span class="up">${fightLog.data.magBonus}</span> MAG, <span class="down">${fightLog.data.dexMalus}</span> DEX and <span class="down">${fightLog.data.strMalus}</span> STR.`
      icon = gameSettings.icons.focus
      break;
    
    case `specialattack`:
      log = `${playerDisplay} rage! <span class="up">${fightLog.data.strBonus}</span> STR, <span class="up">${fightLog.data.dexBonus}</span> DEX and <span class="up">${fightLog.data.lckBonus}</span> LCK.`
      icon = gameSettings.icons.specialattack
      break;

    case `specialcast`:
      log = `${playerDisplay} mana flare! <span class="up">${fightLog.data.magBonus}</span> MAG and <span class="up">${fightLog.data.lckBonus}</span> LCK.`
      icon = gameSettings.icons.specialcast
      break;

    case `attack`:
      // Hit
      attackResult = `Miss.`
      if (fightLog.data.hit.hit) attackResult = `Hit!`
      if (fightLog.data.hit.critical) attackResult = `<span class="critical">Critical hit!</span>`
      if (fightLog.data.hit.fumble) attackResult = `<span class="fumble">Fumble!</span> ${opponentDisplay} gains LCK bonus.`

      // Elemental hit
      if (fightLog.data.damage && fightLog.data.damage.elemental > 0) {
        attackResult += `&nbsp;<span class="elemental">Elemental bonus!</span>&nbsp;`
      }

      // Damage
      damage = ``

      if (fightLog.data.damage && fightLog.data.damage.damage > 0) {
        damage = `Damage : <span class="physicaldamage">${fightLog.data.damage.damage}</span>`
      } else {
        if (fightLog.data.hit.hit) damage = `But no damage.`
      }

      title = `${playerDisplay} attacks!`
      message = `${attackResult} ${damage}`
      note = `To hit : ${fightLog.data.hit.toHit}`
      log = `${playerDisplay} attacks! To hit : ${fightLog.data.hit.toHit} <span class="roll">${fightLog.data.hit.roll}</span>${attackResult} ${damage}`
      // Weapon icon
      if (fightLog.activePlayer.weapons && fightLog.activePlayer.weapons.STR) icon = [fightLog.activePlayer.weapons.STR.type, fightLog.activePlayer.weapons.STR.id]
      else icon = [`drops`, 18]
      break;

    case `cast`:
      // Hit
      attackResult = `Spell failed.`
      if (fightLog.data.hit.hit) attackResult = `Success!`
      if (fightLog.data.hit.critical) attackResult = `<span class="critical">Perfect!</span>`
      if (fightLog.data.hit.fumble) attackResult = `<span class="fumble">Total failure!</span> ${opponentDisplay} gains LCK bonus.`

      // Elemental hit
      if (fightLog.data.damage && fightLog.data.damage.elemental > 0) {
        attackResult += `&nbsp;<span class="elemental">Elemental bonus!</span>&nbsp;`
      }

      // Damage
      damage = ``

      if (fightLog.data.damage && fightLog.data.damage.damage > 0) {
        damage = `Damage : <span class="magicaldamage">${fightLog.data.damage.damage}</span>`
      } else {
        if (fightLog.data.hit.hit) damage = `But no damage.`
      }
      
      title = `${playerDisplay} casts a spell!`
      message = `${attackResult} ${damage}`
      note = `To hit : ${fightLog.data.hit.toHit}`
      log = `${playerDisplay} casts a spell! To hit : ${fightLog.data.hit.toHit} <span class="roll">${fightLog.data.hit.roll}</span>${attackResult} ${damage}`
      // Weapon icon
      if (fightLog.activePlayer.weapons && fightLog.activePlayer.weapons.MAG) icon = [fightLog.activePlayer.weapons.MAG.type, fightLog.activePlayer.weapons.MAG.id]
      else icon = [`drops`, 18]
      break;

    case `psyblast`:
      // Hit
      if (fightLog.data.hit === `success`) {
        attackResult = `Success!`
        damage = `${opponentDisplay} <span class="down">${fightLog.data.magMalus}</span> MAG for 2 turns.`
      }
      if (fightLog.data.hit === `critical`) {
        attackResult = `<span class="critical">Mind blasted!</span>`
        damage = `${opponentDisplay} <span class="down">${fightLog.data.magMalus}</span> MAG for 2 turns.`
      }
      if (fightLog.data.hit === `fumble`) {
        attackResult = `<span class="fumble">Backfire!</span>`
        damage = `${playerDisplay} <span class="down">${fightLog.data.magMalus}</span> MAG for 2 turns.`
      }

      title = `${playerDisplay} uses psychic blast!`
      message = `${attackResult}`
      note = damage
      log = `${playerDisplay} uses psychic blast! ${attackResult} ${damage}`
      icon = gameSettings.icons.psyblast
      break;

    case `stun`:
      // Hit
      if (fightLog.data.hit === `success`) {
        attackResult = `BAM!`
        damage = `${opponentDisplay} is stunned and skip ${fightLog.data.rounds} turn.`
      }
      if (fightLog.data.hit === `critical`) {
        attackResult = `<span class="critical">Head shot!</span>`
        damage = `${opponentDisplay} is knocked out and skip ${fightLog.data.rounds} turns.`
      }
      if (fightLog.data.hit === `fumble`) {
        attackResult = `<span class="fumble">Missed!</span>`
        damage = `${playerDisplay} slips! <span class="down">${fightLog.data.dexMalus}</span> DEX and <span class="down">${fightLog.data.strMalus}</span>.`
      }

      title = `${playerDisplay} tries a stunning blast!`
      message = `${attackResult}`
      note = damage
      log = `${title} ${attackResult} ${damage}`
      icon = gameSettings.icons.stun
      break;

    case `itembreak`:
      // Hit
      if (fightLog.data.hit === `fumble`) {
        attackResult = `<span class="fumble">Missed!</span>`
        damage = `${playerDisplay} slips! <span class="down">${fightLog.data.dexMalus}</span> DEX. ${opponentDisplay} gains LCK bonus.`
      } else {
        attackResult = `Item broken!`
        damage = `${opponentDisplay} loses an item.`
      }

      title = `${playerDisplay} tries to break enemy's item!`
      message = `${attackResult}`
      note = damage
      log = `${title} ${attackResult} ${damage}`
      icon = gameSettings.icons.itembreak
      break;

    default:
      break;
  }

  return {
    type,
    title,
    message, 
    note,
    log,
    icon
  }
}

export {
  diceRoll,
  randomProperty,
  randomKey,
  randomValue,
  getRandomInt, 
  limitValue,
  sumOfArray,
  generateWeight,
  clog,
  formatDataLog
}