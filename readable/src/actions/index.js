import { getAllCategories, addPost, getAllPosts } from '../utils/api'

export const ADD_POST = 'ADD_POST'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_ALL_POSTS = 'GET_ALL_POSTS'

export const addPostAction = (post) => dispatch => (
  addPost(post)
    .then(post => {
      dispatch({
        type: ADD_POST,
        post
      })
    })
)

export const fetchCategories = () => dispatch => (
  getAllCategories()
    .then(categories => {
    	dispatch({
    		type: GET_CATEGORIES,
    		categories
    	})
    })
)

export const fetchAllPosts = () => dispatch => {
	getAllPosts()
		.then(posts => {
			dispatch({
				type: GET_ALL_POSTS,
				posts
			})
		})
}
