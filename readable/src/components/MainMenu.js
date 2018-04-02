import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories } from '../actions'
import { Link } from 'react-router-dom'


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
							<Link to={`${category.name}`} key={category.name}>
								<li key={category.name}>
									{category.name}
								</li>
							</Link>
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
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);