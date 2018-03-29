import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAllPosts, editPostAction, fetchCategories, deletePostAction } from '../actions'
import { Link } from 'react-router-dom'

class AllCategories extends Component {

	componentDidMount(){
		this.props.getAllPosts();
	}


	render() {
	    const { posts } = this.props



	    return(
	    	<div>
	    		<ul>
	    			{posts.filter(post => !post.deleted).map(post =>
	    				<li key={post.id}>
	    					<h2>{post.title}</h2>
	    					<h3>Author: {post.author}</h3>
	    					<Link to={`/edit-post/${post.id}`}>Edit</Link>
	    					<button onClick={() => this.props.deletePost(post.id)}>Delete</button>
	    				</li>
	    			)}
	    		</ul>
	    	</div>
	    )
	}
}


const mapStateToProps = ({ postsReducer, categoriesReducer }) => ({
     posts: postsReducer.posts,
     categories: categoriesReducer.categories,
})

const mapDispatchToProps = (dispatch) => {
  return {
  	getAllPosts: () => dispatch(fetchAllPosts()),
  	editPost: (id, post) => dispatch(editPostAction(id, post)),
  	deletePost: (id) => dispatch(deletePostAction(id)),
    getCategories: () => dispatch(fetchCategories()),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(AllCategories);