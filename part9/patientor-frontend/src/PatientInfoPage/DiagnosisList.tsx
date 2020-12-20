import React from 'react'
import { List } from 'semantic-ui-react'
import DiagnosisListItem from './DiagnosisListItem'

const DiagnosisList: React.FC<{ codes: string[] }> = ({ codes }) => (
    <List>
        {codes.map(code => <DiagnosisListItem code={code} />)}
    </List>
)

export default DiagnosisList