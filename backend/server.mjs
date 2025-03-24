import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Mock "database"
const users = [{email: "test@example.com", password: "123456", id: "1"}];

// Array of weight logs: { userId, weight, date }
let weightLogs = [];

// TDEE data: { [userId]: { weight, height, age, tdeeValue } }
let userTDEE = {};

// Root route
app.get("/", (req, res) => {
    res.send("Hello from the backend!");
});

/*
  1) USDA Food Search (Placeholder)
     Replace api.example.com with the real USDA endpoint:
     https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&api_key=YOUR_KEY
*/
async function searchFoods(query) {
    try {
        if (!query) return [];
        const response = await fetch(
            `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(query)}&api_key=${process.env.USDA_API_KEY}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching food data:", error);
        return [];
    }
}

// Food search route
app.get("/api/food", async (req, res) => {
    try {
        const {query} = req.query;
        const results = await searchFoods(query);
        res.json(results);
    } catch (err) {
        console.error("Error in /api/food route:", err);
        res.status(500).json({error: "Server error"});
    }
});

/*
  2) Basic Login (NOT secure in production)
     For real-world, use JWT or session-based auth.
*/
app.post("/api/login", (req, res) => {
    const {email, password} = req.body;
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
        // Return user ID for the client to store
        res.json({success: true, userId: user.id});
    } else {
        res.status(401).json({success: false, message: "Invalid credentials"});
    }
});

/*
  3) Weight Log Endpoints
     GET /api/weight-logs  -> returns all logs (for demo)
     POST /api/add-weight   -> adds a log for user "1" (demo only)
*/
app.get("/api/weight-logs", (req, res) => {
    res.json(weightLogs);
});

app.post("/api/add-weight", (req, res) => {
    const {weight, date} = req.body;
    if (!weight || !date) {
        return res.status(400).json({success: false, message: "Missing fields"});
    }

    // For now, we’ll assume it's user 1
    const userId = "1";
    const newLog = {userId, weight, date};
    weightLogs.push(newLog);

    res.status(201).json({success: true, log: newLog});
});

/*
  4) TDEE Endpoints
     GET /api/tdee?userId=xxx -> retrieve or mock TDEE
     POST /api/tdee -> calculate/store TDEE
*/

// GET TDEE
app.get("/api/tdee", (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
        return res.status(400).json({error: "Missing userId"});
    }

    // If we have stored TDEE, return it; otherwise, just a placeholder
    const tdeeInfo = userTDEE[userId];
    if (!tdeeInfo) {
        return res.json({message: `No TDEE data found for user ${userId}`});
    }

    res.json({success: true, data: tdeeInfo});
});

// POST TDEE
app.post("/api/tdee", (req, res) => {
    const {userId, weight, height, age} = req.body;
    if (!userId || !weight || !height || !age) {
        return res.status(400).json({error: "Missing required fields"});
    }

    // Simple Mifflin-St Jeor TDEE formula (male example)
    // TDEE = 10 * weight(kg) + 6.25 * height(cm) - 5 * age + 5
    const tdeeValue = 10 * weight + 6.25 * height - 5 * age + 5;

    // Store it in our in-memory object
    userTDEE[userId] = {
        weight,
        height,
        age,
        tdeeValue,
    };

    res.json({
        success: true,
        data: userTDEE[userId],
        message: "TDEE updated successfully",
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
