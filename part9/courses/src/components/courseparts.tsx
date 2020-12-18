import React from 'react'
import { CoursePart } from '../types'
import Part from './part'



const CourseParts: React.FC<{ courseParts: Array<CoursePart> }> = ({ courseParts }) => (
    <div>
        { courseParts.map((coursePart, idx) => <Part key={idx} coursePart={coursePart} />)}
    </div>
)

export default CourseParts