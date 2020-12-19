import patientData from '../../testdata/patients-typed';
import { Patient, NonSensitivePatient, NewPatient } from '../types';

const patients: Patient[] = patientData;

const getPatients = (): Patient[] => {
    return patients;
};


const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(patient => ({
        id: patient.id,
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        occupation: patient.occupation
    }));
};

const getPatient = (id: string): Patient | undefined => {
    const patient: Patient | undefined = patients.find(
        patient => patient.id === id
    );
    return patient;
};

const getNonSensitivePatient = (id: string): NonSensitivePatient | undefined => {
    const patient: Patient | undefined = patients.find(
        patient => patient.id === id
    );
    return patient ?
        {
            id: patient.id,
            name: patient.name,
            dateOfBirth: patient.dateOfBirth,
            gender: patient.gender,
            occupation: patient.occupation,
        } : undefined;
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: String(Math.random() * 10 ** 4),
        ...patient
    };
    patients.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    getNonSensitivePatients,
    getPatient,
    getNonSensitivePatient,
    addPatient
};