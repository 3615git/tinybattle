/**
  * @desc Set score as submitted
*/

const submitScore = (data) => {

  // Set score submitted
  data.score.run.scoreSent = true

  return data
}

export { submitScore }
