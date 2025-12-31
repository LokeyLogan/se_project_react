const baseUrl = "http://localhost:3001";

export const handle = (res) =>
  res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);

const normalize = (item) => ({
  ...item,
  _id: item._id ?? item.id,
  link: item.link ?? item.imageUrl,
});

// GET /items (NO TOKEN)
export function getItems() {
  return fetch(`${baseUrl}/items`)
    .then(handle)
    .then((items) => items.map(normalize));
}

// POST /items (TOKEN REQUIRED)
export function addItem({ name, imageUrl, weather }, token) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, link: imageUrl, weather }),
  })
    .then(handle)
    .then(normalize);
}

// DELETE /items/:id (TOKEN REQUIRED)
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

// PATCH /users/me (TOKEN REQUIRED)
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

// PUT /items/:id/likes (TOKEN REQUIRED)
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

// DELETE /items/:id/likes (TOKEN REQUIRED)
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
