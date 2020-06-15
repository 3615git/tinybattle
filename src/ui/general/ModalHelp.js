/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { connect } from "react-redux"
import Item from '../../ui/battle/Item'
import ActionButton from '../../ui/battle/ActionButton'
import SkillButton from '../../ui/battle/SkillButton'
import Element from '../../ui/battle/Element'

import fumble from '../../pics/ui/fumble.png'
import critical from '../../pics/ui/critical.png'
import death from '../../pics/ui/death.png'

/**
  * @desc Help Modal
*/

const mapStateToProps = state => {
  return {
    player: state.player
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

const ModalHelp = ({player}) => {

  let skillButtons = []
  for (let [key, value] of Object.entries(player.skills)) {
      skillButtons.push(<SkillButton type={key} current={value.current} ready={value.ready} />)
  }

  // Display component
  return (
    <div className="help" id="top">
      <p className="title">
        Help
      </p>
      <p>Choose a help topic</p>
      <div className="helpMenu">
        <a className="button" href="#stats">Stats</a>
        <a className="button" href="#levelling">Levelling</a>
        <a className="button" href="#equipment">Equipment</a>
        <a className="button" href="#weapons">Weapons</a>
        <a className="button" href="#hit">Hit & damage system</a>
        <a className="button" href="#elements">Elemental damage</a>
        <a className="button" href="#attack">Attack</a>
        <a className="button" href="#defend">Defend</a>
        <a className="button" href="#skills">Skills</a>
        <a className="button" href="#items">Items</a>
        <a className="button" href="#elite">Elite monsters</a>
      </div>
      {/* <p>MHD20 is a turn based battle game, using a D20 system loosely based on the classic Dungeon&Dragons tabletop game</p>
      <p>Your goal is to fight your way to the final boss, in a minimum number of turns.</p>
      <p>If you die, you can keep your gold and some of your best gear, and retry.</p> */}

      <div className="separator" id="stats" />
      <div className="title">Stats</div>

      <p>Your character is described by 5 stats</p>
      <table className="help">
          <tbody>
          <tr>
              <td>STR</td>
              <td>
                  <div className="sectiontitle">Strength</div>
                  Basic stat for physical damage
                </td>
          </tr>
          <tr>
              <td>DEX</td>
              <td>
                  <div className="sectiontitle">Dexterity</div>
                  Determine if you will manage to hit your opponent and if your opponent will be able to hit you
                </td>
          </tr>
          <tr>
              <td>CON</td>
              <td>
                  <div className="sectiontitle">Constitution</div>
                  Determines how much physical damage you can absorb, and also used for Hit points count
                </td>
          </tr>
          <tr>
              <td>MAG</td>
              <td>
                  <div className="sectiontitle">Magic</div>
                  Basic stats for magical damage, magical hit and magical resistance
                </td>
          </tr>
          <tr>
              <td>LCK</td>
              <td>
                  <div className="sectiontitle">Luck</div>
                  Each luck points lower the critical hit minimal score, for any attack
                </td>
          </tr>
          </tbody>
      </table>
      <a className="backToTop" href="#top">Back to menu</a>

      <div className="separator" id="equipment" />
      <div className="title">Equipment</div>

      <p>You will find new equipment on your opponent's dead body, or in the shop between each fight.</p>
      <p>Equipment quality follows the beloved Diablo scale.</p>

      <table className="help">
          <tbody>
          <tr>
              <td className="center">
                <Item item={{id: 1, quality: "normal", type: "belt", score: 1}} />
                  <span className="color_quality_normal">Normal</span>
                </td>
              <td>
                  Trivial items with low value and poor quality
                </td>
          </tr>
          <tr>
            <td className="center">
                <Item item={{id: 1, quality: "magic", type: "armor", score: 8}} />
                <span className="color_quality_magic">Magic</span>
            </td>
              <td>
                  Low tier bonus but some of them may be interesting
                </td>
          </tr>
          <tr>
            <td className="center">
                <Item item={{id: 2, quality: "rare", type: "book", score: 16}} />
                <span className="color_quality_rare">Rare</span>
            </td>
              <td>
                  Quality gear with good stats bonus
                </td>
          </tr>
          <tr>
            <td className="center">
                <Item item={{id: 163, quality: "legendary", type: "helmet", score: 25}} />
                <span className="color_quality_legenday">Legendary</span>
            </td>
              <td>
                  Best available loot with high value
                </td>
          </tr>
          <tr>
              <td className="center">
                <Item item={{char: `MAG`, id: 57, quality: "unique", type: "unique", score: 35, element: `darkness`}} />
                <span className="">Set items</span>
              </td>
              <td>
                  Shops sells super expensive unique items, with bonus increasing as you complete the set
                </td>
          </tr>
          </tbody>
      </table>
      <a className="backToTop" href="#top">Back to menu</a>

      <div className="separator" id="weapons" />
      <div className="title">Weapons</div>
      <p>Weapons damage uses the classic xD+x dice RPG system, examples :</p>

      <table className="help">
          <tbody>
          <tr>
              <td className="center">
                <Item item={{char: `STR`, id: 1, quality: "normal", type: "sword", score: `1d6+4`, element: "none", cost: 5}} noPlus />
                </td>
              <td>
                  This basic sword adds the result of 1 six sided dice + 4 additional points to your STR score. Using this sword costs 5 stamina points.
                </td>
          </tr>
          <tr>
            <td className="center">
                <Item item={{char: `MAG`, id: 5, quality: "legendary", type: "sceptre", score: `7d12+10`, element: `fire`, cost: 7, sharpen: 2}} noPlus />
                </td>
            <td>
                  This nice magic wand adds the result of 7 D12 + 10 points to your MAG score. It also deals additional fire damage (orange dot), and has already been enchanted twice (2 diamonds). Using the wand costs 7 mana points.
            </td>
          </tr>
          </tbody>
      </table>
      <a className="backToTop" href="#top">Back to menu</a>

      <div className="separator" id="hit" />
      <div className="title">Hit system</div>

      <p>Hitting, and dealing damage, simply relies on a D20 roll.</p>

      <table className="help">
          <tbody>
          <tr>
              <td className="center color_action_physical">
                Physical hit
                </td>
              <td>
                <div className="rule">20 - (10 + your DEX - his DEX)</div>
                  For example if you have 13 DEX, and your opponent has 7 : 20-(10+13-7) = 4. You'll have to roll more than 4 on a D20 to hit : easy.
                </td>
          </tr>
          <tr>
            <td className="center color_action_physical">
                Physical damage
            </td>
            <td>
                <div className="rule">your STR - his CON</div>
                Base damage is just STR versus CON. Then we add items damage, critical damage, and elemental damage.
            </td>
          </tr>
          <tr>
              <td className="center color_action_magical">
                Magical hit
                </td>
              <td>
                <div className="rule">20 - (10 + your MAG - his MAG)</div>
                  For example if you have 6 MAG, and your opponent has 16 : 20-(10+6-13) = 17. You'll have to roll more than 17 on a D20 to hit.
                </td>
          </tr>
          <tr>
          <td className="center color_action_magical">
            Magical damage
                </td>
                <td>
                    <div className="rule">your MAG - his MAG</div>
                    Base damage is simply MAG versus MAG. Then we again add items damage, critical damage, and elemental damage.
                </td>
          </tr>
          <tr>
          <td className="center">
              <img src={fumble} alt="fumble" />
                Fumble
                </td>
                <td>
                    Rolling a super low value, like a 1, means an automatic failure and most of the time penalties.
                </td>
          </tr>
          <tr>
          <td className="center">
              <img src={critical} alt="critical" />
            Critical
                </td>
                <td>
                    Rolling a natural 20, or even less if your LCK score is high, means an automatic success and most of the time additional bonus.
                </td>
          </tr>
          </tbody>
      </table>
      <a className="backToTop" href="#top">Back to menu</a>

      <div className="separator" id="attack" />
      <div className="title">Attack</div>

      <p>Attacks are the basic moves, and the major way to deal damage.</p>

      <table className="help">
          <tbody>
          <tr>
              <td className="center">
                  <div className="buttons"><ActionButton type="attack" /></div>
                </td>
              <td>
                Physical attack, using physical (red) weapon. Each attack uses stamina, when the stamina bar is low, player can't attack. % number is the global chance to hit.
                </td>
          </tr>
          <tr>
              <td className="center">
                  <div className="buttons"><ActionButton type="specialattack" /></div>
                </td>
              <td>
                Taking hits and losing HP make the special attack bar grow : when the bar is full player may use a devastating blow.
                </td>
          </tr>
          <tr>
              <td className="center">
                  <div className="buttons"><ActionButton type="cast" /></div>
                </td>
              <td>
                Spell cast, using magical (blue) weapon. Each attack uses mana, when the mana bar is low, player can't cast. % number is the global chance to hit.
                </td>
          </tr>
          <tr>
              <td className="center">
                  <div className="buttons"><ActionButton type="specialcast" /></div>
                </td>
              <td>
                Casting spells make the master spell cast bar grow : when the bar is full, a powerful spell can be used.
                </td>
          </tr>
          </tbody>
      </table>
      <a className="backToTop" href="#top">Back to menu</a>

      <div className="separator" id="defend" />
      <div className="title">Defend</div>

      <p>Two options, when you need to wait a turn or two, or prepare a better attack in your next turn.</p>

      <table className="help">
          <tbody>
          <tr>
              <td className="center">
                  <div className="buttons"><ActionButton type="block" /></div>
                </td>
              <td>
                You take a defensive stance, meaning you'll be harder to hit (DEX and CON bonus), stamina also regenerates faster. Your MAG will be impacted a bit, and opponent gets a STR bonus.
                </td>
          </tr>
          <tr>
              <td className="center">
                  <div className="buttons"><ActionButton type="focus" /></div>
                </td>
              <td>
                You try to focus on your next magical spell : your MAG improves a great deal, but your STR and DEX are lowered.
                </td>
          </tr>
          </tbody>
      </table>
      <a className="backToTop" href="#top">Back to menu</a>

      <div className="separator" id="items" />
      <div className="title">Items</div>

      <p>Items can be purchased in the shop : you can use as much items as you want during your durn, and they'll never fail, but they can be expensive. You can carry up to 6 items.</p>
      <a className="backToTop" href="#top">Back to menu</a>

      <div className="separator" id="levelling" />
      <div className="title">Levelling</div>

      <p>Winning battles increases your experience level, allowing you to carry more and more of your precious equipement to the next run : you can carry one more item each time you level up!</p>
      <a className="backToTop" href="#top">Back to menu</a>

      <div className="separator" id="elements" />
      <div className="title">Elements</div>

      <p>Monsters are all based on an element : <span className="element_fire">fire</span>, <span className="element_water">water</span>, <span className="element_earth">earth</span>, <span className="element_light">light</span> or <span className="element_darkness">darkness</span>.</p>

      <table className="help">
          <tbody>
          <tr>
              <td className="center horizontal">
                <Element element="fire" />
                <Item item={{char: `STR`, id: 1, quality: "normal", type: "sword", score: `1d6+4`, element: "fire", cost: 5}} noPlus />
              </td>
              <td>
                Bonus against <span className="element_earth">earth</span> creatures.
              </td>
          </tr>
          <tr>
              <td className="center horizontal">
                <Element element="water" />
                <Item item={{char: `MAG`, id: 1, quality: "normal", type: "mace", score: `1d6+4`, element: "water", cost: 5}} noPlus />
              </td>
              <td>
                Bonus against <span className="element_fire">fire</span> creatures.
              </td>
          </tr>
          <tr>
              <td className="center horizontal">
                <Element element="earth" />
                <Item item={{char: `MAG`, id: 1, quality: "normal", type: "sceptre", score: `1d6+4`, element: "earth", cost: 5}} noPlus />
              </td>
              <td>
                Bonus against <span className="element_water">water</span> creatures.
              </td>
          </tr>
          <tr>
              <td className="center horizontal">
                <Element element="light" />
                <Item item={{char: `STR`, id: 19, quality: "unique", type: "unique", score: `1d6+4`, element: "light", cost: 5}} noPlus />
              </td>
              <td>
                Bonus against <span className="element_darkness">darkness</span> creatures.
              </td>
          </tr>
          <tr>
              <td className="center horizontal">
                <Element element="darkness" />
                <Item item={{char: `MAG`, id: 12, quality: "unique", type: "unique", score: `1d6+4`, element: "darkness", cost: 5}} noPlus />
              </td>
              <td>
                Bonus against everything, but only randomly.
              </td>
          </tr>
          </tbody>
      </table>
      <a className="backToTop" href="#top">Back to menu</a>

      <div className="separator" id="elite" />
      <div className="title">Elite monsters</div>

      <p>You have an increasing chance of meeting the tougher, elite version of any monster. They will be harder to beat but will also give better rewards.</p>

      <table className="help">
          <tbody>
          <tr>
              <td className="center">
                <Element element="elite" />
              </td>
              <td>
                Elite monster marker
              </td>
          </tr>
          </tbody>
      </table>
      <a className="backToTop" href="#top">Back to menu</a>
      
      <div className="separator" id="skills" />
      <div className="title">Skills</div>

      <p>Skills may fail and needs a few turn to recharge, but they're free and may save a desperate battle.</p>

      <table className="help">
          <tbody>
          <tr>
              <td className="center">
                  <div className="buttons">{skillButtons[0]}</div>
                </td>
              <td>
                Try to heal and get part of your hit points back. Results may vary from nothing to an almost full heal.
                </td>
          </tr>
          <tr>
              <td className="center">
                  <div className="buttons">{skillButtons[1]}</div>
                </td>
              <td>
                Use some dirty trick to stun your opponent, making him skip one or more turns.
              </td>
          </tr>
          <tr>
              <td className="center">
                  <div className="buttons">{skillButtons[2]}</div>
                </td>
              <td>
                Attempt to break an enemy's item : less loot, but less ennemy threat also.
              </td>
          </tr>
          <tr>
              <td className="center">
                  <div className="buttons">{skillButtons[3]}</div>
                </td>
              <td>
                If this skills succeeds, next damage dealt to player will be applyed to opponent. If the skill fails, next damage may be boosted.
              </td>
          </tr>
          <tr>
              <td className="center">
                  <div className="buttons">{skillButtons[4]}</div>
                </td>
              <td>
                Attempt to fry opponent's mind, heavily crippling his MAG and making spellcasting opponents useless.
              </td>
          </tr>
          <tr>
              <td className="center">
                  <div className="buttons">{skillButtons[5]}</div>
                </td>
              <td>
                Use an ancient curse on opponent, highly rising the fumble limit of his dice rolls for a few turns.
              </td>
          </tr>
          </tbody>
      </table>
      <a className="backToTop" href="#top">Back to menu</a>

      <img className="death" src={death} alt="You lose" />

    </div>
  )
}

// Exporting as default
export default connect(mapStateToProps, mapDispatchToProps)(ModalHelp)
