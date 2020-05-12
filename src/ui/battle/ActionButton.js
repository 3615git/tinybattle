import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"

import { gameSettings } from "../../conf/settings"
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
    opponent: state.opponent
  }
}

function mapDispatchToProps(dispatch) {
  return {
    attack: payload => dispatch(attack(payload))
  }
}

const ActionButton = ({ type, player, opponent, attack }) => {

  // Component styling
  let onClick, icon, buttonClass, note, bar

  // // Compute special actions
  let specialPhysicalReady = player.physicalRage === player.maxPhysicalRage
  let specialMagicalReady = player.magicalRage === player.maxMagicalRage
  let castReady = player.magicPoints >= player.weapons.MAG.cost
  let attackReady = player.stamina >= player.weapons.STR.cost

  // Placeholder function for not ready actions
  function notready() {}

  // let hitRatio
  let physicalHitRatio = limitValue(hitChance(toHit(player, opponent, `physical`)), 0, 100)
  let magicalHitRatio = limitValue(hitChance(toHit(player, opponent, `magical`)), 0, 100)

  // Switch different buttons
  switch (type) {
    case `block`:
      onClick = () => attack({ type: `physical`, mode: `defend` })
      icon = <ItemVisual item={gameSettings.icons.block[0]} level={gameSettings.icons.block[1]} />
      buttonClass = "physical block"
      break;
    case `focus`:
      onClick = () => attack({ type: `magical`, mode: `defend` })
      icon = <ItemVisual item={gameSettings.icons.focus[0]} level={gameSettings.icons.focus[1]} />
      buttonClass = "magical block"
      break;
    case `attack`:
      onClick = attackReady ? () => attack({ type: `physical`, mode: `attack` }) : notready
      icon = <ItemVisual item={player.weapons.STR.type} level={player.weapons.STR.id} />
      note = <span className="note">{physicalHitRatio}%</span>
      bar = <Bar type={"stamina"} />
      buttonClass = attackReady ? `physical attack` : `physical attack disabled`
      break;
    case `specialattack`:
      onClick = specialPhysicalReady ? () => attack({ type: `physical`, mode: `special` }) : notready
      icon = <ItemVisual item={gameSettings.icons.specialattack[0]} level={gameSettings.icons.specialattack[1]} />
      bar = <Bar type={"physicalRage"} />
      buttonClass = specialPhysicalReady ? `physical special` : `physical special disabled`
      break;
    case `stun`:
      onClick = notready
      icon = <ItemVisual item={gameSettings.icons.stun[0]} level={gameSettings.icons.stun[1]} />
      buttonClass = "physical stun"
      break;
    case `break`:
      onClick = notready
      icon = <ItemVisual item={gameSettings.icons.break[0]} level={gameSettings.icons.break[1]} />
      buttonClass = "physical break"
      break;
    case `cast`:
      onClick = castReady ? () => attack({ type: `magical`, mode: `attack` }) : notready
      icon = <ItemVisual item={player.weapons.MAG.type} level={player.weapons.MAG.id} />
      note = <span className="note">{magicalHitRatio}%</span>
      bar = <Bar type={"magicPoints"} />
      buttonClass = castReady ? `magical attack` : `magical attack disabled`
      break;
    case `specialcast`:
      onClick = specialMagicalReady ? () => attack({ type: `magical`, mode: `special` }) : notready
      icon = <ItemVisual item={gameSettings.icons.specialcast[0]} level={gameSettings.icons.specialcast[1]} />
      bar = <Bar type={"magicalRage"} />
      buttonClass = specialMagicalReady ? `magical special` : `magical special disabled`
      break;
    case `psyblast`:
      onClick = notready
      icon = <ItemVisual item={gameSettings.icons.psyblast[0]} level={gameSettings.icons.psyblast[1]} />
      buttonClass = "magical psyblast"
      break;
    case `curse`:
      onClick = notready
      icon = <ItemVisual item={gameSettings.icons.curse[0]} level={gameSettings.icons.curse[1]} />
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
