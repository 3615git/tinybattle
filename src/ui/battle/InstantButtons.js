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
  if (player.instants) {
    for (let index = 0; index < player.instants.length; index++) {
      const value = player.instants[index]
      instantButtons.push(<InstantButton onSell={onSell} key={`instant_${index}`} id={parseInt(index)} data={value} />)
    }
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
