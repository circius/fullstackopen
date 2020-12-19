import axios from 'axios';
import { stringify } from 'querystring';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Icon, IconProps, List, ListItem } from 'semantic-ui-react';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';
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
        const iconDict: { [index: string]: string } = {
            "male": "mars",
            "female": "venus",
            "other": "genderless"
        }
        const getIcon = (gender: string): SemanticICONS => iconDict[gender] as SemanticICONS;

        return (
            <h2>{patient.name} <Icon name={getIcon(patient.gender)} /></h2>
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
                : (
                    <div>
                        <PatientHeader patient={patient} />
                        <PatientDetails patient={patient} />
                    </div>)}
        </div>
    )
}

export default PatientInfoPage