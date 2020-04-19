import React, { Component } from 'react'
import { connect } from "react-redux"

import { setGameState } from '../redux/actions/index'
import { getMonsterItems } from '../monsters/getMonsterItems'
import { getMonsterWeapons } from '../monsters/getMonsterWeapons'
import Item from '../ui/battle/Item'

import '../css/app.scss'
import '../css/shop.scss'
import '../css/animations.css'

const mapStateToProps = state => {
  return {
    player: state.player,
    opponent: state.opponent,
    playerTurn: state.game.playerTurn,
    game: state.game,
    log: state.log
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setGameState: payload => dispatch(setGameState(payload))
  }
}

const generateItems = (CHAR, level, elite, amount) => {
  const type = [CHAR]
  let items = []
  for (let index = 0; index < amount; index++) {
    let itemData = getMonsterItems(type, level, true, elite)
    items.push(<Item key={index} item={itemData[CHAR]} />)
  }

  return (
  <div className="shopCatalog">
    <div className="title">{CHAR}</div>
    <div className="items">
      {items} 
    </div>
  </div>
  )
}

const generateWeapons = (CHAR, level, elite, amount) => {
  const type = [CHAR]
  let items = []
  for (let index = 0; index < amount; index++) {
    let itemData = getMonsterWeapons(type, level, true, elite)
    items.push(<Item key={index} item={itemData[CHAR]} />)
  }

  return (
    <div className="shopCatalog">
      <div className="title">{CHAR}</div>
      <div className="items">
        {items}
      </div>
    </div>
  )
}

const generateCatalog = (level, elite, amount) => {
  const types = [`STR`, `DEX`, `CON`, `MAG`, `LCK`]
  const weapons = [`STR`, `MAG`]
  let catalog = []

  for (let index = 0; index < types.length; index++) {
    catalog.push(generateItems(types[index], level, elite, amount))
  }

  for (let index = 0; index < weapons.length; index++) {
    catalog.push(generateWeapons(weapons[index], level, elite, amount))
  }

  return catalog
}

class Shop extends Component {

  render() {
    const itemCatalog = generateCatalog(3, false, 5)

    return (
      <div className="mainWrapper">
        <div className="appWrapper">
          <div className="presentationArea">
            <div>
              {itemCatalog}
            </div>
          </div>
          <div className="actionArea">
            <button className="navigation" onClick={() => setGameState({ state: `welcome` })}>Back</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop)
