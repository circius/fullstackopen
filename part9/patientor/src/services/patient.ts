import patientData from '../../testdata/patients-typed'
import { Patient } from '../types';

const patients: Patient[] = patientData;

const getPatients = (): Patient[] => {
    return patients;
};

export default {
    getPatients
}