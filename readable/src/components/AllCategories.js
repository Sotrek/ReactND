import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAllPosts, editPostAction, fetchCategories, deletePostAction, setSortingAction } from '../actions'
import { Link } from 'react-router-dom'

class AllCategories extends Component {

	componentDidMount(){
		this.props.getAllPosts();

	}
	// componentDidUpdate(){
	// 	this.props.getAllPosts();

	// }

	render() {
	    const { posts } = this.props
	    // console.log(this.props.posts)

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
	    				{/*console.log(posts)*/}
	    				{posts.filter(post => !post.deleted)
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
		    					<h2 onClick={()=> this.props.history.push(`/${post.category}/${post.id}`)}>{post.title}</h2>
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
  	getAllPosts: () => dispatch(fetchAllPosts()),
  	editPost: (id, post) => dispatch(editPostAction(id, post)),
  	deletePost: (id) => dispatch(deletePostAction(id)),
    getCategories: () => dispatch(fetchCategories()),
    handleSort: (val) => dispatch(setSortingAction(val))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(AllCategories);