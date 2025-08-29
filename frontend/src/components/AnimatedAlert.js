import React from "react";

const AnimatedAlert = ({ message }) => {
  return (
    <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded shadow-md animate-fade-in-down">
      {message}
    </div>
  );
};

export default AnimatedAlert;
