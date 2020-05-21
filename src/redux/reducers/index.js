import { GAMESTATE, ATTACK, SETTINGS } from "../constants/action-types"
// Settings
import { createMonsters } from '../../actions/settings/createMonsters'
import { createPlayer } from '../../actions/settings/createPlayer'
import { resetLevel } from '../../actions/settings/resetLevel'
import { setItem } from '../../actions/settings/setItem'
import { setGold } from '../../actions/settings/setGold'
import { keepItem } from '../../actions/settings/keepItem'
import { buyItem } from '../../actions/settings/buyItem'
import { buyInstant } from '../../actions/settings/buyInstant'
import { sellItem } from '../../actions/settings/sellItem'
import { sellInstant } from '../../actions/settings/sellInstant'
import { deleteLegacy } from '../../actions/settings/deleteLegacy'
import { moveItem } from '../../actions/settings/moveItem'
import { setUIColor } from '../../actions/settings/setUIColor'
import { preference } from '../../actions/settings/preference'
// Game system
import { welcome } from '../../actions/game/welcome'
import { gameCreate } from '../../actions/game/gameCreate'
import { levelTransition } from '../../actions/game/levelTransition'
import { battleIntro } from '../../actions/game/battleIntro'
import { startBattle } from '../../actions/game/startBattle'
import { victory } from '../../actions/game/victory'
import { defeat } from '../../actions/game/defeat'
import { hallOfFame } from '../../actions/game/hallOfFame'
import { openShop } from '../../actions/game/openShop'
import { logsToPlayerTurn } from '../../actions/game/logsToPlayerTurn'
/** Combat system */
// Attacks
import { attack } from '../../actions/combat/attack'
import { block } from '../../actions/combat/block'
import { specialattack } from '../../actions/combat/specialattack'
import { cast } from '../../actions/combat/cast'
import { focus } from '../../actions/combat/focus'
import { specialcast } from '../../actions/combat/specialcast'
import { skip } from '../../actions/combat/skip'
// Skills
import { stun } from '../../actions/combat/stun'
import { itembreak } from '../../actions/combat/itembreak'
import { psyblast } from '../../actions/combat/psyblast'
import { curse } from '../../actions/combat/curse'
import { heal } from '../../actions/combat/heal'
import { quickheal } from '../../actions/combat/quickheal'
import { upgrade } from '../../actions/combat/upgrade'
import { restore } from '../../actions/combat/restore'
import { damage } from '../../actions/combat/damage'
import { sharpen } from '../../actions/combat/sharpen'
import { reflect } from '../../actions/combat/reflect'
// Utils
import { autoResetBuff, incrementSkillCount } from '../../actions/combat/stats'
import { energyRefresh, maxEnergyRefresh } from '../../actions/combat/energy'
import { displayHits } from '../../actions/combat/hit'
// Private views (tests, WIP, etc)
import { monstersDemo } from '../../actions/private/monstersDemo'
// Utils
import { clog } from '../../utils/utils'
// Initial state
import { initialState } from '../../conf/settings'
import { saveState } from '../../redux/localStorage'

