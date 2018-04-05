import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editPostAction, deletePostAction, fetchCategoryPostsAction, setSortingAction,
		 upVotePostAction, downVotePostAction } from '../actions'
import { Link } from 'react-router-dom'
import MainMenu from './MainMenu'


class Category extends Component {

	componentDidMount(){
		const category = this.props.match.params.category
		this.props.fetchCategoryPosts(category)
	}
	// componentWillReceiveProps(){
	// 	const category = this.props.match.params.category
	// 	this.props.fetchCategoryPosts(category)
	// }
	upVoteClick(id){
		this.props.upVote(id)
	}
	downVoteClick(id){
		this.props.downVote(id)
	}
	render() {
	    const { posts=[] } = this.props.posts
	    // console.log(this.props)

	    return(
	    	<div>
	    		<MainMenu {...this.props}/>

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
	                  <li onClick={() =>
	                    this.props.handleSort(
	                      this.props.sortBy === 'BY_VOTE_COUNT_HIGHEST'
	                        ? 'BY_VOTE_COUNT_LOWEST'
	                        : 'BY_VOTE_COUNT_HIGHEST'
	                    )}
	                  >
	                  	Votes
	                  </li>
	              </ul>
	            </div>
		    	<div>
		    		<ul>
		    			{
		    				posts.filter(post => post.category === this.props.match.params.category)
			    				.sort((a, b) => {
		    						switch (this.props.sortBy) {
		    						  case 'BY_VOTE_COUNT_LOWEST':
					                    return a.voteScore - b.voteScore
					                  case 'BY_DATE_OLDEST':
					                    return a.timestamp - b.timestamp
					                  case 'BY_DATE_NEWEST':
					                    return b.timestamp - a.timestamp
					                  default:
					                    return b.voteScore - a.voteScore
					                }
					            })
			    				.map(post =>
				    				<li key={post.id}>
				    					<h2 onClick={()=> this.props.history.push(`/${post.category}/${post.id}`)}>{post.title}</h2>
				    					<h3>Author: {post.author}</h3>
				    					<div>
				    						<span>Comments Count: {post.commentCount}</span>
											<span>Vote Score: {post.voteScore}</span>
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
  	fetchCategoryPosts: (category) => dispatch(fetchCategoryPostsAction(category)),
  	editPost: (id, post) => dispatch(editPostAction(id, post)),
  	deletePost: (id) => dispatch(deletePostAction(id)),
    handleSort: (val) => dispatch(setSortingAction(val)),
    upVote: (id) => dispatch(upVotePostAction(id)),
  	downVote: (id) => dispatch(downVotePostAction(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);