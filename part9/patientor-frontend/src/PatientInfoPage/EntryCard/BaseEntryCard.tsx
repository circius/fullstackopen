import React from 'react'
import { Card } from 'semantic-ui-react'
import { Entry } from '../../types'
import DiagnosisList from '../DiagnosisList'


const BaseEntryCard: React.FC<{ entry: Entry, metaString: string, icon: React.ReactNode }> = (props) => (
    <Card fluid >
        <Card.Header> {props.entry.date} {props.icon} </Card.Header>
        <Card.Meta>{props.metaString}</Card.Meta>
        <Card.Content>{props.entry.description}</Card.Content>
        { props.entry.diagnosisCodes && (
            <Card.Content>
                <DiagnosisList codes={props.entry.diagnosisCodes} />
            </Card.Content>
        )}
        { props.children ?
            <Card.Content>
                {props.children}
            </Card.Content>
            : null}
    </Card>)

export default BaseEntryCard