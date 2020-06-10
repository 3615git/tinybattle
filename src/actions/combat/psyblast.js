import { pushBuff } from './stats'
import { formatDataLog } from '../../utils/formatDataLog'
import { skillWheelRoll } from '../../actions/combat/hit'
import { score } from '../../actions/score/score'
import { getStat } from './stats'

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
  const activePlayerMAG = getStat(activePlayer, `MAG`)
  const targetPlayerMAG = getStat(targetPlayer, `MAG`)

  switch (hit.result) {
    case `success`:
      MAGmalus = -Math.abs(Math.ceil(targetPlayerMAG.total))
      pushBuff(targetPlayer, `temporary`, `MAG`, MAGmalus, `psyblast`, 4)
      // Score
      data = score(data, `action/psyblast/success`, `game`)
      break;
    case `critical`:
      MAGmalus = -Math.abs(Math.ceil(targetPlayerMAG.total * 2))
      pushBuff(targetPlayer, `temporary`, `MAG`, MAGmalus, `psyblast`, 4)
      // Score
      data = score(data, `action/psyblast/critical`, `game`)
      break;
    case `fumble`:
      MAGmalus = -Math.abs(Math.ceil(activePlayerMAG.total / 2))
      pushBuff(activePlayer, `temporary`, `MAG`, MAGmalus, `psyblast`, 2)
      // Score
      data = score(data, `action/psyblast/fumble`, `game`)
      break;
  
    default:
      break;
  }

  // Reset skill energy
  activePlayer.skills.psyblast.current = 0

  // Score
  data = score(data, `action/psyblast/total`, `game`)

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
