import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:1337/api/auth/local/register",
        {
          username: name,
          email,
          password,
        }
      );

      // Save token or user data if needed
      localStorage.setItem("user", JSON.stringify(res.data));

      // Redirect to homepage
      navigate("/");
    } catch (err: any) {
      console.error("Registration failed:", err.response?.data || err);
      setError(err.response?.data?.error?.message || "Registration failed");
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleRegister}
          className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-6"
            required
          />
          {error && (
            <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
