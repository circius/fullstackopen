import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
  const padding = { padding: '2em' }
  return (
    <div id="menu">
      <Link style={padding} to="/">bloglist</Link>
      <Link style={padding} to="/users">users</Link>
    </div>
  )
}

export default Menu