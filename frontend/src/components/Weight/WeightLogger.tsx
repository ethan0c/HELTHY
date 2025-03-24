// @ts-ignore
import React, {useState, useEffect} from "react";
import {Line} from "react-chartjs-2";
import "../../utils/chartSetup"; // ensure this is loaded once in your app

function WeightLogger() {
    const [weightLogs, setWeightLogs] = useState<{ weight: number; date: string }[]>([]);

    // Fetch weight logs from the backend
    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/weight-logs");
                const data = await response.json();
                setWeightLogs(data);
            } catch (error) {
                console.error("Error fetching weight logs:", error);
            }
        };
        fetchLogs();
    }, []);

    // Add a new weight entry
    const addWeight = async (weight: number) => {
        const newLog = {weight, date: new Date().toISOString()};

        try {
            const response = await fetch("http://localhost:5000/add-weight", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newLog),
            });

            if (response.ok) {
                setWeightLogs((prevLogs) => [...prevLogs, newLog]);
            } else {
                console.error("Failed to add weight entry.");
            }
        } catch (error) {
            console.error("Error adding weight:", error);
        }
    };

    const data = {
        labels: weightLogs.map((log) => new Date(log.date).toLocaleDateString()),
        datasets: [
            {
                label: "Weight (kg)",
                data: weightLogs.map((log) => log.weight),
                borderColor: "rgba(99, 102, 241, 1)",
                backgroundColor: "rgba(99, 102, 241, 0.2)",
                tension: 0.4,
                fill: true,
                pointRadius: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: "white",
                },
            },
            title: {
                display: true,
                text: "Weight Progression",
                color: "white",
            },
        },
        scales: {
            x: {
                ticks: {color: "white"},
                grid: {color: "rgba(255,255,255,0.1)"},
            },
            y: {
                ticks: {color: "white"},
                grid: {color: "rgba(255,255,255,0.1)"},
            },
        },
    };

    return (
        <div className="p-4 bg-gray-900 rounded-xl shadow-md text-white">
            <button
                onClick={() => addWeight(75)}
                className="mb-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded"
            >
                Add Weight
            </button>

            <Line data={data} options={options}/>
        </div>
    );
}

export default WeightLogger;
