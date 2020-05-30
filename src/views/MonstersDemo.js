import React, { Component } from 'react'
import { connect } from "react-redux"

import { setGameState } from '../redux/actions/index'
import Monster from '../ui/battle/Monster'
import { monsterInfo } from '../monsters/monster'
import { forgeUniqueItems } from '../utils/forge'
import Item from '../ui/battle/Item'
import ItemVisual from '../ui/battle/ItemVisual'

const mapStateToProps = state => {
  return {
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

    const { setGameState, monsterList } = this.props

    let monsters = []

    // Parse monster list
    for (const property in monsterList) {
      monsters.push(
        <Monster 
          key={`monster_${property}`}
          type={property} 
          level={20}
          data={monsterInfo(property, 1, monsterList)}
        />
      )
    }

    // Parse uniques list
    let uniques = forgeUniqueItems()
    let museum = []

    for (let [key, value] of Object.entries(uniques.weapons)) {
      museum.push(
        <div key={`lootbox_${key}`} className="storeItemWrapper">
          <button
            className={`storeItem`}
          >
            <Item
              item={value}
              displayChar={false}
              // shop={type === `items` && `items`}
            />
            <span className="itemPrice"><ItemVisual item="coins" level={5} small />{value.price}</span>
          </button>
        </div>
      )
    }


    return (
      <div className="mainWrapper">
        <div className="appWrapper">
          <div className="scrollArea shopWrapper highIndex shop">
            {/* {monsters} */}
            <div className="storeBox">{museum}</div>
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
