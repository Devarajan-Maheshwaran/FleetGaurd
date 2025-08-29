import React, { useContext } from "react";
import { SocketContext } from "../App";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const { alerts } = useContext(SocketContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between bg-white px-6 py-3 border-b border-gray-300">
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>
        FleetGuard IoT
      </h1>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            type="button"
            className="inline-block rounded-full bg-red-600 px-3 py-1 text-sm font-semibold text-white"
            title="Alerts"
          >
            Alerts: {alerts.length}
          </button>
        </div>

        {user ? (
          <>
            <span className="text-gray-600">Hello, {user.username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
