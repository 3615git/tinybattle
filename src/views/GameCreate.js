import React, { Component } from 'react'
import { connect } from "react-redux"

import { setGameState, settings } from '../redux/actions/index'
import Item from '../ui/battle/Item'
import Stats from '../ui/battle/Stats'
import Items from '../ui/battle/Items'
import { clog } from '../utils/utils'

const mapStateToProps = state => {
  return {
    player: state.player,
    game: state.game
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setGameState: payload => dispatch(setGameState(payload)),
    settings: payload => dispatch(settings(payload))
  }
}

class GameCreate extends Component {

  constructor(props) {
    super(props);
    const { player } = this.props

    this.state = { 
      name: player && player.name ? player.name : `Adventurer`,
      baseStyle: 'warrior'
    }
  }

  handleChange = (event) => {
    clog(`handleChange`, `function`)
    this.setState({ name: event.target.value })
  }

  setStyle = (baseStyle) => {
    const { settings } = this.props
    clog(`setStyle`, `function`)
    settings({ setting: `createPlayer`, style: baseStyle })
    this.setState({ baseStyle })
    return false
  }

  startGame = () => {
    const { setGameState, settings } = this.props
    const { name } = this.state
    clog(`startGame`, `function`)
    // Store name
    settings({ setting: `preference`, type: `playerName`, value: name })
    // Reset legacy
    settings({ setting: `deleteLegacy` })
    settings({ setting: `resetLevel` })
    // Move game state
    setGameState({ state: `levelTransition` })
  }

  checkLegacy(type, char) {
    const { game } = this.props
    let effect
    if (game.legacy && game.legacy[type] && game.legacy[type][char]) effect = `legacy`
    return effect
  }

  render() {

    const { player } = this.props
    const { name, baseStyle } = this.state

    const goldIcon = {
      id: 6,
      score: player.gold,
      type: "coins"
    }
    
    return (
      <div className="mainWrapper wideScreen">
        <div className="appWrapper">
          <div className="presentationArea shopWrapper highIndex">
            <label>Your name</label>
            <input type="text" name="name" value={name} onChange={this.handleChange} autoComplete="off" />
            <div className="profileSelector">
              <button onClick={() => this.setStyle(`warrior`)} className={baseStyle !== `warrior` ? `third-transparent` : ``}>Warrior</button>
              <button onClick={() => this.setStyle(`mage`)} className={baseStyle !== `mage` ? `third-transparent` : ``}>Mage</button>
              <button onClick={() => this.setStyle(`thief`)} className={baseStyle !== `thief` ? `third-transparent` : ``}>Thief</button>
            </div>
            <label>Stats and <span className="legacyColor">legacy</span> items</label>
            <div className="profileStats">
              <Stats />
              <Items />
            </div>
            <div className="profileWeapons">
              {player &&
                <div className="weapons">
                  <div className="weapon">
                    <div>
                      <div className="physicalColor">Physical</div>
                      <div className="info">{player.weapons[`STR`].cost} stamina</div>
                      <div className="info">STR + {player.weapons[`STR`].score}</div>
                    </div>
                    <Item item={player.weapons[`STR`]} effect={this.checkLegacy(`weapons`, `STR`)} />
                  </div>
                  <div className="weapon">
                    <Item item={player.weapons[`MAG`]} effect={this.checkLegacy(`weapons`, `MAG`)} />
                    <div>
                      <div className="magicalColor">Magical </div>
                      <div className="info">{player.weapons[`MAG`].cost} mana</div>
                      <div className="info">MAG + {player.weapons[`MAG`].score}</div>
                    </div>
                  </div>
                </div>
              }
            </div>
            <label><span className="legacyColor">Legacy</span> gold</label>
            <div className="goldLoot">
              <Item item={goldIcon} effect="new" animateNumber noPlus />
            </div>
          </div>
          <div className="actionArea">
            <button 
              className="navigation" 
              onClick={() => this.startGame()}
              disabled={name.length === 0}
            >
              Start game
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameCreate)
