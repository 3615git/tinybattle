import { ADD_ARTICLE } from "../constants/action-types"
import { diceRoll } from '../../utils/utils'

const initialState = {
  'opponent': {
    name: `Gobloraxx`,
    STR: diceRoll(20),
    DEX: diceRoll(20),
    CON: diceRoll(10),
    MAG: diceRoll(10),
    LCK: diceRoll(6),
    hitPoints: 80,
    maxHitPoints: 80,
    physicalRage: 0,
    maxPhysicalRage: 20
  },
  'player': {
    name: `Michel`,
    xp: 0,
    level: 1,
    STR: 8,
    DEX: 5,
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
  },
  'playerTurn': true
}

function rootReducer(state = initialState, action) {
  if (action.type === ADD_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    })
  }
  return state
}

export default rootReducer