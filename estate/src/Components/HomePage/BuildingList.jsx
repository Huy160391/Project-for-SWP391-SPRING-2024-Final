import React from "react";

const BuildingList = () => {
  return (
    <div className="relative mt-24 text-center" style={{ top: '855px' }}>
      <h1 className="text-3xl font-bold mb-10">List Building</h1>
      <div className="flex justify-center space-x-4">
        <div className="building-list-item">
          <img src="/property-10.jpg" alt="" className="w-64 h-40 object-cover rounded-lg shadow-lg" />
          <h3 className="mt-2 text-lg font-semibold">Name</h3>
        </div>
        <div className="building-list-item">
          <img src="/property-10.jpg" alt="" className="w-64 h-40 object-cover rounded-lg shadow-lg" />
          <h3 className="mt-2 text-lg font-semibold">Name</h3>
        </div>
        <div className="building-list-item">
          <img src="/property-10.jpg" alt="" className="w-64 h-40 object-cover rounded-lg shadow-lg" />
          <h3 className="mt-2 text-lg font-semibold">Name</h3>
        </div>
      </div>
    </div>
  );
};

export default BuildingList;