function rootReducer(state = initialState, action) {

  // Prepare next state
  let prevState = { ...state }
  // Spread operator only shallow copy, needs deep copy
  let nextState = JSON.parse(JSON.stringify(state))

  // Switch to next player turn
  let turnSwitch = true

  clog(action.type, `action`)

  if (action.type === SETTINGS) {
    switch (action.payload.setting) {
      case `createMonsters`:
        clog(`createMonsters`, `reducer`)
        nextState = createMonsters(nextState, action.payload.data)
        break;
      case `createPlayer`:
        clog(`createPlayer`, `reducer`)
        nextState = createPlayer(nextState, action.payload.style)
        break;
      case `resetLevel`:
        clog(`resetLevel`, `reducer`)
        nextState = resetLevel(nextState)
        break;
      case `setItem`:
        clog(`setItem`, `reducer`)
        nextState = setItem(nextState, action.payload.type, action.payload.char, action.payload.item)
        break;
      case `setGold`:
        clog(`setGold`, `reducer`)
        nextState = setGold(nextState, action.payload.type, action.payload.value)
        break;
      case `keepItem`:
        clog(`keepItem`, `reducer`)
        nextState = keepItem(nextState, action.payload.type, action.payload.char, action.payload.item)
        break;
      case `moveItem`:
        clog(`moveItem`, `reducer`)
        nextState = moveItem(nextState, action.payload.type, action.payload.char, action.payload.item)
        break;
      case `buyItem`:
        clog(`buyItem`, `reducer`)
        nextState = buyItem(nextState, action.payload.type, action.payload.char, action.payload.item)
        break;
      case `buyInstant`:
        clog(`buyInstant`, `reducer`)
        nextState = buyInstant(nextState, action.payload.item)
        break;
      case `sellItem`:
        clog(`sellItem`, `reducer`)
        nextState = sellItem(nextState, action.payload.type, action.payload.char, action.payload.item)
        break;
      case `sellInstant`:
        clog(`sellInstant`, `reducer`)
        nextState = sellInstant(nextState, action.payload.index, action.payload.item)
        break;
      case `deleteLegacy`:
        clog(`deleteLegacy`, `reducer`)
        nextState = deleteLegacy(nextState)
        break;
      case `setUIColor`:
        clog(`setUIColor`, `reducer`)
        nextState = setUIColor(nextState, action.payload.color)
        break;
      case `preference`:
        clog(`preference`, `reducer`)
        nextState = preference(nextState, action.payload.type, action.payload.value)
        break;
      default:
        break;
    }
  }

  if (action.type === GAMESTATE) {
    switch (action.payload.state) {
      case `welcome`:
        clog(`welcome`, `reducer`)
        nextState = welcome(nextState)
        break;
      case `gameCreate`:
        clog(`gameCreate`, `reducer`)
        nextState = gameCreate(nextState)
        break;
      case `levelTransition`:
        clog(`levelTransition`, `reducer`)
        nextState = levelTransition(nextState)
        break;
      case `battleIntro`:
        clog(`battleIntro`, `reducer`)
        nextState = battleIntro(nextState)
        break;
      case `playerTurn`:
        clog(`playerTurn`, `reducer`)
        nextState = logsToPlayerTurn(nextState)
        break;
      case `battle`:
        clog(`battle`, `reducer`)
        nextState = startBattle(nextState)
        break;
      case `victory`:
        clog(`victory`, `reducer`)
        nextState = victory(nextState)
        break;
      case `defeat`:
        clog(`defeat`, `reducer`)
        nextState = defeat(nextState)
        break;
      case `hallOfFame`:
        clog(`hallOfFame`, `reducer`)
        nextState = hallOfFame(nextState)
        break;
      case `shop`:
        clog(`shop`, `reducer`)
        nextState = openShop(nextState)
        break;
      // Private views
      case `monstersDemo`:
        clog(`monstersDemo`, `reducer`)
        nextState = monstersDemo(nextState)
        break;
      default:
        break;
    }
  } 

  if (action.type === ATTACK) {

    // Skip turn
    if (action.payload.type === `skip`) {
      clog(`skip`, `reducer`)
      nextState = skip(nextState)
    }
  
    // Switch attack type
    if (action.payload.type === `physical`) {
      switch (action.payload.mode) {
        case `attack`:
          clog(`attack`, `reducer`)
          nextState = attack(nextState)
          break;
        case `defend`:
          clog(`defend`, `reducer`)
          nextState = block(nextState)
          break;
        case `special`:
          clog(`special`, `reducer`)
          nextState = specialattack(nextState)
          break;
        default:
          break;
      }
    }

    if (action.payload.type === `magical`) {
      switch (action.payload.mode) {
        case `attack`:
          clog(`attack`, `reducer`)
          nextState = cast(nextState)
          break;
        case `defend`:
          clog(`defend`, `reducer`)
          nextState = focus(nextState)
          break;
        case `special`:
          clog(`special`, `reducer`)
          nextState = specialcast(nextState)
          break;
        default:
          break;
      }
    }

    if (action.payload.type === `skill`) {
      switch (action.payload.mode) {
        case `stun`:
          clog(`stun`, `reducer`)
          nextState = stun(nextState)
          break;
        case `itembreak`:
          clog(`itembreak`, `reducer`)
          nextState = itembreak(nextState)
          break;
        case `psyblast`:
          clog(`psyblast`, `reducer`)
          nextState = psyblast(nextState)
          break;
        case `curse`:
          clog(`curse`, `reducer`)
          nextState = curse(nextState)
          break;
        case `heal`:
          clog(`heal`, `reducer`)
          nextState = heal(nextState)
          break;
        case `reflect`:
            clog(`reflect`, `reducer`)
            nextState = reflect(nextState)
            break;
        // Instants
        case `quickheal`:
          clog(`quickheal`, `reducer`)
          turnSwitch = false
          nextState = quickheal(nextState, action.payload.item, action.payload.id)
          break;
        case `upgrade`:
          clog(`upgrade`, `reducer`)
          turnSwitch = false
          nextState = upgrade(nextState, action.payload.item, action.payload.id)
          break;
        case `restore`:
          clog(`restore`, `reducer`)
          turnSwitch = false
          nextState = restore(nextState, action.payload.item, action.payload.id)
          break;
        case `damage`:
          clog(`damage`, `reducer`)
          turnSwitch = false
          nextState = damage(nextState, action.payload.item, action.payload.id)
          break;
        case `sharpen`:
          clog(`sharpen`, `reducer`)
          turnSwitch = false
          nextState = sharpen(nextState, action.payload.item, action.payload.id)
          break;
        default:
          break;
      }
    }

    if (turnSwitch) {
      // Mana reloads
      nextState = energyRefresh(nextState, `magical`)
      nextState = energyRefresh(nextState, `physical`)
      // Reset temporary buffs
      nextState = autoResetBuff(nextState)
      // Increment skill counters
      nextState = incrementSkillCount(nextState)
      // Compute hits for UI display
      nextState = displayHits(prevState, nextState)
      // Switch player turn
      nextState.game.playerTurn = !nextState.game.playerTurn
      // Opponent can play
      nextState.game.skipTurn = false
    } else {
      // Switch player turn
      nextState.game.playerTurn = true
      // But prevent opponent from playing
      nextState.game.skipTurn = true
    }
  }

  // console.log(nextState)

  // In every case, compute Max values
  nextState = maxEnergyRefresh(nextState)

  // Save state to LocalStorage
  saveState(nextState)

  // Return updated state
  return nextState
}

export default rootReducer