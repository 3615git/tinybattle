import React from 'react'
import { connect } from "react-redux"

// import Skills from './Skills'
import ActionButton from './ActionButton'
import OpponentAction from './OpponentAction'

import { attack } from '../../redux/actions/index'

/**
  * @desc description of the component
  * @todo Use a todo tag to store future changes
*/


const mapStateToProps = state => {
  return {
    player: state.player,
    opponent: state.opponent,
    playerTurn: state.game.playerTurn
  }
}

function mapDispatchToProps(dispatch) {
  return {
    attack: payload => dispatch(attack(payload))
  }
}

const Actions = ({ player, opponent, playerTurn, attack }) => {

  // Display component
  return (
    <div className="actionsWrapper">
      {!playerTurn && <OpponentAction type="physical" />}
      <div className={playerTurn ? `` : `transparent`}>
          {/* <Skills /> */}
          <div className="buttons">
            {/* Skills */}
            <ActionButton type="skill" />
            <ActionButton type="skill" />
            <ActionButton type="skill" />
            <ActionButton type="skill" />
            <ActionButton type="skill" />
            <ActionButton type="skill" />
            {/* Physical */}
            <ActionButton type="block" />
            <ActionButton type="attack" />
            <ActionButton type="specialattack" />
            <ActionButton type="stun" />
            <ActionButton type="break" />
            {/* Magic */}
            <ActionButton type="focus" />
            <ActionButton type="cast" />
            <ActionButton type="specialcast" />
            <ActionButton type="psyblast" />
            <ActionButton type="curse" />
          </div>
        </div>
    </div>
  )
}

// Exporting as default
export default connect(mapStateToProps, mapDispatchToProps)(Actions)
