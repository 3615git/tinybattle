import React from 'react'
import PropTypes from 'prop-types'

/**
  * @desc description of the component
  * @todo Use a todo tag to store future changes
*/

const propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  turn: PropTypes.bool.isRequired,
  actions: PropTypes.func.isRequired
}

const defaultProps = {}

const Action = ({ type, data, turn, actions }) => {

  // Component styling
  const defaultClasses = `buttons`
  const turnClasses = turn ? `turn` : ``
  // Add custom classes to defined classes
  const itemClasses = [defaultClasses, turnClasses].filter(val => val).join(` `)

  // Compute special actions
  let specialPhysical = data.physicalRage === data.maxPhysicalRage
  let specialMagical = data.magicalRage === data.maxMagicalRage

  // Wordings
  let w_Defend, w_Attack, w_Special
  let buttonAttack, buttonDefend, buttonSpecial
  let actionAttack, actionDefend, actionSpecial

  if (type === `physical`) {
    w_Defend = `Defend`
    w_Attack = `Attack`
    w_Special = `Special`
    buttonDefend = type +" defend"
    buttonAttack = type +" attack"
    buttonSpecial = specialPhysical ? type +" special" : type +" special disabled"
    actionAttack = () => actions(`physicalAttack`)
    actionDefend = () => actions(`physicalDefend`)
    actionSpecial = specialPhysical ? () => actions(`physicalSpecial`) : null
  } 
  else {
    w_Defend = `Focus`
    w_Attack = `Cast`
    w_Special = `Special`
    buttonDefend = type +" defend"
    buttonAttack = type +" attack"
    buttonSpecial = specialMagical ? type +" special" : type +" special disabled"
    actionAttack = () => actions(`magicalAttack`)
    actionDefend = () => actions(`magicalDefend`)
    actionSpecial = specialPhysical ? () => actions(`magicalSpecial`) : null
  }

  // Display component
  return (
    <div className={itemClasses}>
      <button className={buttonDefend} onClick={actionDefend}>{w_Defend}</button>
      <button className={buttonAttack} onClick={actionAttack}>{w_Attack}</button>
      <button className={buttonSpecial} onClick={actionSpecial}>{w_Special}</button>
    </div>
  )
}

// Applying propTypes definition and default values
Action.propTypes = propTypes
Action.defaultProps = defaultProps

// Exporting as default
export default Action
