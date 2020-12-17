import diagnosisData from '../../testdata/diagnoses-typed';
import { Diagnosis } from '../types';

const diagnoses: Diagnosis[] = diagnosisData;

const getDiagnoses = (): Diagnosis[] => {
    return diagnoses;
};

export default {
    getDiagnoses
};