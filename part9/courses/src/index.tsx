import React from "react";
import ReactDOM from "react-dom";

import Header from './components/header'
import CourseParts from './components/courseparts'
import ExerciseSum from './components/exercisesum'

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <CourseParts courseParts={courseParts} />
      <ExerciseSum courseParts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));