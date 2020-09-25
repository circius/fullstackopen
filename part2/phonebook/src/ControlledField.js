import React from 'react';
export const ControlledField = ({ label, value, changeHandler }) => (
  <div>
    {label} <input value={value} onChange={changeHandler} />
  </div>
);
