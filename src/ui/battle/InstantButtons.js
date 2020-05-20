import React from 'react'
import { connect } from "react-redux"

import InstantButton from './InstantButton'

/**
  * @desc Instant buttons
*/

const mapStateToProps = state => {
  return {
    player: state.player,
    opponent: state.opponent
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

const InstantButtons = ({ player, onSell }) => {

  // Prepare instants
  let instantButtons = []
  for (let [key, value] of Object.entries(player.instants)) {
    instantButtons.push(<InstantButton onSell={onSell} key={`instant_${key}`} id={parseInt(key)} data={value} />)
  }
  // 6 items grid
  if (instantButtons.length < 6) {
    for (let index = instantButtons.length; index < 6; index++) {
      instantButtons.push(<InstantButton onSell={onSell} key={`empty_${index}`} />)
    }
  }

  // Display component
  return instantButtons
}

// Exporting as default
export default connect(mapStateToProps, mapDispatchToProps)(InstantButtons)
