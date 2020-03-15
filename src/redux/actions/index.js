import { ATTACK } from "../constants/action-types"

function attack(payload) {
  return { type: ATTACK, payload }
}

export {
  attack
}
