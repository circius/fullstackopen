const React = require('react')
const { useMutation } = require("@apollo/client")

const { useField } = require('../hooks/useField')
const { LOGIN } = require("../mutations")
const { useEffect } = require('react')

const Login = ({ setToken, setPage, setError, show }) => {
  const usr = useField('text')
  const pw = useField('password')

  const [login, result] = useMutation(LOGIN, {
    onError: error => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('usrtoken', token)
    }
  }, [result.data])

  const doLogin = async e => {
    e.preventDefault()
    login({
      variables: { username: usr.value, password: pw.value }
    })
    setPage('authors')
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={doLogin}>
        usr <input {...usr} />
        pw <input {...pw} />
        <button>login</button>
      </form>
    </div>
  )
}

module.exports = Login