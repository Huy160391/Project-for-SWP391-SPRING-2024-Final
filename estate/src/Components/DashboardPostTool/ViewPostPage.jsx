// ViewPostPage.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
        <div className="flex min-h-screen bg-gray-100">
        <Sidebar/>
        <div className="flex-1 max-w-5xl mx-auto p-8">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                <h1 className="text-4xl font-bold text-gray-900 text-center py-8">View Post Detail</h1>
                <img src={postImageSrc} alt="Post" className="w-full object-cover h-auto rounded-t-lg" />
    
                <div className="p-8 space-y-4">
                    <p className="text-xl"><span className="font-semibold">Description:</span> {post.description}</p>
                    <p className="text-xl"><span className="font-semibold">Sales Opening Date:</span> {new Date(post.salesOpeningDate).toLocaleDateString()}</p>
                    <p className="text-xl"><span className="font-semibold">Sales Closing Date:</span> {new Date(post.salesClosingDate).toLocaleDateString()}</p>
                    <p className="text-xl"><span className="font-semibold">Priority Method:</span> {post.priorityMethod}</p>
                    <p className="text-xl"><span className="font-semibold">Post ID:</span> {post.postId}</p>
                    <p className="text-xl"><span className="font-semibold">Building ID:</span> {post.buildingId}</p>
                    <p className="text-xl"><span className="font-semibold">Agency ID:</span> {post.agencyId}</p>
                    {/* Include additional post details as needed */}
                </div>
                <div className="px-8 py-4 bg-gray-50 text-center">
                    <button onClick={() => window.history.back()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                        Back
                    </button>
                </div>
            </div>
        </div>
    </div>
    



    );
};

export default ViewPostPage;
