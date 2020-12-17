import express from 'express';
import { bmiCalculator, Inputs as bmiInputs } from './bmiCalculator';
import { calculateExercises, Training, trainingInputs } from './exerciseCalculator';


const app = express();
app.use(express.json());

const PORT = 3003;

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    type bmiQuery = { height: string, weight: string };
    const parseBmiQuery = (query: bmiQuery): bmiInputs => {
        const { height, weight } = query;
        if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
            return { height: Number(height), weight: Number(weight) };
        } else {
            throw new Error('invalid query!');
        }
    };

    try {
        const { height, weight } = parseBmiQuery(req.query as bmiQuery);
        const bmi = bmiCalculator(height, weight);
        res.json({ height, weight, bmi });
    } catch (exception) {
        res.status(400).json({ error: "invalid or missing parameters" });
    }

});

app.post('/exercises/', (req, res) => {
    type exercisesQuery = {
        daily_exercises: number[]
        target: number
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dailyExercisesValid = (exercises: any[]): boolean => {
        exercises.filter(exercise => !isNaN(Number(exercise)));
        return exercises.length === 0;
    };

    const parseExercisesQuery = (query: exercisesQuery): trainingInputs => {
        const { daily_exercises, target } = query;

        if (!daily_exercises || !target) throw new Error('parameters missing');
        if (!isNaN(Number(target)) && dailyExercisesValid(daily_exercises)) {
            throw new Error("malformatted parameters");
        }
        return {
            target: target,
            trainingRecord: daily_exercises
        };
    };

    const queryParams = req.body as exercisesQuery;
    const params = parseExercisesQuery(queryParams);
    const exerciseRecord: Training = calculateExercises(params.trainingRecord, params.target);
    res.json(exerciseRecord);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});