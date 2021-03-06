import React from 'react'
import { List } from 'semantic-ui-react'
import { useStateValue } from '../state';

const DiagnosisListItem: React.FC<{ code: string }> = ({ code }) => {
    const [{ diagnoses }] = useStateValue();
    const thisDiagnosis = diagnoses.find(diagnosis => diagnosis.code === code)
    return (
        <List.Item>{code}: {thisDiagnosis ? thisDiagnosis.name : "unknown code"}</List.Item>
    )
}

export default DiagnosisListItem