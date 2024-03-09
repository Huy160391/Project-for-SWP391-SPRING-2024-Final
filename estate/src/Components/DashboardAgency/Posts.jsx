import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './a.css'; // Make sure the CSS file exists and is correctly imported

const YourPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://localhost:7137/api/Posts');
        setPosts(response.data);
      } catch (error) {
        console.error("Could not fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="your-posts-container">
      <div className="sidebar">
        {/* Sidebar content */}
      </div>
      <div className="posts-content">
        <div className="search-and-create">
          <input type="text" placeholder="Search here..." />
          <button className="create-post-btn">+ New Post</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>ID</th>
              <th>Create Date</th>
              <th>Post Detail</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={index}>
                <td>{post.description}</td>
                <td>{post.postId}</td>
                <td>{post.postDate}</td>
                <td>
                  <button>View</button>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination component here */}
      </div>
    </div>
  );
};

export default YourPosts;
