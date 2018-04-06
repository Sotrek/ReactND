import { combineReducers } from 'redux'
import { ADD_POST, GET_CATEGORIES, GET_ALL_POSTS, EDIT_POST, GET_POST, DELETE_POST, GET_CATEGORY_POSTS, SET_SORTING,
			UP_VOTE_POST, DOWN_VOTE_POST, UP_VOTE_POST_DETAIL, DOWN_VOTE_POST_DETAIL,
			ADD_COMMENT, GET_COMMENTS, DELETE_COMMENT, EDIT_COMMENT, UP_VOTE_COMMENT, DOWN_VOTE_COMMENT
		} from "../actions";



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
	    case DELETE_POST : {
	    	console.log(state)
	    	const { posts } = state;
	    	const updatedState = posts.filter(post => post.id !== action.id)

	    	return {
	    		posts: updatedState
	    	}
	    }
	    case GET_CATEGORY_POSTS :
	    	return {
	    		...state,
	    		posts: action.posts
	    	}
	    case UP_VOTE_POST: {
	      	const { posts } = state;
	      	const currentPostUpVote = [...state.posts]

	      	const index = posts.findIndex(post => post.id === action.id)

	      	currentPostUpVote[index].voteScore += 1
		    return {
		        posts: [...currentPostUpVote]
		    }
	    }
	    case DOWN_VOTE_POST: {
		    const { posts } = state;
	      	const currentPostDownVote = [...state.posts]

	      	const index = posts.findIndex(post => post.id === action.id)

	      	currentPostDownVote[index].voteScore -= 1
		    return {
		        posts: [...currentPostDownVote]
		    }
	    }
	     case UP_VOTE_POST_DETAIL: {
	      	const { post=[] } = state;
	      	console.log(post)

	     	post.voteScore += 1;

		    return {
		        post: post
		    }
	    }
	    case DOWN_VOTE_POST_DETAIL: {
		 	const { post=[] } = state;
	      	console.log(post)

	     	post.voteScore -= 1;

		    return {
		        post: post
		    }
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

const comments = (state = [], action) => {
	switch(action.type) {
		case ADD_COMMENT :
			return {
			  ...state,
			  comment: action.comment
			}
		case GET_COMMENTS :
		  return {
		    ...state,
		    comments: action.comments
		  }
		case DELETE_COMMENT :
			console.log(state)
			return {
				...state,
				comment: action.comment
			}
		case EDIT_COMMENT :

			return {
				...state,
				comments: action.comments
			}
		 case UP_VOTE_COMMENT: {
	      	const { comment=[] } = state;
	      	console.log(comment)

	     	comment.voteScore += 1;

		    return {
		        comment: comment
		    }
	    }
	    case DOWN_VOTE_COMMENT: {
		 	const { comment=[] } = state;
	      	console.log(comment)

	     	comment.voteScore -= 1;

		    return {
		        comment: comment
		    }
	    }
		default:
			return state
	}
}

export default combineReducers({
	posts,
	categories,
	sortBy,
	comments,
})