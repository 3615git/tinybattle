/**
  * @desc Create monsters data tree
*/

const createMonsters = (data, monsters) => {

  if (!data.monsters) data.monsters = {}
  if (!data.monsterTiers) data.monsterTiers = {}

  for (let index = 0; index < monsters.length; index++) {
    const monster = monsters[index];

    // Populate monster tiers
    if (!data.monsterTiers[monster[`tier`]]) data.monsterTiers[monster[`tier`]] = []
    data.monsterTiers[monster[`tier`]].push(monster[`code`])

    // Populate monster list
    data.monsters[monster[`code`]] = {
      name: monster.name.split(",").map(item => item.trim()),
      tier: monster.tier,
      element: monster.element,
      profile: monster.profile,
      boost: monster.boost && monster.boost.split(",").map(item => item.trim()),
      items: monster.items && monster.items.split(",").map(item => item.trim()),
      weapons: monster.weapons && monster.weapons.split(",").map(item => item.trim()),
      humanoid: monster.humanoid,
      elite: monster.elite,
      fumble: 1
    }
  }

  return data
}

export { createMonsters }
