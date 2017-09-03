import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import BookShelf from './book-shelf';

class BookShelfs extends Component {
  render () {

    const { books, onChangeShelf } = this.props;

    // setup shelves data
    const shelves = [
      {
        id: 'currentlyReading',
        title: 'Currently Reading',
        books: books.filter(book => book.shelf === 'currentlyReading')
      },
      {
        id: 'wantToRead',
        title: 'Want to Read',
        books: books.filter(book => book.shelf === 'wantToRead')
      },
      {
        id: 'read',
        title: 'Read',
        books: books.filter(book => book.shelf === 'read')
      },
    ]

    // render separate bookshelves
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>IRIE READS</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map(shelf => (
              <BookShelf
                key={shelf.id}
                shelves={shelves}
                shelfTitle={shelf.title}
                books={shelf.books}
                onChangeShelf={onChangeShelf}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

// PropTypes
BookShelfs.propTypes = {
  books: PropTypes.array,
  onChangeShelf: PropTypes.func.isRequired
}

export default BookShelfs;
