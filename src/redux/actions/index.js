import { ATTACK } from "../constants/action-types"
import { GAMESTATE } from "../constants/action-types"

function setGameState(payload) {
  return { type: GAMESTATE, payload }
}

function attack(payload) {
  return { type: ATTACK, payload }
}

export {
  setGameState,
  attack
}
