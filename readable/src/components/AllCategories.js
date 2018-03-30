import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAllPosts, editPostAction, fetchCategories, deletePostAction } from '../actions'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class AllCategories extends Component {

	componentDidMount(){
		this.props.getAllPosts();

	}

	render() {
		// this.props.getAllPosts();
	    const { posts } = this.props
	    // console.log(this.props.posts)

	    return(
	    	<div>
	    		<ul>
	    				{/*console.log(posts)*/}
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



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllCategories));