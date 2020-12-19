import React from 'react';
import { List } from 'semantic-ui-react';
import { Entry } from '../types';

import PatientEntry from './PatientEntry'

const PatientEntries: React.FC<{ entries: Entry[] }> = ({ entries }) => {

    return (
        <div>
            <h3>entries</h3>
            <List>
                {entries.map(entry => <PatientEntry entry={entry} />)}
            </List>

        </div>
    )
};

export default PatientEntries;