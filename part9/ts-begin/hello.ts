import express from 'express'
import { bmiCalculator, Inputs as bmiInputs } from './bmiCalculator'

const app = express();

const PORT = 3003;

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
    type bmiQuery = { height: string, weight: string }
    const parseBmiQuery = (query: bmiQuery): bmiInputs => {
        const { height, weight } = query
        if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
            return { height: Number(height), weight: Number(weight) }
        } else {
            throw new Error('invalid query!')
        }
    }

    try {
        const { height, weight } = parseBmiQuery(req.query as bmiQuery)
        const bmi = bmiCalculator(height, weight)
        res.json({ height, weight, bmi })
    } catch (exception) {
        res.status(400).json({ error: "invalid or missing parameters" })
    }

})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})