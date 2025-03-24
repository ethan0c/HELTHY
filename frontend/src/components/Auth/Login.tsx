import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

interface LoginProps {
    setUser: (userId: string) => void;
}

const Login: React.FC<LoginProps> = ({setUser}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("handleLogin triggered");

        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password}),
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem("userId", data.userId);
                setUser(data.userId);
                navigate("/dashboard");
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>

                <label className="block text-sm font-medium">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    required
                />

                <label className="block text-sm font-medium">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-2 rounded-md"
                >
                    LOG IN
                </button>

                <p className="text-sm text-center mt-4 text-gray-600">
                    Forgot your password?
                </p>
                <p className="text-sm text-center text-gray-600">
                    Not a member?{" "}
                    <a className="text-emerald-700 underline" href="#">
                        Sign Up
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Login;
