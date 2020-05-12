// Get compiled Stats with all the bonus
const getStat = (player, stat) => {

  // Base stats
  const baseStat = player[stat]
  // Temporary buff
  const temporaryBuff = findBuff(player, `temporary`, stat)
  // Permanent buff
  const permanentBuff = findBuff(player, `permanent`, stat)
  // Item buff
  let itemBuff = player.items[stat] && player.items[stat].score ? player.items[stat].score : 0

  // Return base/bonus/total
  return {
    natural: baseStat + permanentBuff,
    items: itemBuff,
    temporary: temporaryBuff,
    total: baseStat + permanentBuff + itemBuff + temporaryBuff
  }
}

// Find buff
const findBuff = (player, type, stat) => {
  let buff = 0

  if (player.buff && player.buff[type] && player.buff[type].length > 0) {
    // Find array of buffs for this stat
    buff = player.buff[type].filter(x => x.stat === stat);
    // Compute total
    let totalBuff = 0
    for (let index = 0; index < buff.length; index++) {
      totalBuff += buff[index].value
    }

    buff = totalBuff
  }

  return buff
}

// Push buff
const pushBuff = (player, type, stat, value, origin, rounds = 1) => {

  // Create buff object if not existing
  if (!player.buff) player.buff = {
    temporary: [],
    permanent: []
  }

  const buff = {
    stat: stat,
    value: value,
    origin: origin,
    rounds: rounds
  }
  
  if (type === `temporary` && !player.buff.temporary) player.buff.temporary = []
  if (type === `permanent` && !player.buff.permanent) player.buff.permanent = []

  // Pushing buff
  if (type === `temporary`) player.buff.temporary.push(buff)

  return player
}

// Reset buffs
const resetBuff = (data, player, type) => {

  // Create buff object if not existing
  if (!data[player].buff) data[player].buff = {
    temporary: [],
    permanent: []
  }

  if (type === `temporary`) data[player].buff.temporary = []
  if (type === `permanent`) data[player].buff.permanent = []

  return data
}

// Alernate reset
const autoResetBuff = (data) => {

  // Create buff object if not existing
  if (!data.player.buff) data.player.buff = {
    temporary: [],
    permanent: []
  }
  if (!data.opponent.buff) data.opponent.buff = {
    temporary: [],
    permanent: []
  }

  // Decrease buff duration counter
  data.player = decreaseBuffCounters(data.player)
  data.opponent = decreaseBuffCounters(data.opponent)

  return data
}

const decreaseBuffCounters = (player) => {
  // Parse all buffs 
  for (let index = 0; index < player.buff.temporary.length; index++) {
    // Decrease counts
    player.buff.temporary[index].rounds--
    // Remove buffs with a now dead counter
    if (player.buff.temporary[index].rounds < 0) {
      delete player.buff.temporary[index]
    }
  }

  // Removing empty items (delete calls) from array
  player.buff.temporary = player.buff.temporary.filter(val => val)

  return player
}

const incrementSkillCount = (data) => {
  let { game } = data

  // Parse all skills
  if (!game.playerTurn) {
    for (let [key, value] of Object.entries(data.player.skills)) {
      if (value.current < value.ready) data.player.skills[key].current++
    }
  }
  return data
}

export {
  getStat,
  pushBuff, 
  resetBuff,
  autoResetBuff,
  incrementSkillCount
}