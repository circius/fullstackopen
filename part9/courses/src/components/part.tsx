import React from 'react'
import { CoursePart } from '../types'
import { assertNever } from '../helpers'



const Part: React.FC<{ coursePart: CoursePart }> = ({ coursePart }) => {
    switch (coursePart.name) {
        case "Fundamentals":
            return (
                <ul>
                    <li>{coursePart.name}</li>
                    <li>exercises: {coursePart.exerciseCount}</li>
                    <li>{coursePart.description}</li>
                </ul>
            )
        case "Using props to pass data":
            return (
                <ul>
                    <li>{coursePart.name}</li>
                    <li>exercises: {coursePart.exerciseCount}</li>
                    <li>group projects: {coursePart.groupProjectCount}</li>
                </ul>
            )
        case "Deeper type usage":
            return (
                <ul>
                    <li>{coursePart.name}</li>
                    <li>exercises: {coursePart.exerciseCount}</li>
                    <li>{coursePart.description}</li>
                    <li>{coursePart.exerciseSubmissionLink}</li>
                </ul>
            )
        default:
            return assertNever(coursePart)

    }
}

export default Part