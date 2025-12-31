const baseUrl = "http://localhost:3001";

const headers = { "Content-Type": "application/json" };

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const getItems = () =>
  fetch(`${baseUrl}/items`, { headers }).then(handleServerResponse);

export function deleteItem(id, token) {
  const authHeaders = {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  };
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: authHeaders,
  }).then(handleServerResponse);
}

export function addItemInfo({ name, imageUrl, weather }, token) {
  const authHeaders = {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  };
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(handleServerResponse);
}

export function addCardLike(id, token) {
  const authHeaders = {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  };
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: authHeaders,
  }).then(handleServerResponse);
}

export function removeCardLike(id, token) {
  const authHeaders = {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  };
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: authHeaders,
  }).then(handleServerResponse);
}
