export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;



export interface BaseEntry {
    id: string,
    date: string,
    specialist: string,
    description: string,
    diagnosisCodes?: string[]
}

export enum HealthCheckRating {
    Good,
    Middling,
    Bad
}

export interface HealthCheckEntry extends BaseEntry {
    type: 'HealthCheck',
    healthCheckRating: HealthCheckRating
}

export interface HospitalEntry extends BaseEntry {
    type: 'Hospital'
    discharge?: Discharge
}

export interface Discharge {
    date: string,
    criteria: string
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare',
    employerName: string,
    sickLeave?: {
        startDate: string,
        endDate: string
    }
}

export interface SickLeave {
    startDate: string,
    endDate: string
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

export type NewEntry =
    | Omit<HospitalEntry, "id">
    | Omit<OccupationalHealthcareEntry, "id">
    | Omit<HealthCheckEntry, "id">;

export enum Gender {
    Other = "other",
    Male = "male",
    Female = "female"
}