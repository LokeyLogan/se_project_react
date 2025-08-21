const baseUrl = "http://localhost:3001";

const handle = (res) =>
  res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);

const normalize = (item) => ({
  ...item,
  _id: item._id ?? item.id,
  link: item.link ?? item.imageUrl,
});

// GET /items
export function getItems() {
  return fetch(`${baseUrl}/items`)
    .then(handle)
    .then((items) => items.map(normalize));
}

// POST /items
export function addItem({ name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, imageUrl, link: imageUrl, weather }),
  })
    .then(handle)
    .then(normalize);
}

// DELETE /items/:id
export function deleteItem(idOrUnderscoreId) {
  return fetch(`${baseUrl}/items/${idOrUnderscoreId}`, {
    method: "DELETE",
  }).then((res) =>
    res.ok ? Promise.resolve() : Promise.reject(`Error: ${res.status}`)
  );
}
