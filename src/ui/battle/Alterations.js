import React from 'react'
import { connect } from "react-redux"
import { gameSettings } from "../../conf/settings"
import ItemVisual from './ItemVisual'

/**
  * @desc Wrapper for all stats and items
*/

const propTypes = {

}

const defaultProps = {

}

const mapStateToProps = state => {
  return {
    opponent: state.opponent
  }
}

const Alterations = ({ opponent }) => { 

  let alterations = []
  // Parse current status modifiers
  if (opponent.buff && opponent.buff.temporary) {
    for (let index = 0; index < opponent.buff.temporary.length; index++) {
      const element = opponent.buff.temporary[index]
      alterations.push(
        <div className="alteration">
          <span className="counter">{element.rounds + 1}</span>
          <ItemVisual item={gameSettings.icons[element.origin][0]} level={gameSettings.icons[element.origin][1]} />
        </div>
      )
    }
  }
  // Display component
  return alterations
}

// Applying propTypes definition and default values
Alterations.propTypes = propTypes
Alterations.defaultProps = defaultProps

// Exporting as default
export default connect(mapStateToProps)(Alterations)
