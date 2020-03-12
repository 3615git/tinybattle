import React from 'react'
import { connect } from "react-redux"
import { useSpring, animated } from 'react-spring'

import Bar from './Bar'
import Stats from './Stats'

/**
  * @desc description of the component
  * @todo Use a todo tag to store future changes
*/

const mapStateToProps = state => {
  return { 
    data: state.opponent,
    turn: !state.playerTurn
  }
}

const Opponent = ({ data, turn }) => {

  // Component styling
  const defaultClasses = `opponentWrapper`
  const turnClasses = turn ? `turn` : ``
  // Add custom classes to defined classes
  const itemClasses = [defaultClasses, turnClasses].filter(val => val).join(` `)

  // Spring test
  const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1]
  const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`
  const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))

  // Display component
  return (
    <div className={itemClasses}>
      <div className="infos">
        <animated.div
          class="portrait"
          onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
          onMouseLeave={() => set({ xys: [0, 0, 1] })}
          style={{ transform: props.xys.interpolate(trans) }}
        />
        <div className="name">{data.name}</div>
        <div className="job">{data.job}</div>
      </div>
      <Stats opponent />
      <Bar opponent type="hitPoints" />
    </div>
  )
}

export default connect(mapStateToProps)(Opponent)
