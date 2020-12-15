
const HEALTHY = "Normal (healthy weight)"
const UNHEALTHY = "Abnormal (unhealthy weight)"

// consumes a height (cm) and a weight (kgs) and produces a string
// representing the corresponding health.
const bmiCalculator = (height: number, weight: number): string => {
    const healthyBmiP = (bmi: number): Boolean => {
        return 18.5 < bmi && bmi < 24.9
    }

    const bmi: number = (height * height) / weight
    const healthy: Boolean = healthyBmiP(bmi)

    switch (healthy) {
        case true:
            return HEALTHY
        case false:
            return UNHEALTHY
    }
}

console.log(bmiCalculator(5, 5))