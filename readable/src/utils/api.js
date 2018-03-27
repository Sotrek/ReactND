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