import { GAMESTATE, ATTACK } from "../constants/action-types"
// Game system
import { battleIntro } from '../../actions/game/battleIntro'
import { startBattle } from '../../actions/game/startBattle'
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
        id: 5,
        score: `d6+2`,
        cost: 4,
        quality: `rare`
      }, 
      MAG: {
        type: `sceptre`,
        id: 10,
        score: `3d10`,
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

  if (action.type === GAMESTATE) {
    switch (action.payload.state) {
      case `welcome`:
        // nextState = resetWelcome(nextState)
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