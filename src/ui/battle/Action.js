import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"

import { attack } from '../../redux/actions/index'
import Bar from './Bar'
import ItemVisual from './ItemVisual'
import { toHit, hitChance } from '../../actions/combat/hit'
import { limitValue } from '../../utils/utils'

/**
  * @desc description of the component
  * @todo Use a todo tag to store future changes
*/

const propTypes = {
  type: PropTypes.string.isRequired
}

const defaultProps = {}

const mapStateToProps = state => {
  return {
    player: state.player,
    opponent: state.opponent,
    turn: state.game.playerTurn
  }
}

function mapDispatchToProps(dispatch) {
  return {
    attack: payload => dispatch(attack(payload))
  }
}

const Action = ({ type, player, opponent, turn, attack }) => {

  // Component styling
  const defaultClasses = `buttons`
  const turnClasses = turn ? `turn` : ``
  // Add custom classes to defined classes
  const itemClasses = [defaultClasses, turnClasses].filter(val => val).join(` `)

  // Compute special actions
  let specialPhysical = player.physicalRage === player.maxPhysicalRage
  let specialMagical = player.magicalRage === player.maxMagicalRage
  let attackMagical = player.magicPoints >= player.weapons.MAG.cost
  let attackPhysical = player.stamina >= player.weapons.STR.cost

  // Wordings
  let w_Defend, w_Special, w_Attack
  let buttonAttack, actionAttack, buttonSpecial, actionSpecial, weapon

  function notready() {}

  let hitRatio
  let physicalHitChance = hitChance(toHit(player, opponent, `physical`))
  let magicalHitChance = hitChance(toHit(player, opponent, `magical`))


  if (type === `physical`) {
    w_Defend = <ItemVisual item="skill" level={7} />
    w_Special = <ItemVisual item="skill" level={4} />
    w_Attack = `Attack`

    buttonAttack = attackPhysical ? type + " attack" : type + " attack disabled"
    actionAttack = attackPhysical ? attack : notready
    buttonSpecial = specialPhysical ? type + " special" : type + " special disabled"
    actionSpecial = specialPhysical ? attack : notready

    hitRatio = physicalHitChance

    weapon = <ItemVisual item={player.weapons.STR.type} level={player.weapons.STR.id} />
  } 
  else {
    w_Defend = <ItemVisual item="skill" level={3} />
    w_Special = <ItemVisual item="skill" level={1} />
    w_Attack = `Spell`

    buttonAttack = attackMagical ? type + " attack" : type + " attack disabled"
    actionAttack = attackMagical ? attack : notready
    buttonSpecial = specialMagical ? type +" special" : type +" special disabled"
    actionSpecial = specialMagical ? attack : notready

    hitRatio = limitValue(magicalHitChance, 0, 100)

    weapon = <ItemVisual item={player.weapons.MAG.type} level={player.weapons.MAG.id} />
  }

  // Display component
  return (
    <div className={itemClasses}>
      <button className={type + " defend"} onClick={() => attack({ type: type, mode: `defend` })}>
        {w_Defend}
      </button>
      <button className={buttonAttack} onClick={() => actionAttack({ type: type, mode: `attack` })}>
        <span className="note">{hitRatio}%</span>
        {/* {w_Attack} */}
        {weapon}
        <Bar type={type === `physical` ? "stamina" : "magicPoints"} />
      </button>
      <button className={buttonSpecial} onClick={() => actionSpecial({ type: type, mode: `special` })}>
        {w_Special}
        <Bar type={type === `physical` ? "physicalRage" : "magicalRage"} />
      </button>
    </div>
  )
}

// Applying propTypes definition and default values
Action.propTypes = propTypes
Action.defaultProps = defaultProps

// Exporting as default
export default connect(mapStateToProps, mapDispatchToProps)(Action)
