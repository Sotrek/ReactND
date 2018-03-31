import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPostAction } from '../actions'

class PostDetail extends Component {
	state = {
		title: '',
		body: '',
		author: '',
		category: ''
	}
	componentDidMount(){
		const id = this.props.match.params.id

		this.props.getPost(id)
	      .then(() => {
	      	const { title, author, body, category } = this.props.post
	        this.setState({
	          title,
	          author,
	          body,
	          category
	        })
	      })
	}
	render(){
		const { title, author, body, category } = this.state

		return(
			<div>
				<h1>{title}</h1>
				<h3>{author}</h3>
				<h5>{category}</h5>
				<p>{body}</p>
			</div>
		)
	}
}

const mapStateToProps = ({postsReducer}) => ({
     post: postsReducer.post
})

const mapDispatchToProps = (dispatch) => {
  return {
  	getPost: (id) => dispatch(fetchPostAction(id)),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);