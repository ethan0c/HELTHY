import React, {useEffect, useState} from "react";
import {getTDEE, updateTDEE} from "../../api/tdee.api";

interface TDEECalculatorProps {
    userId: string; // The logged-in user's ID
}

function TDEECalculator({userId}: TDEECalculatorProps) {
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [activity, setActivity] = useState("1.2");
    const [tdee, setTdee] = useState<number | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const userData = await getTDEE(userId);
                // Adjust field names to match your backend response
                if (userData) {
                    if (typeof userData.tdee === "number") {
                        setTdee(userData.tdee);
                    }
                    setAge(userData.age || "");
                    setWeight(userData.weight || "");
                    setHeight(userData.height || "");
                    setActivity(userData.activity || "1.2");
                }
            } catch (error) {
                console.error("Error fetching TDEE data:", error);
            }
        }

        // Only fetch if we actually have a userId
        if (userId) {
            fetchData();
        }
    }, [userId]);

    const calculateTDEE = async () => {
        // Basic validation
        if (!age || !weight || !height) {
            alert("Please fill in all fields");
            return;
        }

        // Convert strings to numbers
        const numericAge = parseFloat(age);
        const numericWeight = parseFloat(weight);
        const numericHeight = parseFloat(height);
        const numericActivity = parseFloat(activity);

        // Basic Mifflin-St Jeor formula for males: BMR = 10*W + 6.25*H - 5*A + 5
        const bmr = 10 * numericWeight + 6.25 * numericHeight - 5 * numericAge + 5;
        const totalTDEE = bmr * numericActivity;
        setTdee(totalTDEE);

        try {
            // Send updated TDEE data to the server
            await updateTDEE(userId, totalTDEE, age, weight, height, activity);
        } catch (error) {
            console.error("Error updating TDEE:", error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-2xl shadow-md space-y-4">
            <h2 className="text-2xl font-semibold text-center">TDEE Calculator</h2>

            <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Age"
                className="w-full border border-gray-300 p-2 rounded-lg"
            />

            <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Weight (kg)"
                className="w-full border border-gray-300 p-2 rounded-lg"
            />

            <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Height (cm)"
                className="w-full border border-gray-300 p-2 rounded-lg"
            />

            <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-lg"
            >
                <option value="1.2">Sedentary (little or no exercise)</option>
                <option value="1.375">Lightly active (1-3 days/week)</option>
                <option value="1.55">Moderately active (3-5 days/week)</option>
                <option value="1.725">Very active (6-7 days/week)</option>
                <option value="1.9">Extra active (physical job or 2x training)</option>
            </select>

            <button
                onClick={calculateTDEE}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl font-semibold"
            >
                Calculate TDEE
            </button>

            {tdee !== null && (
                <p className="text-center font-bold text-lg text-green-700">
                    Your TDEE: {Math.round(tdee)} kcal/day
                </p>
            )}
        </div>
    );
}

export default TDEECalculator;
