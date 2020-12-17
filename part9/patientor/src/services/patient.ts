import patientData from '../../testdata/patients-typed';
import { Patient, NonSensitivePatient } from '../types';

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

export default {
    getPatients,
    getNonSensitivePatients
};