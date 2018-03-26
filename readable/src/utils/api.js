

const BASE_URL = "http://localhost:3001";

let token = localStorage.token

const headers = {
  Authorization: token,
  "Content-Type": "application/json"
};

// GET /categories
export const getAllCategories = () => {
  return fetch(`${BASE_URL}/categories`, { headers })
    .then(response => response.json())
    .then(data => data.categories)
}

// POST /posts
export const addPost = (post) => {
  return fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  })
  .then(data => data.json())
}