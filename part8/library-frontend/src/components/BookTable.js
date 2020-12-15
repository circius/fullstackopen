import React from 'react'

import BookRow from './BookRow'

const BookTable = ({ books }) => (
  <table>
    <tbody>
      <tr>
        <th></th>
        <th>
          author
    </th>
        <th>
          published
    </th>
      </tr>
      {books.map(book =>
        <BookRow book={book} />
      )}
    </tbody>
  </table>
)

export default BookTable