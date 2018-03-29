import { combineReducers } from 'redux'
import { ADD_POST, GET_CATEGORIES, GET_ALL_POSTS, EDIT_POST, GET_POST, DELETE_POST } from "../actions";



const postsReducer = (state = { posts:[] }, action) =>{
	switch(action.type) {
		case ADD_POST :
			return {
		        ...state,
		    	posts: [...state.posts, action.post]
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
	    		post: action.post
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