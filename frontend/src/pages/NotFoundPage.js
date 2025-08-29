import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-6xl font-bold mb-4">404</h2>
      <p className="text-xl mb-6">Page not found.</p>
      <button
        onClick={() => navigate("/")}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFoundPage;
