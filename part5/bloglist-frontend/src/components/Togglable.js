import React, { useState } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisible = () => setVisible(!visible)

  const ToggleButton = ({ label }) => (<button onClick={toggleVisible}>{label}</button>)

  return (
    <div>
      <div style={hideWhenVisible}>
        <ToggleButton label="new note" />
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <ToggleButton label="cancel" />
      </div>
    </div>

  )
}

export default Togglable