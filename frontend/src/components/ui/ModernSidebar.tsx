// @ts-ignore
import React from "react";
import {Link, useLocation} from "react-router-dom";
import {Home, UtensilsCrossed, Weight, Settings} from "lucide-react";

const links = [
    {to: "/dashboard", label: "Dashboard", icon: <Home size={20}/>},
    {to: "/food-log", label: "Food Log", icon: <UtensilsCrossed size={20}/>},
    {to: "/weight-log", label: "Weight", icon: <Weight size={20}/>},
    {to: "/settings", label: "Settings", icon: <Settings size={20}/>},
];

const ModernSidebar = () => {
    const location = useLocation();

    return (
        <aside className="h-screen w-64 bg-white shadow-md p-4 flex flex-col">
            <h1 className="text-xl font-bold mb-8">Helthy</h1>
            <nav className="flex flex-col gap-4">
                {links.map(({to, label, icon}) => (
                    <Link
                        key={to}
                        to={to}
                        className={`flex items-center gap-3 p-2 rounded-md transition hover:bg-emerald-100 ${
                            location.pathname === to ? "bg-emerald-200 font-medium" : ""
                        }`}
                    >
                        {icon}
                        {label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
};

export default ModernSidebar;
