import React, { Component } from 'react'
import { connect } from "react-redux"

import Item from '../ui/battle/Item'
import ItemVisual from '../ui/battle/ItemVisual'
import { setGameState, settings  } from '../redux/actions/index'
import { clog } from '../utils/utils'
import { legacyItemsCount } from '../conf/settings'

const mapStateToProps = state => {
  return {
    player: state.player,
    opponent: state.opponent,
    game: state.game
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setGameState: payload => dispatch(setGameState(payload)),
    settings: payload => dispatch(settings(payload))
  }
}

class Defeat extends Component {

  constructor(props) {
    super(props)

    this.state = {
      movedItems: []
    }
  }

  checkLoot = (type, char) => {
    const { movedItems } = this.state
    let loot

    clog(`checkLoot`, `function`)

    for (let index = 0; index < movedItems.length; index++) {
      if (movedItems[index].type === type && movedItems[index].char === char) loot = `new`
    }

    return loot
  }

  keepLoot = (type, char, item) => {
    const { settings } = this.props
    const { movedItems } = this.state
    let updatedmovedItems = movedItems ? movedItems : []

    clog(`keepLoot`, `function`)

    // Update store
    settings({ setting: `keepItem`, type: type, char: char, item: item })
    // Update UI
    updatedmovedItems.push({ type: type, char: char })
    this.setState({
      movedItems: updatedmovedItems
    })
  }

  parseLoot = (type) => {
    const { player, game } = this.props
    const { movedItems } = this.state
    const itemCount = legacyItemsCount(game.level)

    clog(`parseLoot`, `function`)

    let loot = []
    
    for (let [key, value] of Object.entries(player[type])) {

      // Check if item has been looted
      const looted = this.checkLoot(type, key)

      // Button labels
      let keepButton = `Keep`

      if (looted === `new`) {
        keepButton = `Saved!`
      }

      loot.push(
        <div className={`lootBox ${type} ${looted}`} key={`lootbox_${type}_${key}`}>
          <div className="storeWrapper">
            <Item 
              item={player[type][key]} 
              effect={looted} 
              displayChar={type === `items`}
            />
          </div>
          <div className="actions">
            <button onClick={() => this.keepLoot(type, key, value)} disabled={looted || movedItems.length === itemCount}>
              {keepButton}
            </button>
          </div>
        </div>
      )
    }

    return loot
  }

  render() {
    const { setGameState, game, player } = this.props
    const { movedItems } = this.state

    clog(`Defeat render`, `location`)

    const itemCount = legacyItemsCount(game.level)
    const itemCountLabel = itemCount === 1 ? `1 item` : <>{itemCount} items</>
    
    return (
      <div className="mainWrapper">
        <div className="appWrapper">
          <div className="presentationArea highIndex">
            <div className="shopWrapper shop legacy">
              <div className="legacyTitle">Pass <span className="legacyCount">{player.gold} <ItemVisual item="coins" level={6} small /></span> and <span className="legacyCount">{itemCountLabel}</span><br />to your next game : choose wisely !</div>
              <div className="lootBoxes"> 
                {this.parseLoot(`items`)}
                {this.parseLoot(`weapons`)}
              </div>
            </div>
          </div>
          <div className="actionArea">
            {/* <button className="navigation" onClick={() => setGameState({ state: `hallOfFame` })} disabled={movedItems.length !== itemCount}>Enter hall of fame</button> */}
            <button className="navigation" onClick={() => setGameState({ state: `welcome` })} disabled={movedItems.length !== itemCount}>Start again !</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Defeat)
