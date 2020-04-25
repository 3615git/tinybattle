/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { connect } from "react-redux"

import logo from '../../pics/ui/logo.png'

/**
  * @desc About Modal
*/

const mapStateToProps = state => {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

const ModalAbout = () => {

  const logoStyle = {
    width: `200px`,
    imageRendering: `optimizeQuality`
  }

  // Display component
  return (
    <div>
      <img src={logo} className="logo" alt="Logo" style={logoStyle} />
      <div>Credits</div>
      <p>Monsters design</p>
      <a href="http://www.akashics.moe/" target="_blank">Ækashics Librarium</a>
      <p>Third party libs</p>
      <a href="https://github.com/Vibrant-Colors/node-vibrant" target="_blank">Node Vibrant</a>
    </div>
  )
}

// Exporting as default
export default connect(mapStateToProps, mapDispatchToProps)(ModalAbout)
