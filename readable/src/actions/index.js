import { getAllCategories, addPost, getAllPosts, editPost, getPost, deletePost, getCategoryPosts } from '../utils/api'

export const ADD_POST = 'ADD_POST'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const EDIT_POST = 'EDIT_POST'
export const GET_POST = 'GET_POST'
export const DELETE_POST = 'DELETE_POST'
export const GET_CATEGORY_POSTS = 'GET_CATEGORY_POSTS'
export const SET_SORTING = 'SET_SORTING'

export const addPostAction = (post, callback) => dispatch => (
  addPost(post)
    .then(post => {
      dispatch({
        type: ADD_POST,
        post
      })
      callback()
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

export const editPostAction = (id, post,callback) => dispatch => (
	editPost(id,post)
		.then(post => {
			dispatch({
				type: EDIT_POST,
				id,
				post
			})
			callback()
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

export const deletePostAction = (id) => dispatch => (
	deletePost(id)
		.then((id) => {
			console.log(id)
			dispatch({
				type: DELETE_POST,
				id
			})
		})
)

export const fetchCategoryPostsAction = (category) => dispatch => (
	getCategoryPosts(category)
		.then(posts => {
			dispatch({
				type: GET_CATEGORY_POSTS,
				posts
			})
		})
)

export const setSortingAction = (sortBy) => dispatch => (
	dispatch({
		type: SET_SORTING,
		sortBy
	})
)
