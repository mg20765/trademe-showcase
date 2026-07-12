const SESSION_ID = "user-session-id";
const BASE_URL = "http://localhost:5001/api/comparisons";

const handleResponse = async (response) => {
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Request failed: ${response.status} ${errText}`);
  }
  return response.json();
};

// GET /api/comparisons
export const getComparisonList = async () => {
  const response = await fetch(`${BASE_URL}?sessionId=${SESSION_ID}`);
  return handleResponse(response);
};

// POST /api/comparisons
export const addToComparison = async (productId) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId: SESSION_ID, productId }),
  });
  return handleResponse(response);
};

// DELETE /api/comparisons/:productId
export const removeFromComparison = async (productId) => {
  const response = await fetch(
    `${BASE_URL}/${productId}?sessionId=${SESSION_ID}`,
    { method: "DELETE" },
  );
  return handleResponse(response);
};

// DELETE /api/comparisons
export const clearComparison = async () => {
  const response = await fetch(`${BASE_URL}?sessionId=${SESSION_ID}`, {
    method: "DELETE",
  });
  return handleResponse(response);
};
