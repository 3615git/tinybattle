
/**
  * @desc Set preferences
*/

const preference = (data, type, value) => {
  // Set preferences
  if (type === `playerName`) data.player.name = value

  return data
}

export { preference }
