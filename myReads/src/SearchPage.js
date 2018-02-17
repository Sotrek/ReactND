import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import Book from './Book';
import PropTypes from 'prop-types';

class SearchPage extends Component {

	state = {
		query: '',
		queryResults:[]
	}
	PropTypes = {
		query: PropTypes.string.isRequired,
		ShelfChange: PropTypes.func.isRequired,
	}

	updateQuery = (query) => {
		this.setState({ query: query })
		if (query) {
			this.queryResults = BooksAPI.search(query).then((response) => {
				let apiResults = [];
				// console.log(response);
				if (response === Array){
					apiResults = response.map( (result) => {
						return result
					})
				} else {
					apiResults = response
				}
				this.setState({queryResults: apiResults});
			}).catch(() =>
		          alert("Server error: Please refresh the page or visit later.")
		       )
		} else {
			this.setState({queryResults: []})
		}

	}

	render(){


		return(
			<div className="search-books">
				<div className="search-books-bar">
				  <Link to="/" className="close-search">Close</Link>
				  <div className="search-books-input-wrapper">
				    {/*
				      NOTES: The search from BooksAPI is limited to a particular set of search terms.
				      You can find these search terms here:
				      https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

				      However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
				      you don't find a specific author or title. Every search is limited by search terms.
				    */


					}
				    <input type="text"
				    		placeholder="Search by title or author"
				    		value={this.state.query}
				    		onChange={(event) => this.updateQuery(event.target.value)}/>

				  </div>
				</div>
				<div className="search-books-results">
				  <ol className="books-grid">
				  		<Book books={this.state.queryResults}
				  				ShelfChange={this.props.ShelfChange}/>
				  </ol>
				</div>
			</div>
		)
	}
}

export default SearchPage;