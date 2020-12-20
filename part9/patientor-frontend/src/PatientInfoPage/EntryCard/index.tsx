import React from 'react';
import { Entry } from '../../types'
import { assertNever } from '../../helpers'

import { HospitalEntryCard, HealthCheckEntryCard, OccupationalHealthcareEntryCard } from './EntryCard'


const PatientEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case "Hospital":
            return <HospitalEntryCard entry={entry} />
        case "HealthCheck":
            return <HealthCheckEntryCard entry={entry} />
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntryCard entry={entry} />
        default:
            return assertNever(entry);
    }
};

export default PatientEntry;