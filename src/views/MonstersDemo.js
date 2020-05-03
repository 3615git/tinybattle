import React, { Component } from 'react'
import { connect } from "react-redux"

import { setGameState } from '../redux/actions/index'
import Monster from '../ui/battle/Monster'
import { monsterInfo } from '../monsters/monster'

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
          level={1}
          data={monsterInfo(property, 1, monsterList)}
        />
      )
    }
    
    return (
      <div className="mainWrapper">
        <div className="appWrapper">
          <div className="scrollArea highIndex">
            {monsters}
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
