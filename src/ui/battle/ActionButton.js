import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"

import { attack } from '../../redux/actions/index'
import Bar from './Bar'
import ItemVisual from './ItemVisual'
import { toHit, hitChance } from '../../actions/combat/hit'
import { limitValue } from '../../utils/utils'

/**
  * @desc Action buttons
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

const ActionButton = ({ type, player, opponent, turn, attack }) => {

  // Component styling
  let onClick, icon, buttonClass, note, bar

  // // Compute special actions
  let specialPhysicalReady = player.physicalRage === player.maxPhysicalRage
  let specialMagicalReady = player.magicalRage === player.maxMagicalRage
  let magicalAttackReady = player.magicPoints >= player.weapons.MAG.cost
  let physicalAttackReady = player.stamina >= player.weapons.STR.cost

  // Placeholder function for not ready actions
  function notready() {}

  // let hitRatio
  let physicalHitRatio = limitValue(hitChance(toHit(player, opponent, `physical`)), 0, 100)
  let magicalHitRatio = limitValue(hitChance(toHit(player, opponent, `magical`)), 0, 100)

  // Switch different buttons
  switch (type) {
    case `block`:
      onClick = () => attack({ type: `physical`, mode: `defend` })
      icon = <ItemVisual item="skill" level={7} />
      buttonClass = "physical block"
      break;
    case `focus`:
      onClick = () => attack({ type: `magical`, mode: `defend` })
      icon = <ItemVisual item="skill" level={3} />
      buttonClass = "magical block"
      break;
    case `attack`:
      onClick = physicalAttackReady ? () => attack({ type: `physical`, mode: `attack` }) : notready
      icon = <ItemVisual item={player.weapons.STR.type} level={player.weapons.STR.id} />
      note = <span className="note">{physicalHitRatio}%</span>
      bar = <Bar type={"stamina"} />
      buttonClass = physicalAttackReady ? `physical attack` : `physical attack disabled`
      break;
    case `specialattack`:
      onClick = specialPhysicalReady ? () => attack({ type: `physical`, mode: `special` }) : notready
      icon = <ItemVisual item="skill" level={4} />
      bar = <Bar type={"physicalRage"} />
      buttonClass = specialPhysicalReady ? `physical special` : `physical special disabled`
      break;
    case `stun`:
      onClick = notready
      icon = <ItemVisual item="skill" level={8} />
      buttonClass = "physical stun"
      break;
    case `break`:
      onClick = notready
      icon = <ItemVisual item="skill" level={6} />
      buttonClass = "physical break"
      break;
    case `cast`:
      onClick = magicalAttackReady ? () => attack({ type: `magical`, mode: `attack` }) : notready
      icon = <ItemVisual item={player.weapons.MAG.type} level={player.weapons.MAG.id} />
      note = <span className="note">{magicalHitRatio}%</span>
      bar = <Bar type={"magicPoints"} />
      buttonClass = magicalAttackReady ? `magical attack` : `magical attack disabled`
      break;
    case `specialcast`:
      onClick = specialMagicalReady ? () => attack({ type: `magical`, mode: `special` }) : notready
      icon = <ItemVisual item="skill" level={1} />
      bar = <Bar type={"magicalRage"} />
      buttonClass = specialMagicalReady ? `magical special` : `magical special disabled`
      break;
    case `psyblast`:
      onClick = notready
      icon = <ItemVisual item="skill" level={5} />
      buttonClass = "magical psyblast"
      break;
    case `curse`:
      onClick = notready
      icon = <ItemVisual item="skill" level={2} />
      buttonClass = "magical curse"
      break;
  
    default:
      break;
  }
  
  // Display component
  return (
    <button className={buttonClass} onClick={onClick}>
      {note}
      {icon}
      {bar}
    </button>
  )
}

// Applying propTypes definition and default values
ActionButton.propTypes = propTypes
ActionButton.defaultProps = defaultProps

// Exporting as default
export default connect(mapStateToProps, mapDispatchToProps)(ActionButton)
