import { getAllCategories, addPost, getAllPosts, editPost, getPost } from '../utils/api'

export const ADD_POST = 'ADD_POST'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const EDIT_POST = 'EDIT_POST'
export const GET_POST = 'GET_POST'

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

export const editPostAction = (id, post) => dispatch => (
	editPost(id,post)
		.then(post => {
			dispatch({
				type: EDIT_POST,
				id,
				post
			})
		})
)

export const fetchPostAction = (id) => dispatch => (
	getPost(id)
		.then(post => {
			dispatch({
				type: GET_POST,
				post
			})
		})
)
