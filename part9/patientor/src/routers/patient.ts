import Router from 'express';
import patientService from '../services/patient';
import { Patient } from '../types';

const patientRouter = Router();

patientRouter.get('/', (_req, res) => {
    console.log('patientRouter /');


    const patients: Patient[] = patientService.getPatients();
    res.send(patients);
}
);

export = patientRouter;