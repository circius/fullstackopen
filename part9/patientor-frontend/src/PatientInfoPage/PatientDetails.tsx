import React from "react";
import { List, ListItem } from "semantic-ui-react";
import { Patient } from "../types";

const PatientDetails: React.FC<{ patient: Patient }> = ({ patient }) => (
    <List>
        <ListItem>ssn: {patient.ssn}</ListItem>
        <ListItem>occupation: {patient.occupation}</ListItem>
    </List>
)

export default PatientDetails