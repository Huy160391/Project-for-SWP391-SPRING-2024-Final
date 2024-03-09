import React from 'react';
import './AgencyDetail.css'; // Make sure to create and import the CSS file

const AgencyDetail = () => {
  // Placeholder data. Replace with actual data as necessary.
  const agent = {
    name: 'Alexander Sterling',
    location: 'Quận 1, TP. Hồ Chí Minh',
    phone: '0123456789',
    email: 'abc@gmail.com',
    bio: 'Tham gia chuỗi dự án lớn cửa Vinhomes từ ngày 14/05/2012...',
    listings: [
      // ...populate with actual listing data
    ],
  };

  return (
    <div className="agency-detail">
      <div className="agent-info">
        <img src="/path-to-agent-image.jpg" alt={agent.name} className="agent-photo" />
        <div className="agent-details">
          <h1 className="agent-name">{agent.name}</h1>
          <p className="agent-location">{agent.location}</p>
          <p className="agent-phone">{agent.phone}</p>
          <p className="agent-email">{agent.email}</p>
        </div>
      </div>
      <div className="agent-bio">
        <h2>GIỚI THIỆU</h2>
        <p>{agent.bio}</p>
      </div>
      <div className="agent-listings">
        <h2>DANH SÁCH BÀI ĐĂNG</h2>
        <div className="listings-container">
          {agent.listings.map((listing, index) => (
            <div key={index} className="listing-card">
              <img src={listing.imageUrl} alt="Listing" className="listing-image" />
              <div className="listing-details">
                <h3 className="listing-title">{listing.title}</h3>
                <p className="listing-price">{listing.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgencyDetail;
