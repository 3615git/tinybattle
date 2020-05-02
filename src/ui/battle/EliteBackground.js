import React from 'react'
import { connect } from "react-redux"
import sigil from '../../pics/ui/sigil.svg'

/**
  * @desc Display elite picture in the background
*/

const mapStateToProps = state => {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

const TurnIndicator = () => {

  // Component styling
  const defaultClasses = `eliteIndicator`

  // Add custom classes to defined classes
  const itemClasses = [defaultClasses].filter(val => val).join(` `)

  return (
    <div className={itemClasses}>
      <img src={sigil} alt="Elite background" />
    </div>
  )
}

// Exporting as default
export default connect(mapStateToProps, mapDispatchToProps)(TurnIndicator)
