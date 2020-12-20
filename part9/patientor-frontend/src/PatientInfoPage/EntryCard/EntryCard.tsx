import React from 'react'
import { Icon } from 'semantic-ui-react';
import { HealthCheckEntry, healthRating, OccupationalHealthcareEntry, HospitalEntry } from '../../types'

import BaseEntryCard from './BaseEntryCard'

export const HospitalEntryCard: React.FC<{ entry: HospitalEntry }> = ({ entry }) => (
    <BaseEntryCard entry={entry} metaString="Hospital visit" icon={<Icon name="hospital" />}>
        {entry.discharge ? `discharged on ${entry.discharge.date} on grounds: ${entry.discharge.criteria}` : null}
    </BaseEntryCard>
)

export const HealthCheckEntryCard: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => (
    <BaseEntryCard entry={entry} metaString="Healthcheck" icon={<Icon name="heart outline" />}>
        <HealthCheckRating rating={entry.healthCheckRating} />
    </BaseEntryCard>)

export const OccupationalHealthcareEntryCard: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) =>
    <BaseEntryCard entry={entry} metaString="Occupational Healthcare" icon={<Icon name="stethoscope" />}>
        Employer: {entry.employerName}
    </BaseEntryCard>

const HealthCheckRating: React.FC<{ rating: healthRating }> = ({ rating }) => {
    const ratingColors = [
        'green',
        'yellow',
        'red'
    ]
    return <Icon className={ratingColors[rating]} name="heart" />
}




