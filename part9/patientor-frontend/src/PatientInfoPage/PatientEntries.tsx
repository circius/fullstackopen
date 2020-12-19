import React from 'react';
import { useStateValue } from '../state';
import { Patient, Entry } from '../types';



const PatientEntries: React.FC<{ patient: Patient }> = ({ patient }) => {
    const [{ diagnoses }] = useStateValue();



    return <span> "entries here later"</span>;
};

export default PatientEntries;