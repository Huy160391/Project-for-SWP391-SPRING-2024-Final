// LatestProperties.js
import React from "react";
import './home.css';
const BuildingList = () => {
  return (
    <div className="building" style={{position:'absolute', top:'855px', marginTop: '100px', textAlign:'center'}}>
      <h1>List Building</h1>
      <div className="buildinglist">
        <div className="image"><img src="/property-10.jpg" alt="" />
        <h3>Name</h3>
        </div>
        <div className="image"><img src="/property-10.jpg" alt="" />
        <h3>Name</h3>
        </div>
        <div className="image"><img src="/property-10.jpg" alt="" />
        <h3>Name</h3>
        </div>
      </div>
    </div>
  );
};

export default BuildingList;
