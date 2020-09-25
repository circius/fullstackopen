import React from 'react';
import { ControlledField } from './ControlledField';
export const Filter = ({ filterValue, filterUpdater }) => (
  <ControlledField
    label="filter shown with"
    value={filterValue}
    changeHandler={filterUpdater} />
);
