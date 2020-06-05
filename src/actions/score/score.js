/**
  * Score and global logs functions
*/

const addCounter = (data, scope, item, value) => {
  // Create score object if not existing
  if (!data.score) data.score = {
    alltime: {},
    game: {},
    run: {}
  }

  const folder = item.split('/');

  // Non recursive sad way =[
  switch (folder.length) {
    case 1:
      if (data.score[scope][folder[0]]) data.score[scope][folder[0]] += value
      else data.score[scope][folder[0]] = value
      break;
    case 2:
      if (!data.score[scope][folder[0]]) data.score[scope][folder[0]] = {}
      if (data.score[scope][folder[0]][folder[1]]) data.score[scope][folder[0]][folder[1]] += value
      else data.score[scope][folder[0]][folder[1]] = value
      break;
    case 3:
      if (!data.score[scope][folder[0]]) data.score[scope][folder[0]] = {}
      if (!data.score[scope][folder[0]][folder[1]]) data.score[scope][folder[0]][folder[1]] = {}
      if (data.score[scope][folder[0]][folder[1]][folder[2]]) data.score[scope][folder[0]][folder[1]][folder[2]] += value
      else data.score[scope][folder[0]][folder[1]][folder[2]] = value
      break;
    default:
      break;
  }
  return data
}

const score = (data, item, depth, value = 1) => {
  // Only works for player's actions
  if (data.game.playerTurn) {
  
    switch (depth) {
      case `run`:
        data = addCounter(data, `alltime`, item, value)
        data = addCounter(data, `game`, item, value)
        data = addCounter(data, `run`, item, value)
        break;

      case `game`:
        data = addCounter(data, `alltime`, item, value)
        data = addCounter(data, `game`, item, value)
        break;

      case `alltime`:
        data = addCounter(data, `alltime`, item, value)
        break;
    
      default:
        break;
    }

    return data
  } 
  else {
    return data
  }
}

export { score}
