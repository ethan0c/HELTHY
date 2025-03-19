export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Login failed");

    return data.userId; // Return the user ID from backend
  } catch (error: any) {
    throw new Error(error.message);
  }
};
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function login(email: string, password: string) {
  return fetch(`${API_BASE_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
}

export async function register(email: string, password: string) {
  return fetch(`${API_BASE_URL}/api/register`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}
