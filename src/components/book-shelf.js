import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Book from './book'

class BookShelf extends Component {

  render() {
    const { shelfTitle, books, onChangeShelf } = this.props

    // render books on shelf
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <li key={book.id}>
                <Book
                  book={book}
                  onChangeShelf={onChangeShelf} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

// PropTypes
BookShelf.propTypes = {
  shelfTitle: PropTypes.string.isRequired,
  books: PropTypes.array,
  onChangeShelf: PropTypes.func.isRequired
}

export default BookShelf
