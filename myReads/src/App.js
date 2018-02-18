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
    }).catch(() =>
        alert("Server error: Please refresh the page or visit later.")
      )
  }

  ShelfChange = (e, singleBook) => {
    const { value } = e.target;

    BooksAPI.update(singleBook, value).then((e) => {
        console.log(e)
     }).catch(() =>
          alert("Server error: Please refresh the page or visit later.")
       )
     // this.setState(state => ({
     //   books: state.books
     //   .filter(x => x.id !== singleBook.id)
     //   .concat([singleBook])
     //  }))
      this.setState( prevState => {
          const { books } = prevState;

          const hasTarget = books.find(book => (
            book.id === singleBook.id
          ));

          if (hasTarget) {
            books.filter(book => book.id === singleBook.id)[0].shelf = value;
            console.log('hasTarget')
          } else {
            console.log('hasNOTarget')
            return {
              books:[
                ...books, Object.assign({}, singleBook, {shelf: value})
              ]
            }
          }
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
          <SearchPage
            books={this.state.books}
            ShelfChange={this.ShelfChange}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
