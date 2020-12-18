import React from 'react'
import { Course } from '../types'

const ExerciseSum: React.FC<{ courseParts: Array<Course> }> = ({ courseParts }) => {
    const sum = courseParts.reduce((acc, cur) => acc + cur.exerciseCount, 0)

    return (
        <p>
            Number of exercises {sum}
        </p>
    )
}

export default ExerciseSum