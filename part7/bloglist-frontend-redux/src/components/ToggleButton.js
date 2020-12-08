import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const ToggleButton = ({ label, toggleFunction }) => (
  <Button variant="outline-primary" onClick={toggleFunction}>{label}</Button>)

ToggleButton.propTypes = {
  label: PropTypes.string.isRequired,
  toggleFunction: PropTypes.func.isRequired,
}

export default ToggleButton