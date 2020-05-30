import React, { Component } from 'react'
import { connect } from "react-redux"

import { setGameState, settings } from '../redux/actions/index'
import { getMonsterItems } from '../monsters/getMonsterItems'
import { getMonsterWeapons } from '../monsters/getMonsterWeapons'
import { getShopInstants } from '../monsters/getShopInstants'
import StatsAndItems from '../ui/battle/StatsAndItems'
import InstantButtons from '../ui/battle/InstantButtons'
import Item from '../ui/battle/Item'
import ItemVisual from '../ui/battle/ItemVisual'
import { clog, randomValue } from '../utils/utils'

const mapStateToProps = state => {
  return {
    player: state.player,
    game: state.game,
    uniques: state.uniques
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
      weapons: this.generateCatalog(`weapons`, this.props.game.level, false),
      instants: this.generateCatalog(`instants`, this.props.game.level, false),
      instants_weapon: this.generateCatalog(`instants_weapon`, this.props.game.level, false),
      unique_weapons: this.generateCatalog(`unique_weapons`, this.props.game.level, false),
    }

    this.state = {
      storeTab: `equipment`,
      soldItems: [],
      gold: this.props.player.gold,
      catalog: catalog
    }
  }

  changeTab = (tab) => {
    // Update state
    this.setState({
      storeTab: tab
    })
  }

  buyLoot = (type, index, item) => {
    const { settings } = this.props
    const { soldItems, gold } = this.state
    let updatedsoldItems = soldItems ? soldItems : []

    clog(`buyLoot`, `function`)

    // Update UI
    updatedsoldItems.push({ type: type, char: index })
    
    // For store, unique_weapons = weapons
    if (type === `unique_weapons`) type = `weapons`

    // Update store
    if (type === `instants` || type === `instants_weapon`) settings({ setting: `buyInstant`, item: item })
    else settings({ setting: `buyItem`, type: type, char: item.char, item: item })
    
    // Update state
    this.setState({
      gold: gold - item.price,
      soldItems: updatedsoldItems
    })
  }

  sellInstant = (index, item) => {
    const { settings } = this.props
    const { gold } = this.state

    clog(`sellInstant`, `function`)

    // Update store
    settings({ setting: `sellInstant`, index: index, item: item })
    // Update state
    this.setState({
      gold: gold + item.reward
    })
  }

  generateCatalog = (catalog, level, elite) => {
    const { uniques } = this.props

    clog(`generateCatalog`, `function`)

    // Get items in the catalog
    let items = [] 
    let numberOfitems, itemsRange

    if (catalog === `items`) {
      // randomize selection
      numberOfitems = 10
      itemsRange = [`STR`, `DEX`, `CON`, `MAG`, `LCK`]
      for (let index = 0; index < numberOfitems; index++) {
        let char = randomValue(itemsRange)
        items.push(char)
      }
    } 
    else if(catalog === `weapons`) {
      // randomize selection
      numberOfitems = 5
      itemsRange = [`STR`, `MAG`]
      for (let index = 0; index < numberOfitems; index++) {
        items.push(randomValue(itemsRange))
      }
    }
    else if (catalog === `instants`) {
      // randomize selection
      numberOfitems = 6
      itemsRange = [`quickheal`, `temporaryupgrade`, `temporaryluckupgrade`, `permanentupgrade`, `restore`]
      for (let index = 0; index < numberOfitems; index++) {
        items.push(randomValue(itemsRange))
      }
    }
    else if (catalog === `instants_weapon`) {
      // randomize selection
      numberOfitems = 4
      itemsRange = [`damage`, `sharpenphysical`, `sharpenmagical`]
      for (let index = 0; index < numberOfitems; index++) {
        items.push(randomValue(itemsRange))
      }
    }

    let itemList = []

    // Return list of items
    if (catalog === `unique_weapons`) {
      // Get a weapon selection
      let weaponKeys = Object.keys(uniques.weapons)
      for (let index = 0; index < 4; index++) {
        let selecteditemKey = weaponKeys[weaponKeys.length * Math.random() << 0]
        itemList.push(uniques.weapons[selecteditemKey])
      }

      // @todo : Get an item selection also

    } else {
      // Classic items
      for (let index = 0; index < items.length; index++) {
        let itemData
        if (catalog === `items`) itemData = getMonsterItems([items[index]], level, true, elite)
        else if (catalog === `weapons`) itemData = getMonsterWeapons([items[index]], level, true, elite)
        else if (catalog === `instants`) itemData = getShopInstants([items[index]], level)
        else if (catalog === `instants_weapon`) itemData = getShopInstants([items[index]], level)
  
        itemList.push(itemData[items[index]])
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

  parseLoot = (type, displayChar) => {
    const { player } = this.props
    const { catalog } = this.state

    clog(`parseLoot`, `function`)

    let loot = []

    for (let index = 0; index < catalog[type].length; index++) {
      const key = index
      const value = catalog[type][index]

      // Check if item has been looted
      const looted = this.checkLoot(type, key)

      // Button labels
      let buyButton = <span className="itemPrice"><ItemVisual item="coins" level={5} small />{value.price}</span>

      if (looted === `new`) {
        buyButton = <span className="itemPrice">Sold !</span>
      }

      // Overburden
      let overburden
      if (player.instants && player.instants.filter(Boolean).length === 6 && (type === `instants` || type === `instants_weapon`)) {
        overburden = <div className="overburden"><ItemVisual item="bag" level={12} /><span>Full bag!</span></div>
      }

      loot.push(
        <div key={`lootbox_${type}_${key}`} className="storeItemWrapper">
          {overburden}
          <button 
            className={`storeItem ${type}`}
            onClick={() => this.buyLoot(type, index, value)} 
            disabled={looted || player.gold < value.price || overburden}
          >
            <Item 
              item={looted ? null : value} 
              displayChar={displayChar} 
              noPlus={type === `instants` || type === `instants_weapon`} 
              shop={type === `items` ? `items` : ``}
            />
            {buyButton}
          </button>
        </div>
      )
    }

    return loot
  }

  render() {
    const { setGameState } = this.props
    const { gold, storeTab } = this.state

    clog(`Shop render`, `location`)

    const goldIcon = {
      id: 5,
      score: gold,
      type: "coins"
    }

    return (
      <div className="mainWrapper">
        <div className="appWrapper">
          <div className="presentationArea highIndex">
            <div className="shopWrapper shop panelStore">
              {/* <span className="title">Shop</span> */}
              <div className="panelStoreTabs">
                <button className={storeTab !== `equipment` ? `off` : `on`} onClick={() => this.changeTab(`equipment`)}>
                  <ItemVisual item="armor" level={70} />Gear
                </button>
                <button className={storeTab !== `items` ? `off` : `on`} onClick={() => this.changeTab(`items`)}>
                  <ItemVisual item="potion" level={23} />Items
                </button>
                <button className={storeTab !== `weapons` ? `off` : `on`} onClick={() => this.changeTab(`weapons`)}>
                  <ItemVisual item="sword" level={158} />Weapons
                </button>
                <button className={storeTab !== `uniques` ? `off` : `on`} onClick={() => this.changeTab(`uniques`)}>
                  <ItemVisual item="unique" level={16} />Antiques
                </button>
              </div>
              <div className="storeBox">
                {storeTab === `equipment` && this.parseLoot(`items`, true)}
                {storeTab === `items` && this.parseLoot(`instants`, false)}
                {storeTab === `items` && this.parseLoot(`instants_weapon`, false)}
                {storeTab === `weapons` && this.parseLoot(`weapons`, false)}
                {storeTab === `uniques` && this.parseLoot(`unique_weapons`, false)}
              </div>
            </div>

            <div className="goldLoot">
              <Item item={goldIcon} noPlus animateNumber />
            </div>

            <div className="playerArea shop">
              <StatsAndItems />
              <div className="buttons">
                <InstantButtons onSell={this.sellInstant} />
              </div>
            </div>
          </div>
          <div className="actionArea">
            <button className="navigation" onClick={() => setGameState({ state: `levelTransition` })}>Next battle</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop)
