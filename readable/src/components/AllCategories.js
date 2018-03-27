import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAllPosts } from '../actions'

class AllCategories extends Component {

	componentDidMount(){
		this.props.getAllPosts();
	}

	render() {
	    const { posts } = this.props

	    return(
	    	<div>
	    		<ul>
	    			{posts.map(post => (
	    				<li key={post.id}>
	    					<h2>{post.title}</h2>
	    					<h3>Author: {post.author}</h3>
	    				</li>
	    			))}
	    		</ul>
	    	</div>
	    )
	}
}


const mapStateToProps = ({ allPostsReducer }) => ({
     posts: allPostsReducer.posts
})

const mapDispatchToProps = (dispatch) => {
  return {
  	getAllPosts: () => dispatch(fetchAllPosts()),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(AllCategories);