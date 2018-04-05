import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCommentsAction, deletePostCommentsAction } from '../actions'
import { withRouter } from 'react-router-dom'

class CommentsList extends Component {

	componentDidMount(){
		const postId = this.props.id
		this.props.getComments(postId)
	}

	deleteCommentClick(id){
		this.props.deleteComment(id)
			.then(this.props.getComments(this.props.id))
	}

	render() {
		const { comments=[] } = this.props.comments
		console.log(this.props.comments)
	    return(
	    	<div>
	    		<ul>
	    		{ comments
	    			.filter(comment => !comment.deleted)
	    			.map( comment => (
	    			<li key={comment.id}>
	    				<p>{comment.body}</p>
	    				<h5>{comment.author}</h5>
	    				<div>
	    					<button onClick={() => this.deleteCommentClick(comment.id)}>DELETE</button>
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
	comment: comments.comment,
})

const mapDispatchToProps = (dispatch) => {
  return {
  	getComments: (id) => dispatch(fetchCommentsAction(id)),
  	deleteComment: (id) => dispatch(deletePostCommentsAction(id))
  }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentsList));