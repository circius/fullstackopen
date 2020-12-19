import Router from 'express';
import patientService from '../services/patient';
import { NonSensitivePatient, Patient, NewPatient } from '../types';
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
    } catch ({ message }) {
        res.status(400).send(message);
    }
});

patientRouter.get('/:id', (req, res) => {
    const id: string = req.params.id;
    const patient: Patient | undefined = patientService.getPatient(id);
    res.json(patient);
});

export = patientRouter;