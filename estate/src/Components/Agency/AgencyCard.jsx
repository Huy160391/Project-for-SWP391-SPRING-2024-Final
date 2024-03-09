import React from 'react';

const AgencyCard = ({ firstName, lastName, address, phone, email, image }) => {
  // Combine first name and last name to display full name
  const fullName = `${firstName} ${lastName}`;
  
  return (
    <div className="user-card">
      <img src={image} alt={fullName} className="user-image" />
      <div className="user-info">
        <h2 className="user-name">{fullName}</h2> {/* Display the full name here */}
        <p className="user-address">{address}</p>
        <p className="user-phone">{phone}</p>
        <p className="user-email">{email}</p>
        <button className="contact-button">Liên hệ</button>
      </div>
    </div>
  );
};

export default AgencyCard;
