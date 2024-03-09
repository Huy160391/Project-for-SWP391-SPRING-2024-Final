import React, { useState } from 'react';
import './post.css'; // Ensure you have a corresponding CSS file

const EditPost = () => {
  // State for the form inputs
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    address: '',
    status: 'Đang Bán', // Assuming this is the default value
  });

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement the logic to handle form submission
    console.log(formData);
  };

  return (
    <div className="edit-post-container">
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit} className="edit-post-form">
        <div className="form-section">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-section">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="text"
            value={formData.price}
            onChange={handleChange}
          />

          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Đang Bán">Đang Bán</option>
            <option value="Đã Bán">Đã Bán</option>
            {/* Add more options as needed */}
          </select>
        </div>

        {/* Repeat similar blocks for 'area', 'bedrooms', 'bathrooms', and 'address' */}

        <div className="form-section">
          {/* Implement file upload logic here */}
          <label htmlFor="image-upload">Upload Property Image</label>
          <input
            id="image-upload"
            type="file"
            onChange={handleChange}
            multiple
          />
          {/* You would need to handle file uploads separately */}
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-button">Cancel</button>
          <button type="submit" className="save-button">Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
