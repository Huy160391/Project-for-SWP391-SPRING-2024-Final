import React from 'react';

const Pagination = () => {
  return (
    <div className="pagination">
      <span>Showing 1-5 from 100 data</span>
      <div className="pagination-buttons">
        <button>1</button>
        <button>2</button>
        <button>3</button>
        {/* ... more buttons as needed */}
      </div>
    </div>
  );
};

export default Pagination;
