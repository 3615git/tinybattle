import React from 'react'
import { connect } from "react-redux"

// import Skills from './Skills'
import ActionButton from './ActionButton'
import SkillButton from './SkillButton'
import InstantButton from './InstantButton'

import { attack } from '../../redux/actions/index'

/**
  * @desc description of the component
  * @todo Use a todo tag to store future changes
*/


const mapStateToProps = state => {
  return {
    player: state.player,
    opponent: state.opponent,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    attack: payload => dispatch(attack(payload))
  }
}

const Actions = ({ player, opponent }) => {

  // Prepare skills
  let skillButtons = []
  for (let [key, value] of Object.entries(player.skills)) {
    skillButtons.push(<SkillButton type={key} current={value.current} ready={value.ready} />)
  }

  // Prepare instants
  let instantButtons = []
  for (let [key, value] of Object.entries(player.instants)) {
    instantButtons.push(<InstantButton type={key} data={value} />)
  }
  // 6 items grid
  if (instantButtons.length < 6) {
    for (let index = 0; index < 6 - instantButtons.length; index++) {
      instantButtons.push(<InstantButton />)
    }
  }

  // Display component
  return (
    <div className="actionsWrapper">
      {/* <Skills /> */}
      <div className="buttons">
        {/* Skills */}
        {instantButtons}
        {/* Physical */}
        <ActionButton type="block" />
        <ActionButton type="attack" />
        <ActionButton type="specialattack" />
        {skillButtons[0]}
        {skillButtons[1]}
        {skillButtons[2]}
        {/* Magic */}
        <ActionButton type="focus" />
        <ActionButton type="cast" />
        <ActionButton type="specialcast" />
        {skillButtons[3]}
        {skillButtons[4]}
        {skillButtons[5]}
      </div>
    </div>
  )
}

// Exporting as default
export default connect(mapStateToProps, mapDispatchToProps)(Actions)
