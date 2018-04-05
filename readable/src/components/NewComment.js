import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPostCommentAction, fetchCommentsAction, fetchPostAction } from '../actions'
import { uniqueId } from '../utils/helper'
import { withRouter } from 'react-router-dom'

class NewComment extends Component {
	state = {
		body: '',
		author: '',
	}

	componentDidMount(){

	}

	newCommentClick() {
	    const { body, author } = this.state
	    console.log(this.state)

	    if (body && author) {
	      const postId = this.props.id

		  const newComment = {
		    id: uniqueId(),
		    parentId: postId,
		    timestamp: Date.now(),
		    body,
		    author,
		  }

		  this.props.addComment(newComment)
		  	.then(this.setState({
		  		body: '',
				author: ''
		  	}))
		  	.then(this.props.getComments(postId))
		  	.then(this.props.getPost(postId))

		} else {
			alert('Please fill in all the fields and submit again')
		}
	}


	bodyChange(e) {
		this.setState({ body: e.target.value })
	}

	authorChange(e) {
		this.setState({ author: e.target.value })
	}

	render() {

	    return(
	    	<div>
	    		<div>
	    			<h3> Add a comment </h3>
	    		</div>
	    		<div>
				   <form className="new-comment-form">
						<label className="new-comment-body">
							Body:
							<textarea
				              placeholder="Body"
				              onChange={(e) => this.bodyChange(e)}
				              value={this.state.body}
				              name="body"
				              id=""
				              rows="10" />
						</label>

						<label className="new-comment-author">
							Author:
							<input
							  type="text"
							  placeholder="Author"
							  name="author"
							  onChange={(e) => this.authorChange(e)}
							  value={this.state.author} />
						</label>

				        <div className="new-comment-submit">
				          <input
				            className="new-comment-button"
				            type="button"
				            value="Submit"
				            onClick={this.newCommentClick.bind(this)} />
				        </div>
			       </form>
	      		</div>
	    	</div>
	    )
	}
}


const mapStateToProps = undefined;

const mapDispatchToProps = (dispatch) => {
  return {
  	addComment: (comment, callback) => dispatch(addPostCommentAction(comment, callback)),
  	getComments: (id) => dispatch(fetchCommentsAction(id)),
  	getPost: (id) => dispatch(fetchPostAction(id)),
  }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewComment));