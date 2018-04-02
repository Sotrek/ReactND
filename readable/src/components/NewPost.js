import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPostAction, fetchCategories } from '../actions'
import { uniqueId } from '../utils/helper'

class NewPost extends Component {
	state = {
		title: '',
		body: '',
		author: '',
		category: '',
	}

	componentDidMount(){
		this.props.getCategories();
	}

	newPostClick() {
	    const { title, body, author, category } = this.state
	    console.log(this.state)

	    if (title && body && author && category) {
		  const newPost = {
		    id: uniqueId(),
		    timestamp: Date.now(),
		    title,
		    body,
		    author,
		   	category,
		  }
		  const callback = ()=>{
		  	this.props.history.push('/');
		  }
		  this.props.addPost(newPost, callback)

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
	    const { categories =[] } = this.props.categories

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
	              <option default>Please select a category</option>
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
	            onClick={this.newPostClick.bind(this)} />
	        </div>
	      </form>
	    )
	}
}


const mapStateToProps = ({ categories }) => ({
     categories: categories
})

const mapDispatchToProps = (dispatch) => {
  return {
  	addPost: (post, callback) => dispatch(addPostAction(post, callback)),
    getCategories: () => dispatch(fetchCategories()),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(NewPost);