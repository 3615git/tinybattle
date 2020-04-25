
/**
  * @desc Displaying next level number
*/

const levelTransition = (data) => {
  // Initialize level if needed
  if (typeof data.game.level !== 'number' || !data.game.level) data.game.level = 0
  // Increment level 
  const previousLevel = data.game.level
  data.game.level = previousLevel + 1
  // Set game state
  data.game.state = `levelTransition`

  return data
}

export { levelTransition }
