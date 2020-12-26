import React from 'react'
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TextField, DiagnosisSelection, NumberField } from "../components/FormField";
import { OccupationalHealthcareEntry } from '../types'
import { useStateValue } from '../state';

type EntryFormValues = Omit<OccupationalHealthcareEntry, "id">

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}
const AddOccupationalHealthcareEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue()
    return (
        <Formik
            initialValues={{
                type: "OccupationalHealthcare",
                date: "",
                employerName: "",
                specialist: "",
                description: "",
                sickLeave: {
                    startDate: "",
                    endDate: ""
                },
                diagnosisCodes: [],


            }}
            onSubmit={onSubmit}
            validate={values => {
                const errors: { [field: string]: string } = {};

                //     if (!values.date) {
                //         errors.date = requiredError;
                //     }
                //     // if (!values.specialist) {
                //     //     errors.specialist = requiredError;
                //     // }
                //     // if (!values.description) {
                //     //     errors.description = requiredError;
                //     // }
                //     if (!values.healthCheckRating) {
                //         errors.description = requiredError;
                //     }

                return errors;
            }}

        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="specialist"
                            placeholder="name"
                            name="specialist"
                            component={TextField}
                        />
                        <Field
                            label="description"
                            placeholder="what happened?"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Employer"
                            placeholder="Name of employer"
                            name="EmployerName"
                            component={TextField}
                        />
                        <Field
                            label="Start of sick leave"
                            placeholder="YYYY-MM-DD"
                            name="sickLeave.startDate"
                            component={TextField}
                        />
                        <Field
                            label="End of sick leave"
                            placeholder="YYYY-MM-DD"
                            name="sickLeave.endDate"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                 </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik >
    );
};

export default AddOccupationalHealthcareEntryForm