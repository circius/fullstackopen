import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { initUsers } from '../reducers/usersReducer'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => { dispatch(initUsers()) }, [dispatch])

  const UserRow = ({ user }) => (
    <tr>
      <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
      <td>{user.blogs.length}</td>
    </tr>
  )

  const UserInfo = ({ users }) => (
    <Table striped hover size="sm">
      <tr>
        <th></th>
        <th>blogs created</th>
      </tr>
      {users.map(user => <UserRow user={user} />)}
    </Table>
  )

  return (
    <div>
      <h3>users</h3>
      {users && <UserInfo users={users} />}
    </div>
  )
}

export default Users