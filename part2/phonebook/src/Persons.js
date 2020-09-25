import React from 'react';
import { Person } from './Person';
export const Persons = ({ persons, deleteClickHandler }) => {

  return (
    <ul>
      {persons.map(
        (person) => <li key={person.name}>
          <Person person={person} key={person.name} />
          <button onClick={deleteClickHandler(person.id)}>del</button>
        </li>)
      }
    </ul>)
};
