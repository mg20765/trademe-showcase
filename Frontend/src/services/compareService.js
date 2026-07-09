//Temporary until authentication is added
const SESSION_ID = "user-session-id";
const BASE_URL = "http://localhost:5001/api/comparisons"; // Adjust this to your backend URL

const handleResponse = async (response) => {
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Request failed: ${response.status} ${errText}`);
  }
  return response.json();
};
//GET /api/comparison
export const getComparisonList = async () => {
  const response = await fetch(`/api/comparisons?sessionId=${SESSION_ID}`);
  return response.json();
};

//POST /api/comparison
export const addToComparison = async (productId) => {
  const response = await fetch("/api/comparisons", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId: SESSION_ID, productId }),
  });
  return response.json();
};

//DELETE /api/comparison/:productId
export const removeFromComparison = async (productId) => {
  const response = await fetch(
    `/api/comparisons/${productId}?sessionId=${SESSION_ID}`,
    {
      method: "DELETE",
    },
  );
  return response.json();
};

// DELETE /api/comparisons
export const clearComparison = async () => {
  const response = await fetch(`/api/comparisons?sessionId=${SESSION_ID}`, {
    method: "DELETE",
  });
  return response.json();
};
