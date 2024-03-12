import { CalendarIcon } from '@heroicons/react/outline';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ApartmentCard from '../Property/ApartmentCard';

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [apartments, setApartments] = useState([]);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postResponse = await axios.get(`https://localhost:7137/api/Posts/${postId}`);
        setPost(postResponse.data);

        if (postResponse.data?.buildingId) {
          const apartmentsResponse = await axios.get(`https://localhost:7137/api/Apartments/GetApartmentsByBuildingIDForBooking`, {
            params: { buildingId: postResponse.data.buildingId }
          });
          setApartments(apartmentsResponse.data);
        }
      } catch (error) {
        console.error("Failed to fetch post data:", error);
      }
    };

    fetchPostData();
  }, [postId]);

  if (!post) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const viewAllApartments = () => {
    navigate(`/property/${post.buildingId}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <img 
          className="w-full h-64 object-cover mb-4" 
          src={`https://localhost:7137/api/Posts/GetImage/${post.postId}`} 
          alt="Post" 
          onError={(e) => (e.target.src = "https://via.placeholder.com/400x300")} 
        />
        <h2 className="text-3xl font-bold mb-4">{post.name}</h2>
        <div className="flex items-center mb-4">
          <CalendarIcon className="h-6 w-6 text-gray-500" />
          <p className="ml-2 text-gray-700 text-sm">
            Sales Open: {post.salesOpeningDate} - Close: {post.salesClosingDate}
          </p>
        </div>
        <p className="text-gray-700 mb-4">{post.description}</p>
      </div>

      <h3 className="text-3xl font-bold text-blue-500 mb-6">Apartments</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {apartments.slice(0, 3).map(apartment => (
          <ApartmentCard key={apartment.apartmentId} apartment={apartment} />
        ))}
      </div>
      {apartments.length > 0 && (
        <div className="text-center mt-6">
          <button
            onClick={viewAllApartments}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          >
            View All Apartments
          </button>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
