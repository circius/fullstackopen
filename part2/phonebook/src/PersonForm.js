import React from 'react';
import { ControlledField } from './ControlledField';
export const PersonForm = ({ fields, submitFunction }) => (
  <form onSubmit={submitFunction}>
    {fields.map(
      (field) => <ControlledField
        label={field.label}
        value={field.value}
        changeHandler={field.changeHandler}
        key={field.label} />)}
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);
