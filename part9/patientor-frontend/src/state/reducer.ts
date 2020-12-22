import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";
import PatientListPage from "../PatientListPage";

export const setPatientList = (payload: Patient[]): Action => ({
  type: "SET_PATIENT_LIST",
  payload,
});

export const addPatient = (payload: Patient): Action => ({
  type: "ADD_PATIENT",
  payload
});

export const setDiagnosisList = (payload: Diagnosis[]): Action => ({
  type: "SET_DIAGNOSIS_LIST",
  payload
});

export const addEntry = (payload: { patientId: string, entry: Entry }): Action => ({
  type: "ADD_ENTRY",
  payload
});

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
  }
  | {
    type: "ADD_ENTRY";
    payload: {
      patientId: string,
      entry: Entry
    }
  }

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      {
        return {
          ...state,
          patients: {
            ...state.patients,
            [action.payload.id]: action.payload
          }
        };
      }
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: action.payload
      }
    case "ADD_ENTRY":
      const patientAddEntry = (patient: Patient, entry: Entry): Patient => ({
        ...patient,
        entries: patient.entries?.concat(entry)
      });
      const patientsAddEntry = (patients: { [id: string]: Patient }, patientId: string, entry: Entry): { [id: string]: Patient } => {
        return {
          ...patients,
          patientId: patientAddEntry(patients.patientId, entry)
        }
      }
      const { patientId, entry } = action.payload;
      return {
        ...state,
        patients: patientsAddEntry(state.patients, patientId, entry)
      }

    default:
      return state;
  }
};
