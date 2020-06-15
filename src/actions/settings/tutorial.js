
/**
  * @desc Mark welcome screen as read
*/

const tutorial = (data, mode, amount) => {
  console.log(`HEY`)
  data.game.tutorial = true
  return data
}

export { tutorial }
