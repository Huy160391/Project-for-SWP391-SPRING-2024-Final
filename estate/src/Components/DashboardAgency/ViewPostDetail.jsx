import React from 'react';
import './a.css'; // Make sure to create a CSS file for styling

const ViewPostDetail = () => {
  // Placeholder data, you should replace this with actual data fetched from your backend
  const postDetails = {
    title: "Căn hộ Vinhomes Grand Park",
    description: "Welcome to Oceanview Retreat, an exquisite beachfront property located in the vibrant city of Miami, Florida...",
    bedrooms: 4,
    bathrooms: 4,
    price: "$2000",
    status: "Đang bán",
    address: "123 Oceanview Drive, Miami, FL 12345",
    images: [
      // Paths to images or URLs
      "/path-to-image-1.jpg",
      "/path-to-image-2.jpg",
      "/path-to-image-3.jpg",
    ],
  };

  return (
    <div className="view-post-detail-container">
      <h1>View Post Detail</h1>
      <div className="post-detail-header">
        <img src={postDetails.images[0]} alt="Main" className="main-image" />
        <div className="post-detail-info">
          <h2>{postDetails.title}</h2>
          <p>{postDetails.description}</p>
          <div className="property-info">
            <div>Number of floor: {postDetails.bedrooms}</div>
            <div>Number of apartments: {postDetails.bathrooms}</div>
            <div>Price: {postDetails.price}</div>
            <div>Status: {postDetails.status}</div>
            <div>Address: {postDetails.address}</div>
          </div>
          <button className="edit-button">Edit</button>
        </div>
      </div>
      <div className="post-images">
        {postDetails.images.map((image, index) => (
          <img key={index} src={image} alt={`Property ${index}`} className="property-image" />
        ))}
      </div>
    </div>
  );
};

export default ViewPostDetail;
