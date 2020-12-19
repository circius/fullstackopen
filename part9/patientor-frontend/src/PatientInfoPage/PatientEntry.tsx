import React from 'react';
import { Entry } from '../types';

const PatientEntry: React.FC<{ entry: Entry }> = ({ entry }) => (
    <span>{entry.description}</span>
);

export default PatientEntry;