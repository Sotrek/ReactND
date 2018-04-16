import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories, fetchCategoryPostsAction } from '../actions'
import { Link, withRouter } from 'react-router-dom'
import '../App.css';



class MainMenu extends Component {
	componentDidMount(){
		this.props.getCategories();
	}

	render(){
		const { categories=[] } = this.props.categories

		return(
			<div className="main-menu">
				<div className="logo">
					<Link to={`/`}> Readable </Link>
				</div>
				<div className="categories-menu">
					<ul>

						{ categories.map(category =>(
							<button onClick={()=> {
								this.props.history.push(`/${category.name}`);
								this.props.fetchCategoryPosts(category.name)}}
									key={category.name}>
								<li key={category.name}>
									{category.name}
								</li>
							</button>
						))}
					</ul>
				</div>
				<div className="add-post">
		    		<Link to={`/new-post/`}>+ ADD A POST</Link>
		    	</div>
			</div>
		)

	}
}


const mapStateToProps = ({ categories }) => ({
     categories: categories
})

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => dispatch(fetchCategories()),
    fetchCategoryPosts: (category) => dispatch(fetchCategoryPostsAction(category)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainMenu));