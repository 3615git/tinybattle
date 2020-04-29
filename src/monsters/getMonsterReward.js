import { getRandomInt } from "../utils/utils"

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

export {
  getMonsterReward,
  getItemPrice
}