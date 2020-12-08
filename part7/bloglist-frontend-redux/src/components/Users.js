import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initUsers } from '../reducers/usersReducer'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  const currentUser = useSelector(state => state.currentUser)

  useEffect(() => { dispatch(initUsers()) }, [])

  const UserRow = ({ user }) => (
    <tr>
      <td>{user.name}</td>
      <td>{user.blogs.length}</td>
    </tr>
  )

  const UserInfo = ({ users }) => (
    <table>
      <tr>
        <th></th>
        <th>blogs created</th>
      </tr>
      {users.map(user => <UserRow user={user} />)}
    </table>
  )

  return (
    <div>
      <h2>users</h2>
      {users && <UserInfo users={users} />}
    </div>
  )
}

export default Users