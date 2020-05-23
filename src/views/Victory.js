import React, { Component } from 'react'
import { connect } from "react-redux"

import Item from '../ui/battle/Item'
import ItemVisual from '../ui/battle/ItemVisual'
import { getMonsterLoot } from '../monsters/getMonsterReward'
import { clog } from '../utils/utils'

import { setGameState, settings } from '../redux/actions/index'

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

class Victory extends Component {
  constructor(props) {
    super(props)

    const { opponent, game } = this.props

    this.state = { 
      moveditems: [],
      solditems: [],
      soldMonsterParts: [],
      lootedGold: this.props.opponent.reward,
      monsterLoot: opponent.humanoid ? null : getMonsterLoot(game.level, opponent.elite)
    }
  }

  getLoot = (type, char, item) => {
    const { settings } = this.props
    const { moveditems } = this.state
    let updatedMovedItems = moveditems ? moveditems : []

    clog(`getLoot`, `function`)

    // Update store
    settings({ setting: `moveItem`, type: type, char: char, item: item })
    // Update UI
    updatedMovedItems.push({ type: type, char: char})
    this.setState({
      moveditems: updatedMovedItems
    })
  }

  sellLoot = (type, char, item) => {
    const { opponent, settings } = this.props
    const { solditems, lootedGold } = this.state
    let updatedSoldItems = solditems ? solditems : []

    clog(`sellLoot`, `function`)

    // Update store
    settings({ setting: `sellItem`, type: type, char: char, item: item })
    // Update UI
    updatedSoldItems.push({ type: type, char: char })
    this.setState({
      lootedGold: lootedGold + opponent[type][char].reward
    })
  }

  sellMonsterPart = (index, reward) => {
    const { settings } = this.props
    const { soldMonsterParts, lootedGold } = this.state
    let updatedSoldMonsterParts = soldMonsterParts ? soldMonsterParts : []

    clog(`sellMonsterPart`, `function`)

    // Update store
    settings({ setting: `setGold`, type: `add`, value: reward })
    // Update UI
    updatedSoldMonsterParts.push(index)
    this.setState({
      lootedGold: lootedGold + reward
    })
  }

  checkLoot = (type, char) => {
    const { moveditems, solditems } = this.state
    let loot

    clog(`checkLoot`, `function`)

    for (let index = 0; index < moveditems.length; index++) {
      if (moveditems[index].type === type && moveditems[index].char === char) loot = `new`
    }

    for (let index = 0; index < solditems.length; index++) {
      if (solditems[index].type === type && solditems[index].char === char) loot = `sold`
    }

    return loot
  }

  parseLoot = (type) => {
    const { opponent, player } = this.props

    clog(`parseLoot`, `function`)

    let loot = []

    for (let [key, value] of Object.entries(opponent[type])) {

      // Check if item has been looted
      const looted = this.checkLoot(type, key)

      // Button labels
      let sellButton = <><ItemVisual item="coins" level={5} small /> {opponent[type][key].reward}</>
      let equipButton = "Equip"

      if (looted === `sold`) {
        sellButton = `Sold!`
        equipButton = ``
      } 
      else if (looted === `new`) {
        sellButton = ``
        equipButton = `Got it!`
      } 

      loot.push(
        <div className="lootBox" key={`lootbox_${type}_${key}`}>
          <span className="characName">{key}</span>
          <div className="storeWrapper">
            <Item item={opponent[type][key]} />
          </div>
          <Item item={player[type][key]} effect={looted} />
          <div className="actions">
            <button onClick={() => this.getLoot(type, key, value)} disabled={looted}>
              {equipButton}
            </button>
            <button onClick={() => this.sellLoot(type, key, value)} disabled={looted}>
              {sellButton}
            </button>
          </div>
        </div>
      )
    }

    return loot
  }

  parseMonsterLoot = (type) => {
    const { monsterLoot, soldMonsterParts } = this.state

    clog(`parseMonsterLoot`, `function`)

    let loot = []

    for (let index = 0; index < monsterLoot.length; index++) {

      // Button labels
      let sellButton = <><ItemVisual item="coins" level={5} small /> {monsterLoot[index].reward}</>

      let looted = soldMonsterParts.indexOf(index) !== -1

      if (looted) {
        sellButton = `Sold!`
      }

      loot.push(
        <div className="lootBox" key={`lootbox_${index}`}>
          <div className="storeWrapper">
            <Item item={!looted ? monsterLoot[index] : {}} noPlus />
          </div>
          <div className="actions">
            <button onClick={() => this.sellMonsterPart(index, monsterLoot[index].reward)} disabled={looted}>
              {sellButton}
            </button>
          </div>
        </div>
      )
    }

    return loot
  }

  render() {
    const { setGameState, opponent, player } = this.props
    const { lootedGold } = this.state
    
    clog(`Victory render`, `location`)

    const goldIcon = {
      id: 6,
      score: player.gold,
      type: "coins"
    }

    const shopClasses = opponent.humanoid ? "shopWrapper" : "shopWrapper shop"

    return (
      <div className="mainWrapper">
        <div className="appWrapper">
          <div className="presentationArea highIndex">
            <div className={shopClasses}>
              <div className="goldLoot">
                <div><ItemVisual item="coins" level={3} /></div>
                +{lootedGold}
              </div>
              {opponent.humanoid ?
                <>
                  <div className="lootBoxes">
                    {this.parseLoot(`items`)}
                  </div>
                  <div className="lootBoxes weapons">
                    {this.parseLoot(`weapons`)}
                  </div>
                </>
                :
                <>
                  <span className="subtitle">Sell monster parts</span>
                  <div className="lootBoxes">
                    {this.parseMonsterLoot()}
                  </div>
                </>
              }
              <div className="goldLoot total">
                <Item item={goldIcon} effect="new" animateNumber noPlus />
              </div>
              <img src={opponent.pic} alt={opponent.name} />
            </div>
          </div>
          <div className="actionArea">
            <button className="navigation" onClick={() => setGameState({ state: `shop` })}>Shop</button>
            {/* <button className="navigation" onClick={() => setGameState({ state: `levelTransition` })}>Enter next round</button> */}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Victory)
