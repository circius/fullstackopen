import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {name:'Fundamentals of React',
    exnum:10
  },
    {name:"Using props to pass data",
    exnum:7
  },
    {name:"State of a component",
    exnum:14
  }
  ]

  const Header = (props) => {
    return (
      <h1>{props.course}</h1>
    )
  }

  const Content = (props) => {
    const Part = (props) => {
      const { part } = props;
      return (
        <p> {part.name} {part.exnum} </p>
      )
    }
    const {parts} = props
    return (
      <>
      {parts.map((part) => <Part part={part} />)}
      </>
    )
  }

  const Total = (props) => {
    const {parts} = props
    const total = parts.reduce((acc, part) => acc + part.exnum, 0)
    return (
      <p>Number of exercises {total}</p>
    )
  }

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))