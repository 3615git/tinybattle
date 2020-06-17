/**
  * @desc Display news
*/

const releaseNotes = (data) => {

  // Display version notes
  data.game.state = `releaseNotes`

  return data
}

export { releaseNotes }
