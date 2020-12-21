/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender, NewEntry, Entry, BaseEntry, HealthRating, HealthCheckEntry, HospitalEntry, Discharge, OccupationalHealthcareEntry, SickLeave } from './types';

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

const isEntries = (maybeEntries: any): maybeEntries is Entry[] => {
    return Array.isArray(maybeEntries) && maybeEntries.filter(
        entry => !isEntry(entry)).length === 0;
};

const isEntry = (maybeEntry: any): boolean => {
    return ['HealthCheck', 'HealthCheck', 'OccupationalHealthcare'].includes(maybeEntry);
};

const parseEntries = (maybeEntries: any): Entry[] => {
    if (!maybeEntries || !isEntries(maybeEntries)) {
        throw new Error('missing or invalid entries');
    }
    return maybeEntries;
};

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const toNewPatient = (maybeNewPatient: any): NewPatient => {
    return {
        name: parseString(maybeNewPatient.name, "missing or invalid name"),
        dateOfBirth: parseString(maybeNewPatient.dateOfBirth, "missing or invalid dateOfBirth"),
        ssn: parseString(maybeNewPatient.ssn, "missing or invalid ssn"),
        gender: parseGender(maybeNewPatient.gender),
        occupation: parseString(maybeNewPatient.occupation, "missing or invalid occupation"),
        entries: parseEntries(maybeNewPatient.entries)
    };
};

const parseDiagnosisCodes = (maybeCodes: any): string[] => {
    console.log(maybeCodes);
    return [];
};

export const toNewBaseEntry = (maybeEntry: any): Omit<BaseEntry, "id"> => ({
    date: parseString(maybeEntry.date, 'missing or invalid date'),
    specialist: parseString(maybeEntry.specialist, ",missing or invalid specialist"),
    description: parseString(maybeEntry.description, "missing or invalid description"),
    diagnosisCodes: parseDiagnosisCodes(maybeEntry.diagnosisCodes)
});

const parseHealthRating = (maybeRating: any): HealthRating => {
    console.log(maybeRating);
    return 0;
};

const toNewHealthCheckEntry = (maybeEntry: any): Omit<HealthCheckEntry, "id"> => {
    return {
        ...toNewBaseEntry(maybeEntry),
        type: 'HealthCheck',
        healthCheckRating: parseHealthRating(maybeEntry.healthCheckRating),
    };
};

const parseDischarge = (maybeDischarge: Discharge | undefined): Discharge | undefined => {
    console.log('maybeDischarge:', maybeDischarge);
    return undefined;
};

const toHospitalEntry = (maybeEntry: any): Omit<HospitalEntry, "id"> => {
    return {
        ...toNewBaseEntry(maybeEntry),
        type: 'Hospital',
        discharge: parseDischarge(maybeEntry.discharge),
    };
};

const parseSickLeave = (maybeSickLeave: SickLeave | undefined): SickLeave | undefined => {
    console.log('maybeSickLeave:', maybeSickLeave);

    return undefined;
};

const toOccupationalHealthcareEntry = (maybeEntry: any): Omit<OccupationalHealthcareEntry, "id"> => {
    return {
        ...toNewBaseEntry(maybeEntry),
        type: 'OccupationalHealthcare',
        employerName: parseString(maybeEntry.employerName, 'employer name missing or invalid'),
        sickLeave: parseSickLeave(maybeEntry.sickLeave),
    };
};

export const toNewEntry = (maybeEntry: any): NewEntry => {
    switch (maybeEntry.type) {
        case 'HealthCheck':
            return toNewHealthCheckEntry(maybeEntry);
        case 'Hospital':
            return toHospitalEntry(maybeEntry);
        case 'OccupationalHealthcare':
            return toOccupationalHealthcareEntry(maybeEntry);
        default:
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            throw new Error(`invalid entry type: ${maybeEntry.type}`);
    }
};