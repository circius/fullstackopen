/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender, NewEntry, Entry, BaseEntry, HealthCheckRating, HealthCheckEntry, HospitalEntry, Discharge, OccupationalHealthcareEntry, SickLeave } from './types';

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
    return !maybeEntries || Array.isArray(maybeEntries) && maybeEntries.filter(
        entry => !isEntry(entry)).length === 0;
};

const isEntry = (maybeEntry: any): boolean => {
    return ['HealthCheck', 'HealthCheck', 'OccupationalHealthcare'].includes(maybeEntry);
};

const parseEntries = (maybeEntries: any): Entry[] => {
    if (!isEntries(maybeEntries)) {
        throw new Error('invalid entries');
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

const isStrings = (maybeStrings: any): maybeStrings is string[] => {
    return (
        Array.isArray(maybeStrings) &&
        maybeStrings.filter(mybString => !isString(mybString)).length === 0
    );

};

const parseDiagnosisCodes = (maybeCodes: any): string[] => {
    if (!maybeCodes) {
        return [];
    } else
        if (!isStrings(maybeCodes)) {
            console.log("error with these codes: ", maybeCodes);
            throw new Error('invalid diagnosis codes');
        }
    return maybeCodes;
};

export const toNewBaseEntry = (maybeEntry: any): Omit<BaseEntry, "id"> => ({
    date: parseString(maybeEntry.date, 'missing or invalid date'),
    specialist: parseString(maybeEntry.specialist, ",missing or invalid specialist"),
    description: parseString(maybeEntry.description, "missing or invalid description"),
    diagnosisCodes: parseDiagnosisCodes(maybeEntry.diagnosisCodes)
});

const isHealthCheckRating = (maybeHealthCheckRating: any): maybeHealthCheckRating is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(maybeHealthCheckRating);
};

const parseHealthCheckRating = (maybeRating: any): HealthCheckRating => {
    if ((!maybeRating && maybeRating !== 0) || !isHealthCheckRating(maybeRating)) {
        throw new Error("missing or invalid healthcheck rating");
    }
    return maybeRating;
};

const toNewHealthCheckEntry = (maybeEntry: any): Omit<HealthCheckEntry, "id"> => {
    return {
        ...toNewBaseEntry(maybeEntry),
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(maybeEntry.healthCheckRating),
    };
};

const isDischarge = (maybeDischarge: any): maybeDischarge is Discharge => {
    return typeof (maybeDischarge.date) === "string" && typeof (maybeDischarge.criteria) === "string";
};

const parseDischarge = (maybeDischarge: Discharge | undefined): Discharge | undefined => {
    if (!maybeDischarge) {
        return undefined;
    } else if (!isDischarge) {
        throw new Error("invalid discharge");
    }

    return {
        date: maybeDischarge.date,
        criteria: maybeDischarge.criteria
    };
};

const toHospitalEntry = (maybeEntry: any): Omit<HospitalEntry, "id"> => {
    return {
        ...toNewBaseEntry(maybeEntry),
        type: 'Hospital',
        discharge: parseDischarge(maybeEntry.discharge),
    };
};

const isSickLeave = (maybeSickLeave: any): maybeSickLeave is SickLeave => {
    return (
        typeof (maybeSickLeave.startDate) === "string" &&
        typeof (maybeSickLeave.endDate) === "string");
};

const parseSickLeave = (maybeSickLeave: SickLeave | undefined): SickLeave | undefined => {
    if (!maybeSickLeave) {
        return undefined;
    } else if (!isSickLeave) {
        throw new Error("invalid sick-leave");
    }

    return {
        startDate: maybeSickLeave.startDate,
        endDate: maybeSickLeave.endDate
    };
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