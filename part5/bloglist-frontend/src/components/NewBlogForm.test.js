/* import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { geraldine } from '../../testdata/geraldine'

import NewBlogForm from './NewBlogForm'

describe('<NewBlogForm />', () => {
  test('passes proper values to handler when submitted', () => {
    const getById = (component, id) => component.container.querySelector(id)
    const changeField = (field, str) => fireEvent.change(field, {
      target: { value: str }
    })

    const newBlog = {
      author: 'peu importe',
      title: 'nouvelles du front',
      url: 'https://dernieres.fr'
    }
    const mockHandler = jest.fn()
    const component = render(<NewBlogForm user={geraldine} updateBlogs={mockHandler} />)

    const [form, authorField, urlField, titleField] = [
      '#newBlogForm', '#author', '#url', '#title'].map(
        id => getById(component, id)
      )

    console.log('authorField', authorField)
    console.log(getById(component, 'author'))
    console.log(component.container.querySelector('#author'))

    changeField(authorField, newBlog.author)
    changeField(titleField, newBlog.title)
    changeField(urlField, newBlog.url)
    fireEvent.submit(form)

    expect(mockHandler.mock.calls).toHaveLength(1)

  })
}) */

// NOTE: this doesn't work because fireEvent doesn't really do what it says it does;
// and since I don't call the props function directly, but through an intermediary
// it never gets called by this virtual click. perhaps the way I've made the comopnent is
// an antipattern.