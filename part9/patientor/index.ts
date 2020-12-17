import express from 'express';
import cors from 'cors';

import pingRouter from './src/routers/ping';
import diagnosisRouter from './src/routers/diagnosis';
import patientRouter from './src/routers/patient';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/ping/', pingRouter);
app.use('/api/diagnosis', diagnosisRouter);
app.use('/api/patients', patientRouter);

const PORT = 3001;


app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});