import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import Book from './Book';
import PropTypes from 'prop-types';
import _ from 'lodash';

class SearchPage extends Component {
	//initialising the local state of the query and queryResults
	state = {
		query: '',
		queryResults:[]
	}
	//component’s prop - books - may update
	componentWillReceiveProps =({ books }) => {
		//using lodash to deep-clone the queryResults in order to avoid the problem of shallow comparison
	    const clonedResults = _.cloneDeep(this.state.queryResults)
	    //using lodash to find the intersection by id between current queryResults-clonedResults-and the updated list of books
	    const theObject=_.intersectionBy(books, clonedResults, "id")
	    //using lodash to filter out the books from queryResults that have not been added to any shelve
	    const theOthers=_.differenceBy(clonedResults, theObject, "id")
	    //updating the state with the new objects and using the spread operator
	    this.setState({ queryResults: [...theObject, ...theOthers] })

	}
	//updating the query based on the BooksAPI query
	updateQuery = (query) => {
		this.setState({ query: query })
		// if query is truthy
		if (query) {
			//searching through BooksAPI for the query and then assigning the results
			//with the help of lodash as above to return the apiResults
			this.queryResults = BooksAPI.search(query).then((response) => {
				let apiResults = [];
				//if the response is an Array
				if (Array.isArray(response)){
					const theObject=_.intersectionBy(this.props.books, response, "id")
		            const theOthers=_.differenceBy(response, theObject, "id")
		            apiResults=[...theObject, ...theOthers]
				}
				//setting the updated state of the queryResults
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
				  {/* using react-router-dom to link back to root page */}
				  <Link to="/" className="close-search">Close</Link>
				  {/*Input fielf on change triggers the updateQuery event */}
				  <div className="search-books-input-wrapper">
				    <input type="text"
				    	   placeholder="Search by title or author"
				    	   value={this.state.query}
				    	   onChange={(event) => this.updateQuery(event.target.value)}/>
				  </div>
				</div>
				<div className="search-books-results">
				  <ol className="books-grid">
				  		{/* rendering the books that are returned from the local state of the queryResults */}
				  		<Book books={this.state.queryResults}
				  			  ShelfChange={this.props.ShelfChange}/>
				  </ol>
				</div>
			</div>
		)
	}
	PropTypes = {
		query: PropTypes.string.isRequired,
		ShelfChange: PropTypes.func.isRequired,
	}
}

export default SearchPage;