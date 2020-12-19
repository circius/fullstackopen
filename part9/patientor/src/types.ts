export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

interface BaseEntry {
    id: string,
    date: string,
    specialist: string,
    description: string,
    diagnosisCodes?: string[]
}

export interface HealthCheckEntry extends BaseEntry {
    type: 'HealthCheck',
    healthCheckRating: number
}

export interface HospitalEntry extends BaseEntry {
    type: 'Hospital'

    discharge?: {
        date: string,
        criteria: string
    }
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare',
    employerName: string,
    sickLeave?: {
        startDate: string,
        endDate: string
    }
}


export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
    entries: Entry[]
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, "id">;

export enum Gender {
    Other = "other",
    Male = "male",
    Female = "female"
}