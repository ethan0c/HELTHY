import { useState, useEffect } from "react";
import { getTDEE, updateTDEE } from "../../api/tdee.api";

function TDEECalculator() {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState("1.2");
  const [tdee, setTdee] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getTDEE();
        if (userData) {
          setTdee(userData.tdee);
          setAge(userData.age || "");
          setWeight(userData.weight || "");
          setHeight(userData.height || "");
          setActivity(userData.activity || "1.2");
        }
      } catch (error) {
        console.error("Error fetching TDEE data:", error);
      }
    };
    fetchData();
  }, []);

  const calculateTDEE = async () => {
    if (!age || !weight || !height) {
      alert("Please fill in all fields");
      return;
    }

    const bmr = 10 * +weight + 6.25 * +height - 5 * +age + 5;
    const totalTDEE = bmr * +activity;
    setTdee(totalTDEE);

    try {
      await updateTDEE({
        tdee: totalTDEE,
        age,
        weight,
        height,
        activity,
      });
    } catch (error) {
      console.error("Error updating TDEE:", error);
    }
  };

  return (
    <div className="tdee-calculator">
      <h2>TDEE Calculator</h2>
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
        className="input-field"
      />
      <input
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        placeholder="Weight (kg)"
        className="input-field"
      />
      <input
        type="number"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        placeholder="Height (cm)"
        className="input-field"
      />
      <select
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
        className="input-field"
      >
        <option value="1.2">Sedentary (little or no exercise)</option>
        <option value="1.375">
          Lightly active (light exercise 1-3 days/week)
        </option>
        <option value="1.55">
          Moderately active (moderate exercise 3-5 days/week)
        </option>
        <option value="1.725">Very active (hard exercise 6-7 days/week)</option>
        <option value="1.9">
          Extra active (very hard exercise & physical job)
        </option>
      </select>
      <button onClick={calculateTDEE} className="calculate-button">
        Calculate TDEE
      </button>
      {tdee !== null && (
        <p className="result">Your TDEE: {Math.round(tdee)} kcal/day</p>
      )}
    </div>
  );
}

export default TDEECalculator;
