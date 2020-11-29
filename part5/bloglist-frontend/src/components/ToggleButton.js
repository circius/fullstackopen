import React from 'react'

const ToggleButton = ({ label, toggleFunction }) => (<button onClick={toggleFunction}>{label}</button>)

export default ToggleButton