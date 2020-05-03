import { GAMESTATE, ATTACK, SETTINGS } from "../constants/action-types"
// Settings
import { createMonsters } from '../../actions/settings/createMonsters'
import { createPlayer } from '../../actions/settings/createPlayer'
import { resetLevel } from '../../actions/settings/resetLevel'
import { setItem } from '../../actions/settings/setItem'
import { setGold } from '../../actions/settings/setGold'
import { keepItem } from '../../actions/settings/keepItem'
import { buyItem } from '../../actions/settings/buyItem'
import { sellItem } from '../../actions/settings/sellItem'
import { deleteLegacy } from '../../actions/settings/deleteLegacy'
import { moveItem } from '../../actions/settings/moveItem'
import { setUIColor } from '../../actions/settings/setUIColor'
import { preference } from '../../actions/settings/preference'
// Game system
import { welcome } from '../../actions/game/welcome'
import { gameCreate } from '../../actions/game/gameCreate'
import { gameSelect } from '../../actions/game/gameSelect'
import { levelTransition } from '../../actions/game/levelTransition'
import { battleIntro } from '../../actions/game/battleIntro'
import { startBattle } from '../../actions/game/startBattle'
import { victory } from '../../actions/game/victory'
import { defeat } from '../../actions/game/defeat'
import { hallOfFame } from '../../actions/game/hallOfFame'
import { openShop } from '../../actions/game/openShop'
import { logsToPlayerTurn } from '../../actions/game/logsToPlayerTurn'
// Combat system
import { physicalAttack } from '../../actions/combat/physicalAttack'
import { physicalDefend } from '../../actions/combat/physicalDefend'
import { physicalSpecial } from '../../actions/combat/physicalSpecial'
import { magicalAttack } from '../../actions/combat/magicalAttack'
import { magicalDefend } from '../../actions/combat/magicalDefend'
import { magicalSpecial } from '../../actions/combat/magicalSpecial'
import { autoResetBuff } from '../../actions/combat/stats'
import { energyRefresh } from '../../actions/combat/energy'
import { displayHits } from '../../actions/combat/hit'
// Private views (tests, WIP, etc)
import { monstersDemo } from '../../actions/private/monstersDemo'
// Utils
import { clog } from '../../utils/utils'
// Initial state
import { initialState } from '../../conf/settings'

function rootReducer(state = initialState, action) {

  // Prepare next state
  let prevState = { ...state }
  // Spread operator only shallow copy, needs deep copy
  let nextState = JSON.parse(JSON.stringify(state))

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
      case `sellItem`:
        clog(`sellItem`, `reducer`)
        nextState = sellItem(nextState, action.payload.type, action.payload.char, action.payload.item)
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
      case `gameSelect`:
        clog(`gameSelect`, `reducer`)
        nextState = gameSelect(nextState)
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
  
    // Switch attack type
    if (action.payload.type === `physical`) {
      switch (action.payload.mode) {
        case `attack`:
          clog(`attack`, `reducer`)
          nextState = physicalAttack(nextState)
          break;
        case `defend`:
          clog(`defend`, `reducer`)
          nextState = physicalDefend(nextState)
          break;
        case `special`:
          clog(`special`, `reducer`)
          nextState = physicalSpecial(nextState)
          break;
        default:
          break;
      }
    }

    if (action.payload.type === `magical`) {
      switch (action.payload.mode) {
        case `attack`:
          clog(`attack`, `reducer`)
          nextState = magicalAttack(nextState)
          break;
        case `defend`:
          clog(`defend`, `reducer`)
          nextState = magicalDefend(nextState)
          break;
        case `special`:
          clog(`special`, `reducer`)
          nextState = magicalSpecial(nextState)
          break;
        default:
          break;
      }
    }

    // Mana reloads
    nextState = energyRefresh(nextState, `magical`)
    nextState = energyRefresh(nextState, `physical`)

    // Reset temporary buffs
    nextState = autoResetBuff(nextState)

    // Compute hits for UI display
    nextState = displayHits(prevState, nextState)

    // Switch player turn
    nextState.game.playerTurn = !nextState.game.playerTurn
  }

  // console.log(nextState)

  return nextState
}

export default rootReducer