import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories, fetchCategoryPostsAction } from '../actions'
import { Link, withRouter } from 'react-router-dom'


class MainMenu extends Component {
	componentDidMount(){
		this.props.getCategories();
	}

	render(){
		const { categories=[] } = this.props.categories

		return(
			<div>
				<div>
					<Link to={`/`}> Readable </Link>
				</div>
				<div>
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
				<div>
		    		<Link to={`/new-post/`}>+ ADD POST</Link>
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