import React, { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {

  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ currentFilter, setCurrentFilter ] = useState('')

  const serverURL = "http://localhost:3001"
  useEffect(() => {
    axios
    .get(serverURL + "/persons")
    .then(response => setPersons(response.data)
    )},[])

  const stateUpdate = (setter) => (event) => setter(event.target.value)

  const newNameUpdate = stateUpdate(setNewName)
  const newNumberUpdate = stateUpdate(setNewNumber)
  const currentFilterUpdate = stateUpdate(setCurrentFilter)

  const inputSubmit = (event) => {
    const resetForm = () => {
      setNewName("")
      setNewNumber('')
    }
    const addPerson = (person) => {
      setPersons(persons.concat(newPerson))
      resetForm()
    }
    const personsHasNewPersonP = () => persons.filter(
      (person) => person.name === newName).length > 0

    event.preventDefault()
    const newPerson = {name: newName, number: newNumber}
    const validAddition = !personsHasNewPersonP() 
    
    validAddition ?
      addPerson(newPerson) : 
      alert(`${newPerson.name} is already added to phonebook`) 
  }

  const filterPersons = (persons, str) => persons.filter(
    (person) => {
      const regexp = new RegExp(".*" + str + ".*", "i")
      return person.name.match(regexp) !== null
    })

  const personsFiltered = filterPersons(persons, currentFilter)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={currentFilter} filterUpdater={currentFilterUpdate}/>
      <h2>add a new</h2>
      <PersonForm
        fields = {[
          {label: "name:", value: newName, changeHandler:newNameUpdate},
          {label: 'number:', value: newNumber, changeHandler:newNumberUpdate}
        ]}
        submitFunction={inputSubmit}/>
      <h2>Numbers</h2>
      <Persons persons={personsFiltered}/>
    </div>
  )
}

const Persons = ({persons}) => persons.map(
  (person) => <Person person={person} key={person.name}/>
)

const PersonForm = ({fields, submitFunction}) => (
  <form onSubmit={submitFunction}>
{    fields.map(
      (field) => <ControlledField 
                  label={field.label} 
                  value={field.value}
                  changeHandler={field.changeHandler}
                  key={field.label} /> )
}        
        <div>
          <button type="submit">add</button>
        </div>
    </form>
)

const Filter = ({ filterValue, filterUpdater }) => (
  <ControlledField 
  label="filter shown with" 
  value={filterValue} 
  changeHandler={filterUpdater}/>
)

const ControlledField = ({label, value, changeHandler}) => (
  <div>
     {label} <input value={value} onChange={changeHandler}/>
  </div>
)

const Person = ({person}) => <div>{person.name} {person.number}</div>

export default App