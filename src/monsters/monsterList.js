import mimic from '../pics/opponents/mimic.png'
import dryad from '../pics/opponents/dryad.png'
import blindworm from '../pics/opponents/blindworm.png'
import fireimp from '../pics/opponents/fireimp.png'
import giantfish from '../pics/opponents/giantfish.png'
import gazer from '../pics/opponents/gazer.png'
import bloodmage from '../pics/opponents/bloodmage.png'
import waterspirit from '../pics/opponents/waterspirit.png'
import crow from '../pics/opponents/crow.png'
import lamprey from '../pics/opponents/lamprey.png'
import firewitch from '../pics/opponents/firewitch.png'
// import firedrake from '../pics/opponents/firedrake.png'
// import thanatos from '../pics/opponents/thanatos.png'
// import arcanegolem from '../pics/opponents/arcanegolem.png'
// import dragonemperor from '../pics/opponents/dragonemperor.png'
// import gladius from '../pics/opponents/gladius.png'
// import feralbeast from '../pics/opponents/feralbeast.png'
// import feralbeast2 from '../pics/opponents/feralbeast2.png'
// import automaton from '../pics/opponents/automaton.png'
// import astrallich from '../pics/opponents/astrallich.png'
// import stonegolem from '../pics/opponents/stonegolem.png'
// import excelsios from '../pics/opponents/excelsios.png'
// import golddragon from '../pics/opponents/golddragon.png'
// import eldritchslime from '../pics/opponents/eldritchslime.png'
// import hades from '../pics/opponents/hades.png'
// import radulac from '../pics/opponents/radulac.png'
// import tiamat from '../pics/opponents/tiamat.png'
// import caveworm from '../pics/opponents/caveworm.png'
// import drakenvamp from '../pics/opponents/drakenvamp.png'
// import garuda from '../pics/opponents/garuda.png'
// import tenteye from '../pics/opponents/tenteye.png'
// import voidgargoyle from '../pics/opponents/voidgargoyle.png'
// import behemoth from '../pics/opponents/behemoth.png'
// import warlock from '../pics/opponents/warlock.png'

const monsterPics = {
  mimic, blindworm, dryad, giantfish, fireimp, bloodmage, lamprey, waterspirit, crow, firewitch, gazer,

}

const monsterProfiles = {
  brute: { STR: 10, DEX: 4, CON: 5, MAG: 1, LCK: 1 },     // High STR
  tank: { STR: 5, DEX: 4, CON: 11, MAG: 1, LCK: 1 },      // High CON
  duelist: { STR: 8, DEX: 9, CON: 2, MAG: 1, LCK: 4 },    // Hit strong, high luck, low HP
  archmage: { STR: 1, DEX: 1, CON: 3, MAG: 15, LCK: 2 },  // Ultra high MAG
  wizard: { STR: 2, DEX: 2, CON: 5, MAG: 11, LCK: 1 },    // High MAG
  balanced: { STR: 5, DEX: 5, CON: 5, MAG: 5, LCK: 2 },   // Full random
}

export {
  monsterProfiles,
  monsterPics
}