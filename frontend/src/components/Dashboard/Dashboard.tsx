import TDEECalculator from "./TDEECalculator.tsx";
import WeightLog from "../Weight/WeightLogger.tsx";

const Dashboard = ({ user }: { user: string }) => {
  return (
    <div>
      <h1>Welcome, {user}</h1>
      <TDEECalculator />
      <WeightLog />
    </div>
  );
};

export default Dashboard;
