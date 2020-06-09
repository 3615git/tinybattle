/**
  * @desc Set score as submitted
*/

const submitScore = (data) => {

  // Reset everything
  data.score.run.scoreSent = true

  return data
}

export { submitScore }
