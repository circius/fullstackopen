import React from 'react'
import { Form, Button } from 'react-bootstrap'

import { useField } from '../hooks/useField'
import loginService from '../services/login'
import { warn } from '../reducers/warnReducer'


const Login = ({ doLogin }) => {
  const username = useField()
  const password = useField()

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value, password: password.value
      })

      doLogin(user)

    } catch (exception) {
      warn('login failed...')
      console.log('exception:', exception)
      console.log('failed login!');
    }
  }


  return (

    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Control
          {...username} placeholder="username"
        />
      </Form.Group>
      <Form.Group>

        <Form.Control
          {...password} placeholder="password"
        />
      </Form.Group>
      <Button variant="outline-primary" type="submit" id="submit">login</Button>
    </Form>
  )
}

export default Login