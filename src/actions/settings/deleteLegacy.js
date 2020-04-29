
/**
  * @desc Remove legacy items
*/

const deleteLegacy = (data) => {
  data.game.legacy = {}

  return data
}

export { deleteLegacy }
