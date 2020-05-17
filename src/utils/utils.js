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

function limitValue(value, min, max) {
  if (value > max) value = max
  if (value < min) value = min
  return value
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

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function clog(message, mode = "default") {
  let color, icon
  switch (mode) {
    case "location":
      color = "white"
      icon = "📍"
      break;
    case  "action":
      color = "red"
      icon = "🟥"
      break;
    case "reducer":
      color = "orange"
      icon = "🟧"
      break;
    case "function":
      color = "grey";
      icon ="🕹"
      break;
    case "stop":
      color = "red";
      icon = "👋🏼"
      break;
    case "error":
      color = "Red";
      break;
    case "warning":
      color = "Orange";
      break;
    default:
      color = "white"
      break;
  }

  if (mode === `data`) console.table(message);
  else console.log(`%c${icon} ${message}`, `color:${color}`);
}

export {
  diceRoll,
  randomProperty,
  randomKey,
  randomValue,
  getRandomInt, 
  limitValue,
  sumOfArray,
  generateWeight,
  clog,
  capitalizeFirstLetter
}