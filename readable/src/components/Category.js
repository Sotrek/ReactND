import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editPostAction, deletePostAction, fetchCategoryPostsAction, setSortingAction } from '../actions'
import { Link } from 'react-router-dom'

class Category extends Component {

	componentDidMount(){
		const category = this.props.match.params.category
		this.props.fetchCategoryPosts(category)
	}

	render() {
	    const { posts } = this.props
	    console.log(this.props)

	    return(
	    	<div>
		    	<div>
		    		<Link to={`/new-post/`}>+ ADD POST</Link>
		    	</div>
		    	<div>
	              <h2>Sort Posts By</h2>
	              <ul>
	                  <li onClick={() =>
	                    this.props.handleSort(
	                      this.props.sortBy === 'BY_DATE_NEWEST'
	                        ? 'BY_DATE_OLDEST'
	                        : 'BY_DATE_NEWEST'
	                    )}
	                  >
	                  	Date
	                  </li>
	              </ul>
	            </div>
		    	<div>
		    		<ul>
		    			{
		    				posts.filter(post => post.category === this.props.match.params.category)
			    				.sort((a, b) => {
		    						console.log(this.props.sortBy)
					                switch (this.props.sortBy) {
					                  case 'BY_DATE_OLDEST':
					                    return a.timestamp - b.timestamp
					                  case 'BY_DATE_NEWEST':
					                    return b.timestamp - a.timestamp
					                  default:
					                    return b.timestamp - a.timestamp
					                }
					            })
			    				.map(post =>
				    				<li key={post.id}>
				    					<h2>{post.title}</h2>
				    					<h3>Author: {post.author}</h3>
				    					<Link to={`/edit-post/${post.category}/${post.id}`}>Edit</Link>
				    					<button onClick={() => this.props.deletePost(post.id)}>Delete</button>
				    				</li>
			    				)
		    			}
		    		</ul>
		    	</div>
	    	</div>
	    )
	}
}


const mapStateToProps = ({ postsReducer, categoriesReducer, sortingReducer }) => ({
     posts: postsReducer.posts,
     categories: categoriesReducer.categories,
     sortBy: sortingReducer.sortBy,
})

const mapDispatchToProps = (dispatch) => {
  return {
  	fetchCategoryPosts: (category) => dispatch(fetchCategoryPostsAction(category)),
  	editPost: (id, post) => dispatch(editPostAction(id, post)),
  	deletePost: (id) => dispatch(deletePostAction(id)),
    handleSort: (val) => dispatch(setSortingAction(val))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Category);