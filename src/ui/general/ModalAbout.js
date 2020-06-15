/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { connect } from "react-redux"

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

  // Display component
  return (
    <div className="credits">
      <p>A game about killing monsters<br />and killing phone batteries.</p>
      <div className="separator" />
      <div className="title">Game dev & design</div>
      <p>
        Rémi<br />
        <span className="smallText">
          ultimatemanatee@gmail.com<br />
          <a href="https://discord.gg/C46VEGx">Discord</a>
        </span>
      </p>
      <div className="title">Monsters design</div>
      <p><a href="http://www.akashics.moe/" target="_blank">Ækashics Librarium</a></p>
      <div className="title">Pixel art assets</div>
      <p><a href="https://www.deviantart.com/7soul1" target="_blank">7 Soul</a> / <a href="https://www.saschanaderer.com/pixel-art/" target="_blank">Pixeltier</a></p>
      <div className="separator" />
      <p>Thank you for playing!</p>
    </div>
  )
}

// Exporting as default
export default connect(mapStateToProps, mapDispatchToProps)(ModalAbout)
