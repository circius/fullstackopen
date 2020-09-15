import React from 'react'

import Header from "./Header.js"
import Content from "./Content.js"
import Total from './Total'

const Course = ({ course }) => {
    const totalParts = course.parts.reduce(
        (total) => total + 1, 0
    )
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total number={totalParts} />
        </div>
    )
}

export default Course