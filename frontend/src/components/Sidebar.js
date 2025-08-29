import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ user }) => {
  return (
    <div className="w-64 bg-white border-r border-gray-300 flex flex-col">
      <div className="p-6 font-bold text-xl border-b border-gray-300">
        FleetGuard
      </div>
      <nav className="flex flex-col p-4 space-y-2 flex-grow">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `p-3 rounded font-semibold ${
              isActive ? "bg-blue-500 text-white" : "text-gray-700"
            }`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/vehicles"
          className={({ isActive }) =>
            `p-3 rounded font-semibold ${
              isActive ? "bg-blue-500 text-white" : "text-gray-700"
            }`
          }
        >
          Vehicles
        </NavLink>
        <NavLink
          to="/drivers"
          className={({ isActive }) =>
            `p-3 rounded font-semibold ${
              isActive ? "bg-blue-500 text-white" : "text-gray-700"
            }`
          }
        >
          Drivers
        </NavLink>
        {!user && (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `p-3 rounded font-semibold ${
                isActive ? "bg-blue-500 text-white" : "text-gray-700"
              }`
            }
          >
            Login
          </NavLink>
        )}
      </nav>
      <div className="p-4 text-gray-500 text-xs text-center border-t border-gray-300">
        FleetGuard &copy; 2025
      </div>
    </div>
  );
};

export default Sidebar;
