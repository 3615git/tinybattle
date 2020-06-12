import React, { Component } from 'react'
import { connect } from "react-redux"

import { setGameState, settings } from '../redux/actions/index'
import Item from '../ui/battle/Item'
import Stats from '../ui/battle/Stats'
import Items from '../ui/battle/Items'
import { clog } from '../utils/utils'
import { getLevelFromXp } from '../actions/score/score'

const mapStateToProps = state => {
  return {
    player: state.player,
    game: state.game,
    score: state.score
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
      name: player && player.name ? player.name : ``,
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
    // Forge uniques
    settings({ setting: `forgeUniques` })
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

    const { player, score } = this.props
    const { name, baseStyle } = this.state

    const goldIcon = {
      id: 5,
      score: player.gold,
      type: "coins"
    }

    // Starting items
    let instants = []
    for (let index = 0; index < player.instants.length; index++) {
      const value = player.instants[index]
      instants.push(
        <Item
          key={`instant_${index}`}
          item={value}
          displayChar={false}
          noPlus
        />
      )
    }
    
    return (
      <div className="mainWrapper wideScreen">
        <div className="appWrapper">
          <div className="presentationArea shopWrapper highIndex">
            {score && score.game && score.game.runs
              ? <><div className="text-big">{name}</div><div style={{marginTop: `5px`}}>Run #{score.game.runs + 1} - XP Level {getLevelFromXp(player.xp)}</div></>
              : <><label>Your name</label><input type="text" name="name" value={name} onChange={this.handleChange} autoComplete="off" /></>
            }
            <div className="profileSelector">
              <button onClick={() => this.setStyle(`warrior`)} className={baseStyle !== `warrior` ? `third-transparent` : ``}>Warrior</button>
              <button onClick={() => this.setStyle(`mage`)} className={baseStyle !== `mage` ? `third-transparent` : ``}>Mage</button>
              <button onClick={() => this.setStyle(`thief`)} className={baseStyle !== `thief` ? `third-transparent` : ``}>Thief</button>
            </div>
            <label>Stats, gear and <span className="legacyColor">previous run</span> items </label>
            <div className="profileStats">
              <Stats />
              <Items animations={false} />
            </div>

            <span className="subtitle">Weapons</span>
            <div className="playerItems">
              <Item item={player.weapons[`STR`]} effect={this.checkLegacy(`weapons`, `STR`)} />
              <Item item={player.weapons[`MAG`]} effect={this.checkLegacy(`weapons`, `MAG`)} />
            </div>

            <span className="subtitle">Start items level {getLevelFromXp(player.xp)}</span>
            <div className="playerItems">
              {instants}
            </div>

            <span className="subtitle">Gold</span>
            <div className="goldLoot noMargin noPadding">
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
