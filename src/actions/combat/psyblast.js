import { pushBuff } from './stats'
import { formatDataLog } from '../../utils/utils'
import { skillWheelRoll } from '../../actions/combat/hit'

/**
  * @desc Computing the results of psyblast skill
*/

const psyblast = (data) => {
  let { player, opponent, game } = data

  let activePlayer = game.playerTurn ? {...player} : {...opponent}
  let targetPlayer = game.playerTurn ? {...opponent} : {...player}

  // Psychic blast can reduce opponent MAG to a super low value for 2 turns
  const hit = skillWheelRoll()
  let MAGmalus

  switch (hit.result) {
    case `success`:
      MAGmalus = -Math.abs(Math.ceil(targetPlayer.MAG))
      pushBuff(targetPlayer, `temporary`, `MAG`, MAGmalus, `psyblast`, 4)
      break;
    case `critical`:
      MAGmalus = -Math.abs(Math.ceil(targetPlayer.MAG * 2))
      pushBuff(targetPlayer, `temporary`, `MAG`, MAGmalus, `psyblast`, 4)
      break;
    case `fumble`:
      MAGmalus = -Math.abs(Math.ceil(activePlayer.MAG / 2))
      pushBuff(activePlayer, `temporary`, `MAG`, MAGmalus, `psyblast`, 2)
      break;
  
    default:
      break;
  }

  // Reset skill energy
  activePlayer.skills.psyblast.current = 0

  // Build log
  let log = {
    type: `psyblast`,
    delay: `long`,
    activePlayer,
    targetPlayer,
    data: {
      hit: hit.result,
      wheelPosition: hit.position,
      magMalus: MAGmalus
    }
  }
  log.display = formatDataLog(`psyblast`, log, game)

  // Apply changes
  data.player = game.playerTurn ? activePlayer : targetPlayer
  data.opponent = !game.playerTurn ? activePlayer : targetPlayer
  data.log = log
  data.dataLogs.push(formatDataLog(`psyblast`, log, game))

  return data 
}

export { psyblast }
