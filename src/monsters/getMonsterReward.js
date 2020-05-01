import { getRandomInt } from "../utils/utils"
import { itemRanges } from "../conf/settings_items"

function getMonsterReward(level, elite) {
  const baseReward = 10 * level
  const randomBoost = getRandomInt(0, 20)
  const eliteBoost = getRandomInt(20, 40)

  // Return conf
  return baseReward + (Math.round(baseReward * randomBoost / 100)) + (Math.round(baseReward * eliteBoost / 100))
}

function getItemPrice(level, quality, transaction="sell") {
  const baseReward = 20 * level / 2
  const randomBoost = getRandomInt(0, 10)
  const qualityBoostRange = {
    normal: [0,5],
    magic: [20,40],
    rare: [200,300],
    legendary: [400,600]
  }
  const qualityBoost = getRandomInt(qualityBoostRange[quality][0], qualityBoostRange[quality][1])

  let price = baseReward + (Math.round(baseReward * randomBoost / 100)) + (Math.round(baseReward * qualityBoost / 100))

  // Buy or sell
  if (transaction === `buy`) {
    price = price * 2
  }
  // Return conf
  return price
}

function getMonsterLoot(level, elite) {
  let loot = []
  // get base sell price
  const baseReward = 20 * level / 2
  const lootCount = getRandomInt(1, 3)
  
  for (let index = 0; index < lootCount; index++) {
    const randomBoost = getRandomInt(0, 10)

    loot.push({ 
        type: "drops", 
        id: getRandomInt(1, itemRanges[`drops`]), 
        reward: baseReward + (Math.round(baseReward * randomBoost / 100))
    })
  }

  // get elite body parts & price
  if (elite) {
    const randomBoost = getRandomInt(0, 10)
    const eliteBoost = getRandomInt(200, 300)

    loot.push({
      type: "drops",
      id: getRandomInt(1, itemRanges[`drops`]),
      quality: `rare`,
      reward: baseReward + (Math.round(baseReward * randomBoost / 100)) + (Math.round(baseReward * eliteBoost / 100))
    })
  }

  return loot
}

export {
  getMonsterReward,
  getItemPrice,
  getMonsterLoot
}