import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editPostAction, deletePostAction, fetchCategoryPostsAction } from '../actions'
import { Link } from 'react-router-dom'

class AllCategories extends Component {

	componentDidMount(){
		const category = this.props.match.params.category
		this.props.getCategoryPosts(category)
						// .then(() => console.log(this.props))

		// console.log(this.props.match.params.category)

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
  	getCategoryPosts: (category) => dispatch(fetchCategoryPostsAction(category)),
  	editPost: (id, post) => dispatch(editPostAction(id, post)),
  	deletePost: (id) => dispatch(deletePostAction(id)),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(AllCategories);