import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"

import { gameSettings } from "../../conf/settings"
import { attack } from '../../redux/actions/index'
import Bar from './Bar'
import ItemVisual from './ItemVisual'

/**
  * @desc Action buttons
*/

const propTypes = {
  type: PropTypes.string.isRequired
}

const defaultProps = {}

const mapStateToProps = state => {
  return {
    player: state.player,
    opponent: state.opponent
  }
}

function mapDispatchToProps(dispatch) {
  return {
    attack: payload => dispatch(attack(payload))
  }
}

const SkillButton = ({ type, current, ready, player, opponent, attack }) => {

  // Component styling
  let onClick, buttonClass, note

  // Placeholder function for not ready actions
  function notready() {}

  // Is this skill ready ?
  const skillReady = current === ready

  // Styling 
  buttonClass = skillReady ? `skill ${type}` : `skill ${type} disabled`

  // Switch different buttons
  switch (type) {

    case `stun`:
      onClick = skillReady ? () => attack({ type: `skill`, mode: `stun` }) : notready
      break;
    case `itembreak`:
      onClick = skillReady ? () => attack({ type: `skill`, mode: `itembreak` }) : notready
      break;
    case `psyblast`:
      onClick = skillReady ? () => attack({ type: `skill`, mode: `psyblast` }) : notready
      break;
    case `curse`:
      onClick = skillReady ? () => attack({ type: `skill`, mode: `curse` }) : notready
      break;
  
    default:
      break;
  }
  
  // Display component
  return (
    <button className={buttonClass} onClick={onClick}>
      {note}
      <ItemVisual item={gameSettings.icons[type][0]} level={gameSettings.icons[type][1]} />
      <Bar current={current} ready={ready} />
    </button>
  )
}

// Applying propTypes definition and default values
SkillButton.propTypes = propTypes
SkillButton.defaultProps = defaultProps

// Exporting as default
export default connect(mapStateToProps, mapDispatchToProps)(SkillButton)
