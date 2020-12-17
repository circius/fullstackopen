import Router from 'express';
import patientService from '../services/patient';
import { NonSensitivePatient } from '../types';

const patientRouter = Router();

patientRouter.get('/', (_req, res) => {
    const patients: NonSensitivePatient[] = patientService.getNonSensitivePatients();
    res.send(patients);
});

export = patientRouter;