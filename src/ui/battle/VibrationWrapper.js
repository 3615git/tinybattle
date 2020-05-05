import React from 'react'

const VibrationWrapper = ({ condition, wrapper, children }) => condition ? 
  <div className="vibrationWrapper animation-rumble">
    {children}
  </div> 
  : <div className="vibrationWrapper">{children}</div>

export default VibrationWrapper
