import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)

  const incrementers = {
    'good': incrementGood,
    'neutral': incrementNeutral,
    'bad': incrementBad
  }
  const getters = {
    'good': good,
    'neutral': neutral,
    'bad': bad
  }

  return (
    <div>
      <Feedback incrementers={incrementers} />
      <Results getters={getters} />
    </div>
  )
}

const Feedback = ({ incrementers }) => (
  <div>
    <h1>give feedback</h1>
    {Object.keys(incrementers).map(
      (incKey, idx) => (
        <Button label={incKey} clickHandler={incrementers[incKey]} key={idx} />))
    }
  </div>
)

const Button = ({ label, clickHandler }) => (
  <button onClick={clickHandler}> {label} </button>
)

const Results = ({ getters }) => {
  const gettersGetFeedbackNum = (getters) => Object.keys(getters).reduce(
    (acc, curKey) => acc + getters[curKey], 0)

  const gettersGetFeedbackAverage = (getters) => {
    const feedbackNum = gettersGetFeedbackNum(getters)
    const feedbackTotal = gettersGetFeedbackTotal(getters)
    return feedbackNum === 0 ? 0 : feedbackTotal / feedbackNum
  }

  const gettersGetFeedbackTotal = (getters) => getters['good'] - getters['bad']

  const gettersGetPercentagePositive = (getters) => (
    (getters['good'] / gettersGetFeedbackNum(getters) * 100)
  )

  const statsForDisplay = {
    ...getters,
    'all': gettersGetFeedbackNum(getters),
    'average': gettersGetFeedbackAverage(getters),
    'positive': gettersGetPercentagePositive(getters)
  }

  const content = gettersGetFeedbackNum(getters) === 0 ?
    "No feedback given" :
    (<>
      <table>
        <tbody>
          {Object.keys(statsForDisplay).map(
            (statKey) => (
              <Stat label={statKey} key={statKey} value={statsForDisplay[statKey]} />))}
        </tbody>
      </table>
    </>)

  return (<div>
    <h1>statistics</h1>
    {content}
  </div>)
}

const Stat = ({ label, value }) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  )
}



ReactDOM.render(<App />,
  document.getElementById('root')
)