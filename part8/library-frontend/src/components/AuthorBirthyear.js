import React from 'react'
import { useField } from '../hooks/useField'
import { useMutation } from '@apollo/client'
import { AUTHOR_CHANGE_BIRTHYEAR } from '../mutations'
import { ALL_AUTHORS } from '../queries'

const AuthorBirthyear = () => {
  const author = useField('text')
  const birthyear = useField('number')

  const [mutateBirthyear] = useMutation(AUTHOR_CHANGE_BIRTHYEAR,
    { refetchQueries: [{ query: ALL_AUTHORS }] })

  const changeBirthyear = e => {
    e.preventDefault()
    mutateBirthyear({
      variables: {
        name: author.value,
        setBornTo: Number(birthyear.value)
      }
    })
    author.reset()
    birthyear.reset()
  }
  return (
    <form onSubmit={changeBirthyear}>
      <div>
        author: <input {...author} />
      </div>
      <div>
        birthyear: <input {...birthyear} />
      </div>
      <button>submit</button>
    </form>
  )
}

export default AuthorBirthyear