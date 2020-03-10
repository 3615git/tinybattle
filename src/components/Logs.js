import React from 'react'
import PropTypes from 'prop-types'
import {useSpring, animated} from 'react-spring'

/**
  * @desc description of the component
  * @todo Use a todo tag to store future changes
*/

const propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func
}

const defaultProps = {}

const Logs = ({ data, onClick }) => {

  // Component styling
  const defaultClasses = `LogsWrapper`
  // Add custom classes to defined classes
  const itemClasses = [defaultClasses].filter(val => val).join(` `)

  // Build log message
  let title, message, special, result
  
  switch (data.action) {
    case `physicalAttack`:
      title = data.activePlayer.name + ` attacks !`
      result = data.targetPlayer.name + ` takes <span class="damage">`+ data.result +`</span> damage.`
      break;
    case `physicalSpecial`:
      title = data.activePlayer.name + ` special attacks !`
      result = data.targetPlayer.name + ` takes <span class="damage">`+ data.result +`</span> damage.`
      break;
    default:
        break;
      }
      
  message = data.activePlayer.name + ` rolls a `+ data.roll + `.`
  if (data.special === `critical`) special = `Critical !!!`
  if (data.special === `fumble`) special = `Fumble !!!`

  const props = useSpring({opacity: 1, from: {opacity: 0}})

  // Display component
  // https://www.react-spring.io/docs/hooks/basics
  return (
    <animated.div style={props} className={itemClasses} onClick={()=>onClick()}>
      {title && <div className="title">{title}</div>}
      {message && <div className="message">{message}</div>}
      {special &&<div className="special">{special}</div>}
      {result && <div dangerouslySetInnerHTML={{ __html: result }} className="result" />}
    </animated.div>
  )
}

// Applying propTypes definition and default values
Logs.propTypes = propTypes
Logs.defaultProps = defaultProps

// Exporting as default
export default Logs
