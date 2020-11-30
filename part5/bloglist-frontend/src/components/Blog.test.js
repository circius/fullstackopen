/* 
Make a test which checks that the component displaying a blog renders the blog's title and author, but does not render its url or number of likes by default

Add CSS-classes to the component to help the testing as necessary.

 */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const geraldine = {
  blogs: ["5fc12c2c5ac17bf98036b66b"], username: 'geraldine', id: "5fbe986b6c1b33e808058fa7"
}

const blog1 = {
  title: 'apples',
  author: 'james',
  likes: 2,
  url: 'http://jam.es',
  id: "5fc12c2c5ac17bf98036b66b",
  user: geraldine
}



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