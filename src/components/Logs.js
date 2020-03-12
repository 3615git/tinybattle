import React from 'react'
import { connect } from "react-redux"
import { useSpring, animated } from 'react-spring'

/**
  * @desc description of the component
  * @todo Use a todo tag to store future changes
*/

const mapStateToProps = state => {
  return {
    log: state.log
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

const Logs = ({ log }) => {

  // Component styling
  const defaultClasses = `LogsWrapper`
  // Add custom classes to defined classes
  const itemClasses = [defaultClasses].filter(val => val).join(` `)

  // Build log message
  // let title, message, special, result
  
  // switch (data.action) {
  //   case `physicalAttack`:
  //     title = data.activePlayer.name + ` attacks !`
  //     result = data.targetPlayer.name + ` takes <span class="damage">`+ data.result +`</span> damage.`
  //     break;
  //   case `physicalSpecial`:
  //     title = data.activePlayer.name + ` special attacks !`
  //     result = data.targetPlayer.name + ` takes <span class="damage">`+ data.result +`</span> damage.`
  //     break;
  //   default:
  //       break;
  //     }
      
  // message = data.activePlayer.name + ` rolls a `+ data.roll + `.`
  // if (data.special === `critical`) special = `Critical !!!`
  // if (data.special === `fumble`) special = `Fumble !!!`

  const props = useSpring({opacity: 1, from: {opacity: 0}})

  // Display component
  // return (
  //   <animated.div style={props} className={itemClasses} onClick={()=>{}}>
  //     {title && <div className="title">{title}</div>}
  //     {message && <div className="message">{message}</div>}
  //     {special &&<div className="special">{special}</div>}
  //     {result && <div dangerouslySetInnerHTML={{ __html: result }} className="result" />}
  //   </animated.div>
  // )
  if (!log) log = "Your turn!"

  return (
    <animated.div style={props} className={itemClasses}>
      <div className="title">{log}</div>
    </animated.div>
  )
}

// Exporting as default
export default connect(mapStateToProps, mapDispatchToProps)(Logs)
