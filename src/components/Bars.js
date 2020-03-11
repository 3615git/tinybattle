import React from 'react'
import Bar from '../components/Bar'

/**
  * @desc description of the component
  * @todo Use a todo tag to store future changes
*/

const Bars = () => {
  
  // Display component
  return (
    <div className="barsWrapper">
      <div>
        <Bar type="hitPoints" />
        <Bar type="physicalRage" />
      </div>
      <div>
        <Bar type="magicPoints" />
        <Bar type="magicalRage" />
      </div>
    </div>
  )
}

// Exporting as default
export default Bars
