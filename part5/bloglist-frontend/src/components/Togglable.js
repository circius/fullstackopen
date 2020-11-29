import React, { useState } from 'react'

import ToggleButton from './ToggleButton'


const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisible = () => setVisible(!visible)

  return (
    <div>
      <div style={hideWhenVisible}>
        <ToggleButton label="new note" toggleFunction={toggleVisible} />
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <ToggleButton label="cancel" toggleFunction={toggleVisible} />
      </div>
    </div>

  )
}

export default Togglable