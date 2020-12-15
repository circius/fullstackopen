interface Training {
    daysPassed: number,
    daysTrained: number,
    targetHours: number,
    averageDailyHours: number,
    targetReached: boolean,
    rating: Rating,
    ratingDescription: string
}
enum Rating {
    Bad = 1,
    Good,
    Excellent
}

const DESCRIPTIONS =
    ["no-one is this bad",
        "you should try harder or reduce your target",
        "things are going ok",
        "you should increase your target"]

// consumes a number representing average daily exercise and 
// produces a Rating corresponding to it.
const getRating = (dailyAverage: number, target: number): Rating => {
    const difference = target - dailyAverage
    if (difference < -10) {
        return Rating.Excellent
    } else if (difference < 10) {
        return Rating.Good
    } else {
        return Rating.Bad
    }
}

// consumes an array representing hours trained per day and a target number.
// produces a Training object that summarises the result.
const calculateExercises = (actual: number[], target: number): Training => {
    const daysPassed: number = actual.length
    const daysTrained: number = actual
        .filter(n => n !== 0).length
    const averageDailyHours = actual.reduce((acc, res) => acc + res) / daysPassed
    const targetReached = averageDailyHours >= target
    const rating = getRating(averageDailyHours, target)
    const ratingDescription = DESCRIPTIONS[rating]
    return {
        daysPassed,
        daysTrained,
        averageDailyHours,
        targetReached,
        targetHours: target,
        rating,
        ratingDescription
    }
}

const test_hours = [3, 0, 2, 4.5, 0, 3, 1]
const test_target = 2
console.log(calculateExercises(test_hours, test_target))