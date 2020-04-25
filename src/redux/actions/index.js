import { ATTACK } from "../constants/action-types"
import { GAMESTATE } from "../constants/action-types"
import { SETTINGS } from "../constants/action-types"

function settings(payload) {
  return { type: SETTINGS, payload }
}

function setGameState(payload) {
  return { type: GAMESTATE, payload }
}

function attack(payload) {
  return { type: ATTACK, payload }
}

export {
  settings,
  setGameState,
  attack
}
