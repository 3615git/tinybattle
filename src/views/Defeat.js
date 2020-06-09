import React, { Component } from 'react'
import { connect } from "react-redux"

import Item from '../ui/battle/Item'
import ItemVisual from '../ui/battle/ItemVisual'
import { setGameState, settings  } from '../redux/actions/index'
import { clog } from '../utils/utils'
import { gameSettings, legacyItemsCount } from '../conf/settings'

const mapStateToProps = state => {
  return {
    player: state.player,
    opponent: state.opponent,
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

class Defeat extends Component {

  constructor(props) {
    super(props)

    const { score } = this.props

    this.state = {
      movedItems: [],
      scoreSubmitted: score.run.scoreSent ? `success` : false
    }
  }

  componentDidMount() {
    const { player, score, settings } = this.props

    if (!score.run.scoreSent) {
      // POST request using fetch with error handling
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          name: player.name,
          run_rounds: score.run.round,
          run_maxlevel: score.run.maxlevel,
          game_runs: score.game.runs,
          game_rounds: score.game.round,
          game_maxlevel: score.game.maxlevel,
          game_battles: score.game.battles.total,
          game_battles_defeats: score.game.battles.defeats,
          game_battles_victories: score.game.battles.victories,
          alltime_runs: score.alltime.runs,
          alltime_rounds: score.alltime.round,
        })
      }
  
      fetch(gameSettings.postScoreUrl, requestOptions)
        .then(async response => {
          const data = await response.json();

          this.setState({
            scoreSubmitted: `success`
          })

          // Prevent multiple sending using refresh
          settings({ setting: `submitScore` })
  
          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            this.setState({
              scoreSubmitted: `responseError`
            })
            return Promise.reject(error);
          }
        })
        .catch(error => {
          console.error('There was an error!', error);
          this.setState({
            scoreSubmitted: `networkError`
          })
        }
      )
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
    const { movedItems, scoreSubmitted } = this.state

    clog(`Defeat render`, `location`)

    console.log(scoreSubmitted)

    const itemCount = legacyItemsCount(game.level)
    const itemCountLabel = itemCount === 1 ? `1 item` : <>{itemCount} items</>

    // Submit score botton
    let submitButton = <span>Submitting score...</span>
    if (scoreSubmitted === `success`) submitButton = <span>Score sent !</span>
    else if (scoreSubmitted === `responseError`) submitButton = <span>Score not sent, sorry =[</span>
    else if (scoreSubmitted === `networkError`) submitButton = <span>No internet, score not sent =[</span>
    
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
            <button className="navigation" onClick={() => setGameState({ state: `hallOfFame` })} disabled={movedItems.length !== itemCount}>Hall of fame{submitButton}</button>
            <button className="navigation" onClick={() => setGameState({ state: `welcome` })} disabled={movedItems.length !== itemCount}>Start again !</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Defeat)
