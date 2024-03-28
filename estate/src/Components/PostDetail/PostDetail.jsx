import { CalendarIcon } from "@heroicons/react/outline";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApartmentCard from "../Property/ApartmentCard";

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [apartments, setApartments] = useState([]);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postResponse = await axios.get(
          `https://localhost:7137/api/Posts/${postId}`
        );
        setPost(postResponse.data);

        if (postResponse.data?.buildingId) {
          const apartmentsResponse = await axios.get(
            `https://localhost:7137/api/Apartments/GetApartmentsByBuildingIDForBooking`,
            {
              params: { buildingId: postResponse.data.buildingId },
            }
          );
          setApartments(apartmentsResponse.data);
        }
      } catch (error) {
        console.error("Failed to fetch post data:", error);
      }
    };

    fetchPostData();
  }, [postId]);

  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const viewAllApartments = () => {
    navigate(`/property/${post.buildingId}`);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-7xl mx-auto px-5 py-10 font-serif">
  <div className="bg-white shadow-xl rounded-lg p-8 mb-10">
    <img
      className="w-full h-80 object-cover mb-6 rounded"
      src={`https://localhost:7137/api/Posts/GetImage/${post.postId}`}
      alt="Post"
      onError={(e) => (e.target.src = "https://via.placeholder.com/400x300")}
    />
    <h2 className="text-4xl font-semibold mb-5">{post.name}</h2>
    <div className="flex items-center mb-5">
      <CalendarIcon className="h-7 w-7 text-gray-600" />
      <p className="ml-3 text-gray-800 text-lg">
        Sales Open: {formatDate(post.salesOpeningDate)} - Close:{" "}
        {formatDate(post.salesClosingDate)}
      </p>
    </div>
    <p className="text-gray-700 text-lg mb-5">{post.description}</p>
  </div>

  <h3 className="text-3xl font-bold text-blue-600 mb-8">Apartments</h3>
  {apartments.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {apartments.slice(0, 3).map((apartment) => (
        <ApartmentCard key={apartment.apartmentId} apartment={apartment} />
      ))}
      <div className="col-span-full text-center mt-8">
        <button
          onClick={viewAllApartments}
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          View All Apartments
        </button>
      </div>
    </div>
  ) : (
    <p className="text-center text-gray-700 text-lg">
      Không có apartment nào đang được đấu giá.
    </p>
  )}
</div>
  );
};

export default PostDetail;
