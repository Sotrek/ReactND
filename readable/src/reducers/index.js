import { combineReducers } from 'redux'
import { ADD_POST, GET_CATEGORIES, GET_ALL_POSTS, EDIT_POST, GET_POST, DELETE_POST, GET_CATEGORY_POSTS, SET_SORTING } from "../actions";



const postsReducer = (state = { posts:[] }, action) =>{
	console.log(action)
	switch(action.type) {
		case ADD_POST :
			return {
		        ...state,
		    	post: action.post
		  	}
		case GET_ALL_POSTS :
		  return {
		    ...state,
		    posts: action.posts
		  }
		case EDIT_POST :
			return {
                ...state,
                ...action.post
	        }
	    case GET_POST :
	    	return {
	    		...state,
	    		post: action.post
	    	}
	    case DELETE_POST :
	    	return {
	    		...state,
	    		[action.id]: {
	    			...state[action.id],
	    			'deleted': true
	    		}
	    	}
	    case GET_CATEGORY_POSTS :
	    	return {
	    		...state,
	    		posts: action.posts
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

const sortingReducer = (state = { sortBy: [] }, action) => {
	switch(action.type) {
		case SET_SORTING :
		  return {
		    ...state,
		    sortBy: action.sortBy
		  }
		default:
		  return state
	}
}

export default combineReducers({
	postsReducer,
	categoriesReducer,
	sortingReducer,
})