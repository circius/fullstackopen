import axios from 'axios';
import { stringify } from 'querystring';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Icon, IconProps, List, ListItem } from 'semantic-ui-react';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';
import { apiBaseUrl } from '../constants';
import { useStateValue, addPatient } from '../state'
import { Patient } from '../types';

import PatientHeader from './PatientHeader'
import PatientDetails from './PatientDetails'
import PatientEntries from './PatientEntries'

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
                .then(patient => dispatch(addPatient(patient)))
                .catch(error => setError(error))
        }

    }, [dispatch, id, patient])

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
                        <PatientEntries patient={patient} />
                    </div>)}
        </div>
    )
}

export default PatientInfoPage