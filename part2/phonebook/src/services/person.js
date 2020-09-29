import axios from 'axios'

const personEndpoint = `/api/persons`

const getAll = () => axios.get(personEndpoint).then(response => response.data)

const create = newPerson => 
    axios.post(personEndpoint, newPerson).then(response => response.data)

const deleteById = id =>
    axios.delete(personEndpoint+`/${id}`).then(console.log(`deleted person with id ${id} on backend`))

const update = person =>
    axios.put(personEndpoint+`/${person.id}`, person).then(response => response.data)

export default {getAll, create, deleteById, update}