import { getRandomInt } from "../utils/utils"
import { itemRanges } from "../conf/settings_items"

function getMonsterReward(level, elite) {
  const baseReward = 30 * level
  const randomBoost = getRandomInt(0, 20)
  const eliteBoost = getRandomInt(20, 40)

  // Return conf
  return baseReward + (Math.round(baseReward * randomBoost / 100)) + (Math.round(baseReward * eliteBoost / 100))
}

function getItemPrice(level, quality, transaction="sell") {
  const randomBoost = getRandomInt(0, 10)
  const qualityRange = {
    normal: [50,100],
    magic: [100,300],
    rare: [400,1000],
    legendary: [1000,2000]
  }
  const baseReward = getRandomInt(qualityRange[quality][0], qualityRange[quality][1])

  let price = baseReward + (Math.round(baseReward * randomBoost / 100))

  // Buy or sell
  if (transaction !== `buy`) {
    price = Math.round(price / 2)
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