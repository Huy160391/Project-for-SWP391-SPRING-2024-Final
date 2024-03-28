// SearchBar.js
import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange, onSearch }) => {
  return (
    <div className="flex items-center font-serif mt-8">
  <input
    type="text"
    value={searchTerm}
    placeholder="Enter search keyword"
    className="border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:border-blue-500"
    onChange={(e) => onSearchChange(e.target.value)}
    onKeyPress={(e) => e.key === 'Enter' && onSearch()}
  />
  <button
    className="bg-blue-500 text-white rounded-r-md px-4 py-2 ml-1 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
    onClick={onSearch}
  >
    🔍
  </button>
</div>

  );
};

export default SearchBar;
