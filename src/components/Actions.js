import React from 'react'
import { connect } from "react-redux"

import Skills from '../components/Skills'
import Action from '../components/Action'

import { attack } from '../redux/actions/index'

/**
  * @desc description of the component
  * @todo Use a todo tag to store future changes
*/


const mapStateToProps = state => {
  return {
    player: state.player,
    opponent: state.opponent,
    playerTurn: state.playerTurn
  }
}

function mapDispatchToProps(dispatch) {
  return {
    attack: payload => dispatch(attack(payload))
  }
}

const Actions = ({ player, opponent, playerTurn, attack }) => {
  // todo : display opponent action button when !turn
  // Display component
  return (
    <div>
        <Skills />
        <div className="actionWrapper">
        <Action type="physical" />
        <Action type="magical" />
        </div>
    </div>
  )
}

// Exporting as default
export default connect(mapStateToProps, mapDispatchToProps)(Actions)
