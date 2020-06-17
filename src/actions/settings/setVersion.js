import { version } from '../../conf/version'

/**
  * @desc Soft reset (only current run)
*/

const setVersion = (data) => {

  // Set to current version
  data.version = version[0].version

  return data
}

export { setVersion }
