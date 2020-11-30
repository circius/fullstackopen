import React from 'react'
import PropTypes from 'prop-types'

const ToggleButton = ({ label, toggleFunction }) => (<button onClick={toggleFunction}>{label}</button>)

ToggleButton.propTypes = {
  label: PropTypes.string.isRequired,
  toggleFunction: PropTypes.func.isRequired
}

export default ToggleButton