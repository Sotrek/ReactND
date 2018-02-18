import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import BookList from './BookList';
import SearchPage from './SearchPage';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
  //initialising the local state of books
  state = {
    books: []
  }

  //just after the component finishes mounting we get all the books from BooksAPI
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      //setting the returned books to the local books state
      this.setState({books});
    }).catch(() =>
        alert("Server error: Please refresh the page or visit later.")
      )
  }
  //function that deals with the change of shelves by getting as arguments the event and the individual books
  ShelfChange = (e, singleBook) => {
    //destructuring the event target to the value property
    const { value } = e.target;

    //updating BooksAPI with the shelf change
    BooksAPI.update(singleBook, value).then((e) => {
        console.log(e)
    }).catch(() =>
        alert("Server error: Please refresh the page or visit later.")
    )
    //updating the local state of books with the shelf change.
    this.setState( prevState => {
        const { books } = prevState;

        //checking if the target is currenlty in the selves
        const hasTarget = books.find(book => (
          book.id === singleBook.id
        ));

        if (hasTarget) {
          //assigning the value property to that book which is already on a shelf
          books.filter(book => book.id === singleBook.id)[0].shelf = value;
        } else {
          return {
            //returning a state object { prevState.books: newState.books }
            //using spread operator and Object.assign()
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
        {/* using react-router-dom to create root path */}
        <Route exact path="/" render={()=>(
          //rendering Booklist component
          <BookList
            books={this.state.books}
            ShelfChange={this.ShelfChange}
          />
        )}/>
        {/*using react-router-dom to create search page*/}
        <Route exact path="/search" render={()=>(
          //rendering SearchPage component
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
