import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({})

  const getVotes = (selected) => isNaN(votes[selected]) ? 0 : votes[selected]

  const numAnecdotes = anecdotes.length
  const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max))
  const nextAnecdote = () => setSelected(getRandomInt(numAnecdotes))

  const getMostVoted = () => {
    const mostVoted = Object.keys(votes).reduce(
      (acc, key) => votes[key] > votes[acc] ? key : acc, 0)
    return getVotes(mostVoted) === 0 ? false : mostVoted
  }
  const mostVoted = getMostVoted(anecdotes)

  const upvote = () => {
    const nextVotecount = getVotes(selected) + 1
    let newVotes = { ...votes }
    newVotes[selected] = nextVotecount
    setVotes(newVotes)
    return newVotes
  }
  console.log(mostVoted, votes[mostVoted])
  return (
    <div>
      <Anecdote
        title="Anecdote of the day"
        anecdote={anecdotes[selected]}
        votes={getVotes(selected)} />

      <Button label="vote" clickHandler={upvote} />
      <Button label="next anecdote" clickHandler={nextAnecdote} />
      {mostVoted === false ?
        <Notice message="please vote please" /> :
        <Anecdote
          title="Anecdote with most votes"
          anecdote={anecdotes[mostVoted]}
          votes={votes[mostVoted]}
        />}
    </div>
  )
}

const Notice = ({ message }) => (
  <div>
    <h2>{message}</h2>
  </div>
)

const Anecdote = ({ title, anecdote, votes }) => (
  <div>
    <h1>{title}</h1>
    <span>{anecdote}</span>
    <Votes number={votes} />
  </div>
)

const Votes = ({ number }) => <div>has {number} votes.</div>

const Button = ({ label, clickHandler }) => (
  <button onClick={clickHandler}>{label}</button>
)

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
