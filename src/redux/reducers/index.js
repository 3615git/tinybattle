import { ATTACK } from "../constants/action-types"

import { physicalAttack } from '../../combat/physicalAttack'
import { physicalSpecial } from '../../combat/physicalSpecial'
import { monsterInfo } from '../../monsters/monster'

const initialState = {
  opponent: monsterInfo(`demon`),
  player: {
    name: `Michel le Magnifique`,
    job: `Warrior`,
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
    physicalRage: 0,
    maxPhysicalRage: 20,
    magicalRage: 12,
    maxMagicalRage: 30,
    items: {
      STR: {
        type: `axe`,
        id: 5,
        score: `d6+2`
      },
      DEX: {
        type: `ring`,
        id: 6,
        score: 2
      },
      CON: {
        type: `shield`,
        id: 5,
        score: 3
      },
      MAG: {},
      LCK: {
        type: `amulet`,
        id: 3,
        score: 2
      }
    }
  },
  playerTurn: true,
  log: {
    type: `battleStart`
  }
}

function rootReducer(state = initialState, action) {

  // Prepare next state
  let nextState = {...state}

  if (action.type === ATTACK) {
  
    // Switch attack type
    if (action.payload.type === `physical`) {
      switch (action.payload.mode) {
        case `attack`:
          nextState = physicalAttack(nextState)
          break;
        case `defend`:

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

          break;
        case `defend`:

          break;
        case `special`:

          break;

        default:
          break;
      }
    }

    // Switch player turn
    nextState.playerTurn = !nextState.playerTurn
  }
  
  return nextState
}

export default rootReducer