
/**
  * @desc Starting a new battle
*/

const logsToPlayerTurn = (data) => {
  // Set log to playerTurn
  data.log = { type: `playerTurn` }

  return data
}

export { logsToPlayerTurn }
