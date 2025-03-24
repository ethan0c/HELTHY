// @ts-ignore
import React from "react";
import {Routes, Route, Navigate, useLocation} from "react-router-dom";

import Login from "./components/Auth/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import {FoodLog} from "./components/FoodLog/FoodLog";
import WeightLog from "./components/Weight/WeightLogger";
import Settings from "./components/Settings/Settings";
import ModernSidebar from "./components/ui/ModernSidebar";

interface Props {
    user: string | null;
    setUser: (id: string) => void;
}

function AppLayout({user, setUser}: Props) {
    const location = useLocation();
    const isLoginPage = location.pathname === "/";

    return (
        <div className="flex min-h-screen">
            {/* Show sidebar only after login */}
            {!isLoginPage && <ModernSidebar/>}

            <main className="flex-1 bg-gray-50 p-4">
                <Routes>
                    <Route path="/" element={<Login setUser={setUser}/>}/>
                    <Route
                        path="/dashboard"
                        element={user ? <Dashboard user={user}/> : <Navigate to="/" replace/>}
                    />
                    <Route
                        path="/food-log"
                        element={user ? <FoodLog user={user}/> : <Navigate to="/" replace/>}
                    />
                    <Route
                        path="/weight-log"
                        element={user ? <WeightLog/> : <Navigate to="/" replace/>}
                    />
                    <Route
                        path="/settings"
                        element={user ? <Settings user={user}/> : <Navigate to="/" replace/>}
                    />
                </Routes>

            </main>
        </div>
    );
}

export default AppLayout;