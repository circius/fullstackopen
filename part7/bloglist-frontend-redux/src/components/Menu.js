import React from 'react'
import { Link } from 'react-router-dom'

import LogoutButton from './LogoutButton'

const UserGreeting = ({ user }) => (
  <span>Hello {user.username}
    <LogoutButton /></span>
)

const Menu = ({ user }) => {
  const padding = { padding: '2em' }
  return (
    <div id="menu">
      <Link style={padding} to="/">bloglist</Link>
      <Link style={padding} to="/users">users</Link>
      { user && <UserGreeting user={user} />}
    </div>
  )
}

export default Menu