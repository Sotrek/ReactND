import { combineReducers } from 'redux'
import { ADD_POST, GET_CATEGORIES, GET_ALL_POSTS, EDIT_POST, GET_POST, DELETE_POST, GET_CATEGORY_POSTS, SET_SORTING } from "../actions";



const posts = (state = [], action) =>{
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
                post: action.post
	        }
	    case GET_POST :
	    	return {
	    		...state,
	    		post: action.post
	    	}
	    case DELETE_POST :
	    // const post = action.post;
      	// return state.filter(i => i.id !== post.id);
	    	return {
	    		...state
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

const categories = (state = [], action) => {
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

const sortBy = (state = [], action) => {
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
	posts,
	categories,
	sortBy,
})