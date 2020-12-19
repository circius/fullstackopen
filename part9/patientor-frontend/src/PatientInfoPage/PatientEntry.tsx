import React from 'react';
import { List } from 'semantic-ui-react';
import { Entry } from '../types';

import Diagnosis from './Diagnosis'

const PatientEntry: React.FC<{ entry: Entry }> = ({ entry }) => {

    return (
        <List.Item>
            {entry.description}
            <List>
                {entry.diagnosisCodes?.map(code => <Diagnosis code={code} />)}
            </List>
        </List.Item>
    )
};

export default PatientEntry;