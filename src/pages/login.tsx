import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onLogin: (userData: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.jwt);
        localStorage.setItem("user", JSON.stringify(data.user));
        onLogin(data.user); // Pass user data back to App for state update
        navigate("/");
      } else {
        setErrorMsg(data.error?.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setErrorMsg("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-cover bg-center">
      <div className="flex-grow flex items-center mt-20 sm:mt-10 justify-center p-8">
        <div className="bg-transparent bg-opacity-20 backdrop-blur-md p-8 rounded-lg shadow-md w-full max-w-sm text-center">
          <h2 className="text-black text-2xl font-bold mb-4">Login</h2>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Username or Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-full bg-white text-gray-700 shadow-md focus:outline-none"
            />
          </div>

          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-full bg-white text-gray-700 shadow-md focus:outline-none"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              👁️
            </button>
          </div>

          {errorMsg && <p className="text-red-600 mb-2">{errorMsg}</p>}

          <button
            className="w-full bg-teal-600 text-white py-3 rounded-full text-lg font-semibold shadow-md"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>

          <p className="mt-4 text-black font-semibold cursor-pointer">
            Forgot your password?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
