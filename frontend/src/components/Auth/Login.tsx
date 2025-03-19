import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser as login } from "../../api/auth.api";

interface LoginProps {
  setUser: (user: string) => void;
}

function Login({ setUser }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      if (response.success) {
        setUser(response.userId);
        navigate("/dashboard");
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="input-field"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="input-field"
      />
      <button onClick={handleLogin} className="auth-button">
        Login
      </button>
    </div>
  );
}

export default Login;
