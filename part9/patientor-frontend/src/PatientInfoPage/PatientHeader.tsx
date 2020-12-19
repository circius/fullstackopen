import React from 'react'
import { Icon } from 'semantic-ui-react';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';
import { Patient } from '../types';

const PatientHeader: React.FC<{ patient: Patient }> = ({ patient }) => {
    const iconDict: { [index: string]: string } = {
        "male": "mars",
        "female": "venus",
        "other": "genderless"
    }
    const getIcon = (gender: string): SemanticICONS => iconDict[gender] as SemanticICONS;

    return (
        <h2>{patient.name} <Icon name={getIcon(patient.gender)} /></h2>
    )
}

export default PatientHeader