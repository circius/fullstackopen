import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import { blog1, geraldine } from '../../testdata/geraldine'

describe('<Blog />', () => {
  test('by default, shows author and title but no other details', () => {
    const component = render(<Blog blog={blog1} user={geraldine} />)
    const blogDiv = component.container
    const blogInfo = component.container.querySelector('.blogInfo')

    expect(blogDiv).toHaveTextContent(`${blog1.title} - ${blog1.author}`)
    expect(blogInfo).toHaveStyle('display: none')
  })
  test('clicking the `view` button shows the blog`s likes and url', () => {

    const component = render(<Blog blog={blog1} user={geraldine} />)
    const button = component.getByText('view')
    fireEvent.click(button)

    const blogInfo = component.container.querySelector('.blogInfo')

    expect(blogInfo).not.toHaveStyle('display: none')
    expect(blogInfo).toHaveTextContent(blog1.likes)
    expect(blogInfo).toHaveTextContent(blog1.url)
  })
})