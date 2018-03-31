import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editPostAction, deletePostAction, fetchCategoryPostsAction } from '../actions'
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
	    		<ul>
	    			{
	    				posts.filter(post => post.category === this.props.match.params.category).map(post =>
	    				<li key={post.id}>
	    					<h2>{post.title}</h2>
	    					<h3>Author: {post.author}</h3>
	    					<Link to={`/edit-post/${post.category}/${post.id}`}>Edit</Link>
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
  	fetchCategoryPosts: (category) => dispatch(fetchCategoryPostsAction(category)),
  	editPost: (id, post) => dispatch(editPostAction(id, post)),
  	deletePost: (id) => dispatch(deletePostAction(id)),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Category);