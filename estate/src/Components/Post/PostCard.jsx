import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const response = await axios.get(`https://localhost:7137/api/Posts/GetImage/${post.postId}`, {
          responseType: 'blob',
        });
        const imageUrl = URL.createObjectURL(response.data);
        setImageSrc(imageUrl);
      } catch (error) {
        console.error('Failed to fetch post image:', error);
        setImageSrc('https://via.placeholder.com/400x300'); // Fallback image
      }
    };

    fetchImageData();
  }, [post.postId]);

  const viewPostDetail = () => {
    navigate(`/postdetail/${post.postId}`);
  };
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString( options);
  };
  return (
    <div className="flex flex-col rounded overflow-hidden shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl m-4">
      <img
        className="w-full object-cover h-48"
        src={imageSrc}
        alt="Post"
        onError={(e) => (e.target.src = "https://via.placeholder.com/400x300")}
      />
      <div className="p-4 bg-white flex-grow">
        <h3 className="font-bold text-xl mb-2">{post.buildingName || `Post ${post.postId}`}</h3>
        <p className="text-gray-700 text-base">
          Ngày đăng: {formatDate(post.postDate)} 
        </p>
        <button
          onClick={viewPostDetail}
          className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition ease-in-out duration-150"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PostCard;
