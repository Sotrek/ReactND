const BASE_URL = "http://localhost:3001";

let token = localStorage.token

const headers = {
  Authorization: token,
  "Content-Type": "application/json"
};

// GET /categories - for getAllCategories
export const getAllCategories = () => {
  return fetch(`${BASE_URL}/categories`, { headers })
    .then(response => response.json())
    .then(data => data.categories)
}

// POST /posts - for addPost
export const addPost = (post) => {
  return fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      ...headers
    },
    body: JSON.stringify(post)
  })
  .then(response => response.json())
}

//GET /posts - for getAllPosts
export const getAllPosts = () => {
  return fetch(`${BASE_URL}/posts`, { headers })
    .then(response => response.json())
}

// PUT /posts/:id - for editPost
export const editPost = (id, post) => {
  return fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers
    },
    body: JSON.stringify(post)
  })
  .then(response => response.json())
}

// GET /posts/:id - for getPost
export const getPost = (id) => {
  return fetch(`${BASE_URL}/posts/${id}`, { headers })
    .then(response => response.json())
}

// DELETE /posts/:id for deletePost
export const deletePost = (id) => {
  return fetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers
    },
  })
  	.then(response => response.json())
  	.then(res => res.id)

}

// GET /:category for getCategoryPosts
export const getCategoryPosts = (category) => {
	return fetch(`${BASE_URL}/${category}/posts`, { headers })
	.then(response => response.json())
}

// POST /posts/:id - for VotePost
export const VotePost = (id, option) => {
  return fetch(`${BASE_URL}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers
    },
    body: JSON.stringify({
      option: option
    })
  })
  .then(response => response.json())
}


// POST /comments - for addComment
export const addComment = (comment) => {
	return fetch(`${BASE_URL}/comments`, {
		method: 'POST',
		headers: {
      		...headers
    	},
    	body: JSON.stringify({
	      id: `${comment.id}`, timestamp: `${comment.timestamp}`, body: `${comment.body}`, author: `${comment.author}`, parentId: `${comment.parentId}`
	    })
    })
    .then(response => response.json())
}

// GET /posts/:id/comments - for getComments
export const getComments = (id) => {
  return fetch(`${BASE_URL}/posts/${id}/comments`, { headers })
    .then(response => response.json())
}

// DELETE /comments/:id - for deleteComment
export const deleteComment = (id) => {
  return fetch(`${BASE_URL}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers
    },
  })
  .then(response => response.json())
}

// PUT /comments/:id - for editComment
export const editComment = (id, comment) => {
  return fetch(`${BASE_URL}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers
    },
    body: JSON.stringify(comment)
  })
  .then(response => response.json())
}

// POST /comments/:id - for VoteComment
export const VoteComment = (id, option) => {
  return fetch(`${BASE_URL}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers
    },
    body: JSON.stringify({
      option: option
    })
  })
  .then(response => response.json())
}

