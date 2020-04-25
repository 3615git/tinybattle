import React, { Component } from 'react'
import { connect } from "react-redux"

import { getMonsterWeapons } from '../monsters/getMonsterWeapons'
import { setGameState } from '../redux/actions/index'
import Item from '../ui/battle/Item'
import Stats from '../ui/battle/Stats'

const mapStateToProps = state => {
  return {
    game: state.game
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setGameState: payload => dispatch(setGameState(payload))
  }
}

class Welcome extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      name: '',
      baseCharacs: 'STR'
    };
  }

  componentDidMount() {
    let { game } = this.props

    // Create start items
    let items = []
    let itemData
    itemData = getMonsterWeapons([`STR`, `MAG`], 1, true, false, `normal`)
    items.push(<Item key="STR_weapon" item={itemData[`STR`]} />)
    items.push(<Item key="MAG_weapon" item={itemData[`MAG`]} />)

    // Get optional legacy item
    let legacy = <Item key="legacy_item" item={game.legacy} />

    this.setState({ items, legacy })
  }

  handleChange = (event) => {
    this.setState({ name: event.target.value })
  }

  setStyle = (baseCharacs) => {
    console.log(baseCharacs)
    this.setState({ baseCharacs })
    return false
  }

  render() {

    const { setGameState } = this.props
    const { name, baseCharacs, items, legacy } = this.state
    
    return (
      <div className="mainWrapper wideScreen">
        <div className="appWrapper">
          <div className="presentationArea highIndex">
            <div className="title">New game</div>
            <label>Your name for this game</label>
            <input type="text" name="name" value={name} onChange={this.handleChange} />
            <label>Base characs</label>
            <div className="profileSelector">
              <button onClick={() => this.setStyle(`STR`)} className={baseCharacs !== `STR` ? `third-transparent` : ``}>Warrior</button>
              <button onClick={() => this.setStyle(`MAG`)} className={baseCharacs !== `MAG` ? `third-transparent` : ``}>Mage</button>
              <button onClick={() => this.setStyle(`MIX`)} className={baseCharacs !== `MIX` ? `third-transparent` : ``}>Mixed</button>
            </div>
            <label>Your stats</label>
            <div className="profileStats">
              <Stats />
            </div>
            <div className="profileWeapons">
              <div className="weapons">
                <label>Weapons</label>
                <div>{items}</div>
              </div>
              <div className="legacy">
                <label>Legacy</label>
                <div>{legacy}</div>
              </div>
            </div>
          </div>
          <div className="actionArea">
            <button className="navigation" onClick={() => setGameState({ state: `levelTransition` })}>Start game</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
