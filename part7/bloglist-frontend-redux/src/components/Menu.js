import React from 'react'
import { Link } from 'react-router-dom'

import LogoutButton from './LogoutButton'

const UserGreeting = ({ user }) => (
  <span>Hello {user.username}
    <LogoutButton /></span>
)

const Menu = ({ user }) => {
  const padding = { padding: '2em' }
  const menuStyle = { 'background-color': '#dddddd', padding: '5px' }
  return (
    <nav id="menu" style={menuStyle}>
      <Link style={padding} to="/">bloglist</Link>
      <Link style={padding} to="/users">users</Link>
      { user && <UserGreeting user={user} />}
    </nav>
  )
}

export default Menu