import alfadriel from '../pics/opponents/alfadriel.png'
import ansellus from '../pics/opponents/ansellus.png'
import arcanegolem from '../pics/opponents/arcanegolem.png'
import astrallich from '../pics/opponents/astrallich.png'
import behemoth from '../pics/opponents/behemoth.png'
import blindworm from '../pics/opponents/blindworm.png'
import bloodmage from '../pics/opponents/bloodmage.png'
import bulldragon from '../pics/opponents/bulldragon.png'
import chimera from '../pics/opponents/chimera.png'
import clairvoyant from '../pics/opponents/clairvoyant.png'
import corruptedelemental from '../pics/opponents/corruptedelemental.png'
import corruptedhorseman from '../pics/opponents/corruptedhorseman.png'
import crocodilerogue from '../pics/opponents/crocodilerogue.png'
import crow from '../pics/opponents/crow.png'
import crystalmage from '../pics/opponents/crystalmage.png'
import cthulhu from '../pics/opponents/cthulhu.png'
import cultist from '../pics/opponents/cultist.png'
import darknesstitan from '../pics/opponents/darknesstitan.png'
import demon from '../pics/opponents/demon.png'
import dragonemperor from '../pics/opponents/dragonemperor.png'
import dryad from '../pics/opponents/dryad.png'
import dryadqueen from '../pics/opponents/dryadqueen.png'
import dynamo from '../pics/opponents/dynamo.png'
import elvenking from '../pics/opponents/elvenking.png'
import elvenmage from '../pics/opponents/elvenmage.png'
import excelsios from '../pics/opponents/excelsios.png'
import feralbeast from '../pics/opponents/feralbeast.png'
import fireangel from '../pics/opponents/fireangel.png'
import fireimp from '../pics/opponents/fireimp.png'
import firelord from '../pics/opponents/firelord.png'
import firewitch from '../pics/opponents/firewitch.png'
import forestgolem from '../pics/opponents/forestgolem.png'
import gazer from '../pics/opponents/gazer.png'
import ghostknight from '../pics/opponents/ghostknight.png'
import giantfish from '../pics/opponents/giantfish.png'
import goblinmage from '../pics/opponents/goblinmage.png'
import golddragon from '../pics/opponents/golddragon.png'
import iceelemental from '../pics/opponents/iceelemental.png'
import harbinger from '../pics/opponents/harbinger.png'
import ignis from '../pics/opponents/ignis.png'
import imp from '../pics/opponents/imp.png'
import knightking from '../pics/opponents/knightking.png'
import koboldarcher from '../pics/opponents/koboldarcher.png'
import lamprey from '../pics/opponents/lamprey.png'
import lichwarlord from '../pics/opponents/lichwarlord.png'
import mage from '../pics/opponents/mage.png'
import minordemon from '../pics/opponents/minordemon.png'
import myrdin from '../pics/opponents/myrdin.png'
import primaldemon from '../pics/opponents/primaldemon.png'
import radulac from '../pics/opponents/radulac.png'
import rootgolem from '../pics/opponents/rootgolem.png'
import runicgolem from '../pics/opponents/runicgolem.png'
import scarletwyrm from '../pics/opponents/scarletwyrm.png'
import shadowscythe from '../pics/opponents/shadowscythe.png'
import sparkdragon from '../pics/opponents/sparkdragon.png'
import stonegolem from '../pics/opponents/stonegolem.png'
import succubus from '../pics/opponents/succubus.png'
import sunwarrior from '../pics/opponents/sunwarrior.png'
import thanatos from '../pics/opponents/thanatos.png'
import vampire from '../pics/opponents/vampire.png'
import voidgargoyle from '../pics/opponents/voidgargoyle.png'
import waterspirit from '../pics/opponents/waterspirit.png'
import windpriest from '../pics/opponents/windpriest.png'
import yoggoth from '../pics/opponents/yoggoth.png'


const monsterPics = {
  alfadriel, ansellus, arcanegolem, astrallich, behemoth, blindworm, bloodmage, bulldragon, chimera, clairvoyant, corruptedelemental,
  corruptedhorseman, crocodilerogue, crow, crystalmage, cthulhu, cultist, darknesstitan, demon, dragonemperor, dryad, dryadqueen, 
  dynamo, elvenking, elvenmage, excelsios, feralbeast, fireangel, fireimp, firelord, firewitch, forestgolem, 
  gazer, ghostknight, giantfish, goblinmage, golddragon, harbinger, iceelemental, ignis, imp, knightking, koboldarcher, 
  lamprey, lichwarlord, mage, minordemon, myrdin, primaldemon, radulac, rootgolem, runicgolem, scarletwyrm, shadowscythe, sparkdragon, stonegolem, succubus, sunwarrior, thanatos, vampire, voidgargoyle, waterspirit, 
  windpriest, yoggoth
}

const monsterProfiles = {
  brute: { STR: 10, DEX: 6, CON: 4, MAG: 1, LCK: 1 },     // High STR
  tank: { STR: 6, DEX: 4, CON: 9, MAG: 2, LCK: 1 },      // High CON
  duelist: { STR: 7, DEX: 8, CON: 3, MAG: 2, LCK: 4 },    // Hit strong, high luck, low HP
  archmage: { STR: 1, DEX: 3, CON: 4, MAG: 12, LCK: 2 },  // Ultra high MAG
  wizard: { STR: 2, DEX: 2, CON: 5, MAG: 11, LCK: 1 },    // High MAG
  balanced: { STR: 5, DEX: 5, CON: 5, MAG: 5, LCK: 2 },   // Full random
  // Todo : mimic (same as player but a bit better) (elemental orbs ?)
}

export {
  monsterProfiles,
  monsterPics
}