import React from "react";
import TDEECalculator from "./TDEECalculator";
import WeightLog from "../Weight/WeightLogger";

interface DashboardProps {
    user: string | null;
}

const Dashboard: React.FC<DashboardProps> = ({user}) => {
    if (!user) {
        return <div>Please log in to view the dashboard.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Welcome, {user}</h1>

            <h2 className="text-xl font-semibold mb-4"></h2>
            <TDEECalculator userId={""}/>

            <h2 className="text-xl font-semibold mt-10 mb-4">Weight Log</h2>
            <WeightLog/>
        </div>
    );
};

export default Dashboard;
