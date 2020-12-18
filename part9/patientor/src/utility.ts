/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient } from './types';
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
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const toNewPatient = (maybeNewPatient: any): NewPatient => {
    return {
        name: parseString(maybeNewPatient.name, "missing or invalid name"),
        dateOfBirth: parseString(maybeNewPatient.dateOfBirth, "missing or invalid dateOfBirth"),
        ssn: parseString(maybeNewPatient.ssn, "missing or invalid ssn"),
        gender: parseString(maybeNewPatient.gender, "missing or invalid gender"),
        occupation: parseString(maybeNewPatient.occupation, "missing or invalid occupation")
    };
};