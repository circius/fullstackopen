/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender } from './types';

const isString = (text: any): text is string => {
    return (typeof (text) === "string" || text instanceof String);
};

// figure out currying one day
const parseString = (maybeString: any, errorMessage: string): string => {
    if (!maybeString || !isString(maybeString)) {
        throw new Error(errorMessage);
    }
    return maybeString;
};

const parseGender = (maybeGender: any): Gender => {
    if (!maybeGender || !isGender(maybeGender)) {
        throw new Error("missing or invalid gender.");
    }
    return maybeGender;
};

const isGender = (maybeGender: any): maybeGender is Gender => {
    return Object.values(Gender).includes(maybeGender);
};

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const toNewPatient = (maybeNewPatient: any): NewPatient => {
    return {
        name: parseString(maybeNewPatient.name, "missing or invalid name"),
        dateOfBirth: parseString(maybeNewPatient.dateOfBirth, "missing or invalid dateOfBirth"),
        ssn: parseString(maybeNewPatient.ssn, "missing or invalid ssn"),
        gender: parseGender(maybeNewPatient.gender),
        occupation: parseString(maybeNewPatient.occupation, "missing or invalid occupation")
    };
};