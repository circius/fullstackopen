import React, { useState, useEffect } from 'react'
import { Filter } from './Filter'
import { WarnFlash, TellFlash } from './Flash'
import { PersonForm } from './PersonForm'
import { Persons } from './Persons'

import personInterface from './services/person'


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [currentFilter, setCurrentFilter] = useState('')
  const [warnFlashMessage, setWarnFlashMessage] = useState(null)
  const [tellFlashMessage, setTellFlashMessage] = useState(null)

  const stateUpdate = (setter) => (event) => setter(event.target.value)

  const newNameUpdate = stateUpdate(setNewName)
  const newNumberUpdate = stateUpdate(setNewNumber)
  const currentFilterUpdate = stateUpdate(setCurrentFilter)

  const flashTimeout = 3000

  useEffect(() => {
    personInterface.getAll()
      .then(persons => setPersons(persons)
      )
  }, [])

  const inputSubmit = (event) => {
    const resetForm = () => {
      setNewName("")
      setNewNumber('')
    }

    const addPerson = (person) => {
      personInterface.create(person)
        .then(person => {
          setPersons(persons.concat(person))
          setTellFlashMessage(`added ${person.name} to the phonebook`)
          setTimeout(() => setTellFlashMessage(null), flashTimeout)
        })
      resetForm()
    }

    const updatePerson = (person) => {
      console.log('updating person', person)
      personInterface.update(person)
        .then(returnedPerson =>{
          setPersons(persons.map(
            (person) => person.id === returnedPerson.id ? returnedPerson : person))
          setTellFlashMessage(`updated the number of ${returnedPerson.name}`)
          setTimeout(setTellFlashMessage(null), flashTimeout)})
        .catch(error => {
          setWarnFlashMessage('something went wrong')
          setTimeout(() => setWarnFlashMessage(null), flashTimeout)
         })
    }

    const offerPersonUpdate = (newPerson) => {
      const id = persons.find((person) => person.name === newPerson.name).id
      newPerson.id = id
      return window.confirm(`${newPerson.name} is already added to phonebook;
      replace the old number with a new one?`) ?
        updatePerson(newPerson) :
        null
      }

    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }

    persons
    .filter((person) => person.name === newName)
    .length === 0 ?
      addPerson(newPerson) :
      offerPersonUpdate(newPerson)
  }

  const clickDeletePersonById = (id) => (event) => {
    const deletePersonById = (id) => {
      setPersons(persons.filter(person => person.id !== id))
      personInterface.deleteById(id)
    }
    event.preventDefault()
    return window.confirm(`delete user with id ${id} from the phonebook?`) ?
      deletePersonById(id) :
      null
  }

  const filterPersons = (persons, str) => persons.filter(
    (person) => {
      const regexp = new RegExp(".*" + str + ".*", "i")
      return person.name.match(regexp) !== null
    })

  const personsFiltered = filterPersons(persons, currentFilter)

  return (
    <div>
      <h1>Phonebook</h1>
      <WarnFlash message={warnFlashMessage} />
      <TellFlash message={tellFlashMessage} />
      <Filter filterValue={currentFilter} filterUpdater={currentFilterUpdate} />
      <h1>add a new</h1>
      <PersonForm
        fields={[
          { label: "name:", value: newName, changeHandler: newNameUpdate },
          { label: 'number:', value: newNumber, changeHandler: newNumberUpdate }
        ]}
        submitFunction={inputSubmit} />
      <h1>Numbers</h1>
      <Persons persons={personsFiltered} deleteClickHandler={clickDeletePersonById} />
    </div>
  )
}

export default App