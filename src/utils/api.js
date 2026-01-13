const baseUrl = "http://localhost:3001";

export const handle = (res) =>
  res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);

const normalize = (item) => ({
  ...item,
  _id: item._id ?? item.id,
  link: item.link ?? item.imageUrl, // front-end display only
});

// GET /items (no token)
export function getItems() {
  return fetch(`${baseUrl}/items`)
    .then(handle)
    .then((items) => items.map(normalize));
}

// POST /items (token required) — DO NOT send link
export function addItem({ name, imageUrl, weather }, token) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  })
    .then(handle)
    .then(normalize);
}

// DELETE /items/:id (token required)
export function deleteItem(id, token) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) =>
    res.ok ? Promise.resolve() : Promise.reject(`Error: ${res.status}`)
  );
}

// PATCH /users/me (token required)
export function updateProfile({ name, avatar }, token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(handle);
}

// PUT /items/:id/likes (token required)
export function addCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then(handle)
    .then(normalize);
}

// DELETE /items/:id/likes (token required)
export function removeCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then(handle)
    .then(normalize);
}
