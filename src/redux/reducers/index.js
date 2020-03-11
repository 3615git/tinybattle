import { ATTACK, CONFIRM } from "../constants/action-types"

import { physicalAttack } from '../../combat/physicalAttack'

import { diceRoll } from '../../utils/utils'

const initialState = {
  'opponent': {
    name: `Gorblox`,
    job: `Cave troll`,
    STR: 10,
    DEX: 3,
    CON: 3,
    MAG: diceRoll(10),
    LCK: diceRoll(6),
    hitPoints: 80,
    maxHitPoints: 80,
    physicalRage: 0,
    maxPhysicalRage: 20,
    items: {}
  },
  'player': {
    name: `Michel le Magnifique`,
    job: `Warrior`,
    xp: 0,
    level: 1,
    STR: 8,
    DEX: 7,
    CON: 2,
    MAG: 3,
    LCK: 2,
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
  'playerTurn': true
}

function rootReducer(state = initialState, action) {

  // Prepare next state
  let currentState = {...state}
  let nextState

  if (action.type === ATTACK) {
    // Switch attack type
    if (action.payload.type === `physical`) {
      switch (action.payload.mode) {
        case `attack`:
          nextState = physicalAttack(currentState)
          break;
        case `defend`:

          break;
        case `special`:

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

    // Compute updated object and log

    // Pass log + nextState to redux store
    currentState.nextState = nextState
  }

  if (action.type === CONFIRM) {
    // Update redux store using nextState and reset nextState
    currentState = currentState.nextState.data
  }

  return currentState
}

export default rootReducer