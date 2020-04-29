import React, { Component } from 'react'
import { connect } from "react-redux"

import { setGameState, settings } from '../redux/actions/index'
import { getMonsterItems } from '../monsters/getMonsterItems'
import { getMonsterWeapons } from '../monsters/getMonsterWeapons'
import Item from '../ui/battle/Item'
import ItemVisual from '../ui/battle/ItemVisual'
import { clog, randomValue, getRandomInt } from '../utils/utils'

const mapStateToProps = state => {
  return {
    player: state.player,
    game: state.game,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setGameState: payload => dispatch(setGameState(payload)),
    settings: payload => dispatch(settings(payload))
  }
}

class Shop extends Component {

  constructor(props) {
    super(props)

    // build store catalog
    const catalog = {
      items: this.generateCatalog(`items`, this.props.game.level, false),
      weapons: this.generateCatalog(`weapons`, this.props.game.level, false)
    }

    this.state = {
      soldItems: [],
      gold: this.props.player.gold,
      catalog: catalog
    }
  }

  buyLoot = (type, char, item) => {
    const { settings } = this.props
    const { soldItems, gold } = this.state
    let updatedsoldItems = soldItems ? soldItems : []

    clog(`buyLoot`, `function`)

    // Update store
    settings({ setting: `buyItem`, type: type, char: char, item: item })
    // Update UI
    updatedsoldItems.push({ type: type, char: char })
    // Update state
    this.setState({
      gold: gold - item.price,
      soldItems: updatedsoldItems
    })
  }

  generateCatalog = (catalog, level, elite) => {

    clog(`generateCatalog`, `function`)

    // Get items in the catalog
    let items = [] 
    let numberOfitems, itemsRange

    if (catalog === `items`) {
      // randomize selection
      numberOfitems = getRandomInt(1,3)
      itemsRange = [`STR`, `DEX`, `CON`, `MAG`, `LCK`]
      for (let index = 0; index < numberOfitems; index++) {
        items.push(randomValue(itemsRange))
      }
    } else {
      // randomize selection
      numberOfitems = getRandomInt(1, 2)
      itemsRange = [`STR`, `MAG`]
      for (let index = 0; index < numberOfitems; index++) {
        items.push(randomValue(itemsRange))
      }
    }

    let itemList = {}

    for (let index = 0; index < items.length; index++) {
      let itemData = (catalog === `items`)
        ? getMonsterItems([items[index]], level, true, elite)
        : getMonsterWeapons([items[index]], level, true, elite)
      for (let [key, value] of Object.entries(itemData)) {
        itemList[key] = value
      }
    }

    return itemList
  }

  checkLoot = (type, char) => {
    const { soldItems } = this.state
    let loot

    clog(`checkLoot`, `function`)

    for (let index = 0; index < soldItems.length; index++) {
      if (soldItems[index].type === type && soldItems[index].char === char) loot = `new`
    }

    return loot
  }

  parseLoot = (type) => {
    const { player } = this.props
    const { catalog } = this.state

    clog(`parseLoot`, `function`)

    let loot = []

    for (let [key, value] of Object.entries(catalog[type])) {

      // Check if item has been looted
      const looted = this.checkLoot(type, key)

      // Button labels
      let buyButton = <><ItemVisual item="coins" level={5} small /> {value.price}</>

      if (looted === `new`) {
        buyButton = `Sold !`
      }

      loot.push(
        <div className="lootBox" key={`lootbox_${type}_${key}`}>
          <span className="characName">{key}</span>
          <div className="storeWrapper">
            <Item item={looted ? null : value} />
          </div>
          <Item item={player[type][key]} effect={looted} />
          <div className="actions">
            <button onClick={() => this.buyLoot(type, key, value)} disabled={looted || player.gold < value.price}>
              {buyButton}
            </button>
          </div>
        </div>
      )
    }

    return loot
  }

  render() {
    const { setGameState } = this.props
    const { gold, catalog } = this.state

    clog(`Shop render`, `location`)

    const goldIcon = {
      id: 6,
      score: gold,
      type: "coins"
    }

    console.log(catalog)

    return (
      <div className="mainWrapper">
        <div className="appWrapper">
          <div className="presentationArea highIndex">
            <div className="shopWrapper shop">
              <span className="title">Shop</span>
              <span className="subtitle">Items</span>
              <div className="lootBoxes">
                {this.parseLoot(`items`)}
              </div>
              <span className="subtitle">Weapons</span>
              <div className="lootBoxes weapons">
                {this.parseLoot(`weapons`)}
              </div>
              <div className="goldLoot">
                <Item item={goldIcon} noPlus />
              </div>
            </div>
          </div>
          <div className="actionArea">
            <button className="navigation" onClick={() => setGameState({ state: `levelTransition` })}>Enter next battle</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop)
