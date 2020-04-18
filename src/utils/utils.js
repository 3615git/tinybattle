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

function randomValue(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const sumOfArray = arr => arr.reduce((a, b) => a + b, 0)

function generateWeight(items, weight) {
  var weighedItems = []
  var currentItem = 0
  var i

  while (currentItem < items.length) {
    for (i = 0; i < weight[currentItem]; i++)
      weighedItems[weighedItems.length] = items[currentItem]
    currentItem++
  }

  return weighedItems
}

export {
  diceRoll,
  randomProperty,
  randomKey,
  randomValue,
  getRandomInt, 
  sumOfArray,
  generateWeight
}