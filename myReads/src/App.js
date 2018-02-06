import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import BookList from './BookList';
import SearchPage from './SearchPage';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books});
    });
  }

  _handleChange(e) {
    this.setState({shelf: e.target.value});
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={()=>(
          <BookList
            books={this.state.books}
            onShelfChange={this._handleChange}
          />
        )}/>
        <Route exact path="/search" render={()=>(
          <SearchPage />
        )}/>



      </div>
    )
  }
}

export default BooksApp
