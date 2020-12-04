import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {

  const feedbackDispatch = type => () => {
    store.dispatch({
      type: type
    })
  }

  const [good, ok, bad, zero] = ['GOOD', 'OK', 'BAD', 'ZERO'].map(
    action => feedbackDispatch(action)
  )

  const Button = ({ label, onClick }) => (
    <button onClick={onClick}>{label}</button>
  )

  const Stat = ({ stat }) => (
    <div>{stat} : {store.getState()[stat]} </div>
  )

  return (
    <div>
      <Button onClick={good} label='good' />
      <Button onClick={ok} label='ok' />
      <Button onClick={bad} label='bad' />
      <Button onClick={zero} label='reset stats' />
      <Stat stat='good' />
      <Stat stat='ok' />
      <Stat stat='bad' />
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
