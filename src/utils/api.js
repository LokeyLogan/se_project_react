// src/utils/api.js
const baseUrl = "http://127.0.0.1:3001";

const handle = (res) =>
  res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);

/** Normalize server items so UI can rely on:
 * - `_id` (fallbacks to `id`)
 * - `link` (fallbacks to `imageUrl`)
 */
const normalizeItems = (items) =>
  items.map((it) => ({
    ...it,
    _id: it._id ?? it.id, // support json-server 'id'
    link: it.link ?? it.imageUrl, // support both fields
  }));

export const getItems = () =>
  fetch(`${baseUrl}/items`).then(handle).then(normalizeItems);

export const addItem = ({ name, imageUrl, weather }) => {
  const body = { name, link: imageUrl, imageUrl, weather };
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then(handle)
    .then((created) => normalizeItems([created])[0]);
};

export const deleteItem = (idOrUnderscoreId) =>
  fetch(`${baseUrl}/items/${idOrUnderscoreId}`, { method: "DELETE" }).then(
    (res) =>
      res.ok ? Promise.resolve() : Promise.reject(`Error: ${res.status}`)
  );
