// auth.api.ts

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

/**
 * Log in a user by email and password.
 *
 * @param email - User's email
 * @param password - User's password
 * @returns The user ID (or throws an error if login fails)
 */
export async function loginUser(email: string, password: string): Promise<string> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password}),
        });

        const data = await response.json();

        if (!response.ok) {
            // The backend might send { message: "..." }
            const message = data?.message || "Login failed";
            throw new Error(message);
        }

        // Assuming the server returns { userId: "..." }
        return data.userId;
    } catch (error: any) {
        throw new Error(error.message || "Network or server error");
    }
}

/**
 * Register a new user with email and password.
 *
 * @param email - New user's email
 * @param password - New user's password
 * @returns The server's response (could be a success message or user object)
 */
export async function registerUser(email: string, password: string) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/register`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password}),
        });

        const data = await response.json();

        if (!response.ok) {
            const message = data?.message || "Registration failed";
            throw new Error(message);
        }

        return data; // Could be { success: true, userId: ... } or similar
    } catch (error: any) {
        throw new Error(error.message || "Network or server error");
    }
}
