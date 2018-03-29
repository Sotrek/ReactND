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
  .then(data => data.json())
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
	// console.log(id)
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
  	.then(function(resp){
    resp.json().then(function(data){
      console.log(data);
    })
  })
}