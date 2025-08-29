import React from "react";

const SearchBar = ({ placeholder = "Search...", value, onChange }) => {
  return (
    <input
      type="search"
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBar;
