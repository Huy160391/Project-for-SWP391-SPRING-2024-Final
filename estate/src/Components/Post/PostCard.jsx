import React from 'react';

const PostCard = ({ post }) => {
  // Assuming the base URL for your images
  const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:7137';
  const imageUrl = `${baseURL}/${post.images}`;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
      <img className="w-full h-48 object-cover" src={imageUrl} alt="Post" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Post #{post.postId}</div>
        <p className="text-gray-700 text-base">
          {post.description}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
