// SearchBar.js
import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange, onSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        placeholder="Nhập từ khóa tìm kiếm"
        className="search-input"
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && onSearch()}
      />
      <button className="search-button" onClick={onSearch}>🔍</button>
    </div>
  );
};

export default SearchBar;
