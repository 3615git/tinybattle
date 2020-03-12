import { ATTACK } from "../constants/action-types"

export function attack(payload) {
  return { type: ATTACK, payload }
}
