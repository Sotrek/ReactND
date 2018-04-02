import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPostAction, deletePostAction, upVotePostDetailAction, downVotePostDetailAction } from '../actions'
import { Link } from 'react-router-dom'

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
	      	const { title=[], author=[], body=[], category=[], } = this.props.posts.post
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
		const { title, author, body, category, } = this.state
		const id = this.props.match.params.id
		const { post={} } = this.props.posts
		console.log(this.props)
		return(
			<div>
				<div>
					<button onClick={()=>this.props.history.goBack()}>Back to posts</button>
				</div>
				<div>
					<h1>{title}</h1>
					<h3>{author}</h3>
					<h5>{category}</h5>
					<p>{body}</p>
					<div>
						<span>{post.voteScore}</span>
						<button onClick={()=> this.upVoteClick(id)}>Up Vote</button>
						<button onClick={()=> this.downVoteClick(id)}>Down Vote</button>
					</div>
				</div>
				<div>
					<Link to={`/edit-post/${category}/${id}`}>Edit</Link>
					<button onClick={() => this.props.deletePost(id)
											.then(()=>this.props.history.push('/'))
					}>
						Delete
					</button>
				</div>
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



export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);