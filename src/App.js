import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './API/BooksAPI';
import BookShelfs from './components/book-shelfs';
import Search from './components/search';
import './css/App.css';

class BooksApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  // fire when component did mount
  componentDidMount () {
    this.getAllBooks();
  }

  // get all books from BookAPI
  getAllBooks = () => {
    BooksAPI.getAll()
      .then((data) => {
          this.setState({
            books: data
          });
          console.log(data);
      });
  }

  // change book's shelf on dropdown select
  changeShelf = (shelf, book) => {
    if (this.state.books) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf
        this.setState((state) => ({
          books: state.books.filter(b => b.id !== book.id).concat([book])
        }))
      })
    }
  }

  // render books shelfs & search
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookShelfs
            books={this.state.books}
            onChangeShelf={this.changeShelf}/>
        )}/>
        <Route path="/search" render={() => (
          <Search
            books={this.state.books}
            onChangeShelf={this.changeShelf} />
        )}/>
      </div>
    )
  }
}

export default BooksApp
