import { initialState } from '../../conf/settings'
import { version } from '../../conf/version'

/**
  * @desc Soft reset and display news
*/

const updateVersion = (data) => {

  // Reset run, all except player
  data.game = initialState.game
  data.game.tutorial = true
  data.opponent = {}
  data.monsters = {}
  data.monsterTiers = {}
  data.uniques = {}
  data.log = {}
  data.dataLogs = {}
  if (data.score) data.score.run = {}
  // Set to current version
  data.version = version[0].version

  // Display version notes
  data.game.state = `releaseNotes`

  return data
}

export { updateVersion }
