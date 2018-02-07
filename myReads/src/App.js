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

  ShelfChange = (e, singleBook) => {
    const books = this.state.books;
    const shelf = e.target.value;
    singleBook.shelf = e.target.value;
    this.setState({ books })
    BooksAPI.update(singleBook,shelf).then(() => {
     this.setState(state => ({
       books: state.books
       .filter(x => x.id !== singleBook.id)
       .concat([singleBook])
     }))
    })
  };

  

  render(){
    return (
      <div className="app">
        <Route exact path="/" render={()=>(
          <BookList
            books={this.state.books}
            ShelfChange={this.ShelfChange}
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
