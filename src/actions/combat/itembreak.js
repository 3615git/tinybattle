import { pushBuff } from './stats'
import { formatDataLog } from '../../utils/formatDataLog'
import { skillWheelRoll } from '../../actions/combat/hit'
import { score } from '../../actions/score/score'
import { getStat } from './stats'

/**
  * @desc Computing the results of itembreak skill
*/

const itembreak = (data) => {
  let { player, opponent, game } = data

  let activePlayer = game.playerTurn ? { ...player } : { ...opponent }
  let targetPlayer = game.playerTurn ? { ...opponent } : { ...player }

  // Itembreak can break some of the enemy's item

  // Select enemy items
  let items = []
  for (let [key, value] of Object.entries(opponent.items)) {
    items.push({ category: `items`, char: key, item: value})
  } 
  for (let [key, value] of Object.entries(opponent.weapons)) {
    items.push({ category: `weapons`, char: key, item: value })
  }

  // Shuffle results
  items = items
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)

  // Build a 6 items array
  let wheelItems = []
  let j = 0
  for (let i = 0; i < 20; i++) {
    if (items[j]) {
      wheelItems.push(items[j])
      j++
    } else {
      j=0
    }
    if (wheelItems.length === 6) break
  }
  
  // Pass to skillWheel
  const hit = skillWheelRoll(wheelItems)
  let DEXmalus
  switch (hit.result) {
    case `fumble`:
      // If fumble, LCK malus
      const activePlayerDEX = getStat(activePlayer, `DEX`)
      DEXmalus = -Math.abs(Math.ceil(activePlayerDEX.total / 2))
      pushBuff(activePlayer, `temporary`, `DEX`, DEXmalus, `stun`, 2)
      // Give LCK bonus to opponent 
      pushBuff(targetPlayer, `temporary`, `LCK`, 3, `attackfumble`, 5)
      // Score
      data = score(data, `action/itembreak/fumble`, `game`)
      break;

    default:
      // Destroy one or more items
      delete targetPlayer[hit.result.category][hit.result.char]
      // Score
      data = score(data, `action/itembreak/success`, `game`)
      break;
  }

  // Reset skill energy
  activePlayer.skills.itembreak.current = 0

  // Score
  data = score(data, `action/itembreak/total`, `game`)

  // Build log
  let log = {
    type: `itembreak`,
    delay: `long`,
    activePlayer,
    targetPlayer,
    data: {
      hit: hit.result,
      wheelPositions: hit.positions,
      wheelPosition: hit.position,
      dexMalus: DEXmalus
    }
  }
  log.display = formatDataLog(`itembreak`, log, game)

  // Apply changes
  data.player = game.playerTurn ? activePlayer : targetPlayer
  data.opponent = !game.playerTurn ? activePlayer : targetPlayer
  data.log = log
  data.dataLogs.push(formatDataLog(`itembreak`, log, game))

  return data
}

export { itembreak }
