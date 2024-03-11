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
                const detailedPosts = await enrichPostDetails(response.data);
                const response1 = await axios.get('https://localhost:7137/api/Buildings');
                setBuildings(response1.data);

                setOriginalPosts(detailedPosts);
                setPosts(detailedPosts);
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
            const postDate = new Date(post.postDate); // Lấy ngày đăng của bài viết
            const start = startDate ? new Date(startDate) : null; // Ngày bắt đầu từ bộ lọc
            const end = endDate ? new Date(endDate) : null; // Ngày kết thúc từ bộ lọc

            // Kiểm tra xem ngày đăng bài viết có nằm trong khoảng thời gian đã chọn hay không
            return (!start || postDate >= start) && (!end || postDate <= end);
        });

        const filteredPosts = originalPosts.filter(post =>
            selectedBuilding === '' || post.buildingName.toLowerCase() === selectedBuilding.toLowerCase()
        );

        setPosts(filteredPosts);
        setCurrentPage(1); // Đặt lại về trang đầu tiên sau khi lọc
    };

    const handleDelete = async (postId) => {
        // Hỏi người dùng xem họ có chắc chắn muốn xóa bài đăng không
        const isConfirmed = window.confirm('Are you sure you want to delete this post?');

        if (isConfirmed) {
            try {
                // Nếu người dùng nhấn "OK", tiếp tục xóa bài đăng
                await axios.delete(`https://localhost:7137/api/Posts/DeletePost/${postId}`);
                // Cập nhật danh sách bài đăng để loại bỏ bài đăng đã xóa
                const updatedPosts = originalPosts.filter(post => post.postId !== postId);
                setOriginalPosts(updatedPosts);
                setPosts(updatedPosts);
            } catch (error) {
                // Xử lý lỗi nếu có
                console.error('Error deleting post:', error);
                // Bạn có thể thiết lập một trạng thái lỗi cụ thể nếu muốn hiển thị thông báo lỗi
            }
        } else {
            // Nếu người dùng nhấn "Cancel", không làm gì cả
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
        <div className="flex">
            {/* <Sidebar /> */}
            <div className="flex-1 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ml-4">
                <h1 className="text-xl font-bold mb-4">Manager Posts</h1>
                <div className="mb-6">
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={selectedBuilding}
                        onChange={(e) => setSelectedBuilding(e.target.value)}
                    >
                        <option value="">Search by Building Name</option>
                        {buildings.map(building => (
                            <option key={building.id} value={building.name}>{building.name}</option>
                        ))}
                    </select>
                    <div className="flex space-x-2 mt-4">
                        <p className='mt-1 shadow border rounded py-2 px-3 text-gray-700 h-50'>Search By Post Date:</p>
                        <input
                            className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            
                        />
                        <input
                            className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Search</button>
                        <Link to="/createnewpost" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">New Post</Link>
                    </div>
                </div>
                <div className="overflow-x-auto mt-6">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">No.</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Post ID</th>
                                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                                <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sales Opening Date</th>
                                <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sales Closing Date</th>
                                <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Post Date</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Images</th>
                                <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Priority Method</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Building Name</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPosts.map((post, index) => (
                                <tr key={index}>
                                    <td className="px-2 py-5 border-b border-gray-200 bg-white text-sm">
                                        {indexOfFirstPost + index + 1}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{post.postId}</td>
                                    <td className="break-all px-6 py-5 border-b border-gray-200 bg-white text-sm">{post.description}</td>
                                    <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">{new Date(post.salesOpeningDate).toLocaleDateString()}</td>
                                    <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">{new Date(post.salesClosingDate).toLocaleDateString()}</td>
                                    <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">{new Date(post.postDate).toLocaleDateString()}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <img src={`https://localhost:7137/api/Posts/GetImage/${post.postId}`} alt="Post" className="h-20 w-60 rounded" />
                                    </td>
                                    <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">{post.priorityMethod}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{post.buildingName}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex space-x-2">
                                        <Link to={`/view-post/${post.postId}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline">View</Link>
                                        <Link to={`/edit-post/${post.postId}`} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline">Edit</Link>
                                        <button onClick={() => handleDelete(post.postId)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="pagination flex justify-between items-center mt-4">
                    <button onClick={prevPage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span>Page {currentPage}</span>
                    <button onClick={nextPage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={currentPage * postsPerPage >= posts.length}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManagerPosts;
