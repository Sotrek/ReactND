import { getAllCategories, addPost } from '../utils/api'

export const ADD_POST = 'ADD_POST'
export const GET_CATEGORIES = 'GET_CATEGORIES'

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
