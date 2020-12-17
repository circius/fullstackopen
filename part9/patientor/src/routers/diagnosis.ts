import Router from 'express';
import diagnosisService from '../services/diagnosis';
import { Diagnosis } from '../types';

const diagnosisRouter = Router();

diagnosisRouter.get('/', (_req, res) => {
    const diagnoses: Diagnosis[] = diagnosisService.getDiagnoses();
    res.send(diagnoses);
}
);

export = diagnosisRouter;