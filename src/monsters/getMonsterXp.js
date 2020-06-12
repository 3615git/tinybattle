function getMonsterXp(specs, monsterItems) {
  let itemsXp = 0
  // eslint-disable-next-line no-unused-vars
  for (let [key, value] of Object.entries(monsterItems)) { 
    itemsXp = itemsXp + value.score; 
  }

  return Math.round((specs.STR + specs.DEX + specs.CON + specs.MAG + specs.LCK + itemsXp) / 4)
}

export {
    getMonsterXp
}