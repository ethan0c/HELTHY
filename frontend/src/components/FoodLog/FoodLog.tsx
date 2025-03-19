import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UserProps } from "../../type.ts";
import { useState } from "react";

export function FoodLog({ user }: UserProps) {
  const [foodItem, setFoodItem] = useState("");
  const [calories, setCalories] = useState("");

  const handleAddFood = async () => {
    try {
      await addDoc(collection(db, "foodLogs"), {
        user: user,
        foodItem: foodItem,
        calories: parseInt(calories),
        timestamp: new Date(),
      });
      setFoodItem("");
      setCalories("");
    } catch (error) {
      console.error("Error adding food log: ", error);
    }
  };

  return (
    <div>
      <h2>Food Log</h2>
      <p>Welcome, {user}</p>
      <input
        type="text"
        value={foodItem}
        onChange={(e) => setFoodItem(e.target.value)}
        placeholder="Food Item"
      />
      <input
        type="number"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
        placeholder="Calories"
      />
      <button onClick={handleAddFood}>Add Food</button>
    </div>
  );
}
