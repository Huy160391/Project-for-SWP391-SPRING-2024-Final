import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ManagerPosts = () => {
    const [originalPosts, setOriginalPosts] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const [selectedBuilding, setSelectedBuilding] = useState('');
    const [buildings, setBuildings] = useState([]);


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://localhost:7137/api/Posts`);
                const now = new Date();
    
                // Filter posts whose Sales Closing Date is greater than the current time
                const validPosts = response.data.filter(post => {
                    const closingDate = new Date(post.salesClosingDate);
                    return closingDate > now;
                });
    
                const detailedPosts = await enrichPostDetails(validPosts);
                const response1 = await axios.get('https://localhost:7137/api/Buildings');
                setBuildings(response1.data);
    
                const sortedPosts = detailedPosts.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));
    
                setOriginalPosts(sortedPosts);
                setPosts(sortedPosts);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch posts');
                setLoading(false);
            }
        };
    
        fetchPosts();
    }, []);
    

    const enrichPostDetails = async (posts) => {
        return Promise.all(posts.map(async (post) => {
            const buildingResponse = await axios.get(`https://localhost:7137/api/Buildings/${post.buildingId}`);
            const agencyResponse = await axios.get(`https://localhost:7137/api/Agencies/${post.agencyId}`);
            return {
                ...post,
                buildingName: buildingResponse.data.name,
                agencyName: `${agencyResponse.data.firstName} ${agencyResponse.data.lastName}`,
            };
        }));
    };



    const handleSearch = () => {
        
        const filteredByDate = originalPosts.filter((post) => {
            const postDate = new Date(post.postDate); 
            const start = startDate ? new Date(startDate) : null; 
            const end = endDate ? new Date(endDate) : null; 
    
            return (!start || postDate >= start) && (!end || postDate <= end);
        });
    
        const filteredByBuilding = filteredByDate.filter(post =>
            selectedBuilding === '' || post.buildingName.toLowerCase() === selectedBuilding.toLowerCase()
        );
    
        setPosts(filteredByBuilding);
        setCurrentPage(1); 
    };

    const handleDelete = async (postId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this post?');

        if (isConfirmed) {
            try {
                await axios.delete(`https://localhost:7137/api/Posts/DeletePost/${postId}`);
                const updatedPosts = originalPosts.filter(post => post.postId !== postId);
                setOriginalPosts(updatedPosts);
                setPosts(updatedPosts);
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        } else {
            console.log('Delete action was cancelled.');
        }
    };



    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(posts.length / postsPerPage)));
    const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="flex min-h-screen bg-gray-50 font-serif">
            
            <div className="flex-1 bg-white shadow-lg rounded-lg mx-8 my-4 p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Manager Posts</h1>
                <div className="mb-8">
                    <select
                        className="block w-full py-3 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                        value={selectedBuilding}
                        onChange={(e) => setSelectedBuilding(e.target.value)}
                    >
                        <option value="">Search by Building Name</option>
                        {buildings.map(building => (
                            <option key={building.id} value={building.name}>{building.name}</option>
                        ))}
                    </select>
                    <div className="flex space-x-4 mt-4 items-center">
                        <span className="text-gray-700">Search By Post Date:</span>npm
                        <input
                            className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <input
                            className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        <button onClick={handleSearch} className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-sm transition-colors duration-150">
                            Search
                        </button>
                        <Link to="/createnewpost" className="inline-flex items-center justify-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-sm transition-colors duration-150">
                            New Post
                        </Link>
                    </div>
                </div>
                <div className="overflow-x-auto mt-6">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">No.</th>
                                {/* <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Post ID</th> */}
                                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Building Name</th>
                                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                                <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sales Opening Date</th>
                                <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sales Closing Date</th>
                                <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Post Date</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Images</th>
                                <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Priority Method</th>
                                
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentPosts.map((post, index) => (
                                <tr key={index}>
                                    <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">{indexOfFirstPost + index + 1}</td>
                                    {/* <td className="break-all px-3 py-3 whitespace-nowrap text-sm text-gray-900">{post.postId}</td> */}
                                    <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-500">{post.buildingName}</td>
                                    <td className="break-all px-6 py-3 whitespace-normal text-sm text-gray-700 break-words">{post.description}</td>
                                    <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">{new Date(post.salesOpeningDate).toLocaleDateString()}</td>
                                    <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">{new Date(post.salesClosingDate).toLocaleDateString()}</td>
                                    <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">{new Date(post.postDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                                        <img src={`https://localhost:7137/api/Posts/GetImage/${post.postId}`} alt="Post" className="h-20 w-32 rounded-md" />
                                    </td>
                                    <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">{post.priorityMethod}</td>
                                    
                                    <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-500 flex space-x-2">
                                        <Link to={`/view-post/${post.postId}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline">View</Link>
                                        <Link to={`/edit-post/${post.postId}`} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline">Edit</Link>
                                        <button onClick={() => handleDelete(post.postId)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="pagination flex justify-between items-center mt-8">
                    <button onClick={prevPage} className="bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold py-2 px-4 rounded-l">
                        Previous
                    </button>
                    <span className="text-sm text-gray-700">Page {currentPage}</span>
                    <button onClick={nextPage} className="bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold py-2 px-4 rounded-r">
                        Next
                    </button>
                </div>
            </div>
        </div>

    );
};

export default ManagerPosts;
