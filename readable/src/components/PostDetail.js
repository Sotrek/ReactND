import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPostAction, deletePostAction, upVotePostDetailAction, downVotePostDetailAction } from '../actions'
import { Link, withRouter } from 'react-router-dom'
import NewComment from './NewComment'
import CommentsList from './CommentsList'

class PostDetail extends Component {
	state = {
		title: '',
		body: '',
		author: '',
		category: '',
	}
	componentDidMount(){
		const id = this.props.match.params.id

		this.props.getPost(id)
	      .then((post) => {
	      	const { title=[], author=[], body=[], category=[] } = this.props.posts.post
	        this.setState({
	          title,
	          author,
	          body,
	          category,
	        })
	      })
	}
	upVoteClick(id){
		this.props.upVote(id)
	}
	downVoteClick(id){
		this.props.downVote(id)
	}

	render(){
		const { title, author, body, category } = this.state
		const id = this.props.match.params.id
		const { post={} } = this.props.posts
		console.log(this.props)
		return(
			<div>
				{ Object.keys(post).length === 0 ? (
					<div>
						<h1>404 - Page Not Found</h1>
					</div>
				) : (
					<div className="post-detail">

					<div>
						<button onClick={()=>this.props.history.goBack()}>Back to posts</button>
					</div>
					<div>
						<div className="post-section">
							<h3>Title: {title}</h3>
							<h5>Author: {author}</h5>
							<h5>Category: {category}</h5>
							<p>{body}</p>
						</div>
						<div className="comments-votes">
							<h5>Comments Count: { post.commentCount < 0 ? 0 : post.commentCount}</h5>
							<h5>Vote Score: {post.voteScore}</h5>
							<div className="vote-buttons">
								<button onClick={()=> this.upVoteClick(id)}>Up Vote</button>
								<button onClick={()=> this.downVoteClick(id)}>Down Vote</button>
							</div>
						</div>
					</div>
					<div className="post-mod">
						<Link to={`/edit-post/${category}/${id}`}><button>Edit</button></Link>
						<button onClick={() => this.props.deletePost(id)
												.then(() => {
											        this.setState({
											          deleted: true
											        })
											    })
												.then(()=>this.props.history.push('/'))
						}>
							Delete
						</button>
					</div>
					<NewComment id={id} category={category} {...this.props}/>
					<CommentsList id={id} />
				</div>
				)}
			</div>
		)
	}
}

const mapStateToProps = ({posts}) => ({
     posts: posts,
})

const mapDispatchToProps = (dispatch) => {
  return {
  	getPost: (id) => dispatch(fetchPostAction(id)),
  	deletePost: (id) => dispatch(deletePostAction(id)),
  	upVote: (id) => dispatch(upVotePostDetailAction(id)),
  	downVote: (id) => dispatch(downVotePostDetailAction(id)),
  }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));