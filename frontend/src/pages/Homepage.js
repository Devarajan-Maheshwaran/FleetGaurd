import React from "react";

const HomePage = () => {
  return (
    <div className="max-w-4xl mx-auto text-center mt-20">
      <h2 className="text-4xl font-extrabold mb-4">Welcome to FleetGuard</h2>
      <p className="text-lg text-gray-700 mb-8">
        Monitor your fleet in real-time, detect failures instantly, and recover automatically.
      </p>
      <img
        src="https://img.icons8.com/ios-filled/100/000000/truck.png"
        alt="FleetGuard truck icon"
        className="mx-auto"
      />
    </div>
  );
};

export default HomePage;
s