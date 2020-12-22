import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { useStateValue, addPatient, updateEntries } from '../state';
import { Entry, Patient } from '../types';
import useModal from '../hooks/useModal'

import PatientHeader from './PatientHeader';
import PatientDetails from './PatientDetails';
import PatientEntries from './PatientEntries';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import { Button } from 'semantic-ui-react';

const PatientInfoPage: React.FC = () => {
    const [{ patients }, dispatch] = useStateValue();
    const [patient, setPatient] = useState<Patient | undefined>();
    const [error, setError] = React.useState<string | undefined>();
    const [modalOpen, openModal, closeModal] = useModal(setError);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        setPatient(patients[id]);
    }, [patients, id]);

    useEffect(() => {
        const getUncensoredPatient = async (id: string) => {
            const response = await axios.get(`${apiBaseUrl}/patients/${id}`);
            return response.data;
        };
        const isCensored = (patient: Patient): boolean => {
            return !patient.ssn || !patient.entries;
        };

        if (patient && isCensored(patient)) {
            getUncensoredPatient(id)
                .then(patient => dispatch(addPatient(patient)))
                .catch(error => setError(error));
        }

    }, [dispatch, id, patient]);

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
            const { data: entries } = await axios.post<Entry[]>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
            )
            const payload = { patientId: id, entries }
            dispatch(updateEntries(payload));
            closeModal();
        } catch (e) {
            console.error(e.response.data)
            setError(e.response.data.error);
        }
    }

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
                        {patient.entries ?
                            <PatientEntries entries={patient.entries} /> :
                            null}
                    </div>)}
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal} />
            <Button onClick={() => openModal()}>Add New Entry</Button>
        </div>
    );
};

export default PatientInfoPage;