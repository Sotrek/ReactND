import React, { Component } from 'react';
import './App.css';
import Book from './Book.js';
import { Link } from 'react-router-dom';

class BookList extends Component {
	render(){
		//destructuring the component `props` object into its individual variables
		const {books} = this.props;

		//getting the books that belong in each category and assigning them to the variables
		const currentlyReading = books.filter((book) => book.shelf === "currentlyReading");
		const wantToRead = books.filter((book) => book.shelf === "wantToRead");
		const read = books.filter((book) => book.shelf === "read");

		return(
			<div className="list-books">
	            <div className="list-books-title">
	              <h1>MyReads</h1>
	            </div>
	            <div className="list-books-content">
	              <div>
	                <div className="bookshelf">
	                  <h2 className="bookshelf-title">Currently Reading</h2>
	                  {/*if there are book in the category Currenly Reading
	                  	 show just those that belong to that category*/}
	                  {currentlyReading.length > 0 &&
		                   <Book
		                    books={currentlyReading}
		                    ShelfChange={this.props.ShelfChange}
		                   />
	               	   }
	                </div>
	                <div className="bookshelf">
	                  <h2 className="bookshelf-title">Want to Read</h2>
	                  {/*if there are book in the category Want to Read
	                  	 show just those that belong to that category*/}
	                  {wantToRead.length > 0 &&
		                   <Book
		                    books={wantToRead}
		                    ShelfChange={this.props.ShelfChange}
		                   />
	               	   }
	                </div>
	                <div className="bookshelf">
	                  {/*if there are book in the category Read
	                  	 show just those that belong to that category */}
	                  <h2 className="bookshelf-title">Read</h2>
	                  {read.length > 0 &&
		                   <Book
		                    books={read}
		                    ShelfChange={this.props.ShelfChange}
		                   />
	               	   }
	                </div>
	              </div>
	            </div>
	            <div className="open-search">
	              {/*Link to search page using react-router-dom */}
	              <Link to="/search">Add a book</Link>
	            </div>
            </div>
		);
	}
}

export default BookList;