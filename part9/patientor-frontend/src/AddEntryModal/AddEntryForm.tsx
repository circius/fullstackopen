import React from "react";

import { NewEntry, NewEntryTypes } from "../types";
import { assertNever } from "../helpers";

import AddHospitalEntryForm from './AddHospitalEntryForm'
import AddOccupationalHealthcareEntryForm from './AddOccupationalHealthcareEntryForm'
import AddHealthCheckEntryForm from './AddHealthCheckEntryForm'

export type EntryFormValues = NewEntry

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
    EntryType: NewEntryTypes
}

export type ChildProps = Omit<Props, "EntryType">

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel, EntryType }) => {
    if (!EntryType) return <div>not there</div>
    switch (EntryType.type) {
        case "Hospital":
            return <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onCancel} />
        case "OccupationalHealthcare":
            return <AddOccupationalHealthcareEntryForm onSubmit={onSubmit} onCancel={onCancel} />
        case "HealthCheck":
            return <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onCancel} />
        case undefined:
            return <div>waiting</div>
        default:
            return assertNever(EntryType.type)

    }
}

export default AddEntryForm