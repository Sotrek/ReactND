import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editCommentAction, fetchCommentsAction } from '../actions'

class EditComment extends Component {
	state = {
		body: '',
		author: ''
	}

	componentDidMount(){
		const { id } = this.props.match.params

		this.props.getComments(id)
			.then(() => {
		      	const commentsArray = this.props.comments
		      	const { cid } = this.props.match.params
		      	const filteredComment = commentsArray
		      		.filter(comment => comment.id === cid)
		      	const { author, body } = filteredComment[0]
		        this.setState({
		          author,
		          body,
		        })
		      })
	}

	editCommentClick() {
	    const { body, author } = this.state
	    const { cid } = this.props.match.params

	    if (body && author ) {
		  const _editComment = {
		    body,
		    author
		  }

		  this.props.editComment(cid, _editComment)
		  	.then(() => this.setState({
		          author,
		          body,
		        }))
		  	.then(()=> this.props.history.push('/'))
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
		    	<h1>Edit this Comment</h1>
		      <form className="new-post-form">

				<label className="new-post-body">
					Body:
					<textarea
		              placeholder="Body"
		              onChange={(e) => this.bodyChange(e)}
		              value={this.state.body}
		              name="body"
		              id=""
		              rows="10" />
				</label>

				<label className="new-post-author">
					Author:
					<input
					  type="text"
					  placeholder="Author"
					  name="author"
					  onChange={(e) => this.authorChange(e)}
					  value={this.state.author} />
				</label>

		        <div className="new-post-submit">
		          <input
		            className="new-post-button"
		            type="button"
		            value="Submit"
		            onClick={this.editCommentClick.bind(this)} />
		        </div>
		      </form>
		    </div>
	    )
	}
}


const mapStateToProps = ({comments}) => ({
     comments: comments.comments
})

const mapDispatchToProps = (dispatch) => {
  return {
  	editComment: (id, comment) => dispatch(editCommentAction(id, comment)),
  	getComments: (id) => dispatch(fetchCommentsAction(id)),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(EditComment);