import axios, {AxiosError} from "axios";

/**
 * Create a reusable Axios instance with the base URL.
 * If you deploy your backend to another domain, just update `baseURL`.
 */
const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
});

/**
 * Shape of the request body for updating TDEE.
 * Adjust types to match your server-side expectations (e.g., number vs. string).
 */
export interface TDEEData {
    userId: string;
    tdee: number;
    age: string;
    weight: string;
    height: string;
    activity: string;
}

/**
 * Shape of the server's TDEE response.
 * Customize fields if your server returns different data.
 */
export interface TDEEResponse {
    success?: boolean;
    message?: string;
    data?: {
        userId?: string;
        weight?: string;
        height?: string;
        age?: string;
        activity?: string;
        tdeeValue?: number;
    };

    [key: string]: any; // Allow extra fields
}

/**
 * Fetch the TDEE for a specific user.
 * @param userId - The user ID to fetch TDEE for.
 * @returns The server's JSON response (or throws an error).
 */
export async function getTDEE(userId: string): Promise<TDEEResponse> {
    try {
        const response = await axiosInstance.get<TDEEResponse>("/api/tdee", {
            params: {userId},
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching TDEE:", error);
        // Re-throw so callers can handle it
        throw error;
    }
}

/**
 * Update or set the TDEE value for a user.
 * @param tdeeData - An object containing userId, tdee, age, weight, height, and activity.
 * @returns The server's JSON response (or throws an error).
 */
export async function updateTDEE(tdeeData: TDEEData): Promise<TDEEResponse> {
    try {
        const response = await axiosInstance.post<TDEEResponse>("/api/tdee", tdeeData);
        return response.data;
    } catch (error) {
        // Optionally, you can cast to AxiosError for more specific handling
        if (error instanceof AxiosError) {
            console.error("Axios error updating TDEE:", error.response?.data || error.message);
        } else {
            console.error("Error updating TDEE:", error);
        }
        throw error;
    }
}
