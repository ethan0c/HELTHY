import axios from "axios";

export const searchFoods = async (query: string) => {
    const response = await axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search`, {
        params: {
            query,
            api_key: import.meta.env.VITE_USDA_API_KEY,
        }
    });
    return response.data.foods;
};
