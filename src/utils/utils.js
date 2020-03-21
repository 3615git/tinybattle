// Utils
function diceRoll(sides) {
  return Math.floor(Math.random() * sides) + 1
}

function randomProperty(obj) {
  var keys = Object.keys(obj);
  return obj[keys[keys.length * Math.random() << 0]]
}

function randomKey(obj) {
  var keys = Object.keys(obj);
  return keys[keys.length * Math.random() << 0]
}

export {
  diceRoll,
  randomProperty,
  randomKey
}