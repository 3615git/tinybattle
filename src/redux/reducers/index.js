import { GAMESTATE, ATTACK, SETTINGS } from "../constants/action-types"
// Settings
import { setUIColor } from '../../actions/settings/setUIColor'
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

const initialState = {
  player: {
    name: `Michel le Magnifique`,
    xp: 0,
    level: 1,
    STR: 8,
    DEX: 7,
    CON: 2,
    MAG: 3,
    LCK: 2,
    fumble: 1,
    gold: 35,
    hitPoints: 70,
    maxHitPoints: 70,
    magicPoints: 30,
    maxMagicPoints: 30,
    stamina: 30,
    maxStamina: 30,
    physicalRage: 0,
    maxPhysicalRage: 20,
    magicalRage: 0,
    maxMagicalRage: 30,
    items: {
      STR: {},
      DEX: {
        type: `ring`,
        id: 12,
        score: 3
      },
      CON: {
        type: `shield`,
        id: 5,
        score: 3
      },
      LCK: {
        type: `amulet`,
        id: 3,
        score: 2
      }
    },
    weapons: {
      STR: {
        type: `sword`,
        char: `STR`,
        id: 5,
        score: `d6+2`,
        element: `fire`,
        cost: 4,
        quality: `rare`
      }, 
      MAG: {
        type: `sceptre`,
        char: `MAG`,
        id: 10,
        score: `3d10`,
        element: `earth`,
        cost: 4,
        quality: `legendary`
      },
    },
  },
  game: {
    state: `welcome`,
    settings: {
      combatSpeed: 1500
    }
  }
}

function rootReducer(state = initialState, action) {

  // Prepare next state
  let prevState = { ...state }
  let nextState = { ...state }

  console.log(action)

  if (action.type === SETTINGS) {
    switch (action.payload.setting) {
      case `setUIColor`:
        nextState = setUIColor(nextState, action.payload.color)
        break;
      default:
        break;
    }
  }

  if (action.type === GAMESTATE) {
    switch (action.payload.state) {
      case `welcome`:
        nextState = welcome(nextState)
        break;
      case `gameCreate`:
        nextState = gameCreate(nextState)
        break;
      case `gameSelect`:
        nextState = gameSelect(nextState)
        break;
      case `levelTransition`:
        nextState = levelTransition(nextState)
        break;
      case `battleIntro`:
        nextState = battleIntro(nextState)
        break;
      case `playerTurn`:
        nextState = logsToPlayerTurn(nextState)
        break;
      case `battle`:
        nextState = startBattle(nextState)
        break;
      case `victory`:
        nextState = victory(nextState)
        break;
      case `defeat`:
        nextState = defeat(nextState)
        break;
      case `hallOfFame`:
        nextState = hallOfFame(nextState)
        break;
      case `shop`:
        nextState = openShop(nextState)
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
          nextState = physicalAttack(nextState)
          break;
        case `defend`:
          nextState = physicalDefend(nextState)
          break;
        case `special`:
          nextState = physicalSpecial(nextState)
          break;
        default:
          break;
      }
    }

    if (action.payload.type === `magical`) {
      switch (action.payload.mode) {
        case `attack`:
          nextState = magicalAttack(nextState)
          break;
        case `defend`:
          nextState = magicalDefend(nextState)
          break;
        case `special`:
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