import Router from 'express';
import patientService from '../services/patient';
import { NonSensitivePatient, Patient, NewPatient, NewEntry } from '../types';
import { toNewPatient, toNewEntry } from '../utility';

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
patientRouter.post('/:id/entries', (req, res) => {
    const userId = req.params.id;
    const newEntry: NewEntry = toNewEntry(req.body);
    try {
        const patientWithEntry: Patient = patientService.addEntry(userId, newEntry);
        res.json(patientWithEntry);
    } catch ({ message }) {
        res.status(400).send(message);
    }
});

export = patientRouter;