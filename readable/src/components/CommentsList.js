import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCommentsAction, deletePostCommentsAction, fetchPostAction, upVoteCommentAction, downVoteCommentAction } from '../actions'
import { withRouter } from 'react-router-dom'

class CommentsList extends Component {

	componentDidMount(){
		const postId = this.props.id
		this.props.getComments(postId)
	}

	deleteCommentClick(id){
		this.props.deleteComment(id)
			.then(this.props.getComments(this.props.id))
			.then(this.props.getPost(this.props.id))
	}
	upVoteClick(id){
		this.props.upVoteComment(id)
			.then(this.props.getComments(this.props.id))
	}
	downVoteClick(id){
		this.props.downVoteComment(id)
			.then(this.props.getComments(this.props.id))
	}

	render() {
		const { comments=[] } = this.props.comments

		return(
	    	<div className="posts-list comments-list">
	    		<ul>
	    		{ comments
	    			.filter(comment => !comment.deleted)
	    			.map( comment => (
	    			<li key={comment.id}>
	    				<span>Comment: {comment.body}</span>
	    				<span>Author: {comment.author}</span>
	    				<div className="comments-votes">
		    				<h5>Votes Score: {comment.voteScore}</h5>
		    				<div className="vote-buttons">
		    					<button onClick={()=> this.upVoteClick(comment.id)}>Up Vote</button>
		    					<button onClick={()=> this.downVoteClick(comment.id)}>Down Vote</button>
		    				</div>
	    				</div>
	    				<div className="post-mod">
	    					<button onClick={() => this.deleteCommentClick(comment.id)}>DELETE</button>
	    					<button onClick={() => this.props.history.push(`../edit-comment/${comment.parentId}/${comment.id}`)}>EDIT</button>
	    				</div>
	    			</li>
	    		))}
	    		</ul>
	    	</div>
	    )
	}
}


const mapStateToProps = ({ comments }) => ({
	comments: comments,
	comment: comments,
})

const mapDispatchToProps = (dispatch) => {
  return {
  	getComments: (id) => dispatch(fetchCommentsAction(id)),
  	deleteComment: (id) => dispatch(deletePostCommentsAction(id)),
  	getPost: (id) => dispatch(fetchPostAction(id)),
  	upVoteComment: (id) => dispatch(upVoteCommentAction(id)),
  	downVoteComment: (id) => dispatch(downVoteCommentAction(id)),
  }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentsList));