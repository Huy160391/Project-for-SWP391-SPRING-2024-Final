import { CalendarIcon } from '@heroicons/react/outline';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [apartments, setApartments] = useState([]);
  const { postId } = useParams();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postResponse = await axios.get(`https://localhost:7137/api/Posts/${postId}`);
        setPost(postResponse.data);
        console.log(postResponse.data);
        // If the post has a buildingId, fetch the apartments
        if (postResponse.data?.buildingId) {
          const apartmentsResponse = await axios.get(`https://localhost:7137/api/Apartments/GetApartmentsByBuildingIDForBooking`, {
            params: { buildingId: postResponse.data.buildingId }
          });
          console.log(`Building ID sent: ${postResponse.data.buildingId}`);
  
          setApartments(apartmentsResponse.data);
        }
      } catch (error) {
        console.error("Failed to fetch post data:", error);
      }
    };

    fetchPostData();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>; // Loading state
  }

  // Assuming your post object has an 'images' property that's an array
  const mainImageUrl = post.images?.[0] || 'default-image-path.jpg';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <img className="w-full h-64 object-cover mb-4" src={mainImageUrl} alt="Post" />
        <h2 className="text-3xl font-bold mb-4">{post.name}</h2>
        <div className="flex items-center mb-4">
          <CalendarIcon className="h-6 w-6 text-gray-500" />
          <p className="ml-2 text-gray-700 text-sm">
            Sales Open: {post.salesOpeningDate} - Close: {post.salesClosingDate}
          </p>
        </div>
        <p className="text-gray-700 mb-4">{post.description}</p>
      </div>

      <h3 className="text-2xl font-bold mb-4">Apartments</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {apartments.map(apartment => (
          <div key={apartment.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img className="w-full h-48 object-cover" src={apartment.imageUrl} alt={apartment.title} />
            <div className="p-4">
              <h4 className="font-bold">{apartment.title}</h4>
              <p className="text-gray-800">{apartment.price}</p>
              {/* You can add more apartment details here as needed */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetail;
