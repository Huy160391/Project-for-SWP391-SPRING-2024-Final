// SearchBar.js
import React from 'react';

const SearchBar = ({ onSearchChange, onSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Nhập từ khóa tìm kiếm"
        className="search-input"
        onChange={onSearchChange} // This will call handleSearchChange from AgencyListing.js
      />
      <button className="search-button" onClick={onSearch}>🔍</button> {/* This will call handleSearch from AgencyListing.js */}
    </div>
  );
};

export default SearchBar;
