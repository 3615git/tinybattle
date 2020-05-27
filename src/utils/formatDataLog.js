import { gameSettings } from "../conf/settings"

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
  // Special attacks
  const reflectDisplay = (fightLog.data && fightLog.data.reflect) ? `<span class="reflect">Reflected !</span>` : ``
  const boostDisplay = (fightLog.data && fightLog.data.boost) ? `<span class="boost">Boost !</span>` : ``

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
      message = `<span class="up">${fightLog.data.dexBonus}</span> DEX, <span class="up">${fightLog.data.conBonus}</span> CON, <span class="up">${fightLog.data.rageBonus}</span> rage`
      note = `<span class="down">${fightLog.data.magMalus}</span> MAG, ${opponentDisplay} <span class="up">${fightLog.data.strBonus}</span> STR`
      log = `${playerDisplay} ${message} ${note}`
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
        attackResult += `<br /><span class="elemental">Elemental bonus!</span>&nbsp;`
      }

      // Damage
      damage = ``
      

      if (fightLog.data.damage && fightLog.data.damage.damage > 0) {
        damage = `Damage : <span class="physicaldamage">${fightLog.data.damage.damage}</span>`
      } else {
        if (fightLog.data.hit.hit) damage = `But no damage.`
      }

      title = `${playerDisplay} attacks!`
      message = `${attackResult} ${reflectDisplay}${boostDisplay} ${damage}`
      note = `To hit : ${fightLog.data.hit.toHit}`
      log = `${playerDisplay} attacks! To hit : ${fightLog.data.hit.toHit} <span class="roll">${fightLog.data.hit.roll}</span>${attackResult} ${reflectDisplay}${boostDisplay} ${damage}`
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
        attackResult += `<br /><span class="elemental">Elemental bonus!</span>&nbsp;`
      }

      // Damage
      damage = ``

      if (fightLog.data.damage && fightLog.data.damage.damage > 0) {
        damage = `Damage : <span class="magicaldamage">${fightLog.data.damage.damage}</span>`
      } else {
        if (fightLog.data.hit.hit) damage = `But no damage.`
      }
      
      title = `${playerDisplay} casts a spell!`
      message = `${attackResult} ${reflectDisplay}${boostDisplay}<br />${damage}`
      note = `To hit : ${fightLog.data.hit.toHit}`
      log = `${playerDisplay} casts a spell! To hit : ${fightLog.data.hit.toHit} <span class="roll">${fightLog.data.hit.roll}</span>${attackResult} ${reflectDisplay}${boostDisplay} ${damage}`
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

    case `heal`:
      // Hit
      if (fightLog.data.hit === `fumble`) {
        attackResult = `<span class="fumble">Oh no!</span>`
        damage = `It's empty! <span class="up">${fightLog.data.fumbleMalus}</span> fumble rate for 2 turns.`
      } else {
        attackResult = `${fightLog.data.healCapacity} health recovery!`
        damage = `${playerDisplay} recovers ${fightLog.data.healValue} HP.`
      }

      title = `${playerDisplay} uses a potion!`
      message = `${attackResult}`
      note = damage
      log = `${title} ${attackResult} ${damage}`
      icon = gameSettings.icons.heal
      break;

    case `quickheal`:
      // Hit
      attackResult = `${fightLog.data.healValue} health recovery!`
      damage = `${playerDisplay}&nbsp;recovers&nbsp;${fightLog.data.healValue} HP.`

      title = `${playerDisplay} uses healing item!`
      message = `${attackResult}`
      note = damage
      log = `${title} ${attackResult} ${damage}`
      icon = fightLog.data.icon
      break;

    case `upgrade`:
      // Hit
      attackResult = `${fightLog.data.buffChar} boost!`
      damage = `<span class="up">${fightLog.data.buffValue}</span> ${fightLog.data.buffChar}`

      title = `${playerDisplay} uses boost item!`
      message = damage
      note = `${fightLog.data.buffType} boost`
      log = `${title} ${damage} (${note})`
      icon = fightLog.data.icon
      break;

    case `restore`:
      // Hit
      attackResult = `Energy restore!`
      damage = `Fully restored!`

      title = `${playerDisplay} restores energy!`
      message = damage
      note = `Stamina, mana and skills energy restored.`
      log = `${title} ${note}`
      icon = fightLog.data.icon
      break;

    case `damage`:
      // Hit
      attackResult = `Weapon throw!`
      damage = `${fightLog.data.damage} damage!`

      title = `${playerDisplay} throws weapon!`
      message = damage
      note = ``
      log = `${title} ${damage}`
      icon = fightLog.data.icon
      break;

    case `sharpen`:
      if (fightLog.data.hit === `fumble`) {
        attackResult = `This did not work`
        damage = `No effect.`
        note = `Weapons has not changed.`
      } else {
        attackResult = `Weapon enhanced!`
        damage = `<span class="up">1D</span> damage!`
        note = `New elemental bonus <span class="elementWrapper ${fightLog.data.element}" /> `
      }

      // Hit
      title = `${playerDisplay} sharpens a weapon!`
      message = damage
      log = `${title} ${damage} ${note}`
      icon = fightLog.data.icon
      break;

    case `curse`:
      // Hit
      if (fightLog.data.hit === `success`) {
        attackResult = `Curse!`
        damage = `${opponentDisplay} <span class="up">${fightLog.data.fumbleMalus}</span> fumble rate for 2 turns.`
      }
      if (fightLog.data.hit === `critical`) {
        attackResult = `<span class="critical">Evil curse!</span>`
        damage = `${opponentDisplay} <span class="up">${fightLog.data.fumbleMalus}</span> fumble rate for 2 turns.`
      }
      if (fightLog.data.hit === `fumble`) {
        attackResult = `<span class="fumble">Bad luck!</span>`
        damage = `${playerDisplay} <span class="up">${fightLog.data.fumbleMalus}</span> fumble rate for 1 turn.`
      }

      title = `${playerDisplay} uses evil eye!`
      message = `${attackResult}`
      note = damage
      log = `${playerDisplay} uses evil eye! ${attackResult} ${damage}`
      icon = gameSettings.icons.curse
      break;

    case `reflect`:
      // Hit
      if (fightLog.data.reflect === `miss`) {
        attackResult = `<span class="fumble">Missed!</span>`
        damage = `Spell has no effect !`
      } else if (fightLog.data.reflect === `success`) {
        attackResult = `Success!`
        damage = `${opponentDisplay}'s next attack will be reflected!`
      } else {
        attackResult = `Disaster!`
        damage = `${opponentDisplay}'s next attack will amplified!`
      }

      title = `${playerDisplay} uses reflect spell!`
      message = `${attackResult}`
      note = damage
      log = `${title} ${attackResult} ${damage}`
      icon = gameSettings.icons.reflect
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
  formatDataLog
}