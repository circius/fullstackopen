import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogInfo from './BlogInfo'
import { blog1 } from '../../testdata/geraldine'

describe('<BlogList />', () => {
  test('clicking the `like` button calls the corresponding handler', () => {
    const mockHandler = jest.fn()
    const component = render(<BlogInfo blog={blog1} doLike={mockHandler} />)
    const button = component.getByText('like')

    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})