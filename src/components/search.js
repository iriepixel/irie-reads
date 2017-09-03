
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import * as BooksAPI from './../API/BooksAPI';
import Book from './book'

class Search extends Component {

  // state
  state = {
    query: '',
    books: []
  }

  // update search quesry
  updateQuery = (query) => {
    if (!query) {
      this.setState({query: '', books: []})
    }
    else {
      this.setState({ query: query.trim() })
      BooksAPI.search(query).then((books) => {
        if (books.error) {
          console.log('error');
          books = []
        }
        books.map(book => (
          this.props.books.filter((b) => b.id === book.id).map(b => book.shelf = b.shelf)))
        this.setState({books})
      })
    }
  }

  // render search results
  render () {
        const { books } = this.state;
        const { onChangeShelf } = this.props;

        return(
            <div className="search-books">
              <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                  <input
                    type="text"
                    placeholder="Search by title or author"
                    autoFocus
                    onChange={ (event) => this.updateQuery(event.target.value) }
                  />
                </div>
              </div>

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
        );
    }
}

// PropTypes
Search.propTypes = {
  books: PropTypes.array,
  onChangeShelf: PropTypes.func.isRequired
}

export default Search;
