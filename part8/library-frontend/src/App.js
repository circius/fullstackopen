
import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [error, setError] = useState('')
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    client.resetStore()
  }

  useEffect(() => {
    setToken(window.localStorage.getItem('usrtoken'))
  }, [])

  return (
    <div>
      {error ? <span>{error}</span> : null}
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token ?
          <button onClick={() => setPage('login')}>login</button> :
          (<React.Fragment>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => logout()}>logout</button>
          </React.Fragment>)
        }

      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
        token={token}
      />
      <Login
        show={page === 'login'}
        setError={setError}
        setPage={setPage}
        setToken={setToken}
      />
      <NewBook
        show={page === 'add'}
      />
    </div>
  )
}

export default App