import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Icon, List, ListItem, Table } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state'
import { Patient } from '../types';

const PatientInfoPage: React.FC = () => {
    const [{ patients }, dispatch] = useStateValue();
    const [patient, setPatient] = useState<Patient | undefined>();
    const [error, setError] = React.useState<string | undefined>();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        setPatient(patients[id])
    }, [patients, id])

    useEffect(() => {
        const getUncensoredPatient = async (id: string) => {
            const response = await axios.get(`${apiBaseUrl}/patients/${id}`);
            return response.data
        }
        const isCensored = (patient: Patient): boolean => {
            return !patient.ssn || !patient.entries
        }

        if (patient && isCensored(patient)) {
            getUncensoredPatient(id)
                .then(patient => dispatch({ type: 'ADD_PATIENT', payload: patient }))
                .catch(error => setError(error))
        }

    }, [dispatch, id, patient])

    const PatientHeader: React.FC<{ patient: Patient }> = ({ patient }) => {
        const iconDict = {
            "male": "mars",
            "female": "venus",
            "other": "genderless"
        }
        const icon = iconDict[patient.gender]

        console.log(icon)

        return (
            <h2>{patient.name} <Icon name="mars" /></h2>
        )
    }

    const PatientDetails: React.FC<{ patient: Patient }> = ({ patient }) => (
        <List>
            <ListItem>ssn: {patient.ssn}</ListItem>
            <ListItem>occupation: {patient.occupation}</ListItem>
        </List>
    )

    return (
        <div>
            <div>
                {error ? error : null}
            </div>
            {!patient ? 'loading'
                : <Table celled>
                    <Table.Header>
                        <Table.Row>
                            {Object.keys(patient).map(key => <Table.Cell>{key}</Table.Cell>)}
                        </Table.Row>
                    </Table.Header>
                    <Table.Row>
                        {Object.keys(patient).map(key => <Table.Cell>{patient[key.toString()]}</Table.Cell>)}
                    </Table.Row>

                </Table>}
        </div>
    )
}

export default PatientInfoPage