import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useField } from '../hooks/useField'
import { useMutation, useQuery } from '@apollo/client'
import { AUTHOR_CHANGE_BIRTHYEAR } from '../mutations'
import { ALL_AUTHORS } from '../queries'

const AuthorBirthyear = () => {
  const result = useQuery(ALL_AUTHORS)
  const [options, setOptions] = useState([])

  const [selectedAuthor, selectAuthor] = useState(null)
  const birthyear = useField('number')

  const [mutateBirthyear] = useMutation(AUTHOR_CHANGE_BIRTHYEAR,
    { refetchQueries: [{ query: ALL_AUTHORS }] })

  const authorsGetOptions = authors => authors.map(
    author => ({
      value: author.name,
      label: author.name
    })
  )

  useEffect(() => {
    result.data && setOptions(authorsGetOptions(result.data.allAuthors))
  }, [])

  const changeBirthyear = e => {
    e.preventDefault()
    mutateBirthyear({
      variables: {
        name: selectedAuthor.value,
        setBornTo: Number(birthyear.value)
      }
    })
    selectAuthor(null)
    birthyear.reset()
  }
  return (
    <form onSubmit={changeBirthyear}>
      <div>
        author:
        <Select
          defaultValue={selectedAuthor}
          onChange={selectAuthor}
          options={options}
          placeholder='Select author'
        />
      </div>
      <div>
        birthyear: <input {...birthyear} />
      </div>
      <button>submit</button>
    </form>
  )
}

export default AuthorBirthyear