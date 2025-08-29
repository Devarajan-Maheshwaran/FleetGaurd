import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const fakeUserDB = {
  admin: "password123",
  driver1: "driverpass",
};

const LoginPage = ({ user, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (user) {
    navigate("/dashboard");
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (fakeUserDB[username] && fakeUserDB[username] === password) {
      setUser({ username });
      navigate("/dashboard");
    } else {
      setError("Invalid credentials.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Driver Login</h2>
      {error && <p className="text-red-600 mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          type="text"
          placeholder="Username"
          className="w-full p-3 border border-gray-300 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
