import axios from "axios";

const API_URL = "/api/tdee"; // Adjust this to match your backend API endpoint

export const getTDEE = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching TDEE:", error);
    throw error;
  }
};

export const updateTDEE = async (tdeeData: {
  tdee: number;
  age: string;
  weight: string;
  height: string;
  activity: string;
}) => {
  try {
    const response = await axios.post(API_URL, tdeeData);
    return response.data;
  } catch (error) {
    console.error("Error updating TDEE:", error);
    throw error;
  }
};
