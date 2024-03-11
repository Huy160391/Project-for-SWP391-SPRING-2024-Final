import React from 'react';

const AgentsSection = () => {
    return (
        <div className="agency" style={{position:'absolute', top:'1600px', marginTop: '100px', textAlign:'center'}}>
          <h1>List Agency</h1>
          <div className="agencylist">
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

export default AgentsSection;
