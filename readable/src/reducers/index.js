import { combineReducers } from 'redux'
import { addPostAction, fetchCategories, ADD_POST, GET_CATEGORIES } from "../actions";



const postsReducer = (state = { posts:[] }, action) =>{
	switch(action.type) {
		case ADD_POST :
			return {
		        ...state,
		    	posts: [...state.posts, action.post]
		  	}
		default :
			return state
	}
}

const categoriesReducer = (state = { categories: [] }, action) => {
	switch(action.type) {
		case GET_CATEGORIES :
		  return {
		    ...state,
		    categories: action.categories
		  }
		default:
		  return state
	}
}

export default combineReducers({
	postsReducer,
	categoriesReducer,
})