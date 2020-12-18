import React from "react";
import ReactDOM from "react-dom";

import { CoursePart } from './types'

import Header from './components/header'
import CourseParts from './components/courseparts'
import ExerciseSum from './components/exercisesum'

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
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