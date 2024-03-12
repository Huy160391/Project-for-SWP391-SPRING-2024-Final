import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from './PostCard';

const PostsListing = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { projectId } = useParams(); // Extract projectId from URL parameters

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`https://localhost:7137/api/Posts/ListPostByProjectID/${projectId}`);
        setPosts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching posts for project ID:", projectId, error);
        setIsLoading(false);
      }
    };

    if (projectId) {
      fetchPosts();
    } else {
      console.error("No projectId provided");
    }
  }, [projectId]); // Re-run the effect if projectId changes

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.map(post => (
          <PostCard key={post.projectId} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostsListing;
