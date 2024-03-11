// ViewPostPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './DashboardPostTool.css'; // Make sure this CSS file contains all necessary styles
import Sidebar from './Sidebar';

const ViewPostPage = () => {
    const [post, setPost] = useState(null);
    const { postId } = useParams();

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                // Adjust this endpoint as necessary
                const response = await axios.get(`https://localhost:7137/api/Posts/${postId}`);
                setPost(response.data);
            } catch (error) {
                console.error('Error fetching post details:', error);
                // Optionally, handle errors more gracefully here
            }
        };

        fetchPostDetails();
    }, [postId]);

    if (!post) {
        return <div>Loading...</div>;
    }

    // Assuming `post.images` is a string path to the image. If it's an array, adjust accordingly.
    const postImageSrc = post.images.startsWith('http') ? post.images : `https://localhost:7137/${post.images}`;

    return (
        <div className="flex">
            <Sidebar/>
            <div className=" max-w-4xl mx-auto p-4">
                
                <div className="width: 900px bg-white shadow-lg rounded-lg overflow-hidden">
                    <h1 className="mt-3 text-3xl text-center font-bold mb-8 text-gray-800">View Post Detail</h1>
                    <img src={postImageSrc} alt="Post" className="shadow-lg rounded-lg overflow-hidden w-full object-cover h-5/6 rounded-md" />
                    <div className=" p-6">
                        <p className="mb-4 text-lg"><strong className="font-semibold">Description:</strong> {post.description}</p>
                        <p className="mb-4 text-lg"><strong className="font-semibold">Sales Opening Date:</strong> {new Date(post.salesOpeningDate).toLocaleDateString()}</p>
                        <p className="mb-4 text-lg"><strong className="font-semibold">Sales Closing Date:</strong> {new Date(post.salesClosingDate).toLocaleDateString()}</p>
                        <p className="mb-4 text-lg"><strong className="font-semibold">Priority Method:</strong> {post.priorityMethod}</p>
                        <p className="mb-4 text-lg"><strong className="font-semibold">Post ID:</strong> {post.postId}</p>
                        <p className="mb-4 text-lg"><strong className="font-semibold">Building ID:</strong> {post.buildingId}</p>
                        <p className="mb-4 text-lg"><strong className="font-semibold">Agency ID:</strong> {post.agencyId}</p>
                        {/* Include additional post details as needed */}
                    </div>
                    <div className="form-actions text-center py-4">
                        <button onClick={() => window.history.back()} className="mr-10 bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition-all duration-300">
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </div>



    );
};

export default ViewPostPage;
