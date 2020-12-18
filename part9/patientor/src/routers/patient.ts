import Router from 'express';
import patientService from '../services/patient';
import { NonSensitivePatient, NewPatient } from '../types';
import { toNewPatient } from '../utility';

const patientRouter = Router();

patientRouter.get('/', (_req, res) => {
    const patients: NonSensitivePatient[] = patientService.getNonSensitivePatients();
    res.send(patients);
});

patientRouter.post('/', (req, res) => {
    try {
        const newPatient: NewPatient = toNewPatient(req.body);
        const addedEntry = patientService.addPatient(newPatient);
        res.json(addedEntry);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

export = patientRouter;