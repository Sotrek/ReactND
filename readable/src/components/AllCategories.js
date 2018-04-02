import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAllPosts, editPostAction, fetchCategories, deletePostAction, setSortingAction,
		 upVotePostAction, downVotePostAction } from '../actions'
import { Link } from 'react-router-dom'
import MainMenu from './MainMenu'

class AllCategories extends Component {

	componentDidMount(){
		this.props.getAllPosts();
	}

	upVoteClick(id){
		this.props.upVote(id)
	}

	downVoteClick(id){
		this.props.downVote(id)
	}

	render() {
	    const { posts=[] } = this.props.posts
	    console.log(this.props)
	    return(
	    	<div>
	    		<MainMenu/>
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
	    						switch (this.props.sortBy) {
				                  case 'BY_DATE_OLDEST':
				                    return a.timestamp - b.timestamp
				                  case 'BY_DATE_NEWEST':
				                    return b.timestamp - a.timestamp
				                  default:
				                    return a.timestamp - b.timestamp
				                }
				            })
						  	.map(post =>
		    				<li key={post.id}>
		    					<h2 onClick={()=> this.props.history.push(`/${post.category}/${post.id}`)}>{post.title}</h2>
		    					<h3>Author: {post.author}</h3>
		    					<div>
		    						<span>{post.voteScore}</span>
		    						<button onClick={()=> this.upVoteClick(post.id)}>Up Vote</button>
									<button onClick={()=> this.downVoteClick(post.id)}>Down Vote</button>
		    					</div>
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


const mapStateToProps = ({ posts, categories, sortBy }) => ({
     posts: posts,
     categories: categories,
     sortBy: sortBy.sortBy,
})

const mapDispatchToProps = (dispatch) => {
  return {
  	getAllPosts: () => dispatch(fetchAllPosts()),
  	editPost: (id, post) => dispatch(editPostAction(id, post)),
  	deletePost: (id) => dispatch(deletePostAction(id)),
    getCategories: () => dispatch(fetchCategories()),
    handleSort: (val) => dispatch(setSortingAction(val)),
    upVote: (id) => dispatch(upVotePostAction(id)),
  	downVote: (id) => dispatch(downVotePostAction(id)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AllCategories);