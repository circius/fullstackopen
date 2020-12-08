import React from 'react'
import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'

import LogoutButton from './LogoutButton'

const UserGreeting = ({ user }) => (
  <span>Hello {user.username}
    <LogoutButton /></span>
)

const Menu = ({ user }) => (
  <nav className="nav">
    <Nav.Item className="nav-link"><Link to="/">bloglist</Link></Nav.Item>
    <Nav.Item className="nav-link" ><Link to="/users">users</Link></Nav.Item>
    <Nav.Item className="nav-link" >{user && <UserGreeting user={user} />}</Nav.Item>
  </nav>
)

export default Menu