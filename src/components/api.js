// src/api.js

// Base URL for your Flask backend
// If running locally, Flask default is http://127.0.0.1:5000
const BASE_URL = "http://127.0.0.1:5000";

// Helper function to make GET requests
export async function apiGet(endpoint) {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`GET ${endpoint} failed: ${response.statusText}`);
  }

  return await response.json();
}

// Helper function to make POST requests
export async function apiPost(endpoint, data) {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`POST ${endpoint} failed: ${response.statusText}`);
  }

  return await response.json();
}

// Helper function to make PUT requests
export async function apiPut(endpoint, data) {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`PUT ${endpoint} failed: ${response.statusText}`);
  }

  return await response.json();
}

// Helper function to make DELETE requests
export async function apiDelete(endpoint) {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`DELETE ${endpoint} failed: ${response.statusText}`);
  }

  return await response.json();
}
