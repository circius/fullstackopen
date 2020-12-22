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

export const updateEntries = (payload: { patientId: string, entries: Entry[] }): Action => ({
  type: "UPDATE_ENTRIES",
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
    type: "UPDATE_ENTRIES";
    payload: {
      patientId: string,
      entries: Entry[]
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
    case "UPDATE_ENTRIES":
      const { patientId, entries } = action.payload

      return {
        ...state,
        patients: {
          ...state.patients,
          patientId: {
            ...state.patients[patientId],
            entries
          }
        }
      }

    default:
      return state;
  }
};
