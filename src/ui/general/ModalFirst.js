/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { connect } from "react-redux"
import SkillButton from '../../ui/battle/SkillButton'
import help from '../../pics/ui/help.svg'

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
  
      <p>If you feel lost, help and user guide are located in the upper left corner of the app.</p>
      <p><img className="helpInline" src={help} alt="help menu" /></p>
      <p>Have fun!</p>

    </div>
  )
}

// Exporting as default
export default connect(mapStateToProps, mapDispatchToProps)(ModalHelp)
