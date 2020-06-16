
/**
  * @desc Mark welcome screen as read
*/

const tutorial = (data, mode, amount) => {
  data.game.tutorial = true
  return data
}

export { tutorial }
