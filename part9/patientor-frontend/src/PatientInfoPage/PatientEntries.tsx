import React from 'react';
import { Card } from 'semantic-ui-react';
import { Entry } from '../types';

import PatientEntry from './PatientEntry'

const PatientEntries: React.FC<{ entries: Entry[] }> = ({ entries }) => {

    return (
        <div>
            <h3>entries</h3>
            <Card.Group>
                {entries.map(entry => <PatientEntry entry={entry} />)}
            </Card.Group>
        </div>
    )
};

export default PatientEntries;