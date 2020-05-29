import { forgeUniqueItems } from '../../utils/forge'

/**
  * @desc Forge unique items
*/

const forgeUniques = (data) => {
  data.uniques = forgeUniqueItems()

  return data
}

export { forgeUniques }
