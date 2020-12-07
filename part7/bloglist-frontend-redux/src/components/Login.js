import React, { useState } from 'react'

import loginService from '../services/login'
import { warn } from '../reducers/warnReducer'


const Login = ({ doLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      doLogin(user)

    } catch (exception) {
      warn('login failed...')
      console.log('exception:', exception)
      console.log('failed login!');
    }
  }


  return (

    <form onSubmit={handleLogin}>
      <div>
        username
      <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
  <input
          id="password"
          type="text"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="submit">login</button>
    </form>
  )
}

export default Login