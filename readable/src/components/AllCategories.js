import React, { Component } from 'react';
import Post from './Post';



class AllCategories extends Component {

	render(){
		//destructuring the component `props` object into its individual variables
		const {posts} = this.props;

		//getting the posts that belong in each category and assigning them to the variables
		// const currentPost = posts.filter((post) => post.category === "currentlyReading");

		return (
			<div className="list-view">
				<p>List of all categories posts</p>
				<Post/>
			</div>
		);
	}
}


export default AllCategories