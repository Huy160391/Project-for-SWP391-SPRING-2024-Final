import { SearchIcon } from '@heroicons/react/solid';
import React from 'react';

const SearchBar = ({ onSearchChange, onSearch }) => {
  return (
    <div className="flex items-center max-w-md mx-auto bg-white rounded-lg border shadow-md overflow-hidden">
      <input
        type="text"
        placeholder="Search..."
        onChange={onSearchChange}
        className="w-full px-4 py-2 text-gray-700 focus:outline-none"
      />
      <button
        onClick={onSearch}
        className="flex items-center justify-center w-12 h-12 text-white bg-blue-500 rounded-r-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
      >
        <SearchIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default SearchBar;
