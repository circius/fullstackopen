import React, { useState } from 'react';
import { Modal, Segment, Button } from 'semantic-ui-react';
import AddEntryForm, { EntryFormValues } from './AddEntryForm';
import { NewEntryTypes } from '../types'
import { HealthCheckIcon, HospitalIcon, OccupationalHealthcareIcon } from '../Icons';

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: EntryFormValues) => void;
    error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
    const [formType, setFormType] = useState<NewEntryTypes>({ type: "Hospital" });
    return (
        <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
            <Modal.Header>Add a new entry</Modal.Header>
            <Modal.Content>
                <Button.Group horizontal labeled icon>
                    <Button onClick={() => setFormType({ type: "Hospital" })}>{HospitalIcon} Hospital</Button>
                    <Button onClick={() => setFormType({ type: "HealthCheck" })}>{HealthCheckIcon} Healthcheck </Button>
                    <Button onClick={() => setFormType({ type: "OccupationalHealthcare" })}>{OccupationalHealthcareIcon}Occupational Health</Button>
                </Button.Group>
            </Modal.Content>
            <Modal.Content>
                {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
                <AddEntryForm onSubmit={onSubmit} onCancel={onClose} EntryType={formType} />


            </Modal.Content>
        </Modal>
    )
};

export default AddEntryModal;
