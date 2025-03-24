import React, {useState} from "react";
import axios from "axios";
import {UserProps} from "../../type";

// Example interface for the USDA food data
interface USDAFood {
    fdcId: number;
    description: string;
    foodNutrients?: Array<{
        nutrientName: string;
        value: number;
        unitName: string;
    }>;
    // ... other fields from the API if needed
}

// Interface for each logged food entry
interface FoodLogEntry {
    description: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}

export function FoodLog({user}: UserProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<USDAFood[]>([]);
    const [foodLog, setFoodLog] = useState<FoodLogEntry[]>([]);

    // Fetches food data from the USDA API
    const handleSearch = async () => {
        // Optional: avoid empty queries
        if (!searchQuery.trim()) {
            return;
        }
        try {
            const response = await axios.get("https://api.nal.usda.gov/fdc/v1/foods/search", {
                params: {
                    query: searchQuery,
                    api_key: import.meta.env.VITE_USDA_API_KEY, // Use your environment variable
                },
            });
            // "foods" should be an array of USDAFood objects
            setSearchResults(response.data.foods || []);
        } catch (error) {
            console.error("Error fetching foods:", error);
        }
    };

    // Logs a selected food by extracting key nutrients
    const logFood = (food: USDAFood) => {
        // Safely handle missing or undefined foodNutrients
        const nutrientsMap = (food.foodNutrients || []).reduce<Record<string, number>>(
            (acc, curr) => {
                acc[curr.nutrientName] = curr.value;
                return acc;
            },
            {}
        );

        const entry: FoodLogEntry = {
            description: food.description,
            calories: nutrientsMap["Energy"] || 0,
            protein: nutrientsMap["Protein"] || 0,
            carbs: nutrientsMap["Carbohydrate, by difference"] || 0,
            fat: nutrientsMap["Total lipid (fat)"] || 0,
        };

        setFoodLog((prev) => [...prev, entry]);
    };

    // Calculates the sum of a given nutrient in the foodLog
    const total = (key: keyof FoodLogEntry) => {
        return foodLog.reduce((sum, item) => sum + (item[key] || 0), 0);
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold">Search Food</h2>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for foods..."
                    className="border p-2 rounded w-full"
                />
                <button onClick={handleSearch} className="mt-2 bg-emerald-600 text-white px-4 py-2 rounded">
                    Search
                </button>

                {searchResults.length > 0 && (
                    <div className="mt-4">
                        <h3 className="font-medium mb-2">Results:</h3>
                        <ul className="space-y-2">
                            {searchResults.slice(0, 10).map((food) => (
                                <li
                                    key={food.fdcId}
                                    className="border p-2 rounded flex justify-between items-center"
                                >
                                    <span>{food.description}</span>
                                    <button
                                        onClick={() => logFood(food)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded"
                                    >
                                        Log
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div>
                <h2 className="text-xl font-semibold">Daily Intake</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>Calories: {total("calories").toFixed(1)} kcal</div>
                    <div>Protein: {total("protein").toFixed(1)} g</div>
                    <div>Carbs: {total("carbs").toFixed(1)} g</div>
                    <div>Fat: {total("fat").toFixed(1)} g</div>
                </div>
            </div>
        </div>
    );
}
