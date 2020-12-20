import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { Entry, HealthCheckEntry, healthRating } from '../types'
import { assertNever } from '../helpers'

import DiagnosisList from './DiagnosisList'

const HospitalEntryCard: React.FC<{ entry: Entry }> = ({ entry }) => (
    <Card fluid >
        <Card.Header> {entry.date} <Icon name="hospital" /> </Card.Header>
        <Card.Meta>Hospital visit</Card.Meta>
        <Card.Content>{entry.description}</Card.Content>
        { entry.diagnosisCodes && (
            <Card.Content>
                <DiagnosisList codes={entry.diagnosisCodes} />
            </Card.Content>
        )}
    </Card>)

const HealthCheckEntryCard: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => (
    (
        <Card fluid >
            <Card.Header> {entry.date} <Icon name="heart outline" /> </Card.Header>
            <Card.Meta>Healthcheck</Card.Meta>
            <Card.Content>{entry.description}</Card.Content>
            {entry.diagnosisCodes && (
                <Card.Content>
                    <DiagnosisList codes={entry.diagnosisCodes} />
                </Card.Content>
            )}
            <HealthCheckRating rating={entry.healthCheckRating} />
        </Card>)
)

const HealthCheckRating: React.FC<{ rating: healthRating }> = ({ rating }) => {
    const ratingColors = [
        'green',
        'yellow',
        'red'
    ]
    return <Icon className={ratingColors[rating]} name="heart" />
}

const OccupationalHealthcareEntryCard: React.FC<{ entry: Entry }> = ({ entry }) => (
    (
        <Card fluid >
            <Card.Header> {entry.date} <Icon name="stethoscope" /> </Card.Header>
            <Card.Meta>Occupational Healthcare</Card.Meta>
            <Card.Content>{entry.description}</Card.Content>
            {entry.diagnosisCodes && (
                <Card.Content>
                    <DiagnosisList codes={entry.diagnosisCodes} />
                </Card.Content>
            )}
        </Card>)
)


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