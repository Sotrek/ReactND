import { combineReducers } from 'redux'
import { ADD_POST, GET_CATEGORIES, GET_ALL_POSTS } from "../actions";



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

const allPostsReducer = (state = { posts: [] }, action) => {
	switch(action.type) {
		case GET_ALL_POSTS :
		  return {
		    ...state,
		    posts: action.posts
		  }
		default:
		  return state
	}
}




export default combineReducers({
	postsReducer,
	categoriesReducer,
	allPostsReducer
})