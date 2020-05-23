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
    imageRendering: `optimizeQuality`
  }

  // Display component
  return (
    <div className="credits">
      <img src={logo} className="logo" alt="Logo" style={logoStyle} />
      <p>A game about killing monsters<br />and killing phone batteries.</p>
      <div className="separator" />
      <div className="title">Game dev & design</div>
      <p>Rémi</p>
      <div className="title">Monsters design</div>
      <p><a href="http://www.akashics.moe/" target="_blank">Ækashics Librarium</a></p>
      <div className="title">Pixel art assets</div>
      <p><a href="https://www.deviantart.com/7soul1" target="_blank">7 Soul</a></p>
      <div className="title">Nice third party libs</div>
      <p><a href="https://github.com/Vibrant-Colors/node-vibrant" target="_blank">Node Vibrant</a></p >
      <p><a href="https://www.papaparse.com/" target="_blank">Papa Parse</a></p >
      <div className="separator" />
      <p>Thank you for playing!</p>
    </div>
  )
}

// Exporting as default
export default connect(mapStateToProps, mapDispatchToProps)(ModalAbout)
