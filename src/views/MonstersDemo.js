import React, { Component } from 'react'
import { connect } from "react-redux"

import { setGameState } from '../redux/actions/index'
// import Monster from '../ui/battle/Monster'
// import { monsterInfo } from '../monsters/monster'
// import { forgeUniqueItems } from '../utils/forge'
import Item from '../ui/battle/Item'
// import ItemVisual from '../ui/battle/ItemVisual'
import { gameSettings } from "../conf/settings"
import { getMonsterFromLevel } from '../monsters/getMonsterFromLevel'
import { getStat } from '../actions/combat/stats'
import Element from '../ui/battle/Element'

const mapStateToProps = state => {
  return {
    data: state,
    player: state.player,
    opponent: state.opponent,
    playerTurn: state.game.playerTurn,
    log: state.log, 
    monsterList: state.monsters
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setGameState: payload => dispatch(setGameState(payload))
  }
}

class MonstersDemo extends Component {

  render() {

    const { data, setGameState } = this.props

    /** ----------- Old demos ------------- */

    // // Parse monster list
    // for (const property in monsterList) {
    //   monsters.push(
    //     <Monster 
    //       key={`monster_${property}`}
    //       type={property} 
    //       level={20}
    //       data={monsterInfo(property, 1, monsterList)}
    //     />
    //   )
    // }

    // // Parse uniques list
    // let uniques = forgeUniqueItems()
    // let museum = []

    // for (let [key, value] of Object.entries(uniques.items)) {
    //   museum.push(
    //     <div key={`lootbox_${key}`} className="storeItemWrapper">
    //       <button
    //         className={`storeItem`}
    //       >
    //         <Item
    //           item={value}
    //           displayChar={true}
    //         // shop={type === `items` && `items`}
    //         />
    //         <span className="itemPrice"><ItemVisual item="coins" level={5} small />{value.price}</span>
    //       </button>
    //     </div>
    //   )
    // }

    // for (let [key, value] of Object.entries(uniques.weapons)) {
    //   museum.push(
    //     <div key={`lootbox_${key}`} className="storeItemWrapper">
    //       <button
    //         className={`storeItem`}
    //       >
    //         <Item
    //           item={value}
    //           displayChar={false}
    //           // shop={type === `items` && `items`}
    //         />
    //         <span className="itemPrice"><ItemVisual item="coins" level={5} small />{value.price}</span>
    //       </button>
    //     </div>
    //   )
    // }
    /** ---------------------------------- */

    let levels = []
    data.game.pastOpponents = []
    let monsterTiers = data.monsterTiers
    let monsters = data.monsters
    let opponent
    let cumulatedReward = 0

    // Roadmap / balance demo
    for (let level = 1; level <= gameSettings.maxLevel; level++) {
      
      opponent = getMonsterFromLevel(level, monsterTiers, monsters, data.game.pastOpponents)

      // console.log(opponent)

      // Add monster to history
      if (!data.game.pastOpponents) data.game.pastOpponents = [opponent.job]
      else data.game.pastOpponents.push(opponent.job)

      // console.log(opponent)

      let STR = getStat(opponent, `STR`)
      let DEX = getStat(opponent, `DEX`)
      let CON = getStat(opponent, `CON`)
      let MAG = getStat(opponent, `MAG`)
      let LCK = getStat(opponent, `LCK`)

      let STRreward = opponent.items.STR ? opponent.items.STR.reward : 0
      let DEXreward = opponent.items.DEX ? opponent.items.DEX.reward : 0
      let CONreward = opponent.items.CON ? opponent.items.CON.reward : 0
      let MAGreward = opponent.items.MAG ? opponent.items.MAG.reward : 0
      let LCKreward = opponent.items.LCK ? opponent.items.LCK.reward : 0

      let STRWreward = opponent.weapons.STR ? opponent.weapons.STR.reward : 0
      let MAGWreward = opponent.weapons.MAG ? opponent.weapons.MAG.reward : 0

      let itemsReward = STRreward + DEXreward + CONreward + MAGreward + LCKreward + STRWreward + MAGWreward
      cumulatedReward += itemsReward + opponent.reward

      levels.push(
        <tr>
          <td>{level}</td>
          <td>{opponent.job}</td>
          <td>{STR.total}</td>
          <td>{DEX.total}</td>
          <td>{CON.total}</td>
          <td>{MAG.total}</td>
          <td>{LCK.total}</td>
          <td>{STR.total + DEX.total + CON.total + MAG.total + LCK.total}</td>
          <td>{opponent.hitPoints}</td>
          <td>
            <div  style={{display:`flex`}}>
              <Item item={opponent.items.STR} />
              <Item item={opponent.items.DEX} />
              <Item item={opponent.items.CON} />
              <Item item={opponent.items.MAG} />
              <Item item={opponent.items.LCK} />
            </div>
          </td>
          <td>
            <div  style={{display:`flex`}}>
              <Item item={opponent.weapons.STR} />
              <Item item={opponent.weapons.MAG} />
            </div>
          </td>
          <td>{opponent.humanoid && `H`}</td>
          <td><Element element={opponent.elite && `elite`} /></td>
          <td><Element element={opponent.element} /></td>
          <td>{opponent.reward}</td>
          <td>{itemsReward}</td>
          <td>{cumulatedReward}</td>
        </tr>
      )
    }


    return (
      <div className="mainWrapper">
        <div className="appWrapper">
          <div className="scrollArea highIndex shop">
            <table style={{width:`100%`, padding: `20px`}}><tbody>
              <tr>
                <td>Lv</td>
                <td>Job</td>
                <td>STR</td>
                <td>DEX</td>
                <td>CON</td>
                <td>MAG</td>
                <td>LCK</td>
                <td>SUM</td>
                <td>HP</td>
                <td>Items</td>
                <td>Weapons</td>
                <td>H/B</td>
                <td>Elite</td>
                <td>Elmt</td>
                <td>Reward</td>
                <td>Item Rwd</td>
                <td>Sum rwd</td>
              </tr>
              {levels}
            </tbody></table>
            {/* {monsters} */}
            {/* <div className="storeBox">{museum}</div> */}
          </div>
          <div className="actionArea">
            <button className="navigation" onClick={() => setGameState({ state: `welcome` })}>Back</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonstersDemo)
