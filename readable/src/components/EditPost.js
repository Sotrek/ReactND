import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editPostAction, fetchCategories, fetchPostAction } from '../actions'

class EditPost extends Component {
	state = {
		id:'',
		title: '',
		body: '',
		author: '',
		category: ''
	}

	componentDidMount(){
		this.props.getCategories();

		const { id } = this.props.match.params
     	console.log(id)

	    this.props.getPost(id)
	      .then(() => {
	      	console.log(this.props)
	      	const { title, author, body, category } = this.props.post
	        this.setState({
	          id,
	          title,
	          author,
	          body,
	          category
	        })
	      })
	}

	editPostClick() {
	    const { title, body, author, category, id } = this.state

	    if (title && body && author && category) {
		  const _editPost = {
		    title,
		    body,
		    author,
		   	category
		  }
		  this.props.editPost(id, _editPost)
		    .then(() => this.setState({
		      title: '',
		      body: '',
		      author: '',
		      category: ''
		    }))
		} else {
			alert('Please fill in all the fields and submit again')
		}
	}

	titleChange(e) {
		this.setState({ title: e.target.value })
	}

	bodyChange(e) {
		this.setState({ body: e.target.value })
	}

	authorChange(e) {
		this.setState({ author: e.target.value })
	}

	categoryChange = (e) => {
		this.setState({ category: e.target.value })
	}

	render() {
	    const { categories } = this.props

	    return(
	      <form className="new-post-form">

			<label className="new-post-title">
				Title:
				<input
				  type="text"
				  placeholder="Title"
				  name="title"
				  onChange={(e) => this.titleChange(e)}
				  value={this.state.title} />
			</label>

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

	        <label className="new-post-category">
	          	Categories:
	            <select
	              placeholder="Select a Category"
	              value={this.state.category}
	              onChange={this.categoryChange}>
	              	{categories.map(category => (
				        <option
				          key={category.name}
				          value={category.name}>{category.name}</option>
				      ))}
	            </select>
	        </label>


	        <div className="new-post-submit">
	          <input
	            className="new-post-button"
	            type="button"
	            value="Submit"
	            onClick={this.editPostClick.bind(this)} />
	        </div>
	      </form>
	    )
	}
}


const mapStateToProps = ({categoriesReducer, postsReducer}) => ({
     categories: categoriesReducer.categories,
     post: postsReducer.post,
})

const mapDispatchToProps = (dispatch) => {
  return {
  	editPost: (id, post) => dispatch(editPostAction(id, post)),
  	getPost: (id) => dispatch(fetchPostAction(id)),
    getCategories: () => dispatch(fetchCategories()),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(EditPost);