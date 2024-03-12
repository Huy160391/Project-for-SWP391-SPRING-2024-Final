import React from 'react';
import { useNavigate } from 'react-router-dom'; // For React Router v6

const PostCard = ({ post }) => {
  const navigate = useNavigate(); // Hook for navigation
  const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';
  const imageUrl = `${baseURL}/${post.images}`;

  const viewPostDetail = () => {
    navigate(`/postdetail/${post.postId}`); // Navigate to post detail page
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
      <img className="w-full h-48 object-cover" src={imageUrl} alt="Post" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{post.buildingName}</div>
        <p className="text-gray-700 text-base">
          {post.description}
        </p>
        {/* Button to navigate to post detail */}
        <button
          onClick={viewPostDetail}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PostCard;
