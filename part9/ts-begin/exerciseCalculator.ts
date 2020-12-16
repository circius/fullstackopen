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

interface trainingInputs {
    target: number;
    trainingRecord: number[];
}

const DESCRIPTIONS =
    ["no-one is this bad",
        "you should try harder or reduce your target",
        "things are going ok",
        "you should increase your target"];

// consumes a list of strings (commandline arguments)
// and produces valid inputs for calculateExercises, Inputs.
const parseTrainingArguments = (args: string[]): trainingInputs => {
    // consumes a number (note that NaN is a number) and produces
    // true if it's not NaN, false otherwise
    const isNotNaN = (number: number): boolean => {
        return !isNaN(Number(number));
    };
    // consumes a list of numbers and produces true if none is NaN,
    // false otherwise. (note that NaN is a number)
    const validateArgs = (args: number[]): boolean => {
        return args.reduce((acc, cur) => isNotNaN(cur) && acc, true);
    };
    if (args.length < 4) throw new Error('Not enough arguments');
    const maybeNums: number[] = args.map(arg => Number(arg));

    if (validateArgs(maybeNums)) {
        return {
            target: maybeNums[0],
            trainingRecord: maybeNums.slice(1)
        };
    } else {
        throw new Error('invalid arguments');
    }
};

// consumes a number representing average daily exercise and 
// produces a Rating corresponding to it.
const getRating = (dailyAverage: number, target: number): Rating => {
    const difference = target - dailyAverage;
    if (difference < -10) {
        return Rating.Excellent;
    } else if (difference < 10) {
        return Rating.Good;
    } else {
        return Rating.Bad;
    }
};

// consumes an array representing hours trained per day and a target number.
// produces a Training object that summarises the result.
const calculateExercises = (actual: number[], target: number): Training => {
    const daysPassed: number = actual.length;
    const daysTrained: number = actual
        .filter(n => n !== 0).length;
    const averageDailyHours = actual.reduce((acc, res) => acc + res) / daysPassed;
    const targetReached = averageDailyHours >= target;
    const rating = getRating(averageDailyHours, target);
    const ratingDescription = DESCRIPTIONS[rating];
    return {
        daysPassed,
        daysTrained,
        averageDailyHours,
        targetReached,
        targetHours: target,
        rating,
        ratingDescription
    };
};

const pertinentArgs = process.argv.slice(2);
const { target, trainingRecord } = parseTrainingArguments(pertinentArgs);

console.log(calculateExercises(trainingRecord, target));