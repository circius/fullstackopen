import patientData from '../../testdata/patients-typed';
import { Patient, NonSensitivePatient, NewPatient, NewEntry, Entry } from '../types';

let patients: Patient[] = patientData;

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
        id: generateId(),
        ...patient
    };
    patients.push(newPatient);
    return newPatient;
};

const generateId = (): string => {
    return String(Math.random() * 10 ** 4);
};

const patientAddEntry = (patient: Patient, newEntry: NewEntry): Patient => {
    const entry = {
        id: generateId(),
        ...newEntry
    };
    return {
        ...patient,
        entries: patient.entries.concat(entry)
    };
};

const addEntry = (id: string, newEntry: NewEntry): Entry[] => {
    const maybePatient = patients.find(patient => patient.id === id);
    if (!maybePatient) {
        throw new Error("Invalid patient id");
    } else {
        const newPatient: Patient = patientAddEntry(maybePatient, newEntry);
        patients = patients.map(patient => patient.id === newPatient.id ? newPatient : patient);
        return newPatient.entries;
    }
};

export default {
    getPatients,
    getNonSensitivePatients,
    getPatient,
    getNonSensitivePatient,
    addPatient,
    addEntry
};