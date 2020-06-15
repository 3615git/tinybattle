/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { connect } from "react-redux"
import Item from '../../ui/battle/Item'
import ActionButton from '../../ui/battle/ActionButton'
import SkillButton from '../../ui/battle/SkillButton'
import Element from '../../ui/battle/Element'
import logo from '../../pics/ui/logo2.png'
import help from '../../pics/ui/help.svg'

import fumble from '../../pics/ui/fumble.png'
import critical from '../../pics/ui/critical.png'
import death from '../../pics/ui/death.png'

/**
  * @desc Help Modal
*/

const mapStateToProps = state => {
  return {
    player: state.player
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

const ModalHelp = ({player}) => {

  let skillButtons = []
  for (let [key, value] of Object.entries(player.skills)) {
      skillButtons.push(<SkillButton type={key} current={value.current} ready={value.ready} />)
  }

  // Display component
  return (
    <div className="help" id="top">
      <p className="title">
        Welcome to MHD20 !
      </p>
  
      <p>If you feel lost, help and user guide <img className="helpInline" src={help} alt="help menu" /> is located in the upper left corner of the app.</p>
      <p>Have fun!</p>

    </div>
  )
}

// Exporting as default
export default connect(mapStateToProps, mapDispatchToProps)(ModalHelp)
