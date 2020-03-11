import { ATTACK, CONFIRM } from "../constants/action-types"

export function attack(payload) {
  return { type: ATTACK, payload }
}

export function confirm(payload) {
  return { type: CONFIRM, payload }
}